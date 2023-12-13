const express = require('express');
const router = express.Router();

const { Create, Show } = require('../controllers/UrlPairController');

router.get('/:slug', Show);
router.post('/', Create);

module.exports = router;
