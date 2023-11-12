const express = require('express');
const dotenv = require("dotenv");

const auth = require("./middleware/auth");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const publicationRoutes = require("./routes/publication");

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
    res.send("StudySmart");
});
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/publications', publicationRoutes);

module.exports = app;