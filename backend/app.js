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

// GET PLACES TABLE FOR MARKERS

app.get("/places", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT name, description, coordinates FROM places`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET RACE MARKERS

app.get("/races/:id", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var race_name = req.params.id;
  var params = [];
  db.serialize(() => {
    db.all('SELECT places.coordinates, places.name, tasks.description, tasks.colour, tasks.number FROM tasks JOIN places ON tasks.place_id = places.id JOIN races ON races.task_id = tasks.id WHERE races.race_name =' + race_name + ';', params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
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

// POST ADMIN FOR Tasks (CHANGE LATER)

app.post("/admin/tasks/post", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  console.log(req.body);
  if (req.body.location == '' || req.body.description == '') {
    return;
  }
  var sql = 'INSERT INTO tasks (place_id, description) VALUES (?,?)'
  params = [req.body.location, req.body.description]
  db.run(sql, params, function(err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      })
    })

// PATCH (UPDATE) LINKS TABLE

app.patch("/admin/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  data = {
      title: req.body.title,
      url: req.body.url
  }
  params = [data.title, data.url, req.params.id]
  db.run(`UPDATE links set title = ?, url = ? WHERE id = ?`, params,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})

// GET LINKS TABLE

app.get("/links", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT * FROM links`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET RACES TABLE FOR ADMIN PAGE

app.get("/table/races", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT * FROM races`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET PLACES TABLE FOR ADMIN PAGE

app.get("/table/places", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT id, name, description, coordinates FROM places`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET TASKS TABLE FOR ADMIN PAGE

app.get("/table/tasks", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT id, place_id, description FROM tasks`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET PLACE NAMES FOR TASK EDITOR PAGE

app.get("/table/placenames", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT id, name FROM places ORDER BY id ASC`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})

// GET TASK DESCRIPTIONS FOR RACE EDITOR

app.get("/table/taskdescs", function(req, res) {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var params = [];
  db.serialize(() => {
    db.all(`SELECT id, description FROM tasks ORDER BY id ASC`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.json(rows);
    });
  });
  
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
})


//PATCH FOR ADMIN TASK EDITOR

app.patch("/admin/tasks/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var sql = 'UPDATE tasks set place_id = ?, description = ? WHERE ID = ?'
  params = [req.body.location, req.body.description, req.params.id]
  if (req.body.location == "" && req.body.description != "") {
    var sql = 'UPDATE tasks set description = ? WHERE ID = ?'
    params = [req.body.description, req.params.id]
  } else if (req.body.description == "" && req.body.location != "") {
    var sql = 'UPDATE tasks set place_id = ? WHERE ID = ?'
    params = [req.body.location, req.params.id]
  } else if (req.body.location == "" && req.body.description == "") {
      return;
  }
  db.run(
      sql,
      params,
      function (err, result) {
        
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})

// DELETE FOR ADMIN TASK EDITOR

app.delete("/admin/tasks/delete/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.run(
      'DELETE FROM tasks WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})