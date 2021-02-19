const express = require('express');
const router = express.Router();
const { login, register } = require('../../controllers/authController');
const auth = require('../../middlewares/auth');

router.post('/login', login);
router.post('/register', auth, register);

module.exports = router;
