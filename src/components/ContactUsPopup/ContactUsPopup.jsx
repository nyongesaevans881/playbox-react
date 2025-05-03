import { X, Instagram, Twitter, MessageCircle, Mail } from 'lucide-react';
import { FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import RefundPolicyPopup from '../../pages/policies/RefundPolicy';
import TermsPopup from '../../pages/policies/TermsofUse';
import PrivacyPopup from '../../pages/policies/PrivacyPolicy';
import { useState } from 'react';

const ContactUsPopup = ({ onClose }) => {

  //------- POLICIES 
  const [showRefundPopup, setShowRefundPopup] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const contacts = [
    {
      icon: <FaWhatsapp className="text-green-500" size={30} />,
      platform: "WhatsApp",
      title: "Sales Consultant",
      link: "whatsapp://send?phone=+254742503840"
    },
    {
      icon: <FaWhatsapp className="text-green-500" size={30} />,
      platform: "WhatsApp",
      title: "Playbox Support",
      link: "whatsapp://send?phone=+254742503840"
    },
    {
      icon: <Mail className="text-gray-600" size={30} />,
      platform: "Email",
      title: "info@playbox.co.ke",
      link: "mailto:info@playbox.co.ke"
    },
    {
      icon: <Instagram className="text-pink-500" size={30} />,
      platform: "Instagram",
      title: "@playbox_ke",
      link: "https://instagram.com/playbox_ke"
    },
    {
      icon: <FaXTwitter className="text-blue-500" size={30} />,
      platform: "X (Twitter)",
      title: "@playbox__ke",
      link: "https://twitter.com/playbox__ke"
    },
    {
      icon: <FaDiscord className="text-indigo-500" size={30} />,
      platform: "Discord",
      title: "Playbox Support",
      link: "https://discord.gg/playbox_ke"
    }
  ];


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-9999 flex items-center justify-center max-md:px-6">
      <div className="bg-white p-6 w-full max-w-md relative shadow-lg  rounded-xs">
        <button onClick={onClose} className="absolute top-6 right-6 hover:text-red-500 cursor-pointer">
          <X size={25} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

        <ul className="space-y-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              // target="_blank"
              // rel="noopener noreferrer"
              className="block"
            >
              <li className="flex items-center gap-4 cursor-pointer border-b border-gray-200 pb-2 hover:bg-gray-100 px-2 py-1 rounded-xs transition">
                <div>{contact.icon}</div>
                <div>
                  <div className="font-medium">{contact.platform}</div>
                  <div className="text-sm text-gray-500">{contact.title}</div>
                </div>
              </li>
            </a>
          ))}
        </ul>


        <div className="mt-6 border-t border-gray-300 pt-3 text-xs text-center text-gray-500 space-x-4">
          <button className="cursor-pointer hover:underline hover:text-secondary" onClick={() => setShowTerms(true)}>T&Cs</button>
          <button className="cursor-pointer hover:underline hover:text-secondary" onClick={() => setShowRefundPopup(true)}>Return Policy</button>
          <button className="cursor-pointer hover:underline hover:text-secondary" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>
        </div>
      </div>
      {showRefundPopup && <RefundPolicyPopup onClose={() => setShowRefundPopup(false)} />}
      {showTerms && <TermsPopup onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPopup onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default ContactUsPopup;
