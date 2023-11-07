const express = require('express');
const { reDirectToOrignalUrl } = require('../controllers/urlSchema.controller')

const router = express.Router();

router.route('/:id')
.get(reDirectToOrignalUrl)

module.exports = router;