// controllers/chatController.js
const db = require('../config/db');

// Store chat history
exports.saveChatHistory = (req, res) => {
    const { user_query, bot_response } = req.body;
    const user_id = req.user.id;

    const sql = 'INSERT INTO chat_history (user_id, user_query, bot_response) VALUES (?, ?, ?)';
    db.query(sql, [user_id, user_query, bot_response], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving chat history' });
        }
        res.status(201).json({ message: 'Chat history saved' });
    });
};

// Retrieve chat history
exports.getChatHistory = (req, res) => {
    const user_id = req.user.id;

    const sql = 'SELECT * FROM chat_history WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving chat history' });
        }
        res.json(results);
    });
};
