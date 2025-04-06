import React from 'react';
import './PcSetUpComponent.css'; // Separate CSS file

const PcSetUpComponent = () => {
    return (
        <div className="pc-setup-map">
            <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743931546/pcSetup_j4gg9a.png" loading='lazy' alt="PC Setup" className="pc-setup-image" />
            <div className="icon monitor-icon" title="Dell Monitor: Dual 24' 4K UHD">
                <i className="fa fa-desktop"></i>
            </div>
            <div className="icon keyboard-icon" title="RGB Mechanical Keyboard: Perfect for gaming">
                <i className="fa fa-keyboard"></i>
            </div>
            <div className="icon mouse-icon" title="Gaming Mouse: Ultra-responsive, RGB lighting">
                <i className="fa fa-mouse-pointer"></i>
            </div>
            <div className="icon speaker-icon" title="High-quality Speaker: Immersive sound experience">
                <i className="fa fa-volume-up"></i>
            </div>
            <div className="icon pc-icon" title="Gaming PC: Powerhouse with Nvidia GeForce RTX">
                <i className="fa fa-gamepad"></i>
            </div>
        </div>
    );
};

export default PcSetUpComponent;
