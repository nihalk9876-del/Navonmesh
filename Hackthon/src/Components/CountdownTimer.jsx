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
            {Object.entries(timeLeft).map(([interval, value]) => (
                <div className="countdown-planet" key={interval}>
                    {/* Orbit Ring */}
                    <div className="orbit-ring">
                        <div className="orbit-dot"></div>
                    </div>

                    {/* Planet Body */}
                    <div className={`planet-body ${interval}`}>
                        <span className="count">{formatTime(value)}</span>
                        <span className="label capitalize">{interval}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
