const mysql = require("mysql");

// database 1
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paradise_inn",
});

// database 2
const db2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paradise_inn2",
});

// connect to mysql db1
db.connect((err) => {
  if (err) {
    console.error("mysql connection failed" + err.stack);
    return;
  }
  console.log("Connected to Mysql database");
});

// connect to mysql db2
db2.connect((err) => {
  if (err) {
    console.error("mysql connection failed" + err.stack);
    return;
  }
  console.log("Connected to Mysql database-2");
});

module.exports = { db, db2 };
