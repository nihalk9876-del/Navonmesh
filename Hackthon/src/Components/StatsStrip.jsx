import "../styles/stats.css";

import React, { useEffect, useState, useRef } from "react";
import "../styles/stats.css";

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth stop
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef} className="stat-value">
      {count}{suffix}
    </span>
  );
};

const StatsStrip = () => {
  return (
    <section className="stats-strip">
      <div className="stat-item">
        {/* Special case for currency since it needs prefix */}
        <span className="stat-value-wrapper">
          <span className="currency-symbol">₹</span>
          <AnimatedCounter end={65} suffix="K+" />
        </span>
        <span className="stat-label">Prize Pool</span>
      </div>

      <div className="stat-item">
        <AnimatedCounter end={100} suffix="+" />
        <span className="stat-label">Projects</span>
      </div>

      <div className="stat-item">
        <AnimatedCounter end={24} />
        <span className="stat-label">Hours</span>
      </div>

      <div className="stat-item">
        <AnimatedCounter end={500} suffix="+" />
        <span className="stat-label">Participants</span>
      </div>
    </section>
  );
};

export default StatsStrip;
