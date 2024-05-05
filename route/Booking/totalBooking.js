const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    let totalRoom = 0;
    let totalEmployee = 0;
    let totalBooking = 0;

    const sql1 = `SELECT COUNT(*) AS total FROM room`;
    const sql2 = `SELECT COUNT(*) AS total FROM employee`;
    const sql3 = `SELECT COUNT(*) AS total FROM booking`;

    // Execute queries for db1
    db.query(sql1, (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      totalRoom += results[0].total;

      db.query(sql2, (err, results) => {
        if (err) {
          console.error("Error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        totalEmployee += results[0].total;

        db.query(sql3, (err, results) => {
          if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          totalBooking += results[0].total;

          // Execute queries for db2
          db2.query(sql1, (err, results) => {
            if (err) {
              console.error("Error:", err);
              return res.status(500).json({ error: "Internal server error" });
            }
            totalRoom += results[0].total;

            db2.query(sql2, (err, results) => {
              if (err) {
                console.error("Error:", err);
                return res.status(500).json({ error: "Internal server error" });
              }
              totalEmployee += results[0].total;

              db2.query(sql3, (err, results) => {
                if (err) {
                  console.error("Error:", err);
                  return res.status(500).json({ error: "Internal server error" });
                }
                totalBooking += results[0].total;

                res.status(200).json({ totalRoom, totalEmployee, totalBooking });
              });
            });
          });
        });
      });
    });
  });
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
}

module.exports = router;
