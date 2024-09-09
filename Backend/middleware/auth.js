// middleware/auth.js

const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.protect = (req, res, next) => {
    // Extract token from headers
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
        ? req.headers.authorization.split(' ')[1] 
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token exists for the user in the database
        const sql = 'SELECT * FROM users WHERE id = ? AND token = ?';
        db.query(sql, [decoded.id, token], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }

            // Add user to request object
            req.user = results[0];
            next();
        });
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
