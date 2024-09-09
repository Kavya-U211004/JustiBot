import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {

  // useEffect(() => {
  //   const bubbleCount = 8; // Number of bubbles you want
  //   const container = document.querySelector('.homepage');
    
  //   for (let i = 0; i < bubbleCount; i++) {
  //     const bubble = document.createElement('div');
  //     bubble.className = `bubble bubble${i}`;
  //     bubble.style.width = `${Math.random() * 50 + 50}px`; // Random width between 50px and 100px
  //     bubble.style.height = `${Math.random() * 50 + 50}px`; // Random height between 50px and 100px
  //     bubble.style.top = `${Math.random() * 100}vh`; // Random top position
  //     bubble.style.left = `${Math.random() * 100}vw`; // Random left position
  //     bubble.style.animation = `bubble ${Math.random() * 5 + 5}s infinite`; // Random animation duration
  //     container.appendChild(bubble);
  //   }
  // }, []);

  return (
    <div className="homepage">
      <div className="header">Justibot</div>
      <div className="container">
        <div className="buttons">
          <Link to="/login" className="button">Login</Link>
          <Link to="/signup" className="button">Signup</Link>
        </div>
        <div className="description">
          <p>AI-based interactive Chatbot or virtual assistant for the Department of Justice’s Website.</p>
          <div className="features">
            <h3>Features:</h3>
            <ul>
              <li>Multilingual support</li>
              <li>Voice assistance</li>
              <li>Chat by uploading files and images</li>
              <li>History of chats</li>
              <li>Suggestion queries</li>
              <li>Response read aloud</li>
              <li>Share your personalised chats and give feedbacks</li>
            </ul>
          </div>
        </div>
      </div>
           
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble6"></div>
      <div className="bubble bubble7"></div>
      <div className="bubble bubble8"></div>
      <div className="bubble bubble9"></div>
      <div className="bubble bubble10"></div>
      <div className="bubble bubble11"></div>
      <div className="bubble bubble12"></div>
      <div className="bubble bubble13"></div>
      <div className="bubble bubble14"></div>
      <div className="bubble bubble15"></div>
    </div>
  );
}

export default HomePage;
