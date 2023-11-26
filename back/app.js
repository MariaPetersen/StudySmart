const express = require('express');
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");

const auth = require("./middleware/auth");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const publicationRoutes = require("./routes/publication");
const imagesRoutes = require('./routes/images');

const app = express();

app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(fileupload({ useTempFiles: true }));

app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/publications', publicationRoutes);
app.use('/images', imagesRoutes);

module.exports = app;