import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "../Styles/hero.css";

const CountdownTimer = () => {
    const targetDate = new Date("March 23, 2026 00:00:00").getTime();
    const celebrationEndDate = targetDate + (24 * 60 * 60 * 1000); // 1 day after

    const calculateTimeLeft = () => {
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

        return { timeLeft, isCelebration: now >= targetDate && now < celebrationEndDate };
    };

    const [{ timeLeft, isCelebration, isTestingCelebration }, setCountdownState] = useState({
        ...calculateTimeLeft(),
        isTestingCelebration: true // Show celebration immediately on load
    });

    useEffect(() => {
        // Stop testing celebration after 5 seconds
        const testTimer = setTimeout(() => {
            setCountdownState(prev => ({ ...prev, isTestingCelebration: false }));
        }, 5000);

        const timer = setInterval(() => {
            const state = calculateTimeLeft();
            setCountdownState(prev => ({ 
                ...state, 
                isTestingCelebration: prev.isTestingCelebration 
            }));

            // Trigger confetti during celebration OR during initial test burst
            if ((state.isCelebration || isTestingCelebration) && Math.random() < (isTestingCelebration ? 0.3 : 0.1)) {
                confetti({
                    particleCount: isTestingCelebration ? 80 : 50,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#00e5ff', '#ffffff', '#ffcc00', '#ff4d4d']
                });
            }
        }, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(testTimer);
        };
    }, [isTestingCelebration]);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    if (isCelebration || isTestingCelebration) {
        return (
            <div className={`celebration-banner ${isTestingCelebration ? 'test-burst' : ''}`}>
                <div className="celebration-glow"></div>
                <h2 className="celebration-text">THE EVENT HAS BEGUN! 🚀</h2>
                <div className="celebration-subtext">Navonmesh 2026 Celebration</div>
            </div>
        );
    }


    return (
        <div className="countdown-container">
            {Object.entries(timeLeft).map(([interval, value]) => (
                <div className="countdown-planet" key={interval}>
                    <div className="orbit-ring">
                        <div className="orbit-dot"></div>
                    </div>

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

