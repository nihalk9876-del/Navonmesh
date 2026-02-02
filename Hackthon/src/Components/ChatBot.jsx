import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaChevronRight, FaPaperPlane } from 'react-icons/fa';
import '../Styles/chatbot.css';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning my friend! ☀️";
    if (hour < 17) return "Good afternoon my friend! 🌤️";
    return "Good evening my friend! 🌙";
};

const KNOWLEDGE_BASE = [
    {
        keywords: ["navonmesh", "navonvesh", "what is"],
        answer: "Navonmesh is a technical event featuring: \n1) Srijan: 24-hour Hackathon \n2) Ankur: Project Expo \n3) Udhbhav: National Level Student Conference & Paper Publishing \n4) Pursuit: Technical Workshops at a very affordable price."
    },
    {
        keywords: ["srijan", "24 hr hackathon"],
        answer: "Srijan is our 24-hour Hackathon where innovation meets execution!"
    },
    {
        keywords: ["ankur", "project expo"],
        answer: "Ankur is our Project Expo where you can showcase your innovative engineering projects."
    },
    {
        keywords: ["udhbhav", "paper", "conference"],
        answer: "Udhbhav is a National Level Student Conference focused on paper publishing and technical research."
    },
    {
        keywords: ["pursuit", "workshop"],
        answer: "Pursuit offers high-quality technical workshops in various domains at a very affordable price."
    },
    {
        keywords: ["accomodation", "stay", "hotel", "hostel", "accommodation"],
        answer: "Accommodation is FREE for participants! However, participants must fill out the form present on the website properly."
    },
    {
        keywords: ["prize", "money", "reward", "win", "pool", "65k"],
        answer: "There will be a total 65K + prize pool! How exciting!"
    },
    {
        keywords: ["reg", "apply", "form", "step"],
        answer: "To register: Click 'Register' on the navbar, select your event, and fill the Google Form!"
    },
    {
        keywords: ["hi", "hello", "hey"],
        answer: "Hello! 👋 How can I help you with Navonmesh today?"
    }
];

const FAQ_SUGGESTIONS = [
    "What is Navonmesh?",
    "About Srijan Hackathon",
    "Accommodation Info",
    "Prize Pool",
    "Technical Workshops"
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: `${getGreeting()} I'm the Navonmesh Assistant. Type a question or select a topic below!` }
    ]);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (text) => {
        const userQuery = text || input;
        if (!userQuery.trim()) return;

        const newMessages = [...messages, { type: 'user', text: userQuery }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            const botResponse = generateResponse(userQuery);
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 600);
    };

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // Priority for Greetings and Prizes as requested
        if (lowerQuery.includes("prize") || lowerQuery.includes("money") || lowerQuery.includes("reward")) {
            return `${getGreeting()} THERE WILL BE TOTAL 65 K + PRIZE POOL.`;
        }

        // Logic for event mentions
        if (lowerQuery.includes("ankur") || lowerQuery.includes("pursuit") || lowerQuery.includes("srijan") || lowerQuery.includes("udhbhav") || lowerQuery.includes("udhhav")) {
            // Find specific match or use the generic description
            if (lowerQuery.includes("srijan")) return "Srijan is our 24-hour Hackathon where innovation meets execution!";
            if (lowerQuery.includes("ankur")) return "Ankur is our Project Expo where you can showcase your innovative engineering projects.";
            if (lowerQuery.includes("udhbhav") || lowerQuery.includes("udhhav")) return "Udhbhav is a National Level Student Conference focused on paper publishing and technical research.";
            if (lowerQuery.includes("pursuit")) return "Pursuit is the technical workshops; there will be many technical workshops in a very small price.";
        }

        // Standard knowledge base match
        let bestMatch = null;
        let maxKeywords = 0;

        for (const item of KNOWLEDGE_BASE) {
            const matches = item.keywords.filter(kw => lowerQuery.includes(kw)).length;
            if (matches > maxKeywords) {
                maxKeywords = matches;
                bestMatch = item.answer;
            }
        }

        return bestMatch || "I'm not quite sure. Try asking about Srijan, Ankur, Pursuit, or Prizes!";
    };

    return (
        <div className="chatbot-wrapper">
            {!isOpen && (
                <div className="chatbot-prompt">
                    Is there any doubt?
                    <div className="prompt-arrow"></div>
                </div>
            )}
            <button className={`chatbot-toggle ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
                {isOpen ? <FaTimes /> : <FaRobot />}
                <span className="pulse-ring"></span>
            </button>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="bot-info">
                            <FaRobot className="header-icon" />
                            <div>
                                <h3>Navonmesh Bot</h3>
                                <span>Online & Ready to Help</span>
                            </div>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="chatbot-footer">
                        <div className="suggestions-scroll">
                            {FAQ_SUGGESTIONS.map((sug, i) => (
                                <button key={i} className="suggestion-chip" onClick={() => handleSend(sug)}>
                                    {sug}
                                </button>
                            ))}
                        </div>
                        <form className="input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                            <input
                                type="text"
                                placeholder="Type your query..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit" className="send-btn">
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
