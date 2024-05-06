const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to delete room");
});

router.post("/", (req, res) => {
  const { room_id } = req.body;

  const sql = `DELETE FROM room WHERE room_id= ?`;

  db.query(sql, [room_id], (err, results1) => {
    if (err) {
      console.log("err 1", err);
      return res.status(500).json({ error: "Internal Server1 Error" });
    }
    //console.log('from db1',results1)

    // execute second database
    db2.query(sql, [room_id], (err, results2) => {
      if (err) {
        console.log("err 1", err);
        return res.status(500).json({ error: "Internal Server2 Error" });
      }

      //console.log('from db2',results2)
      res.status(200).json({ message: "Room Deleted" });
    });
  });
});

module.exports = router;
