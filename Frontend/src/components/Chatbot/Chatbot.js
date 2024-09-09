import React, { useState } from 'react';
import './Chatbot.css'; 
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const Chatbot = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    return (
        <div className="chatbot-wrapper">
            <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarVisible ? 'expanded' : 'full-width'}`}>
                <Navbar toggleMode={toggleMode} isDarkMode={isDarkMode} />
                <ChatArea isDarkMode={isDarkMode} />
            </div>
            <button className="show-sidebar-btn" onClick={toggleSidebar}>
                {isSidebarVisible ? '☰' : 'X'}
            </button>
        </div>
    );
};

export default Chatbot;

