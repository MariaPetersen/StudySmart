const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_NDC,
    password: process.env.MYSQL_MDP,
    database: 'studysmart_bdd',
    connectTimeout: 60000
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
