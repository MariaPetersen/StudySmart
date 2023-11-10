const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");

const publicationCtrl = require('../controllers/publication.js');

router.post('/', publicationCtrl.createPublication);

module.exports = router; 