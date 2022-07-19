var express = require('express');
var router = express.Router();
var db = require("../database");

router.get("/user", (req, res, next) => {
  const sql = "SELECT * FROM user"
  const params = []
  
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows)
  });
});

module.exports = router;
