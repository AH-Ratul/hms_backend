const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to booking");
});

router.post("/", (req, res) => {
  const data = req.body;

  let database;

  if (data.room_type === "Single" || data.room_type === "Double") {
    database = db;
  } else if (data.room_type === "Suite" || data.room_type === "Deluxe") {
    database = db2;
  } else {
    res.status(400).json({ error: "invalid room type" });
  }

  const sql = `INSERT INTO booking(room_id, room_name, room_type, check_in, check_out, first_name, last_name, address, city,phone, email, adults, kids) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  const values1 = [
    data.room_id,
    data.room_name,
    data.room_type,
    data.check_in,
    data.check_out,
    data.first_name,
    data.last_name,
    data.address,
    data.city,
    data.phone,
    data.email,
    data.adults,
    data.kids,
  ];

  database.query(sql, values1, (err, results) => {
    if (err) {
      console.log("error", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("booking", results);

      // execute the sql1 into billing statement
      const sql1 = `INSERT INTO billing(booking_id, nights, total_amount, payment_method) VALUES(LAST_INSERT_ID(), ?, ?, ?);`;

      const values2 = [data.nights, data.total_amount, data.payment_method];

      database.query(sql1, values2, (err, results1) => {
        if (err) {
          console.log(err);
        } else {
          console.log("bill", results1);
          res.status(200).json({ message: "Booking Successfull" });
        }
      });
    }
  });
});

module.exports = router;
