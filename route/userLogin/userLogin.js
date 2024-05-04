const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from user login");
});

try {
  router.post("/", (req, res) => {
    const { email, password } = req.body;

    // ensure that email and password value aren't empty
    if (!email || !password) {
      return res.status(400).json({ error: "Email & password are required" });
    }

    const sql = `SELECT * FROM users  WHERE email="${email}"`;

    db.query(sql, (err, results1) => {
      if (err) {
        console.error("MySQL error1:", err);
        return res.status(500).json({ error: "Internal Server1 Error" });
      }

      // execute second database
      db2.query(sql, (err, results2) => {
        if (err) {
          console.log("err db2", err);
          return res.status(500).json({ error: "Internal Server2 Error" });
        }

        const user1 = results1[0];
        const user2 = results2[0];

        if (user1 && user1.password === password) {
          res.status(200).json({ message: "Login Successfull", user1 });
        } else if (user2 && user2.password === password) {
          res.status(200).json({ message: "Login Successfull", user2 });
        } else {
          res.status(401).json({ error: "Invalid Credentials" });
        }
      });
    });
  });
} catch (error) {
  console.error(error);
}

module.exports = router;
