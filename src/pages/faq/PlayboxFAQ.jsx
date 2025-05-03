import React, { useState } from 'react';
import { Truck, Package, Clock, RefreshCw, Phone, ShieldAlert, CreditCard, MapPin, X, Instagram, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import FAQItem from './components/FAQItem';
import ContactSidebar from './components/FAQContactSidebar';
import ContactUsPopup from '../../components/ContactUsPopup/ContactUsPopup';


// Main Component
export default function PlayboxFAQ() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleOpenPopup = () => setShowContactPopup(true);
  const handleClosePopup = () => setShowContactPopup(false);

  const categories = [
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'delivery', name: 'Delivery', icon: Truck },
    { id: 'returns', name: 'Returns & Warranty', icon: RefreshCw },
    { id: 'support', name: 'Support', icon: Phone }
  ];

  const faqData = {
    delivery: [
      {
        question: "Is delivery free?",
        answer: (
          <p>
            Delivery around Nairobi and its environs is absolutely FREE!
            We believe our customers shouldn't pay extra just to get their products.
            <br /><br />
            For areas outside Nairobi, there's a small fee based on location.
            <span className="font-semibold text-primary"> Contact us for a custom delivery quote</span> if you're outside the city.
          </p>
        ),
        icon: Truck
      },
      {
        question: "How long does delivery take?",
        answer: (
          <p>
            <span className="font-semibold">Areas around Nairobi:</span> Same-day delivery in most cases.
            <br /><br />
            <span className="font-semibold">Outside Nairobi:</span> Approximately 24 hours, depending on your location.
            <br /><br />
            <span className="font-semibold text-secondary">Note:</span> Imported products may take up to 5 working days due to customs processing.
          </p>
        ),
        icon: Clock
      },
      {
        question: "Do you deliver outside Nairobi?",
        answer: (
          <p>
            Absolutely! Our delivery service covers all of Kenya.
            <br /><br />
            For areas outside Nairobi, we charge a small fee based on your location.
            <br /><br />
            <span className="font-semibold text-primary">Need a specific quote?</span> Send us your location details, and we'll calculate the fastest and most cost-effective delivery option for you.
          </p>
        ),
        icon: MapPin
      }
    ],
    orders: [
      {
        question: "How do I place an order?",
        answer: (
          <div>
            <p className="mb-2">Ordering from Playbox is simple and convenient:</p>
            <ol className="list-decimal ml-5 space-y-2">
              <li>Browse our collection and add items to your cart</li>
              <li>Proceed to checkout</li>
              <li>Enter your delivery address and contact details</li>
              <li>Choose your preferred payment method</li>
              <li>Confirm your order and wait for your products to arrive</li>
            </ol>
            <p className="mt-3">Our streamlined checkout process ensures a smooth shopping experience.</p>
          </div>
        ),
        icon: CreditCard
      },
      {
        question: "Can I track my order?",
        answer: (
          <p>
            Yes! Once your order is confirmed and shipped, we'll send you a tracking link.
            <br /><br />
            You can follow your package's journey in real-time through our tracking system.
            <br /><br />
            <span className="font-semibold text-primary">Tip:</span> Make sure your contact details are correct so we can keep you updated on your order status.
          </p>
        ),
        icon: Package
      }
    ],
    returns: [
      {
        question: "What's your return policy?",
        answer: (
          <div>
            <p>
              We want you to be completely satisfied with your purchase. Our return policy includes:
            </p>
            <ul className="list-disc ml-5 my-3 space-y-2">
              <li>Report any damages within <span className="font-bold text-secondary">6 hours after delivery</span></li>
              <li>Return period of <span className="font-bold text-secondary">5 days after delivery</span></li>
              <li>Items must be in original packaging and condition</li>
              <li>Include all accessories and documentation</li>
            </ul>
            <p>
              <span className="font-semibold text-primary">Important:</span> We don't accept returns on opened software, digital downloads, or subscriptions.
            </p>
          </div>
        ),
        icon: RefreshCw
      },
      {
        question: "How does the warranty work?",
        answer: (
          <p>
            Most of our products come with manufacturer warranties that vary by item. The warranty period is clearly indicated on each product page.
            <br /><br />
            Warranty covers manufacturing defects and failures under normal use. It doesn't cover accidental damage or misuse of products.
            <br /><br />
            To claim warranty, contact our support team with your order details and a description of the issue. We'll guide you through the process.
          </p>
        ),
        icon: ShieldAlert
      }
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer: (
          <div>
            <p className="mb-3">Our support team is available through multiple channels:</p>
            <ul className="space-y-2">
              <li><span className="font-semibold">Phone:</span> 0742</li>
              <li><span className="font-semibold">Email:</span> support@playbox.co.ke</li>
              <li><span className="font-semibold">Live Chat:</span> Available on our website from 8AM to 8PM daily</li>
              <li><span className="font-semibold">Social Media:</span> @PlayboxKenya on all platforms</li>
            </ul>
            <p className="mt-3">We strive to respond to all inquiries within 2 hours during business hours.</p>
          </div>
        ),
        icon: Phone
      },
      {
        question: "Do you offer installation services?",
        answer: (
          <p>
            Yes! For selected products like gaming consoles, PCs, and complex setups, we offer professional installation services.
            <br /><br />
            Our technicians can help you set up your equipment, optimize your settings, and ensure everything is working perfectly.
            <br /><br />
            Installation services can be added during checkout for eligible products.
          </p>
        ),
        icon: Package
      }
    ]
  };



  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-extrabold text-dark mb-2">
                Playbox <span className="text-primary">FAQ</span>
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about our products and services
              </p>
              <div className="mt-6 relative">
                <div className="absolute inset-0 opacity-30 blur-lg transform -skew-y-1"></div>
                <div className="relative bg-white p-6 shadow-md">
                  <p className="text-gray-700">
                    Playbox Knowledge Hub! Find answers to common questions about our services.
                    Can't find what you're looking for? Contact our support team for assistance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <category.icon size={18} />
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {faqData[activeCategory].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <FAQItem
                    question={item.question}
                    answer={item.answer}
                    icon={item.icon}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 text-center bg-gradient-to-r from-dark to-secondary p-8 shadow-xl text-white"
            >
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="mb-4">Our support team is ready to assist you with any questions you might have!</p>
              <button 
                onClick={handleOpenPopup}
                className="bg-primary hover:bg-blue-600 text-white py-2 px-6 rounded-xs font-bold shadow-lg transition duration-300 transform hover:scale-105"
              >
                Contact Support
              </button>
            </motion.div>
          </div>

          {/* Sticky Contact Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4 lg:border-l-2 lg:border-gray-300 lg:pl-8">
            <div className="sticky top-10">
              <ContactSidebar />
            </div>
          </div>
          
          {/* Mobile Contact Section - appears at bottom on mobile */}
          <div className="lg:hidden mt-12">
            <ContactSidebar />
          </div>
        </div>
      </div>
      
      {showContactPopup && <ContactUsPopup onClose={handleClosePopup} />}
    </div>
  );
}