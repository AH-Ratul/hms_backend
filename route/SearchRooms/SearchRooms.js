const express = require("express");
const db = require("../../DB/db");
const router = express.Router();

try {
  router.get("/", (req, res) => {
    const { check_in, check_out } = req.body;

    const sql = `SELECT *
        FROM rooms
        WHERE room_id NOT IN (
          SELECT room_id
          FROM bookings
          WHERE (check_in BETWEEN ? AND ?)
             OR (check_out BETWEEN ? AND ?)
             OR (check_in <= ? AND check_out >= ?)
        )`;

        const params = [check_in, check_out, check_in, check_out, check_in, check_out]

        db.query(sql, params, (err, results) => {
            if(err) {
                console.log('error', err);
                res.status(500).json({error: 'Internal Server Error'})
            } else {
                res.status(200).json(results);
            }
        } )
  });
} catch (error) {}
