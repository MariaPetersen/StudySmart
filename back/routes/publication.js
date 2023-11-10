const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");

const publicationCtrl = require('../controllers/publication.js');

router.get('/:id', publicationCtrl.getOnePublication);
router.put('/:id', auth, publicationCtrl.updatePublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.get('/', publicationCtrl.getAllPublications);
router.post('/', auth, publicationCtrl.createPublication);

module.exports = router; 