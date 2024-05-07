const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "../view/dist/")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser())

const db = new sqlite3.Database('../model/squares.db');

const insertMissingEntries = (userid) => {
  const currentDate = new Date().toISOString().split('T')[0]; 
  const recentDateQuery = 'SELECT MAX(date) AS maxDate FROM squares WHERE userid = ?';
  db.get(recentDateQuery, [userid], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    const mostRecentDate = row.maxDate;

    const currentDateObj = new Date(currentDate);
    const mostRecentDateObj = new Date(mostRecentDate);

    let currentDateIterator = new Date(mostRecentDate);
    while (currentDateIterator < currentDateObj) {
      currentDateIterator.setDate(currentDateIterator.getDate() + 1); // Increment date by 1 day
      const formattedDate = currentDateIterator.toISOString().split('T')[0];
      const query = 'SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?';
      db.get(query, [formattedDate, userid], (err, row) => {
        if (err) {
          console.error(err);
          return;
        }
        if (row.count === 0) {
          db.run('INSERT INTO squares (date, userid, completed, total) VALUES (?, ?, ?, (SELECT COUNT(*) FROM tasks))', [formattedDate, userid, 0], (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`New square inserted for ${formattedDate} with userid: ${userid}`);
          }
          });
        }
      });
  }
  })
}

const insertInitial = (userid) => {
  const currentDate = new Date().toISOString().split('T')[0];

  const query = 'SELECT COUNT(*) AS count FROM squares WHERE date = ? AND userid = ?';

  db.get(query, [currentDate, userid], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

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

const insertTasks = async (userid, squareid) => {
  await db.all('SELECT taskid FROM tasks', async (err, rows) => {
      if(err){
        console.error(err)
        return;
      } 
      const promises = rows.map(async item => {
        return await db.run('INSERT INTO list (userid, squareid, taskid) VALUES (?, ?, ?)', [userid, squareid, item.taskid], (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`New Task inserted for userid: ${userid} taskid: ${item.taskid}`);
          }
        });
      })
      await Promise.all(promises) 
    })
  }



app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "../view/dist/index.html"))
})

app.get('/squares', (req, res) => {
  const userid = parseInt(req.query.userid, 10);
  if(!userid){
    res.status(405).json({ error: 'Bad Request: userid required' });
    return;
  }
  insertMissingEntries(userid);
  db.all(`SELECT * FROM squares WHERE userid = ${userid} ORDER BY date ASC`, (err, rows) => {
    if (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    } else {
    res.json(rows);
    }
  });
});

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
    res.cookie("authenticated", { maxAge: 900000, httpOnly: true })
    res.status(200).json({userid: userid})
  }
  });
})

app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  db.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (row) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    db.run('INSERT INTO users (name, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      } 
      const userid = this.lastID;
      insertInitial(userid)
      res.status(201).json({ userid: userid });
    });
  });
});

app.get("/list/:userid/:squareid", async (req,res) => {
  const userid = req.params.userid;
  const squareid = req.params.squareid;
  if(!userid){
    res.status(405).json({ error: 'Bad Request: userid required' });
    return;
  }
  if(!squareid){
    res.status(405).json({ error: 'Bad Request: squareid required' });
    return;
  }
  db.all('SELECT * FROM list WHERE userid = ? AND squareid = ?', [userid, squareid], async (err, rows) => {
    if(err){
      res.status(500).send("Internal Server Error")
      return;
    } else{
      if(rows.length === 0){
        await insertTasks(userid, squareid)
        db.all("SELECT * FROM list WHERE userid = ? AND squareid = ?", [userid, squareid], (err,rows) => {
          if(err){
            res.status(500).send("Internal Server Error")
            return;
          }
          res.json(rows)
        })
      } else{
        res.json(rows)
      }
    }
  })
})

app.get('/tasks', (req, res) => {
  const userid = parseInt(req.query.userid, 10);
  if(!userid){
    res.status(405).json({ error: 'Bad Request: userid required' });
    return;
  }
  db.all(`SELECT * FROM tasks WHERE userid = ${userid}`, (err, rows) => {
    if (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    } else {
    res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
