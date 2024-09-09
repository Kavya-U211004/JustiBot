import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isVisible, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-header">
                <h2>Chat History</h2>
            </div>
            <ul className="chat-history">  
            <li><span className="timestamp"></span>03-09-2024, Today</li>
                <li><span className="timestamp">07:28 PM  </span> Department of Justice</li>
                <li></li>
                <li></li>

                <li><span className="timestamp"></span>18-08-2024, Friday</li>
                <li><span className="timestamp">06:00 PM  </span> Civil Rights</li>
                <li><span className="timestamp">06:14 PM  </span> Legal Business</li>
                <li><span className="timestamp">09:36 PM  </span> Financial Aids</li>
                <li></li>
                <li></li>

                <li><span className="timestamp"></span>15-08-2024, Wednesday</li>
                <li><span className="timestamp">10:00 AM  </span> POSCO Act</li>
                <li><span className="timestamp">10:01 AM  </span> Traffic Rules</li>                
            </ul>
            <button className="feedback-btn">
                <Link to="/feedback" style={{ textDecoration: 'none', color: 'white' }}>
                    Feel Free To Share Your Opinions
                </Link>
            </button>
        </div>
    );
};

export default Sidebar;
