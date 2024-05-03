const express = require("express");
const {db} = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from user signup");
});

// Post route
router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  const sql = `INSERT INTO users(username, email, password) VALUES('${username}', '${email}', '${password}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error inserting data", err);
      res.status(500).json({ error: "Interser server error" });
    } else {
      console.log("User Data Inserted", result);
      res.status(200).json({ message: "user sign up successfull" });
    }
  });
});

module.exports = router;
