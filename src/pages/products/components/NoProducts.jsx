import React from 'react';
import { Link } from 'react-router-dom';

const NoProducts = ({ category }) => {
  const randomTips = [
    "Check your inventory settings!",
    "Maybe this category is still locked?",
    "Looks like we're out of stock. Try again later!",
    "404: Products not found in this realm.",
    "Inventory system experiencing technical difficulties."
  ];

  const randomGameReferences = [
    {
      title: "Explore Other Levels",
      description: "Browse different categories",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      link: "/products"
    },
    {
      title: "Check Wishlist",
      description: "View saved items",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: "/wishlist"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-900 border-2 border-red-500 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-blue-700 p-4 text-center">
          <h2 className="text-2xl font-bold">INVENTORY SCAN: NO RESULTS</h2>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col md:flex-row items-center">
          {/* Empty State Illustration */}
          <div className="mb-6 md:mb-0 md:mr-8 relative">
            <div className="w-48 h-48 relative">
              <svg 
                className="w-full h-full text-red-500 animate-pulse"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-red-500">!</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">
              No Products Found
            </h1>
            <p className="text-gray-300 mb-6">
              Looks like the {category || "selected"} category is currently empty. 
              Our inventory system shows zero items in this section.
            </p>

            {/* Random Tip */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
              <p className="text-yellow-300 font-mono">
                🎮 Pro Tip: {randomTips[Math.floor(Math.random() * randomTips.length)]}
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-2 gap-4">
              {randomGameReferences.map((ref, index) => (
                <Link
                  key={index}
                  to={ref.link}
                  className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex items-center space-x-4 transition duration-300 transform hover:scale-105"
                >
                  <div className="text-blue-400">{ref.icon}</div>
                  <div>
                    <h3 className="font-bold">{ref.title}</h3>
                    <p className="text-xs text-gray-400">{ref.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-black p-4 text-center text-gray-500">
          <p>Inventory last checked: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NoProducts;