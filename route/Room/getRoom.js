const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  const id = req.query.id; // get id from server to find room by id

  try {
    let combinedResults = [];

    // fetch room data from database 1
    const sql1 = id
      ? `SELECT * FROM room WHERE room_id=?`
      : `SELECT * FROM room;`;
    db.query(sql1, [id], (err, results1) => {
      if (err) {
        console.error("Error fetching room data from DB1:", err);
        res.status(500).json({ error: "Internal server1 error" });
        return;
      }

      // combine results from db1 with combinedResults array
      combinedResults = combinedResults.concat(results1);

      // fetch room data from database 2
      const sql2 = id
        ? `SELECT * FROM room WHERE room_id=?`
        : `SELECT * FROM room;`;
      db2.query(sql2, [id], (err, results2) => {
        if (err) {
          console.error("Error fetching room data from DB2:", err);
          res.status(500).json({ error: "Internal server2 error" });
          return;
        }

        // combine results from db2 with combinedResults array
        combinedResults = combinedResults.concat(results2);

        // send the combined resluts as response
        res.status(200).json(combinedResults);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
