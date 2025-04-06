"use client";

import React, { useState, useEffect } from 'react';
import './ScrollButtons.css'; // Import the CSS file for styling

const ScrollButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 200); // Show buttons only after scrolling 200px
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    const docHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: docHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && ( // Show buttons only when isVisible is true
      <div className="scroll-buttons-container">
        <button className="scroll-button top-button" onClick={scrollToTop}>
          <i className="fa fa-chevron-up"></i>
        </button>
        <button className="scroll-button bottom-button" onClick={scrollToBottom}>
          <i className="fa fa-chevron-down"></i>
        </button>
      </div>
    )
  );
};

export default ScrollButtons;
