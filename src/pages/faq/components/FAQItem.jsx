import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';

// FAQ Component
  const FAQItem = ({ question, answer, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(true); // Default to open
  
    return (
      <div className="mb-4 overflow-hidden border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
        <button
          className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-secondary rounded-full p-2 text-white">
              <Icon size={20} />
            </div>
            <h3 className="font-bold text-dark text-lg">{question}</h3>
          </div>
          <div>
            {isOpen ? (
              <X className="text-primary" size={20} />
            ) : (
              <div className="bg-gray-200 rounded-full p-1">
                <Clock className="text-primary" size={16} />
              </div>
            )}
          </div>
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pb-4 pt-0 text-gray-700">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

export default FAQItem;
