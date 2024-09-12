// routes/auth.js

const express = require('express');
const { signup, login , auth } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Register User
router.post('/signup', signup);

// Login User
router.post('/login', login);
router.get('/protected', verifyToken, auth);

module.exports = router;
