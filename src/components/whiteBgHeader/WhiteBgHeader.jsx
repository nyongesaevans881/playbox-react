"use client";

import React from 'react';
import './whiteBgHeader.css';

const WhiteBgHeader = ({ title, spanText }) => {
  return (
    <div className="light-header-container">
      <h1 className="light-header">
      {title}<span className="gradient-text">{spanText}</span>
      </h1>
    </div>
  );
};

export default WhiteBgHeader;
