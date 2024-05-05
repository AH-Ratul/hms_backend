const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to add room");
});

try {
  router.post("/", (req, res) => {
    const { name, type, description, capacity, price, image } = req.body;

    let database;

    if (type === "Single" || type === "Double") {
      database = db;
    } else if (type === "Suite" || type === "Deluxe") {
      database = db2;
    } else {
      res.status(400).json({ error: "invalid room type" });
    }

    const sql = `INSERT INTO room(name, type, description, capacity, price, image) VALUES('${name}','${type}',"${description}",'${capacity}','${price}','${image}');`;

    database.query(sql, (err, results) => {
      if (err) {
        console.log("error insert data", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log(results, "room added");
        res.status(200).json({ message: "Room Added" });
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
