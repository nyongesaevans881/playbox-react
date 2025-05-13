import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, selectCartTotal, selectCartLength, hydrateCartFromLocalStorage, selectWishlistLength } from '../../../redux/cartSlice';
import { loadUserFromStorage, logoutUser, toggleLogin, toggleSignup } from '../../../redux/userSlice'
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import Login from '../../auth/login/Login';
import Register from '../../auth/register/Register';
const Navlogo = "/primary-logo.png"
import "./navbar.css";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownStates, setDropdownStates] = useState(Array(9).fill(false));
    const [isSticky, setIsSticky] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const isLoginOpen = useSelector((state) => state.user.isLoginOpen);
    const isSignupOpen = useSelector((state) => state.user.isSignUpOpen);

    //---------------- Redux state selectors
    const dispatch = useDispatch();
    const cartTotal = useSelector(selectCartTotal);
    const cartLength = useSelector(selectCartLength);
    const wishlistLength = useSelector(selectWishlistLength);
    const user = useSelector((state) => state.user.user);
    const productsState = useSelector((state) => state.products);
    const products = Object.values(productsState).flat();
    const [selectedCategory, setSelectedCategory] = useState("all");

    //---------------- Handle Sticky State
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 1500) {
                    navbar.classList.add('sticky');
                } else {
                    navbar.classList.remove('sticky');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    //------------ Load user data on mount
    useEffect(() => {
        setIsClient(true);
        dispatch(loadUserFromStorage());
        dispatch(hydrateCartFromLocalStorage());
    }, [dispatch]);

    //---------- Handle user logout
    const handleLogout = async () => {
        dispatch(logoutUser());
        setShowDropdown(false);
    };

    const handleSignUpToggle = () => dispatch(toggleSignup());
    const handleLoginToggle = () => dispatch(toggleLogin());

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                const sticky = navbar.offsetTop;
                if (window.pageYOffset > sticky) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const toggleDropdown = (index) => {
        setDropdownStates(prevStates =>
            prevStates.map((state, i) => i === index ? !state : false)
        );
    };


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    const filteredProducts = products.filter((product) => {
        if (!product.Title || !product.SubTitle || !product.category || !product.tags) {
            console.log("Product with missing fields:", product);
            return false;
        }

        // Convert search query to lowercase
        const query = searchQuery.toLowerCase();

        // Check if the product matches the search query
        const matchesSearch =
            product.Title.toLowerCase().includes(query) ||
            product.SubTitle.toLowerCase().includes(query) ||
            product.tags.some((tag) => tag.toLowerCase().includes(query));

        // Apply category filter (if not 'all')
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });


    // List of categories
    const categories = [
        {
            name: "Consoles",
            items: [
                { name: "PlayStation 5 (Ps 5)", url: "/products/playstation/consoles/ps5" },
                { name: "Ps 5 Accessories", url: "/products/playstation/accessories/ps5" },
                { name: "PlayStation 4 Consoles", url: "/products/playstation/consoles/ps4" },
                { name: "Ps 4 Accessories", url: "/products/playstation/accessories/ps4" },
                { name: "Xbox Consoles", url: "/products/xbox/consoles" },
                { name: "Xbox Accessories", url: "/products/xbox/accessories" },
                { name: "Nintendo & Handhelds", url: "/products/handhelds/consoles" },
                { name: "Handhelds Accessories", url: "/products/handhelds/accessories" },
                { name: "Pre-Owned Consoles", url: "#" },
            ],
        },
        {
            name: "PC & Laptops",
            items: [
                { name: "Gaming Laptops", url: "/products/laptops" },
                { name: "Keyboards", url: "/products/pc/keyboards" },
                { name: "Mice", url: "/products/pc/mice" },
                { name: "Monitors", url: "/products/pc/monitors" },
                { name: "Accessories", url: "/pc/components" },
            ],
        },
        {
            name: "Games",
            items: [
                { name: "PlayStation 5 Games", url: "/products/games/playstation/ps5" },
                { name: "PlayStation 4 Games", url: "/products/games/playstation/ps4" },
                { name: "Xbox Games", url: "/products/games/xbox" },
                { name: "Nintendo Switch Games", url: "/products/games/nintendo" },
                { name: "Popular Titles", url: "/products/games" },
                { name: "Under Ksh 5,000", url: "/products/games" },
            ],
        },
        {
            name: "Audio",
            items: [
                { name: "Headphones", url: "/products/audio/headphones" },
                { name: "Earbuds", url: "/products/audio/earbuds" },
                { name: "Neckbands", url: "/peripherals/headsets" },
                { name: "Bluetooth Speakers", url: "/products/audio/speakers" },
                { name: "Sound Bars", url: "/peripherals/mousepads" },
            ],
        },
        {
            name: "Tech Hub",
            items: [
                { name: "Gaming Phones", url: "/shipping/local-delivery" },
                { name: "Smart Watches", url: "/shipping/usa-to-kenya" },
                { name: "Cameras", url: "/shipping/uk-to-kenya" },
                { name: "Internet", url: "/shipping/order-tracking" },
            ],
        },
        {
            name: "Furniture",
            items: [
                { name: "Gaming Chairs", url: "/furniture/chairs" },
                { name: "Gaming Tables", url: "/furniture/budget-chairs" },
                { name: "Decor", url: "/furniture/rgb-desks" },
                { name: "Cable Management Systems", url: "/furniture/cable-management" },
                { name: "Display Shelves", url: "/furniture/display-shelves" },
            ],
        },
        {
            name: "Toys & Games",
            items: [
                { name: "Action Figures", url: "/toys/action-figures" },
                { name: "LEGO Sets", url: "/toys/lego-sets" },
                { name: "Board Games", url: "/toys/board-games" },
                { name: "RC Cars", url: "/toys/rc-cars-drones" },
                { name: "Collectibles", url: "/toys/collectibles" },
            ],
        },
        {
            name: "Rides",
            items: [
                { name: "Skateboards", url: "/market/exchange-games" },
                { name: "Bikes", url: "/market/refurbished-products" },
                { name: "Hover Boards", url: "/market/merchandise" },
                { name: "Drones", url: "/market/pre-owned-games" },
            ],
        },
        {
            name: "Market",
            items: [
                { name: "Merchadise", url: "/community/forums" },
                { name: "Instagram", url: "/community/tournaments" },
                { name: "X (Twitter)", url: "/community/esports-teams" },
                { name: "Whatsapp", url: "/community/tech-discussions" },
                { name: "Meetups and Events", url: "/community/meetups-events" },
            ],
        },
    ];


    return (
        <>
            <section id="navbar" className={`navbar ${isSticky ? 'sticky' : ''}`}>
                {/*--------- NavBar top strip ------*/}
                <div className="nav-bar-top-contact-strip">
                    <div className="nav-bar-top-contact-strip-content container">
                        {/* Left Contact Info */}
                        <div className="nav-bar-top-contact-strip-left">
                            <a href="mailto:info@playbox.co.ke">
                                <i className="fa fa-envelope"></i>&nbsp;info@playbox.co.ke
                            </a>
                            <span>|</span>
                            <a href="tel:+254791880412" className='mobile-responsive-mobile'>
                                <i className="fas fa-paper-plane"></i>&nbsp; +254-742-503-840
                            </a>
                        </div>

                        {/* Right Account and Socials */}
                        <div className="nav-bar-top-contact-strip-right">
                            <div className="my-account-dropdown">
                                {user ? (
                                    <>
                                        {/* Display when user is logged in */}
                                        <div onClick={() => setShowDropdown(!showDropdown)} className="user-info">
                                            <img
                                                src={user.avatar || "/auth/avators/astro-kratos.png"}
                                                alt="User Avatar"
                                                className="user-avatar"
                                            />
                                            <p> &nbsp; {user.username || "User"} &nbsp;</p>
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <div className={`my-account-dropdown-container ${isClient && showDropdown ? "show" : ""}`}>
                                            <button onClick={handleLogout}>Logout</button>
                                            <a href="/dashboard">Dashboard</a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Display when user is not logged in */}
                                        <a href="#" onClick={() => setShowDropdown(!showDropdown)}>
                                            <i className="fa fa-headphones"></i>&nbsp;
                                            My Account &nbsp;
                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        <div className={`my-account-dropdown-container ${isClient && showDropdown ? "show" : ""}`}>
                                            <button onClick={() => handleSignUpToggle()}>Sign Up</button>
                                            <button onClick={() => handleLoginToggle()}>Login</button>
                                            <button>Wishlist</button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-4 items-center max-md:hidden">
                                <a href="https://x.com/playbox__ke?t=oIgieBaNb9KjLdQHvv0Y3w&s=09">
                                    <FaXTwitter className='text-white font-bold text-2xl hover:text-gray-200 cursor-pointer transition-all' />
                                </a>
                                <a href="https://www.instagram.com/playbox_ke?igsh=enMzeTVxdThhM2hu">
                                    <TiSocialInstagram className='text-white font-bold text-2xl hover:text-gray-200 cursor-pointer transition-all' />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61570625076916&mibextid=ZbWKwL">
                                    <AiOutlineFacebook className='text-white font-bold text-2xl hover:text-gray-200 cursor-pointer transition-all' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/*--------- Main NavBar with Logo and Search Bar ------*/}
                <div className="nav-bar-mid">
                    <div className="nav-bar-mid-content container">
                        <a href='/' className="navbar-logo">
                            <img src={Navlogo} alt="Playbox Logo" />
                        </a>

                        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                            <i className="fa fa-bars"></i>
                        </div>

                        {/*-------------------- Search Bar with Category Dropdown --------------*/}
                        <div className="navbar-search">
                            <div className="navbar-search-input">
                                <div className="navbar-search-category">
                                    <select value={selectedCategory} onChange={handleCategoryChange}>
                                        <option value="all">All</option>
                                        {Object.keys(productsState).map((category) => (
                                            <option key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </option>
                                        ))}
                                    </select>

                                    <i className="fa fa-chevron-down"></i>
                                </div>
                                <p>|</p>
                                <input
                                    type="text"
                                    placeholder="Enter your search key ..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <button className="text-white px-4 bg-secondary h-full font-bold cursor-pointer">
                                    Search
                                </button>
                            </div>

                            {/* Search Dropdown */}
                            {searchQuery && isClient && (
                                <div className="search-dropdown">
                                    {filteredProducts.slice(0, 25).map((product, index) => (
                                        <a href={`/products/${product.category}/${product.subCategory}/${product.variant}/${product.name}`} key={index} className="search-dropdown-item">
                                            <img src={product.mainproductImage} alt={product.Title} className="w-25 object-contain" />
                                            <div className="product-info">
                                                <h4 className="text-md leading-tight text-gray-800 font-bold line-clamp-2">{product.Title}</h4>
                                                <p className="text-secondary font-bold capitalize">— {product.SubTitle}</p>
                                            </div>
                                            <div className="flex flex-col min-w-25 items-start">
                                                <span className='bg-secondary text-xs py-0 px-2 text-white font-bold mb-2'> {Math.round((product.prevPrice - product.nowPrice) / product.prevPrice * 100)}% OFF</span>
                                                <span className='text-sm text-gray-300 line-through'>Ksh. {product.prevPrice.toLocaleString()}</span>
                                                <span className='font-bold text-secondary'>Ksh. {product.nowPrice.toLocaleString()}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/*-------------- Cart & Wishlist Icons --------------*/}
                        <div className="navbar-icons">
                            <div className="navbar-icon navbar-wishlist">
                                <i className="fa fa-heart"></i>
                                <span className="badge">{isClient ? wishlistLength : 0}</span>
                            </div>
                            <div className="navbar-icon nav-bar-cart" onClick={() => dispatch(toggleCart())}>
                                <i className="fa fa-shopping-cart navbar-cart-icon"></i>
                                <span className="badge">{isClient ? cartLength : 0}</span>
                                <span className="cart-total">
                                    {isClient ? `Ksh. ${cartTotal.toLocaleString()}` : 'Ksh. 0'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Third layer of navbar for gaming categories */}
                <div className={`nav-bar-gaming-categories ${isClient && isMobileMenuOpen ? 'active' : ''}`}>
                    <div className="container">
                        <ul className="gaming-categories-list">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className={`gaming-category-item ${dropdownStates[index] ? "active" : ""}`}
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <a href="#" className="gaming-category-link">
                                        {category.name} <i className="fa fa-chevron-down gaming-category-link-icon"></i>
                                    </a>
                                    <div className="gaming-dropdown">
                                        {category.items.map((item, itemIndex) => (
                                            <a key={itemIndex} href={item.url}>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </section>

            {isLoginOpen && <Login onClose={handleLoginToggle} onSignUp={handleSignUpToggle} />}
            {isSignupOpen && <Register onClose={handleSignUpToggle} onLogin={handleLoginToggle} />}
        </>
    );
};

export default Navbar;
