const express = require("express");
const { db, db2 } = require("../../DB/db");
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
      console.error("Error in db1", err);
      return res.status(500).json({ error: "Internal server1 error" });
    }

    // insert to second database
    db2.query(sql, (err, results1) => {
      if (err) {
        console.log("error in db2", err);
        return res.status(500).json({ error: "Internal server2 error" });
      }

      res.status(200).json({ message: "admin sign up successfull" });
    });
  });
});

module.exports = router;
