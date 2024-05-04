const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from user signup");
});

// Post route
router.post("/", (req, res) => {
  const { username, dateOfBirth, gender, email, password } = req.body;

  const sql = `INSERT INTO users(username, dateOfBirth, gender, email, password) VALUES('${username}','${dateOfBirth}','${gender}', '${email}', '${password}')`;

  // if gender = male then data will inserted into database-1
  if (gender === "Male") {
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error inserting data db-1", err);
        res.status(500).json({ error: "Internal server1 error" });
      } else {
        console.log("User Data Inserted to db-1", result);
        res
          .status(200)
          .json({ message: "Registration Successfull in DB_1" });
      }
    });
  } else if (gender === "Female") {
    // if gender = female then data will inserted into database-2
    db2.query(sql, (err, result) => {
      if (err) {
        console.error("Error inserting data db-2", err);
        res.status(500).json({ error: "Internal server2 error" });
      } else {
        console.log("User Data Inserted to db-2", result);
        res
          .status(200)
          .json({ message: "Registration Successfull in DB_2" });
      }
    });
  } else {
    res.status(400).send("Invalid User");
  }
});

module.exports = router;
