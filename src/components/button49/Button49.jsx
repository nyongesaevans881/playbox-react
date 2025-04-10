import React from 'react'
import './button49.css'

const Button49 = ({ text, FontAwsomeIcon, picIcon, to }) => {
  return (
    <button className='button-49-wrapper'>
      <img className='button-49-rotated' src="icons/arrows-white.png" alt="" />
      <a className="button-49" role="button" href={to}>
        {text}
        {picIcon && <img src={picIcon} />}
        {FontAwsomeIcon && <i className={FontAwsomeIcon}></i>}
      </a>
      <img className='button-49-right-img' src="icons/arrows-white.png" alt="" />
    </button>

  )
}

export default Button49