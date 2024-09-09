// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error registering user' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching user' });
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Store token in the database
            const updateSql = 'UPDATE users SET token = ? WHERE id = ?';
            db.query(updateSql, [token, user.id], (err) => {
                if (err) return res.status(500).json({ message: 'Error storing token in the database' });

                res.json({ token });
            });
        });
    });
};


exports.logout = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Clear token from the database
    const sql = 'UPDATE users SET token = NULL WHERE token = ?';
    db.query(sql, [token], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error clearing token from the database' });
        }

        res.json({ message: 'Logged out successfully' });
    });
};