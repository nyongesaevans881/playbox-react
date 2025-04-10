import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUser, FaComment, FaShare, FaChevronLeft, FaChevronRight, FaStar, FaGlobe, FaGamepad, FaDollarSign, FaMapMarked, FaClock } from 'react-icons/fa';
import { Gamepad2, Monitor, ShoppingCart, Heart, Flame, Award, TrendingUp, MessageSquare, Share2 } from 'lucide-react';

export default function BlogDetails() {
    // Countdown timer state and logic
    const [timeLeft, setTimeLeft] = useState({
        days: 171,
        hours: 1,
        minutes: 13,
        seconds: 36
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { days, hours, minutes, seconds } = prevTime;
                
                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes -= 1;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours -= 1;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days -= 1;
                            }
                        }
                    }
                }
                
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    // Related posts data
    const relatedPosts = [
        {
            title: "Call of Duty: Black Ops 6 - What We Know So Far",
            image: "/images/call-of-duty.jpg",
            date: "March 15, 2025"
        },
        {
            title: "The Elder Scrolls VI: Potential Release Window",
            image: "/images/elder-scrolls.jpg",
            date: "March 10, 2025"
        },
        {
            title: "PlayStation 6: Rumors and Expectations",
            image: "/images/playstation6.jpg",
            date: "March 5, 2025"
        }
    ];

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto">
                {/* Blog Header with Animated Border */}
                <div className="relative mb-12 border-2 border-pink-600 rounded-lg p-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-pink-600 to-purple-700 animate-pulse opacity-30"></div>
                    <div className="bg-[#111827] text-white p-6 rounded-lg relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500 mb-2">
                                    GTA 6: The Game That Will Change Everything
                                </h1>
                                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                                    <span className="flex items-center"><FaCalendarAlt className="mr-2" /> April 6, 2025</span>
                                    <span className="flex items-center"><FaUser className="mr-2" /> By GameExpert</span>
                                    <span className="flex items-center"><FaComment className="mr-2" /> 45 Comments</span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center">
                                    <Heart className="mr-2" size={18} /> Like
                                </button>
                                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-all flex items-center">
                                    <Share2 className="mr-2" size={18} /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Article Content - Takes 2/3 of the space on desktop */}
                    <div className="lg:col-span-2">
                        {/* Hero Image with hover effect */}
                        <div className="relative mb-8 overflow-hidden rounded-xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                            <img 
                                src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/gta6-4k_csdhvy.jpg" 
                                alt="GTA 6 Artwork" 
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 z-20 bg-pink-600 text-white px-4 py-2 rounded-lg font-bold">
                                EXCLUSIVE
                            </div>
                        </div>

                        {/* Introduction Section */}
                        <div className="prose max-w-none">
                            <p className="text-lg leading-relaxed mb-6 text-gray-800">
                                After years of speculation, leaks, and wishful thinking, Rockstar Games has finally confirmed 
                                what we've all been waiting for - <span className="font-bold text-pink-600">Grand Theft Auto VI</span> 
                                is officially in development and set to revolutionize open-world gaming once again. 
                                With the promised return to Vice City and a host of groundbreaking features, GTA 6 is
                                shaping up to be the most ambitious project in Rockstar's illustrious history.
                            </p>

                            <div className="mb-10 bg-[#111827] text-white p-6 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    "GTA 6 will redefine what players expect from open-world experiences, with unprecedented levels of detail and interaction."
                                </h2>
                                <p className="text-right text-gray-400">- Insider at Rockstar Games</p>
                            </div>
                        </div>

                        {/* Features Breakdown Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8 flex items-center">
                                <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    Game-Changing Features
                                </span>
                                <Gamepad2 className="text-pink-600" />
                            </h2>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Feature Card 1 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-pink-600">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-blue-600 p-3 rounded-full text-white mr-4">
                                            <FaGlobe size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold">Expanded Open World</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        Vice City returns bigger and more detailed than ever, with multiple cities and rural areas to explore.
                                        The map is rumored to be 1.5x larger than GTA V's Los Santos with dynamic weather systems and seasonal changes.
                                    </p>
                                </div>

                                {/* Feature Card 2 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-pink-600">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-pink-600 p-3 rounded-full text-white mr-4">
                                            <FaGamepad size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold">Dual Protagonists</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        Play as both Jason and Lucia, each with unique skills and storylines that intertwine
                                        throughout the campaign. Switch between characters at will or play cooperatively in select missions.
                                    </p>
                                </div>

                                {/* Feature Card 3 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-pink-600">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-purple-600 p-3 rounded-full text-white mr-4">
                                            <FaDollarSign size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold">Dynamic Economy</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        A living economy that reacts to player actions. Invest in businesses, manipulate stock markets,
                                        and build criminal empires with consequences that ripple through the game world.
                                    </p>
                                </div>

                                {/* Feature Card 4 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-pink-600">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-green-600 p-3 rounded-full text-white mr-4">
                                            <FaMapMarked size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold">Advanced AI System</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        NPCs with complex daily routines and memory systems. Citizens remember your actions
                                        and respond accordingly, creating a more immersive and reactive world.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Editions Section */}
                        <div className="mb-12 bg-gray-100 p-6 rounded-lg">
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    Expected Price & Editions
                                </span>
                                <ShoppingCart className="text-pink-600" />
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {/* Standard Edition */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="bg-blue-600 text-white py-3 px-4 font-bold text-center">
                                        STANDARD EDITION
                                    </div>
                                    <div className="p-4">
                                        <div className="text-3xl font-bold text-center mb-2">$69.99</div>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Base Game</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Online Access</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Deluxe Edition */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-pink-600 transform scale-105">
                                    <div className="bg-pink-600 text-white py-3 px-4 font-bold text-center relative">
                                        DELUXE EDITION
                                        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs py-1 px-2 rounded-bl-lg font-bold">
                                            POPULAR
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-3xl font-bold text-center mb-2">$89.99</div>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Base Game</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Online Access</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Season Pass</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Exclusive Vehicle</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Collector's Edition */}
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="bg-purple-700 text-white py-3 px-4 font-bold text-center">
                                        COLLECTOR'S EDITION
                                    </div>
                                    <div className="p-4">
                                        <div className="text-3xl font-bold text-center mb-2">$149.99</div>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Deluxe Content</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Steelbook Case</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Art Book</li>
                                            <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Collectible Statue</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 text-sm italic">
                                *Prices are subject to change and based on industry analysis and leaks. 
                                Official pricing will be announced by Rockstar Games.
                            </p>
                        </div>
                        
                        {/* Online Mode Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    GTA Online: The Next Evolution
                                </span>
                                <Monitor className="text-pink-600" />
                            </h2>
                            
                            <div className="relative rounded-xl overflow-hidden mb-6">
                                <img 
                                    src="/images/gta-online.jpg" 
                                    alt="GTA Online" 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">Multiplayer Reimagined</h3>
                                    <p>Build your criminal empire across the expanded Vice City and beyond</p>
                                </div>
                            </div>
                            
                            <div className="prose max-w-none">
                                <p className="mb-4">
                                    GTA Online was a revolutionary addition to GTA V, and the next iteration promises to take
                                    the concept even further. Rockstar is reportedly building a persistent online world that evolves over time,
                                    with dynamic events, seasonal content, and player-driven economies.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 flex items-center">
                                            <TrendingUp className="text-pink-600 mr-2" size={20} />
                                            Criminal Careers
                                        </h4>
                                        <p className="text-sm">
                                            Develop specialized criminal careers with unique progression paths and exclusive missions.
                                            From drug kingpin to tech-savvy hacker, choose your specialty and master it.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 flex items-center">
                                            <Award className="text-pink-600 mr-2" size={20} />
                                            Cross-Platform Play
                                        </h4>
                                        <p className="text-sm">
                                            For the first time in the series, GTA Online is expected to support cross-platform play,
                                            allowing friends to play together regardless of their gaming system.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-[#111827] text-white p-6 rounded-lg mb-6">
                                    <div className="flex items-center mb-2">
                                        <Flame className="text-pink-600 mr-2" size={24} />
                                        <h4 className="font-bold text-xl">INSIDER TIP</h4>
                                    </div>
                                    <p>
                                        According to our sources, early adopters of GTA 6 will receive exclusive benefits in GTA Online,
                                        including rare properties and vehicles not available to later players. Pre-ordering might be worth it
                                        just for these bonuses!
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Release Date Countdown */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    Projected Release Date
                                </span>
                                <FaClock className="text-pink-600" />
                            </h2>
                            
                            <div className="bg-[#111827] text-white p-6 rounded-lg shadow-lg">
                                <p className="text-lg mb-6 text-center">
                                    While Rockstar hasn't confirmed an official release date, industry insiders and analysts
                                    project GTA 6 will launch in <span className="font-bold text-pink-600">Fall 2025</span>. Our countdown is based on these projections.
                                </p>
                                
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-4 rounded-lg text-center">
                                        <div className="text-4xl font-bold mb-2">{timeLeft.days}</div>
                                        <div className="text-xs uppercase tracking-wide">Days</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-4 rounded-lg text-center">
                                        <div className="text-4xl font-bold mb-2">{timeLeft.hours}</div>
                                        <div className="text-xs uppercase tracking-wide">Hours</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-4 rounded-lg text-center">
                                        <div className="text-4xl font-bold mb-2">{timeLeft.minutes}</div>
                                        <div className="text-xs uppercase tracking-wide">Minutes</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-4 rounded-lg text-center">
                                        <div className="text-4xl font-bold mb-2">{timeLeft.seconds}</div>
                                        <div className="text-xs uppercase tracking-wide">Seconds</div>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center">
                                        <Flame className="mr-2" />
                                        Get Notified When Pre-Orders Open
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Comments Section Preview */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-500">
                                    Join The Conversation
                                </span>
                                <MessageSquare className="text-pink-600" />
                            </h2>
                            
                            <div className="border border-gray-200 rounded-lg p-6">
                                <div className="mb-6">
                                    <div className="flex items-start mb-4">
                                        <img src="/images/avatar1.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <h4 className="font-bold mr-2">XxGamerGod420xX</h4>
                                                <span className="text-gray-500 text-xs">2 hours ago</span>
                                            </div>
                                            <p className="text-gray-800">
                                                I just hope they don't delay it again. Been waiting for this game since GTA V came out lol
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start ml-14">
                                        <img src="/images/avatar2.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
                                        <div>
                                            <div className="flex items-center mb-1">
                                                <h4 className="font-bold mr-2">RockstarFan</h4>
                                                <span className="text-gray-500 text-xs">1 hour ago</span>
                                            </div>
                                            <p className="text-gray-800">
                                                Better they take their time and deliver a masterpiece than rush it out the door.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-bold mb-2">Add Your Comment</h4>
                                    <textarea 
                                        className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                                        placeholder="What are your thoughts on GTA 6?"
                                        rows="3"
                                    ></textarea>
                                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-bold transition-all">
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar - Takes 1/3 of the space on desktop */}
                    <div className="lg:col-span-1">
                        {/* Author Box */}
                        <div className="bg-[#111827] text-white p-6 rounded-lg mb-8">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/peter_qizvfd.jpg" 
                                    alt="Author" 
                                    className="w-16 h-16 rounded-full border-2 border-pink-600 mr-4"
                                />
                                <div>
                                    <h3 className="font-bold text-xl">GameExpert</h3>
                                    <p className="text-gray-400">Senior Gaming Editor</p>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Tech enthusiast and gaming aficionado with over 10 years covering the industry.
                                Specializes in open-world games and industry trends.
                            </p>
                            <div className="flex space-x-2">
                                <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all">
                                    <FaShare className="w-4 h-4" />
                                </button>
                                <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-all">
                                    <FaComment className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Newsletter Signup */}
                        <div className="border border-gray-200 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">Get GTA 6 Updates</h3>
                            <p className="text-gray-700 mb-4">
                                Subscribe to our newsletter and be the first to know about GTA 6 news, 
                                release dates, and exclusive content.
                            </p>
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                            />
                            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-bold transition-all">
                                Subscribe Now
                            </button>
                        </div>
                        
                        {/* Platform Availability */}
                        <div className="bg-gray-100 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">Available Platforms</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                                    <img src="/images/ps5-logo.png" alt="PlayStation 5" className="h-12 mx-auto mb-2" />
                                    <p className="font-bold">PlayStation 5</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                                    <img src="/images/xbox-logo.png" alt="Xbox Series X" className="h-12 mx-auto mb-2" />
                                    <p className="font-bold">Xbox Series X/S</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                                    <img src="/images/pc-logo.png" alt="PC" className="h-12 mx-auto mb-2" />
                                    <p className="font-bold">PC</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center shadow-sm opacity-50">
                                    <img src="/images/ps4-logo.png" alt="PlayStation 4" className="h-12 mx-auto mb-2" />
                                    <p className="font-bold">PS4 (Unconfirmed)</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Related Articles */}
                        <div className="border border-gray-200 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                            
                            <div className="space-y-4">
                                {relatedPosts.map((post, index) => (
                                    <div key={index} className="flex items-start group cursor-pointer">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                                            <img 
                                                src={post.image} 
                                                alt={post.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{post.title}</h4>
                                            <p className="text-gray-500 text-sm">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full mt-4 border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white py-2 rounded-lg font-bold transition-all">
                                View All Articles
                            </button>
                        </div>
                        
                        {/* Poll Widget */}
                        <div className="bg-[#111827] text-white p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">Community Poll</h3>
                            <p className="mb-4">What are you most excited about in GTA 6?</p>
                            
                            <div className="space-y-4">
                                <div className="relative">
                                    <input type="radio" id="option1" name="poll" className="peer hidden" />
                                    <label htmlFor="option1" className="block w-full p-3 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-600/20">
                                        Story and Characters
                                    </label>
                                </div>
                                
                                <div className="relative">
                                    <input type="radio" id="option2" name="poll" className="peer hidden" />
                                    <label htmlFor="option2" className="block w-full p-3 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-600/20">
                                        Open World Features
                                    </label>
                                </div>
                                
                                <div className="relative">
                                    <input type="radio" id="option3" name="poll" className="peer hidden" />
                                    <label htmlFor="option3" className="block w-full p-3 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-600/20">
                                        Graphics and Technology
                                    </label>
                                </div>
                                
                                <div className="relative">
                                    <input type="radio" id="option4" name="poll" className="peer hidden" />
                                    <label htmlFor="option4" className="block w-full p-3 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-600/20">
                                        Online Multiplayer
                                    </label>
                                </div>
                            </div>
                            
                            <button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-bold transition-all">
                                Vote Now
                            </button>
                        </div>
                        
                        {/* Advertisement Banner */}
                        <div className="relative overflow-hidden rounded-lg mb-8 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-pink-600/70 z-10 group-hover:opacity-80 transition-opacity"></div>
                            <img 
                                src="/images/gaming-gear-ad.jpg" 
                                alt="Gaming Gear Advertisement" 
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">Gear Up For GTA 6</h3>
                                <p className="text-white mb-4">Upgrade your setup with our selection of gaming peripherals</p>
                                <button className="bg-white text-pink-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold transition-all">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Post Navigation */}
                <div className="border-t border-b border-gray-200 py-8 my-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0 group cursor-pointer">
                            <FaChevronLeft className="text-gray-400 group-hover:text-pink-600 mr-2 transition-colors" />
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Previous Article</div>
                                <div className="font-bold group-hover:text-pink-600 transition-colors">The Best Gaming Monitors of 2025</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end group cursor-pointer">
                            <div className="text-right">
                                <div className="text-sm text-gray-500 mb-1">Next Article</div>
                                <div className="font-bold group-hover:text-pink-600 transition-colors">PlayStation 6: Rumors and Expectations</div>
                            </div>
                            <FaChevronRight className="text-gray-400 group-hover:text-pink-600 ml-2 transition-colors" />
                        </div>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-pink-600 p-8 rounded-xl text-white text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Stay Connected with PlayBox</h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Join Kenya's premier gaming community for exclusive content, early access to game releases,
                        and special events for gamers across East Africa.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-all">
                            Join Community
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-bold transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}