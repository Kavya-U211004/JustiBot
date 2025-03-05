const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysecretpassword",
    database: "chatbot_schema"
});

connection.connect(err => {
    if (err) {
        console.log(err) ;

    }
    console.log('MySQL Connected...');
});

module.exports = connection;
