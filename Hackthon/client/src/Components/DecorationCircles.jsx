import React from "react";
import "../Styles/decorationCircles.css";

const DecorationCircles = ({ position = "right" }) => {
    return (
        <div className={`decoration-circles-container decoration-${position}`}>
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-circle circle-3"></div>
            <div className="decoration-circle circle-4"></div>
            <div className="decoration-circle circle-5"></div>
            <div className="decoration-circle circle-6"></div>
            <div className="decoration-circle circle-7"></div>
            <div className="decoration-circle circle-8"></div>
        </div>
    );
};

export default DecorationCircles;
