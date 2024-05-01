const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to deleting booking");
});

try {
  router.post("/", (req, res) => {
    const { booking_id } = req.body;

    const sql = `DELETE FROM booking WHERE booking_id=?`;
    
    db.query(sql, [booking_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        //console.log("del", results);
        res.status(200).json({ message: "Deleted" });
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
