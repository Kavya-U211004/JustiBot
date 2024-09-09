import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css'; 

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback', { email, feedback });
            setMessage(response.data.message);
            setFeedback('');
            setEmail('');
        } catch (error) {
            // console.error('Error sending feedback:', error.response ? error.response.data : error.messageerror);
            setMessage('Failed to send feedback.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Share Your Feedback</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Your Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                />
                <button type="submit">Send Feedback</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Feedback;
