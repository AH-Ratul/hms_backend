const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM employee`;

    // execute first database
    db.query(sql, (err, results1) => {
      if (err) {
        console.error("Error in database 1:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // execute second database
      db2.query(sql, (err, results2) => {
        if (err) {
          console.error("Error in database 2:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        // send both results after getting data from both database
        res.status(200).json({ results1, results2 });
      });
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
