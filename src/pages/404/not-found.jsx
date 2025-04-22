"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import FooterComponent from './components/footer/Footer';
// import './not-found.css'

const NotFound = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    window.location.href = '/';
                    return 0;
                }
                return prevTime - 1;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="py-10 min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                {/* Game-style container */}
                <div className="max-w-4xl w-full bg-gray-900 border-2 border-red-500 overflow-hidden">
                    {/* Header bar - like a game console UI */}
                    <div className="bg-gradient-to-r from-secondary to-primary p-2 flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="text-xs font-mono">ERROR_404.exe</div>
                    </div>

                    {/* Main content */}
                    <div className="p-8 flex flex-col md:flex-row items-center">
                        {/* Game character - pixel art style using div blocks */}
                        <div className="mb-8 md:mb-0 md:mr-8 relative">
                            <div
                                className={`w-40 h-40 relative ${isAnimating ? 'animate-bounce' : ''}`}
                                onMouseEnter={() => setIsAnimating(true)}
                                onMouseLeave={() => setIsAnimating(false)}
                            >
                                <img
                                    src="/icons/404.png"
                                    alt="Game Over"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect x='60' y='10' width='40' height='40' fill='%23ff4444'/%3E%3Crect x='60' y='50' width='40' height='60' fill='%23ff4444'/%3E%3Crect x='40' y='70' width='20' height='20' fill='%23ff4444'/%3E%3Crect x='100' y='70' width='20' height='20' fill='%23ff4444'/%3E%3Crect x='40' y='110' width='20' height='30' fill='%23ff4444'/%3E%3Crect x='100' y='110' width='20' height='30' fill='%23ff4444'/%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black rounded-full opacity-30"></div>
                        </div>

                        {/* Error message */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-6xl md:text-8xl font-bold text-red-500 glitch mb-4">404</h1>
                            <h2 className="text-xl md:text-2xl text-blue-400 mb-4 font-mono">LEVEL NOT FOUND</h2>
                            <p className="mb-6 text-gray-300">Looks like you've ventured into an uncharted area. The loot you're looking for has been moved to another castle.</p>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="inline-block w-4 h-4 bg-red-500 mr-2 animate-pulse"></span>
                                    <p>Respawning in <span className="text-yellow-300 font-mono">{timeLeft}</span> seconds...</p>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <Link href="/"
                                        className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center"
                                    >
                                        <span className="mr-2">Return to HUB</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                        </svg>
                                    </Link>

                                    <button
                                        onClick={() => window.history.back()}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                        </svg>
                                        Previous Level
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Console commands at bottom */}
                    <div className="bg-black p-4 font-mono text-sm text-green-500 border-t border-gray-700">
                        <p> <span className="typing-animation">ERROR: Page not found. Try navigating to a valid URL.</span></p>
                    </div>
                </div>

                {/* Game achievements/collectibles */}
                <div className="mt-8 flex gap-4 flex-wrap justify-center">
                    <div className="bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition duration-300" title="Explore products">
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V2zm2 1v8h6V3H7z" clipRule="evenodd" />
                            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition duration-300" title="Controller shop">
                        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition duration-300" title="Gaming news">
                        <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 transition duration-300" title="Support">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};

export default NotFound;