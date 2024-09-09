import React from 'react';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ toggleMode, isDarkMode }) => {
    return (
        <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="navbar-left">
                <h1>Justibot</h1>
            </div>
            <div className="navbar-right">
                <button className="profile-icon"><i className="fas fa-user"></i></button>
                <button className="toggle-mode-btn" onClick={toggleMode}>
                    <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
                <button className="share-icon"><i className="fas fa-share"></i></button>
            </div>
        </nav>
    );
};

export default Navbar;

