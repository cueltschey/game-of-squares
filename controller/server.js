const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('your_database.db');

// API endpoint to fetch data from SQLite database
app.get('/squares', (req, res) => {
    const userid = req.query.userid;
    if(!userid){
      res.status(405).json({ error: 'Bad Request: userid required' });
    }
    db.all('SELECT * FROM squares', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
