import React, { useState, useEffect, useRef } from 'react';
import './ChatArea.css';

const ChatArea = ({ isDarkMode }) => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! How can I assist you?' }
    ]);

    const [input, setInput] = useState('');
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [recognition, setRecognition] = useState(null);
    const [loading , setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log(files);
    };

    const chatListRef = useRef(null);

    const languages = {
        English: 'en',
        हिन्दी: 'hi',
        বাংলা: 'bn',
        తెలుగు: 'te',
        मराठी: 'mr',
        தமிழ்: 'ta',
        ગુજરાતી: 'gu',
        اردو: 'ur',
        ಕನ್ನಡ: 'kn',
        മലയാളം: 'ml',
        ଓଡ଼ିଆ: 'or'
    };

    const questionResponseMap = {
        'what is your name': 'My name is Justibot. I am here to clear all your doubts regarding Department of Justice.',
        'how are you': 'I am fine. What about you?',
        'न्याय विभाग के कार्य क्या हैं?':'न्याय विभाग न्यायपालिका के लिए बुनियादी सुविधाओं के विकास, विशेष अदालतों की स्थापना, ई - कोर्ट परियोजना, कानूनी सहायता, न्यायिक प्रशिक्षण के लिए वित्तीय सहायता आदि के लिए महत्वपूर्ण योजनाओं को लागू करता है।',
        'functions of depertment of justice': 'The Department of Justice implements important schemes for the development of infrastructure facilities for judiciary, setting up special courts, eCourts project, legal aid, financial assistance for judicial training, and more.',
        'what is njdg': 'The National Judicial Data Grid (NJDG) is an online platform that provides data on case pendency and case management across Indian courts.',
        'how can i learn about the various divisions of doj': 'The Department of Justice (DoJ) of India is divided into several divisions, including the Division of Legal Affairs, which handles legal matters and legislation, and the Division of Justice, which focuses on the administration of justice and judicial reforms. These divisions work together to implement policies and schemes related to judiciary infrastructure and legal aid.',
        'how many judges are appointed at the supreme court': 'You can find the current number of judges appointed at the Supreme Court on the official website or through the National Judicial Data Grid (NJDG).',
        'what are the current vacancies in high courts': 'Current vacancies in High Courts can be found on the National Judicial Data Grid (NJDG) or by contacting the respective High Court.',
        'how can i check the pendency of cases through njdg': 'You can check the pendency of cases by accessing the National Judicial Data Grid (NJDG) on their official website.',
        'what is the procedure to pay a fine for a traffic violation': 'To pay a fine for a traffic violation, you can visit the respective state transport authority’s website or the ePay portal for online payment options.',
        'how can i access live streaming of court cases': 'Live streaming of court cases can be accessed through the official eCourts website or mobile app.',
        'what are the steps for efiling and epay': 'Steps for eFiling and ePay can be found on the eCourts website under the eFiling section or by contacting the court’s administrative office.',
        'what is a fast track court': 'A Fast Track Court is a special court designed for the speedy trial and disposal of sensitive cases such as rape and cases under the POCSO Act.',
        'how can i download the ecourts services mobile app': 'The eCourts Services Mobile app can be downloaded from the Google Play Store or Apple App Store by searching for "eCourts Services".',
        'what are tele law services': 'Tele Law Services provide legal consultation through telephone or online platforms for individuals who cannot access legal services easily.',
        'how can i check the current status of my case': 'To check the current status of your case, you can use the eCourts website or mobile app by entering your case number.',
        'how do i find out the number of judges at district and subordinate courts': 'The number of judges at District & Subordinate Courts can be found through the National Judicial Data Grid (NJDG) or by contacting the respective court.',
        'what is the role of the national judicial academy': 'The National Judicial Academy provides training to judicial officers to enhance their skills and knowledge.',
        'how can i get financial assistance for judicial training': 'You can get financial assistance for judicial training by contacting the Department of Justice or the National Judicial Academy.',
        'what is the ecourts project': 'The eCourts Project aims to computerize various courts across the country to improve the efficiency of the judicial system.',
        'how can i access legal aid services': 'Legal aid services can be accessed through the Department of Justice’s official website or by contacting local legal aid offices.',
        'what are the benefits of the ecourts services mobile app': 'The eCourts Services Mobile app provides access to court case information, live streaming, and other judicial services on your mobile device.',
        'how does the fast track court system work': 'The Fast Track Court system prioritizes and expedites the trial of sensitive and urgent cases to ensure timely justice.',
        'where can i find information about the department of justice’s schemes': 'Information about the Department of Justice’s schemes can be found on their official website or by contacting their office directly.',
        'how can i contact the department of justice for more information': 'You can contact the Department of Justice through their official website or by reaching out to their contact numbers provided on the site.',
        'what is posco act': 'The Protection of Children from Sexual Offences (POCSO) Act is a law designed to protect children from sexual abuse, exploitation, and harassment. It provides a legal framework for the effective implementation of child protection measures.',
        'how can i file a case under the posco act': 'To file a case under the POCSO Act, you can approach the local police station or a child protection officer who will guide you through the process of filing a complaint and initiating legal proceedings.',
        'what are the recent updates or changes to the posco act': 'Recent updates or changes to the POCSO Act can be found on the official Department of Justice website or by consulting with a legal expert for the latest amendments and legal provisions.'
    };

    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'en-US';
            recognitionInstance.interimResults = false;
            recognitionInstance.maxAlternatives = 1;
            recognitionInstance.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                handleSendMessageFromVoice(transcript);
            };
            recognitionInstance.onerror = (error) => {
                console.error('Speech recognition error:', error);
            };
            setRecognition(recognitionInstance);
        } else {
            console.warn('SpeechRecognition is not supported in this browser.');
        }
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };


    const handleSendMessage = async () => {
        setInput('');
        if (input.trim() !== '') {
            const userMessage = { type: 'user', text: input };
            setMessages([...messages, userMessage]);
            

            try {
                // Send the user input to the backend
                setLoading(true);
                const response = await fetch('https://2a5c-34-45-56-83.ngrok-free.app/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input.trim() }),
                });

                const data = await response.json();
                const botResponse = { type: 'bot', text: data.response };
                console.log(data.response);
                 // Assumes response is in data.response

                setMessages([...messages, userMessage, botResponse]);
                setLoading(false);
                

                // Optionally speak the response
                const utterance = new SpeechSynthesisUtterance(data.response);
                window.speechSynthesis.speak(utterance);
            } catch (error) {
                console.error('Error fetching response:', error);
                const botResponse = { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
                setMessages([...messages, userMessage, botResponse]);
            }

            
        }
    };

    const handleSendMessageFromVoice = async (text) => {
        const userMessage = { type: 'user', text };
        setMessages([...messages, userMessage]);

        try {
            // Send the recognized text to the backend
            const response = await fetch('/your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim(), language: selectedLanguage }),
            });

            const data = await response.json();
            const botResponse = { type: 'bot', text: data.response };

            setMessages([...messages, userMessage, botResponse]);

            // Optionally speak the response
            const utterance = new SpeechSynthesisUtterance(data.response);
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error fetching response:', error);
            const botResponse = { type: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
            setMessages([...messages, userMessage, botResponse]);
        }
    };

    // const handleSendMessage = async () => {
    //     if (input.trim() !== '') {
    //         const userMessage = { type: 'user', text: input };
    //         setMessages([...messages, userMessage]);

    //         const botResponseText = questionResponseMap[input.trim()] || 'Sorry, I do not understand that question. Please try asking something else.';
    //         const translatedBotResponseText = await translateText(botResponseText, selectedLanguage);
    //         const botResponse = { type: 'bot', text: translatedBotResponseText };
    //         setMessages([...messages, userMessage, botResponse]);

    //         const utterance = new SpeechSynthesisUtterance(translatedBotResponseText);
    //         window.speechSynthesis.speak(utterance);

    //         setInput('');
    //     }
    // };

    // const handleSendMessageFromVoice = async (text) => {
    //     const userMessage = { type: 'user', text };
    //     setMessages([...messages, userMessage]);

    //     const botResponseText = questionResponseMap[text.trim()] || 'Sorry, I do not understand that question. Please try asking something else.';
    //     const translatedBotResponseText = await translateText(botResponseText, selectedLanguage);
    //     const botResponse = { type: 'bot', text: translatedBotResponseText };
    //     setMessages([...messages, userMessage, botResponse]);

    //     const utterance = new SpeechSynthesisUtterance(translatedBotResponseText);
    //     window.speechSynthesis.speak(utterance);
    // };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const toggleLanguageOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(languages[lang]);
        setShowLanguageOptions(false);
    };

    const translateText = async (text, language) => {
        if (language === 'en') return text;
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`);
            const data = await response.json();
            return data.responseData.translatedText;
        } catch (error) {
            console.error('Error translating text:', error);
            return text;
        }
    };

    const handleVoiceInput = () => {
        if (recognition) {
            recognition.start();
        }
    };

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    }, [messages]);

    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    const handleScroll = () => {
        const chatListElement = chatListRef.current;
        if (chatListElement) {
            const isAtBottom = chatListElement.scrollHeight - chatListElement.scrollTop === chatListElement.clientHeight;
            setIsScrolledToBottom(isAtBottom);
        }
    };

    return (
        <div className={`chat-area ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="chat-list" ref={chatListRef} onScroll={handleScroll}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="icon-container">
                    <button className="attachment-icon" onClick={handleButtonClick}>
                        <i className="fas fa-paperclip"></i>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <button className="voice-icon" onClick={handleVoiceInput}>
                        <i className="fas fa-microphone"></i>
                    </button>
                    <button className="translate-icon" onClick={toggleLanguageOptions}>
                        <i className="fas fa-globe"></i>
                    </button>
                    <button className="send-icon" onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
                {showLanguageOptions && (
                    <div className="language-options">
                        {Object.keys(languages).map((lang) => (
                            <button key={lang} onClick={() => handleLanguageChange(lang)}>
                                {lang}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatArea;

