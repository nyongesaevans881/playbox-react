import React from 'react';
import { FaWhatsapp, FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { Mail, Instagram } from 'lucide-react';

// Import React (if using React < 17)

// Import icons

// ContactSidebar Component
const ContactSidebar = () => {
  const contacts = [
    {
      icon: <FaWhatsapp className="text-green-500" size={24} />,
      platform: "WhatsApp",
      title: "Sales Consultant",
      link: "whatsapp://send?phone=+254742503840"
    },
    {
      icon: <FaWhatsapp className="text-green-500" size={24} />,
      platform: "WhatsApp",
      title: "Playbox Support",
      link: "whatsapp://send?phone=+254742503840"
    },
    {
      icon: <Mail className="text-gray-600" size={24} />,
      platform: "Email",
      title: "info@playbox.co.ke",
      link: "mailto:info@playbox.co.ke"
    },
    {
      icon: <Instagram className="text-pink-500" size={24} />,
      platform: "Instagram",
      title: "@playbox_ke",
      link: "https://instagram.com/playbox_ke"
    },
    {
      icon: <FaXTwitter className="text-black" size={24} />,
      platform: "X (Twitter)",
      title: "@playbox__ke",
      link: "https://twitter.com/playbox__ke"
    },
    {
      icon: <FaDiscord className="text-indigo-500" size={24} />,
      platform: "Discord",
      title: "Playbox Support",
      link: "https://discord.gg/playbox_ke"
    }
  ];

  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-dark">Contact Us</h2>
      
      <ul className="space-y-3">
        {contacts.map((contact, index) => (
          <li key={index}>
            <a 
              href={contact.link}
              className="flex items-center gap-3 cursor-pointer border-b border-gray-200 pb-2 hover:bg-gray-100 px-2 py-1 transition"
            >
              <div>{contact.icon}</div>
              <div>
                <div className="font-medium">{contact.platform}</div>
                <div className="text-sm text-gray-500">{contact.title}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-gray-300 pt-3 text-xs text-center text-gray-500 space-x-4">
        <a href="/terms-of-use" className="hover:underline hover:text-secondary">T&Cs</a>
        <a href="/refund-policy" className="hover:underline hover:text-secondary">Return Policy</a>
        <a href="/privacy-policy" className="hover:underline hover:text-secondary">Privacy Policy</a>
      </div>
    </div>
  );
};

// Export the component
export default ContactSidebar;