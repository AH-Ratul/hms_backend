const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to add employee");
});

try {
  router.post("/", (req, res) => {
    const { name, position, phone, address, hire_date, salary } = req.body;

    const sql = `INSERT INTO employee(name, position,  phone, address, hire_date, salary) VALUES('${name}', '${position}', '${phone}', '${address}', '${hire_date}', '${salary}')`;

    db.query(sql, (err, results) => {
      if (err) {
        console.log("error occuired", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        //console.log("employee added", results);
        res.status(200).json({ message: "Employee Added" });
      }
    });
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
