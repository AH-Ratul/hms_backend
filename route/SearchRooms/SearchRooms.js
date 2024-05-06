const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response");
});

try {
  router.post("/", (req, res) => {
    const { check_in, check_out } = req.body;

    let results = [];

    const sql = `SELECT *
        FROM room
        WHERE room_id NOT IN (
          SELECT room_id
          FROM booking
          WHERE (check_in BETWEEN ? AND ?)
             OR (check_out BETWEEN ? AND ?)
             OR (? <= check_in AND ? >= check_out)
        )`;

    const params = [
      check_in,
      check_out,
      check_in,
      check_out,
      check_in,
      check_out,
    ];

    db.query(sql, params, (err, results1) => {
      if (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });
      }

      // combine results1 from db1 with results array
      results = results.concat(results1);

      db2.query(sql, params, (err, results2) => {
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
