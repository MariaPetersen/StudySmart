const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");

const profileCtrl = require('../controllers/profile.js');

router.get('/:id', auth, profileCtrl.getOneProfile);
router.put('/:id', auth, profileCtrl.updateProfile);
router.delete('/:id', auth, profileCtrl.deleteProfile);
router.post('/', auth, profileCtrl.createProfile);

module.exports = router; 