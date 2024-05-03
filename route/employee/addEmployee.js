const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to add employee");
});

try {
  router.post("/", (req, res) => {
    const { name, position, branch, phone, address, hire_date, salary } = req.body;

    const sql = `INSERT INTO employee(name, position, branch, phone, address, hire_date, salary) VALUES("${name}", "${position}","${branch}", "${phone}", "${address}", "${hire_date}", "${salary}")`;

    if (branch === "Chattogram") {
      db.query(sql, (err, results) => {
        if (err) {
          console.log("error occuired-1", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          console.log("employee added to db1", results);
          res.status(200).json({ message: "Employee Added to DB_1" });
        }
      });
    } else if (branch === "Cox's Bazar") {
      db2.query(sql, (err, results) => {
        if (err) {
          console.log("error occuired-2", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          console.log("employee added to db2", results);
          res.status(200).json({ message: "Employee Added to DB_2" });
        }
      });
    } else {
      res.status(400).send("Invalid Branch");
    }
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
