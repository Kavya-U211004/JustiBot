// routes/chatRoutes.js
const express = require('express');
const { saveChatHistory, getChatHistory } = require('../controllers/chatController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Store chat history
router.post('/save', verifyToken, saveChatHistory);

// Retrieve chat history
router.get('/history', verifyToken, getChatHistory);

module.exports = router;
