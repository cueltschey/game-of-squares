const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.static(path.join(__dirname, "../view/dist/")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())

// Connect to SQLite database
const db = new sqlite3.Database('../model/squares.db');

// Insert Blank Squares Until the Current Date
const insertMissingEntries = (userid) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date (YYYY-MM-DD format)
    // Query to get the most recent entry date
    const recentDateQuery = 'SELECT MAX(date) AS maxDate FROM squares WHERE userid = ?';
    db.get(recentDateQuery, [userid], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        // Extract the most recent entry date
        const mostRecentDate = row.maxDate;
        
        // Convert dates to Date objects for comparison
        const currentDateObj = new Date(currentDate);
        const mostRecentDateObj = new Date(mostRecentDate);

        // Loop through each day since the most recent entry
        let currentDateIterator = new Date(mostRecentDate);
        while (currentDateIterator < currentDateObj) {
            currentDateIterator.setDate(currentDateIterator.getDate() + 1); // Increment date by 1 day
            
            // Check if an entry exists for the current date
            const formattedDate = currentDateIterator.toISOString().split('T')[0];
            const query = 'SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?';
            db.get(query, [formattedDate, userid], (err, row) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // If no entry exists, insert a new entry for the current date
                if (row.count === 0) {
                    db.run('INSERT INTO squares (date, userid, completed, total) VALUES (?, ?, ?, (SELECT COUNT(*) FROM tasks))', [formattedDate, userid, 0], (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`New entry inserted for ${formattedDate} with userid: ${userid}`);
                        }
                    });
                }
            });
        }
    });
};

const isnertInitial = (userid) => {
    const currentDate = new Date().toISOString().split('T')[0];

    // Check if an entry exists for the current date
    const query = 'SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?';

    db.get(query, [currentDate, userid], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }

        // If no entry exists, insert a new entry for the current date
        if (row.count === 0) {
            db.run('INSERT INTO squares (date, userid, completed, total) VALUES (?, ?, ?, (SELECT COUNT(*) FROM tasks))', [currentDate, userid, 0], (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`New entry inserted for ${currentDate} with userid: ${userid}`);
                }
            });
        } else {
            console.log(`Entry already exists for ${currentDate}`);
        }
    });
};



app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "../view/dist/index.html"))
})

// Get Squares for a User
app.get('/squares', (req, res) => {
    const userid = parseInt(req.query.userid, 10);
    if(!userid){
      res.status(405).json({ error: 'Bad Request: userid required' });
      return;
    }
    db.all(`SELECT * FROM squares WHERE userid = ${userid}`, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
});

// Login post
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE name = '${username}' AND password = '${password}'`, (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const userid = row.userid
      console.log("Sending User ID: ",userid)
      res.cookie("userid", userid, { maxAge: 900000, httpOnly: true });
      insertMissingEntries(userid);
      res.cookie("authenticated", { maxAge: 900000, httpOnly: true })
      res.status(200).json({userid: userid})
    }
  });
})

// Register post
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Check if username is already taken
    db.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (row) {
            // Username already exists
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        // Insert the new user into the database
        db.run('INSERT INTO users (name, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            } 
            // Get the last inserted user's ID (userid)
            const userid = this.lastID;
            isnertInitial(userid)
            console.log(userid)
            // Return JSON with userid on success
            res.status(201).json({ userid: userid });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
