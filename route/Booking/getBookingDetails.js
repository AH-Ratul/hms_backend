const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    let results = [];

    const sql = `SELECT * FROM booking`;

    db.query(sql, (err, results1) => {
      if (err) {
        console.log(err);
      }

      // combine results1 from db1 with results array
      results = results.concat(results1);

      db2.query(sql, (err, results2) => {
        if (err) {
          console.log("err 2", err);
        }

        // combine results2 from db2 with results array
        results = results.concat(results2);

        // send results as response
        res.status(200).json(results);
      });
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
