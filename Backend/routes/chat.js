// routes/chatRoutes.js
const express = require('express');
const { saveChatHistory, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Store chat history
router.post('/save', protect, saveChatHistory);

// Retrieve chat history
router.get('/history', protect, getChatHistory);

module.exports = router;
