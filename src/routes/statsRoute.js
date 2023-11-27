const express = require('express');
const { statistics } = require('../controllers/statsController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticateUser);

router.route('/')
.get(statistics)

module.exports = router;