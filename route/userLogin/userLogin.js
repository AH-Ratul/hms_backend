const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from user login");
});

try {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const sql = `SELECT * FROM users  WHERE email="${email}"`;
    db.query(sql, (err, results) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length > 0) {
        const users = results[0];

        if (password === users.password) {
          res.status(200).json({ message: "Login Successfull" });
        } else {
          res.status(401).json({ error: "Invalid Credentials" });
        }
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    });
  });
} catch (error) {
  console.error(error);
}

module.exports = router;
