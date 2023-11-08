const express = require('express');
const dotenv = require("dotenv");
const db = require('./db');

const app = express();

app.use(express.json());

dotenv.config();

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