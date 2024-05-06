const express = require("express");
const { db, db2 } = require("../../DB/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response to deleting booking");
});

router.post("/", (req, res) => {
  const { booking_id } = req.body;

  //if booking_id in db1, delete from db1
  // firstly delete from billing table
  db.query(
    "DELETE FROM billing WHERE booking_id = ?",
    [booking_id],
    (err, results1) => {
      if (err) {
        console.error("Error in db1:", err);
        return res.status(500).json({ error: "Internal Server1 Error" });
      }

      db.query(
        "DELETE FROM booking WHERE booking_id = ?",
        [booking_id],
        (err, results2) => {
          if (err) {
            console.error("Error in db1:", err);
            return res.status(500).json({ error: "Internal Server1 Error" });
          }

          //if booking_id in db2, delete from db2
          db2.query(
            "DELETE FROM billing WHERE booking_id = ?",
            [booking_id],
            (err, results3) => {
              if (err) {
                console.error("Error in db2:", err);
                return res
                  .status(500)
                  .json({ error: "Internal Server2 Error" });
              }

              db2.query(
                "DELETE FROM booking WHERE booking_id = ?",
                [booking_id],
                (err, results4) => {
                  if (err) {
                    console.error("Error in db2:", err);
                    return res
                      .status(500)
                      .json({ error: "Internal Server2 Error" });
                  }

                  // If deletion successful respond with success message
                  res.status(200).json({ message: "Deleted" });
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;
