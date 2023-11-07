const express = require('express');
const { createShortUrl, fetchUrls, reDirectToOrignalUrl } = require('../controllers/urlSchema.controller')

const router = express.Router();

router.route('/')
.get(fetchUrls)
.post(createShortUrl)

router.route('/:id')
.get(reDirectToOrignalUrl)

module.exports = router;