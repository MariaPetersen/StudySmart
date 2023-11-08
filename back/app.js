const express = require('express');
const mysql = require('mysql');
const dotenv = require("dotenv");

const app = express();

app.use(express.json());

dotenv.config();

const database = (module.exports = () => {
    try {
        connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_NDC,
            password: process.env.MYSQL_MDP,
            database: 'studysmart_bdd'
        });
        connection.connect();
        console.log('Connexion à MySQL réussie !');
    } catch (error) {
        console.log(error);
        console.log('Connexion à MySQL échouée !');
    }
});
database();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/', (req, res, next) => {
    res.send('Hello world');
});

module.exports = app;