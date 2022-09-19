const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())

const sqlite3 = require('sqlite3').verbose();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get("/cool", function(req, res) {
  const data = [];
  // open database
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

  db.serialize(() => {
    db.each(`SELECT * FROM teams`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      const rows = [];
      rows.push(row);
      console.log(row);
      res.send(rows);
    });
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
})

app.get("/", function(req, res) {
  res.send();
});
let port = process.env.PORT;
if(port == null || port == "") {
 port = 5000;
}
app.listen(port, function() {
 console.log("Server started successfully");
});