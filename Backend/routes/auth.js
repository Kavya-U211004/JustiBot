// routes/auth.js

const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Register User
router.post('/signup', signup);

// Login User
router.post('/login', login);

module.exports = router;
