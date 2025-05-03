import React, { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import ContactUsPopup from "../ContactUsPopup/ContactUsPopup";

const ContactSidebar = () => {
    const [showContactPopup, setShowContactPopup] = useState(false);

    const handleOpenPopup = () => setShowContactPopup(true);
    const handleClosePopup = () => setShowContactPopup(false);

    return (
        <>
            <div
                className="fixed bg-primary z-9999 right-0 top-[53%] w-11 h-11 text-white flex items-center justify-center cursor-pointer rounded-xs"
                onClick={handleOpenPopup}
            >
                <FaPhone size={20} />
            </div>
            {showContactPopup && <ContactUsPopup onClose={handleClosePopup} />}
        </>
    );
};

export default ContactSidebar;