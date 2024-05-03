const express = require("express");
const {db} = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    const sql = `SELECT
        (SELECT COUNT(*) FROM room) AS total_room,
        (SELECT COUNT(*) FROM employee) AS total_employee,
        (SELECT COUNT(*) FROM booking) AS total_booking;`;

    db.query(sql, (err, results) => {
      if (err) {
        console.log("error ->", err);
      } else {
        res.status(200).json(results);
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
