import React from 'react';
import './blackBgHeader.css';
import Button49 from '../button49/Button49';

const BlackBgHeader = ({ title, spanText, searchBoxText, ButtonText, postTitle, button49To, button49Pic, button49Icon }) => {
  return (
    <div className="dark-header-container">
      <h1 className="dark-header">
        {title} <span className="gradient-text">{spanText}</span> {postTitle}
      </h1>
      <div className="dark-header-search-bar">
        <input type="text" placeholder={searchBoxText} />
        <i className="fa fa-search"></i>
      </div>
      <div className="dark-header-button">
        <Button49 text={ButtonText} FontAwsomeIcon={button49Icon} picIcon={button49Pic} to={button49To}/>
      </div>
    </div>
  );
};

export default BlackBgHeader;
