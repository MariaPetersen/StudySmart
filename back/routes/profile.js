const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");

const profileCtrl = require('../controllers/profile.js');

router.post('/', auth, profileCtrl.createProfile);

module.exports = router; 