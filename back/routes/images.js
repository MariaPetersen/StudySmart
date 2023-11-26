const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");
const imagesCtrl = require("./../controllers/images");

router.delete('/:id', auth, imagesCtrl.deleteImage);
router.post('/', auth, imagesCtrl.uploadImage);

module.exports = router; 