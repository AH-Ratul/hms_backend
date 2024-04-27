const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to booking");
});

try {
  router.post("/", (req, res) => {
    const data = req.body;

    const sql = `INSERT INTO booking(room_id, room_name, room_type, nights, total_amount, payment_method, check_in, check_out, first_name, last_name, address, city,phone, email, adults, kids) VALUES('${data.room_id}', '${data.room_name}','${data.room_type}','${data.nights}','${data.total_amount}','${data.payment_method}','${data.check_in}','${data.check_out}','${data.first_name}','${data.last_name}','${data.address}','${data.city}','${data.phone}','${data.email}','${data.adults}','${data.kids}');`;

    db.query(sql, (err, results) => {
      if (err) {
        console.log("error", err);
        res.status(500).json({ error: "Inerter Server Error" });
      } else {
        console.log("booking", results);
        res.status(200).json({ message: "Booking Successfull" });
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
