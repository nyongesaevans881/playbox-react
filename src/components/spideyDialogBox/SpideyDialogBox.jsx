"use client";

import React from 'react';
import PropTypes from 'prop-types';
import './SpideyDialogBox.css';

const SpideyDialogBox = ({ imageSrc, text }) => {
  return (
    <div className="spidey-dialog-box">
      {imageSrc && <img src={imageSrc} alt="Spidey Dialog" loading='lazy' />}
      <p dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  );
};

SpideyDialogBox.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SpideyDialogBox;
