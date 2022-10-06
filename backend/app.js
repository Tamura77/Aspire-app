const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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


app.post("/admin/teams/", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  console.log(req.body);
  var sql = 'INSERT INTO races (task_id, race_id) VALUES (?,?)'
  data = {
    task_id: parseInt(req.body.task_id),
    race_id: parseInt(req.body.race_id)
  }
  params = [data.task_id, data.race_id]
  db.run(sql, params, function(err, result) {
      if (err){
          console.log('hi');
          res.status(400).json({"error": err.message})
          return;
      }
      console.log("success");
      })
    })

app.patch("/admin/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  data = {
      title: req.body.title,
      url: req.body.url
  }
  console.log(req.params.id)
  params = [data.title, data.url, req.params.id]
  db.run(
      `UPDATE links set 
          title = ?, 
          url = ?
          WHERE id = ?`,
      params,
      function (err, result) {
        console.log(data.title)
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})

app.delete("/admin/delete/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
  db.run(
      'DELETE FROM links WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})

app.get("/links", function(req, res) {
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
    db.all(`SELECT * FROM links`, params, (err, rows) => {
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

