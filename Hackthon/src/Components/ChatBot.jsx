import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaChevronRight, FaPaperPlane, FaRocket, FaStar, FaGlobe } from 'react-icons/fa';
import '../Styles/chatbot.css';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Greetings, Earthling! ☀️";
    if (hour < 17) return "Good afternoon from the Galaxy! 🌤️";
    return "Mission Control here! Good evening. 🌙";
};

const KNOWLEDGE_BASE = [
    {
        keywords: ["navonmesh", "navonvesh", "what is"],
        answer: "Navonmesh is a premier technical symposium featuring four major quadrants:\n🚀 Srijan: Our flagship 24-hour Hackathon.\n🌱 Ankur: A grand Project Expo for innovative minds.\n📝 Udhbhav: National Level Paper Presentation Conference.\n🎯 Pursuit: High-impact technical workshops."
    },
    {
        keywords: ["srijan", "24 hr hackathon", "hackathon"],
        answer: "Srijan is our astronomical 24-hour Hackathon! It's a platform where innovators collide to build solutions for real-world problems. Expect intense competition, amazing mentors, and a chance to win from the 1 Lakh+ prize pool!"
    },
    {
        keywords: ["ankur", "project expo", "exhibition"],
        answer: "Ankur is our interstellar Project Expo! Showcase your engineering marvels to industry experts and a wide audience. It's the perfect stage to bring your academic projects to life."
    },
    {
        keywords: ["udhbhav", "paper", "conference", "presentation"],
        answer: "Udhbhav is a National Level Student Conference. It's an arena for research-oriented minds to publish and present papers in various engineering domains, fostering a culture of innovation and inquiry."
    },
    {
        keywords: ["pursuit", "workshop", "learn"],
        answer: "Pursuit offers specialized technical workshops in cutting-edge technologies. These sessions are led by experts and offered at highly affordable rates to help you upgrade your skill set."
    },
    {
        keywords: ["accommodation", "stay", "hotel", "hostel", "room"],
        answer: "Zero Gravity Accommodation! 🏠 We provide FREE stay for outstation participants. Just ensure you've checked the 'Accommodation Needed' box in your registration form."
    },
    {
        keywords: ["prize", "money", "reward", "win", "pool", "1lakh", "lakh"],
        answer: "The total prize pool for Navonmesh is over ₹1,00,000! 💰 Winners in different categories and events will take home significant rewards and certificates."
    },
    {
        keywords: ["registration", "apply", "form", "join", "link"],
        answer: "Launch your journey! 🚀 Join by clicking the 'Register' button on our Navigation Bar. Select your desired event (Srijan, Ankur, etc.) and complete the Google Form."
    },
    {
        keywords: ["contact", "help", "support", "organizer"],
        answer: "Need Mission Control? 📞 You can reach out to our event coordinators through the Contact section on the website, or just ask me anything about the events!"
    },
    {
        keywords: ["hi", "hello", "hey", "hola"],
        answer: "Hello explorer! 👋 I'm your Navonmesh Galactic Guide. What coordinates can I help you find today?"
    }
];

const SUGGESTIONS = [
    "Tell me about Srijan Hackathon",
    "What is the Prize Pool?",
    "How to Register?",
    "Tell me about Pursuit Workshops"
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: `${getGreeting()} I'm your Navonmesh Galactic Assistant. Ask me anything about our events, or pick a mission below!`,
            isGreeting: true
        }
    ]);
    const chatEndRef = useRef(null);

    // Draggable Logic
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startDrag = (clientX, clientY) => {
        setIsDragging(true);
        setHasMoved(false);
        dragStartPos.current = {
            startX: clientX,
            startY: clientY,
            initialX: position.x,
            initialY: position.y
        };
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        startDrag(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    };

    useEffect(() => {
        const onMove = (clientX, clientY) => {
            if (!isDragging) return;

            const dx = clientX - dragStartPos.current.startX;
            const dy = clientY - dragStartPos.current.startY;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                setHasMoved(true);
            }

            setPosition({
                x: dragStartPos.current.initialX + dx,
                y: dragStartPos.current.initialY + dy
            });
        };

        const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
        const handleTouchMove = (e) => {
            if (isDragging) {
                if (e.cancelable) e.preventDefault();
                onMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const stopDrag = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', stopDrag);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', stopDrag);
        };
    }, [isDragging]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => {
        if (hasMoved) return; // Don't toggle if we were dragging
        setIsOpen(!isOpen);
    };

    const handleSend = (text) => {
        const userQuery = text || input;
        if (!userQuery.trim()) return;

        const newMessages = [...messages, { type: 'user', text: userQuery }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            const botResponse = generateResponse(userQuery);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: botResponse.text,
                options: botResponse.options
            }]);
        }, 600);
    };

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // Check knowledge base
        let bestMatch = null;
        let maxKeywords = 0;

        for (const item of KNOWLEDGE_BASE) {
            const matches = item.keywords.filter(kw => lowerQuery.includes(kw)).length;
            if (matches > maxKeywords) {
                maxKeywords = matches;
                bestMatch = item.answer;
            }
        }

        if (bestMatch) {
            return { text: bestMatch };
        }

        // If no match found, show suggestions
        return {
            text: "I'm sorry, my sensors don't recognize that query. Would you like to know more about one of these?",
            options: [
                "About Srijan Hackathon",
                "Registration Process",
                "Prize Details"
            ]
        };
    };

    return (
        <div
            className={`chatbot-wrapper galactic-theme ${isDragging ? 'dragging' : ''} ${isOpen ? 'chat-is-open' : ''}`}
            style={{
                transform: (isOpen && isMobile) ? 'none' : `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'auto'
            }}
        >
            {/* Ambient background stars */}
            <div className="stars-container">
                <div className="star s1"></div>
                <div className="star s2"></div>
                <div className="star s3"></div>
            </div>

            {!isOpen && (
                <div
                    className="chatbot-trigger-group"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    <div className="chatbot-prompt-bubble">
                        <div className="prompt-content">
                            <span className="ai-badge">AI</span>
                            Mission Control: Online
                        </div>
                        <div className="prompt-sub">Ask the Universe anything...</div>
                        <div className="bubble-tail"></div>
                    </div>
                    <button
                        className="holographic-toggle"
                        onClick={toggleChat}
                        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                    >
                        <div className="orbit-ring"></div>
                        <div className="orbit-ring-alt"></div>
                        <div className="toggle-inner">
                            <FaRobot className="bot-icon-main" />
                            <div className="status-blip"></div>
                        </div>
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="chatbot-window glass-panel">
                    <div className="universe-background">
                        <div className="nebula-1"></div>
                        <div className="nebula-2"></div>
                        <div className="space-noise"></div>
                        <div className="radar-sweep"></div>
                        <div className="stars-layer-1"></div>
                        <div className="stars-layer-2"></div>
                    </div>

                    <div
                        className="chatbot-header holographic-header"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        style={{ cursor: 'grab' }}
                    >
                        <div className="bot-info-main">
                            <div className="header-avatar">
                                <FaRobot className="header-icon-ai" />
                                <div className="avatar-glow"></div>
                            </div>
                            <div className="header-text-main">
                                <div className="title-row">
                                    <h3>NAVONMESH-AI</h3>
                                    <span className="os-badge">v2.0</span>
                                </div>
                                <div className="status-row">
                                    <span className="transmitting-text">LINK ACTIVE</span>
                                    <span className="sector-tag">S7.GALAXA</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="header-close-btn"
                            onClick={toggleChat}
                            onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking close
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <React.Fragment key={i}>
                                <div className={`message-bubble ${msg.type} ${msg.isGreeting ? 'greeting' : ''}`}>
                                    {msg.text}
                                </div>
                                {msg.options && (
                                    <div className="bot-options">
                                        {msg.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                className="option-btn"
                                                onClick={() => handleSend(opt)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="chatbot-footer">
                        {messages.length < 3 && (
                            <div className="suggestions-scroll">
                                {SUGGESTIONS.map((sug, i) => (
                                    <button key={i} className="suggestion-chip" onClick={() => handleSend(sug)}>
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        )}
                        <form className="input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Ask the universe..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button type="submit" className="send-btn">
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
