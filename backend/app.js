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

app.get("/places", function(req, res) {
  const data = [];
  // open database
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    // console.log('Connected to the database.');
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT name, description, coordinates FROM places`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      // console.log(rows);
      res.json(rows);
    });
  });
  
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log('Close the database connection.');
  });
})

app.get("/races/:id", function(req, res) {
  const data = [];
  // open database
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  var raceid = req.params.id;
  console.log(raceid);
  var params = [];
  db.serialize(() => {
    // db.all(`SELECT places.coordinates, places.name, tasks.description, tasks.colour, tasks.number FROM tasks JOIN places ON tasks.place_id = places.id;`, params, (err, rows) => {
    db.all('SELECT places.coordinates, places.name, tasks.description, tasks.colour, tasks.number FROM tasks JOIN places ON tasks.place_id = places.id JOIN races ON races.task_id = tasks.id WHERE races.race_id =' + raceid + ';', params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      console.log(rows);
      res.json(rows);
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