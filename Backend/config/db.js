const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pragacr7",
    database: "chatbot_schema"
});

connection.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = connection;
