import React, { useState, useEffect } from "react";
import "../Styles/hero.css"; // We'll add specific styles to hero.css

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date("March 23, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    return (
        <div className="countdown-container">
            <div className="countdown-item">
                <span className="count">{formatTime(timeLeft.days)}</span>
                <span className="label">Days</span>
            </div>
            <div className="separator">:</div>
            <div className="countdown-item">
                <span className="count">{formatTime(timeLeft.hours)}</span>
                <span className="label">Hours</span>
            </div>
            <div className="separator">:</div>
            <div className="countdown-item">
                <span className="count">{formatTime(timeLeft.minutes)}</span>
                <span className="label">Minutes</span>
            </div>
            <div className="separator">:</div>
            <div className="countdown-item">
                <span className="count">{formatTime(timeLeft.seconds)}</span>
                <span className="label">Seconds</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
