const express = require('express');
const { login } = require('../controllers/loginController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authenticateUser);

router.route('/')
.post(login)

module.exports = router;