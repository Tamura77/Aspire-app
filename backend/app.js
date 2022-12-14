const express = require("express");
require("dotenv").config();
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
  race_name = "'" + race_name + "'"
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

// GET LINKS TABLE FOR ADMIN PAGE

app.get("/table/links", function(req, res) {
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
    db.all(`SELECT races.id, races.task_id, races.race_name, tasks.description FROM races JOIN tasks ON races.task_id = tasks.id`, params, (err, rows) => {
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
    db.all(`SELECT tasks.id, place_id, tasks.description, places.name FROM tasks JOIN places ON places.id = tasks.place_id`, params, (err, rows) => {
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


// Update for Race table in admin editor

app.patch("/admin/races/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var sql = 'UPDATE races set task_id = ?, race_name = ? WHERE ID = ?'
  params = [req.body.task_id, req.body.race_name, req.params.id]
  if (req.body.task_id == "" && req.body.race_name != "") {
    var sql = 'UPDATE races set race_name = ? WHERE ID = ?'
    params = [req.body.race_name, req.params.id]
  } else if (req.body.race_name == "" && req.body.task_id != "") {
    var sql = 'UPDATE races set task_id = ? WHERE ID = ?'
    params = [req.body.task_id, req.params.id]
  } else if (req.body.task_id == "" && req.body.race_name == "") {
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

// Delete for Race table in Admin EDITOR

app.delete("/admin/races/delete/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.run(
      'DELETE FROM races WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})

// POST FOR RACE TABLE

app.post("/admin/races/post", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  if (req.body.task_id == '' || req.body.race_name == '') {
    return;
  }
  var sql = 'INSERT INTO races (task_id, race_name) VALUES (?,?)'
  params = [req.body.task_id, req.body.race_name]
  db.run(sql, params, function(err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      })
    })


// Update for Location Table

app.patch("/admin/places/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var sql = 'UPDATE places set name = ?, description = ?, coordinates = ? WHERE ID = ?'
  params = [req.body.place_name, req.body.description, req.body.coords, req.params.id]
  if (req.body.place_name == "" && req.body.coords == "" && req.body.description != "") {
    var sql = 'UPDATE places set description = ? WHERE ID = ?'
    params = [req.body.description, req.params.id]
  } else if (req.body.description == "" && req.body.coords == "" && req.body.place_name != "") {
    var sql = 'UPDATE places set name = ? WHERE ID = ?'
    params = [req.body.place_name, req.params.id]
  } else if (req.body.description == "" && req.body.place_name == "" && req.body.coords != "0, 0") {
    var sql = 'UPDATE places set coordinates = ? WHERE ID = ?'
    params = [req.body.coords, req.params.id]
  } else if (req.body.place_name == "" && req.body.description == "" && req.body.coords == "") {
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


// Post for Location Table

app.post("/admin/places/post", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  if (req.body.place_name == '' || req.body.description == '' || req.body.coords == '') {
    return;
  }
  var sql = 'INSERT INTO places (name, description, coordinates) VALUES (?,?,?)'
  params = [req.body.place_name, req.body.description, req.body.coords]
  db.run(sql, params, function(err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      })
    })


// Delete for Locaton Table

app.delete("/admin/places/delete/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.run(
      'DELETE FROM places WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
  });
})


// Update for Links table

app.patch("/admin/links/edit/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  var sql = 'UPDATE links set title = ?, url = ?, category = ? WHERE ID = ?'
  params = [req.body.title, req.body.url, req.body.cat, req.params.id]
  if (req.body.title == "" && req.body.cat == "" && req.body.url != "") {
    var sql = 'UPDATE links set url = ? WHERE ID = ?'
    params = [req.body.url, req.params.id]
  } else if (req.body.url == "" && req.body.cat == "" && req.body.title != "") {
    var sql = 'UPDATE links set title = ? WHERE ID = ?'
    params = [req.body.title, req.params.id]
  } else if (req.body.url == "" && req.body.title == "" && req.body.cat != "") {
    var sql = 'UPDATE links set category = ? WHERE ID = ?'
    params = [req.body.cat, req.params.id]
  } else if (req.body.title == "" && req.body.url == "" && req.body.cat == "") {
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


// Post for Links table

app.post("/admin/links/post", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  if (req.body.title == '' || req.body.url == '' || req.body.cat == '') {
    return;
  }
  var sql = 'INSERT INTO links (title, url, category) VALUES (?,?,?)'
  params = [req.body.title, req.body.url, req.body.cat]
  db.run(sql, params, function(err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      })
    })


// Delete for Links table

app.delete("/admin/links/delete/:id", (req, res, next) => {
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
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

var jwt = require('jsonwebtoken');

// Password checking and assigning a token
app.post('/admin/login', (req, res) => {
  if (req.body.password != process.env.ADMIN_PASSWORD) {
    res.status(401).json({"token": null});
    return;
  }
  var token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({"token": token});
});

app.post('/admin/login/verify', (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, _) => {
    if(err) {
      res.status(401).json({'success': false});
      return;
    }
    res.json({'success': true});
  })
});