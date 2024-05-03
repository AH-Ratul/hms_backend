const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to add room");
});

try {
  router.post("/", (req, res) => {
    const { name, type, description, capacity, price, image } = req.body;

    const sql = `INSERT INTO room(name, type, description, capacity, price, image) VALUES('${name}','${type}',"${description}",'${capacity}','${price}','${image}');`;

    db.query(sql, (err, results) => {
      if (err) {
        console.log("error insert data", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log(results, "room added to db1");
        //res.status(200).json({ message: "Room Added" });

        // for db 2
        db2.query(sql, (err2, results2) => {
          if (err2) {
            console.log("error insert data", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            console.log(results2, "room added to db2");
            res.status(200).json({ message: "Room Added to db_1 and db_2" });
          }
        });
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
