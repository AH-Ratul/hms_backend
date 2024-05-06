const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from admin login");
});

try {
  router.post("/", (req, res) => {
    const { admin_email, password } = req.body;

    if (!admin_email || !password) {
      return res.status(400).json({ error: "Emai & Password are required" });
    }

    const sql = `SELECT * FROM admin  WHERE admin_email="${admin_email}"`;
    db.query(sql, (err, results1) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ error: "Internal server1 error" });
      }

      // execute second database
      db2.query(sql, (err, results2) => {
        if (err) {
          console.log("err in db2", err);
          return res.status(500).json({ error: "Internal Server2 Error" });
        }

        const admin1 = results1[0];
        const admin2 = results2[0];

        if (admin1 && admin1.password === password) {
          res.status(200).json({ message: "Login Successfull" });
        } else if (admin2 && admin2.password === password) {
          res.status(200).json({ message: "Login Successfull" });
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
