const mysql = require('mysql');

connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_NDC,
    password: process.env.MYSQL_MDP,
    database: 'studysmart_bdd'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
