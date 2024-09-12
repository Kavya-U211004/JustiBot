const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const connection = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const feedbackRoutes = require('./routes/feedback');
const { protect } = require('./middleware/auth');
// const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const sessionStore = new MySQLStore({
    expiration: 24 * 60 * 60 * 1000, 
    createDatabaseTable: true, 
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

app.use(session({
    key: 'session_cookie_name', 
    secret: process.env.SESSION_SECRET, 
    store: sessionStore,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

app.get('/', (req, res) => {
    // Access or modify session data
    if (req.session.visits) {
        req.session.visits++;
    } else {
        req.session.visits = 1;
    }
    res.send(`Number of visits: ${req.session.visits}`);
});

// Use CORS middleware
app.use(cors());


// Middleware to parse JSON
app.use(express.json());
// app.use(bodyParser.json()); // For parsing application/json

// Routes
app.use('/api', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); // Protect chat routes

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
