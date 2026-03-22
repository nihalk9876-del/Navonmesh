import React, { useState } from "react";
import "../Styles/faqs.css";

const faqData = [
    {
        question: "How do I register for the hackathon?",
        answer: "You can register by clicking the 'Register' button on the navigation bar. Fill out the form with your team details to secure your spot.",
    },
    {
        question: "Is there a registration fee?",
        answer: "No, participation in Shrujan Hackathon is completely free for all students.",
    },
    {
        question: "What is the team size?",
        answer: "Teams can consist of 2 to 4 members. You can also participate individually and form a team at the venue, though pre-formed teams are recommended.",
    },
    {
        question: "Can I participate if I'm a beginner?",
        answer: "Absolutely! The hackathon is open to students of all skill levels. We will have mentors available to guide you throughout the event.",
    },
    {
        question: "What should I bring to the venue?",
        answer: "Bring your laptops, chargers, IDs, and any hardware you might need for your project. Food and refreshments will be provided.",
    },
    {
        question: "Is accommodation provided?",
        answer: "Yes, accommodation will be provided for outstation participants. Please check the 'Conference' or 'Accommodation' section for more details.",
    },
];

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faqs-container">
            <h1 className="faqs-title">Frequently Asked Questions</h1>

            <div className="faq-list">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? "active" : ""}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            {item.question}
                            <span className="faq-icon">
                                {activeIndex === index ? "−" : "+"}
                            </span>
                        </div>
                        <div className="faq-answer">{item.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
