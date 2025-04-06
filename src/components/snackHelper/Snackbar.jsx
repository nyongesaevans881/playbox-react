"use client";

import React, { useEffect, useState } from 'react';
import './Snackbar.css';

const Snackbar = ({ type, message, onClose, displayTime }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose(); // Call the onClose callback to clean up
        }, displayTime); // Adjust the duration (3 seconds)

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className={`snackbar ${type}`}>
            <img src={type === 'success' ? '/Icons/success.png' : '/Icons/error.png'} alt="icon" className="snackbar-icon" />
            <span>{message}</span>
        </div>
    );
};

export default Snackbar;
