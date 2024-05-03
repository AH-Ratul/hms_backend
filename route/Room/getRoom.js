const express = require("express");
const {db }= require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  const id = req.query.id; // get id from server to find room by id
  try {
    if (!id) {
      const sql = `SELECT * FROM room;`;
      db.query(sql, (err, results) => {
        if (err) {
          console.log("error", err);
        } else {
          //console.log(results);
          res.status(200).json(results);
        }
      });
    } else {
      const sql = `SELECT * FROM room WHERE room_id=?`;
      db.query(sql, [id], (err, results) => {
        if (err) {
          console.log("error", err);
        } else {
          //console.log("by id", results);
          res.status(200).json(results);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
