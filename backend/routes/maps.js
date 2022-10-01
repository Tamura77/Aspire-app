var sqlite3 = require('sqlite3');
var express = require('express');
var router = express.Router();
var db = require("../database.js")

/* GET home page. */
router.get('/', function(req, res) {
  // open database
  var params = [];
  db.serialize(() => {
    db.all(`SELECT name, description, coordinates FROM places`, params, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      console.log(rows);
      res.json(rows);
    });
  });
});

module.exports = router;
