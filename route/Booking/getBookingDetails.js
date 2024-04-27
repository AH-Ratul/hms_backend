const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM booking`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
