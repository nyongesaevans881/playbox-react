import { User, ShoppingCart, Package, Medal, Eye, EyeOff, Mail, MapPin, CreditCard, Plus, ChevronRight, ChevronDown, ArrowUp, X, Check, CircleCheck, RefreshCcw } from 'lucide-react';
import { loadUserFromStorage, toggleLogin, toggleSignup } from '../../redux/userSlice';
import AddressManagement from './components/AddressManagement';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Register from '../auth/register/Register';
import Login from '../auth/login/Login';
import toast from 'react-hot-toast';
import { div } from 'framer-motion/client';

export default function Dashboard() {
    const isLoginOpen = useSelector((state) => state.user.isLoginOpen);
    const isSignupOpen = useSelector((state) => state.user.isSignUpOpen);
    const [expandedSection, setExpandedSection] = useState('profile');
    const [expandedAddressId, setExpandedAddressId] = useState(null);
    const [showCommunity, setShowCommunity] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [isVerified, setIsVerified] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await dispatch(loadUserFromStorage());
            setLoading(false);
        };

        loadData();
    }, [dispatch]);

    useEffect(() => {
        const serverURL = import.meta.env.VITE_SERVER_URL;

        const fetchUserData = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                console.log(`user`, user);
                const response = await fetch(`${serverURL}/playbox_user/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user?.email }),
                });

                const result = await response.json();
                console.log(`result`, result);

                if (result.statusCode === 200) {
                    setUserData(result.data);
                    setShowCommunity(result.data.showOnCommunity);
                    setIsVerified(result.data.verified);

                    console.log(`result.data`, result.data);
                    toast.success('User data loaded successfully!');
                    toast.success('User data loaded successfully!');
                    if (result.data.orders && result.data.orders.length > 0) {
                        fetchOrders(result.data.orders);
                    }
                } else {
                    throw new Error(result.message || 'Failed to get user data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrders = async (orderIds) => {
            try {
                const response = await fetch(`${serverURL}/playbox_order/multiple`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderIds })
                });

                if (!response.ok) throw new Error('Failed to fetch orders');
                const result = await response.json();

                if (result.success) {
                    setOrders(result.orders.sort((a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                    ));
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        if (user) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const toggleCommunityVisibility = async () => {
        try {
            // In a real implementation, this would make an API call
            // For now, we'll just toggle the state
            const newValue = !showCommunity;
            setShowCommunity(newValue);

            // Example API call (commented out)
            /*
            await fetch(`${serverURL}/playbox_user/update-visibility`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ showOnCommunity: newValue })
            });
            */
        } catch (err) {
            console.error('Error toggling visibility:', err);
        }
    };

    const sendVerificationEmail = () => {
        // In a real implementation, this would make an API call
        alert('Verification email will be sent!');
        // Example:
        // await fetch(`${serverURL}/playbox_user/send-verification`, ...
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const toggleAddressDetails = (id) => {
        setExpandedAddressId(expandedAddressId === id ? null : id);
    };

    //---------Handle Auth Pop-ups
    const handleSignUpToggle = () => dispatch(toggleSignup());
    const handleLoginToggle = () => dispatch(toggleLogin());

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRatingColor = (rating) => {
        switch (rating) {
            case 'Pro': return 'text-purple-500';
            case 'Veteran': return 'text-yellow-500';
            case 'Expert': return 'text-green-500';
            default: return 'text-blue-400'; // Newbie
        }
    };


    if (loading) return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-50 flex items-center justify-center'>
          <img src="/gif/circular-loaders.gif" alt="" className='h-50 max-md:h-20' />
        </div>
    );

    if (userData) return (
        <div className="min-h-screen bg-white text-white p-4 md:p-8">
            <div className=' container'>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="text-dark text-4xl font-bold flex items-center gap-2 uppercase">
                        Dashboard
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Loyalty Points Badge */}
                        <div className="flex items-center gap-2 border-2 border-secondary px-3 py-1">
                            <Medal className="text-secondary" size={20} />
                            <p className="text-dark text-sm opacity-70">Loyalty Points: <span className='font-bold'>{userData.loyaltyPoints}</span> </p>
                        </div>

                        {/* Community Visibility Toggle */}
                        {/* <div className={`relative flex cursor-pointer items-center px-3 py-1 transition-all duration-300 ${showCommunity ? 'bg-secondary border-2 border-secondary text-white' : 'border-2 border-secondary text-dark'
                            }`}>
                            <button
                                onClick={toggleCommunityVisibility}
                                className="flex items-center gap-2 focus:outline-none text-secondary"
                            >
                                {showCommunity ? <Eye size={20} /> : <EyeOff size={20} />}
                                <span className="text-dark text-sm opacity-70">
                                    {showCommunity ? 'Visible in Community' : 'Hidden in Community'}
                                </span>
                            </button>
                        </div> */}

                        {/* Verification Status */}
                        {/* {!isVerified && (
                            <button
                                onClick={sendVerificationEmail}
                                className="flex items-center gap-2 border-2 px-3 py-1 cursor-pointer text-secondary"
                            >
                                <Mail size={20} />
                                <span className="text-dark text-sm opacity-70">Verify Email</span>
                            </button>
                        )} */}

                        {isVerified && (
                            <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                                <Check size={20} className="text-green-500" />
                                <span className="text-sm">Verified</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Section */}
                    <div className="lg:col-span-1">
                        <div className="rounded-sm overflow-hidden shadow-lg border-2 border-secondary">
                            <div
                                className="bg-secondary px-4 py-3 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection('profile')}
                            >
                                <div className="flex items-center gap-2">
                                    <User size={20} className='' />
                                    <h6 className="font-bold m-0 p-0">Profile</h6>
                                </div>
                                <p className="text-sm mb-1 text-white flex items-center justify-between px-1 gap-2">
                                    <span>Loyalty Points:</span>
                                    <span className='font-extrabold'>{userData.loyaltyPoints.toFixed(1)}</span>
                                </p>
                            </div>

                            <div className="p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={userData.avatar}
                                        alt="Profile"
                                        className="w-24 h-24 border-2 border-gray-400/50 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg text-dark">{userData.username}</h3>
                                        <p className="text-gray-400">{userData.email}</p>
                                        <p className="text-gray-400">{userData.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm mb-1 text-gray-500 flex justify-between items-center px-1">
                                        <p>Playbox Rated:</p>
                                        <p className='font-bold text-secondary'>—{userData.playboxRated}</p>
                                    </p>
                                    <div className={`p-3 border ${getRatingColor(userData.playboxRated)} border-opacity-50 bg-opacity-10 `}>
                                        <p className="text-sm">
                                            <span className='font-extrabold'>TIP:</span> Attend more Playbox events and play more games to level up!
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm mb-1 text-dark flex items-center justify-between px-1">
                                        <span>Loyalty Points</span>
                                        <span>{userData.loyaltyPoints}</span>
                                    </p>
                                    <div className="p-3 border border-yellow-500 border-opacity-50 bg-opacity-10">
                                        <p className="text-sm text-yellow-500">
                                            <span className='font-extrabold'>TIP:</span> Purchase products to earn more points that can be redeemed for rewards!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Addresses */}
                        <AddressManagement
                            expandedSection={expandedSection}
                            toggleSection={toggleSection}
                            userData={userData}
                            setUserData={setUserData}
                        />

                        {/* Gaming Socials */}
                        {/* <div className="bg-white overflow-hidden shadow-lg border border-secondary mt-6">
                            <div
                                className="bg-secondary px-4 py-3 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection('socials')}
                            >
                                <div className="flex items-center gap-2">
                                    <IoGameController size={20} />
                                    <h4 className="font-bold">Gaming Socials</h4>
                                </div>
                                {expandedSection === 'socials' ?
                                    <ChevronDown size={20} /> :
                                    <ChevronRight size={20} />
                                }
                            </div>

                            {expandedSection === 'socials' && (
                                <div className="p-4">
                                    {userData.gamingSocials && userData.gamingSocials.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-3">
                                            {userData.gamingSocials.map(social => (
                                                <div key={social._id} className="bg-gray-700 rounded-lg p-3">
                                                    <p className="font-medium">{social.platform}</p>
                                                    {social.whatsapp && <p className="text-sm">{social.whatsapp}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-gray-400">
                                            <p>No gaming socials added yet</p>
                                        </div>
                                    )}

                                    <button className="mt-3 flex items-center gap-2 text-[#0690f3] hover:text-blue-400 transition-colors">
                                        <Plus size={16} />
                                        <span className="text-sm">Add Gaming Social</span>
                                    </button>
                                </div>
                            )}
                        </div> */}
                    </div>

                    {/* Orders and Cart Section */}
                    <div className="lg:col-span-2">
                        {/* Orders */}
                        <div className="bg-white rounded-sm overflow-hidden shadow-lg border border-primary mb-6">
                            <div
                                className="bg-primary px-4 py-3 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection('orders')}
                            >
                                <div className="flex items-center gap-2">
                                    <Package size={20} />
                                    <h3 className="font-bold">My Orders</h3>
                                </div>
                                {expandedSection === 'orders' ?
                                    <ChevronDown size={20} /> :
                                    <ChevronRight size={20} />
                                }
                            </div>

                            <div className="p-4">
                                {orders.length > 0 ? (
                                    <div className="max-h-196 overflow-y-auto">
                                        {orders.map((order, index) => {
                                            let opacity = 1; // Default to solid

                                            if (order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered') {
                                                opacity = 1; // Solid if not cancelled or delivered
                                            } else {
                                                // Calculate how recent the order is (0 = newest, 1 = oldest)
                                                const maxOrders = orders.length;
                                                const age = index / (maxOrders > 1 ? maxOrders - 1 : 1);
                                                // Interpolate from bright to dim
                                                opacity = 1 - (age * 0.5);
                                            }

                                            return (
                                                <div
                                                    key={order._id}
                                                    className={`mb-4 last:mb-0 p-4 border-l-4 text-black border mr-2
                                                        ${order.orderStatus === 'completed' ? 'border-green-500' :
                                                            order.orderStatus === 'processing' ? 'border-blue-500' :
                                                                order.orderStatus === 'shipped' ? 'border-purple-500' :
                                                                    order.orderStatus === 'delivered' ? 'border-green-500' :
                                                                        order.orderStatus === 'cancelled' ? 'border-red-500' :
                                                                            'border-yellow-500'
                                                        }`}
                                                    style={{ opacity: opacity }}
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="font-bold">Order #{order._id.slice(-6)}</h3>
                                                            <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-sm text-xs font-medium ${order.orderStatus === 'completed' ? 'bg-green-900 text-green-300' :
                                                            order.orderStatus === 'processing' ? 'bg-blue-900 text-blue-300' :
                                                                order.orderStatus === 'shipped' ? 'bg-purple-900 text-purple-300' :
                                                                    order.orderStatus === 'delivered' ? 'bg-green-900 text-white' :
                                                                        order.orderStatus === 'cancelled' ? 'bg-red-900 text-red-300' :
                                                                            'bg-yellow-900 text-yellow-300'
                                                            }`}>
                                                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <p className="text-sm text-gray-400 mb-1">Items:</p>
                                                        {order.products.map((product, i) => (
                                                            <div key={i} className={`flex items-center gap-2 py-2 border-b my-2 px-1
                                                                ${order.orderStatus === 'completed' ? 'border-green-400' :
                                                                    order.orderStatus === 'processing' ? 'border-blue-400' :
                                                                        order.orderStatus === 'shipped' ? 'border-purple-400' :
                                                                            order.orderStatus === 'delivered' ? 'border-green-400' :
                                                                                order.orderStatus === 'cancelled' ? 'border-red-400' :
                                                                                    'border-yellow-400'
                                                                }`}>
                                                                <div className="w-15 h-15 rounded-md flex items-center justify-center">
                                                                    <img src={product.imgUrl} alt={product.name} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm">{product.name}</p>
                                                                    <p className="text-sm">Quantity: {product.quantity}</p>
                                                                    <p className="text-sm">Unit Price: <span className='text-secondary font-extrabold'>Ksh. {product.price.toLocaleString()}</span></p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex justify-between items-center border-t border-gray-600/20 pt-3">
                                                        <div>
                                                            <p className="text-xs text-gray-400">Payment Method:</p>
                                                            <p className="text-sm uppercase flex items-center gap-4 my-2">{order.paymentMethod} {order.paymentMethod === "mpesa" && <span className='lowercase bg-green-500 px-2 flex items-center gap-1 rounded-sm text-white'><CircleCheck size={13} /> Completed</span>}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">Total:</p>
                                                            <p className="text-lg font-bold">KSh {order.total.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <Package size={40} className="mx-auto mb-3 opacity-50" />
                                        <p>No orders yet</p>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Games Played */}
                        {/* <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 mt-6">
                            <div
                                className="bg-[#031d5c] px-4 py-3 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection('games')}
                            >
                                <div className="flex items-center gap-2">
                                    <IoGameController size={20} />
                                    <h2 className="font-bold">Games Played</h2>
                                </div>
                                {expandedSection === 'games' ?
                                    <ChevronDown size={20} /> :
                                    <ChevronRight size={20} />
                                }
                            </div>

                            {expandedSection === 'games' && (
                                <div className="p-4">
                                    {userData.gamesPlayed && userData.gamesPlayed.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                            {userData.gamesPlayed.map((game, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-700 p-4 rounded-lg flex items-center gap-3"
                                                >
                                                    <div className="w-12 h-12 bg-[#031d5c] rounded-lg flex items-center justify-center">
                                                        <IoGameController size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium capitalize">{game.category}</p>
                                                        <p className="text-sm text-gray-400">ID: {game.productId}</p>
                                                        {game.color && <p className="text-xs text-gray-400">Color: {game.color}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <IoGameController size={40} className="mx-auto mb-3 opacity-50" />
                                            <p>No games played yet</p>
                                            <p className="text-sm mt-2">Play games to improve your Playbox Rating!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='bg-gray-100 text-white min-h-100 p-4 md:p-8 flex flex-col justify-center items-center'>
            <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1746184527/eggman_1_unbnxr.png" alt="" className='h-50' />
            <h1 className="text-2xl font-bold mt-4 text-gray-400">Dashboard</h1>
            <p className="text-gray-400 mt-2 flex items-center text-center justify-center max-md:flex-col">
                Please Login/Sign Up to Access Dash!. Don't forget to refresh.
                <RefreshCcw size={15}/>
            </p>
            <div className="flex gap-4 mt-4">
                <button onClick={handleLoginToggle} className="px-8 py-2 border-2 border-secondary text-secondary font-bold cursor-pointer">Login</button>
                <button onClick={handleSignUpToggle} className="px-8 py-2 border-2 border-primary text-primary font-bold cursor-pointer">Sign Up</button>
            </div>
        </div>
    );
}