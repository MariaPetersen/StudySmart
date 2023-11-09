const express = require('express');
const router = express.Router();
const dotenv = require("dotenv");
const db = require("./../services/db");
dotenv.config;

const userCtrl = require('../controllers/user.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; 