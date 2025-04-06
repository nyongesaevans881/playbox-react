import React from 'react';
import './footer.css';

//--- Image imports
const footerLogo = '/primary-logo.png'
import TestimonialFooterSlider from '../carousels/testimonialFooterSlider/TestimonialFooterSlider';

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={footerLogo} alt="playbox premier games supplier" />
          </div>
          <div className="footer-quote">
            <h3 className='uppercase'>Eat<span>.Game.</span>Repeat</h3>
          </div>
          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button className="subscribe-button">Subscribe</button>
          </div>
          <p className="footer-quote">Join the Playbox crew! Subscribe now and level up your inbox! Get all the <span>latest releases</span> & news.</p>
        </div>
        <div className="footer-center">
          <TestimonialFooterSlider />
        </div>
        <div className="footer-right">
          <h2 className="footer-title">We are Social</h2>
          <ul className="footer-links">
            <li>
              <a href="#" title='twitch'> <i className="fab fa-twitch"></i> </a>
            </li>
            <li>
              <a href="#" title='instagram'> <i className="fab fa-instagram"></i> </a>
            </li>
            <li>
              <a href="#" title='facebook'> <i className="fab fa-facebook"></i> </a>
            </li>
            <li>
              <a href="#" title='twitter'> <i className="fab fa-twitter"></i> </a>
            </li>
            <li>
              <a href="#" title='email'> <i className="fa fa-envelope-open-o"></i> </a>
            </li>
            <li>
              <a href="#" title='discord'> <i className="fab fa-discord"></i> </a>
            </li>
            <li>
              <a href="#" title='pinterest'> <i className="fab fa-pinterest"></i> </a>
            </li>
            <li>
              <a href="#" title='whatsapp'> <i className="fab fa-whatsapp"></i> </a>
            </li>
          </ul>
          <p className="footer-quote">Playbox is more than just a store, we are a <span>Community.</span> </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy;2024 All rights reserved Playbox | Privacy Policy | Support</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
