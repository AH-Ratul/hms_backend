const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from admin signup");
});

// Post route
router.post("/", (req, res) => {
  const { admin_name, admin_email, password } = req.body;

  const sql = `INSERT INTO admin(admin_name, admin_email, password) VALUES('${admin_name}', '${admin_email}', '${password}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error inserting data", err);
      res.status(500).json({ error: "Interser server error" });
    } else {
      console.log("Data Inserted", result);
      res.status(200).json({ message: "admin sign up successfull" });
    }
  });
});

module.exports = router;
