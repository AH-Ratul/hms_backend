const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paradise_inn'
});

// connect to mysql
db.connect((err) => {
    if(err) {
        console.error('mysql connection failed' + err.stack);
        return;
    }
    console.log('Connected to Mysql database');
})


module.exports = db;