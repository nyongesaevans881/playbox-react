import React from 'react';
import './genButton.css';

const Button = ({ to, text, showArrow, width, onClick, target="" }) => {
  let style = {
    width: width
  }

  return (
    <div className="button-container" style={style}>
      <a href={to} className="button" onClick={onClick} target={target}>
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
        {showArrow && <i className="fas fa-long-arrow-alt-right"></i>}
      </a>
    </div>
  );
};

export default Button;
