import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Package, Receipt, User, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);


  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Access the order data from navigation state
  const orderData = location.state?.order?.data || {};
  const { order, user, loyaltyPointsAwarded } = orderData;

  // Format date
  const orderDate = order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';

  // Get number of products
  const productsCount = order?.products?.length || 0;

  // Countdown timer for redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect when countdown reaches 0
      // navigate('/');
    }
  }, [countdown, navigate]);

  // If no order data is available, redirect to home
  useEffect(() => {
    if (!order) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [order, navigate]);

  const confettiVariants = {
    initial: { opacity: 0, y: -10 },
    animate: i => ({
      opacity: [0, 1, 0],
      y: [0, 100],
      x: i % 2 === 0 ? [0, 20, -20, 0] : [0, -20, 20, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        delay: i * 0.1
      }
    })
  };

  const Confetti = ({ count = 30 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={confettiVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0"
          style={{
            left: `${Math.random() * 100}%`,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            background: i % 3 === 0 ? '#0690f3' : i % 3 === 1 ? '#ef3563' : '#031d5c',
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );

  const gamingQuotes = [
    "Victory Royale: Your order is confirmed!",
    "Mission Accomplished: Your gaming gear is on the way!",
    "Achievement Unlocked: Successful Purchase!",
    "New Quest Started: Wait for Delivery!",
    "Power-Up Acquired: Order Confirmed!"
  ];

  const randomQuote = gamingQuotes[Math.floor(Math.random() * gamingQuotes.length)];

  // If no order data found
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Order Data Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your order information. Redirecting to home...</p>
          <div className="inline-block bg-gray-200 text-gray-600 text-lg px-3 py-1 rounded-full">
            {countdown}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <Confetti />

      <div className="bg-whiteshadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left side - Success message and order details */}
          <div className="w-full md:w-3/5 max-md:p-4 lg:p-20 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="bg-green-100 p-3 rounded-full mr-4"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-green-600">Order Confirmed!</h1>
                  <p className="text-gray-600">{randomQuote}</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#031d5c]/5 p-6 mb-8"
              >
                <h2 className="text-lg font-semibold text-[#031d5c] mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Order Number</span>
                    <span className="font-medium">{order._id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{orderDate}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium capitalize">{order.orderStatus}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Items</span>
                    <span className="font-medium">{productsCount}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium capitalize">
                      {order.paymentMethod === 'mpesa' ? <p className='text-green-600 font-bold'>M-Pesa</p> : order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-800 font-semibold">Total</span>
                    <span className="text-[#031d5c] font-bold">Ksh {order.total}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-[#ef3563]/10 p-4 mb-6 mt-5 flex items-center"
              >
                <div>
                  <p className="font-medium">
                    EXPECT <span className='font-extrabold text-secondary'>SAME DAY DELIVERY</span> FOR ORDERS AROUND NAIROBI AND IT'S OUTSKIRTS
                  </p>
                  <p className="text-sm">
                    For Deliveries Outside Nairobi Expect Products in roughly 24hrs (Next Day Delivery).
                  </p>
                </div>
              </motion.div>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">What happens next?</h3>
                <div className="flex items-start">
                  <div className="bg-[#0690f3]/10 p-2 rounded-full mr-3">
                    <Receipt className="h-5 w-5 text-[#0690f3]" />
                  </div>
                  <div>
                    <p className="font-medium">Receipt Sent</p>
                    <p className="text-sm text-gray-600">We've sent a receipt to {user.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#0690f3]/10 p-2 rounded-full mr-3">
                    <Package className="h-5 w-5 text-[#0690f3]" />
                  </div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-gray-600">Your order status is currently <span className="font-medium capitalize">{order.orderStatus}</span></p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#0690f3]/10 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-[#0690f3]" />
                  </div>
                  <div>
                    <p className="font-medium">Shipping Details</p>
                    <p className="text-sm text-gray-600">
                      Shipping to: {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}, {order.shippingAddress?.address}
                      {order.shippingAddress?.apartment && `, ${order.shippingAddress.apartment}`}, {order.shippingAddress?.city}
                    </p>
                  </div>
                </div>
              </motion.div>

              {loyaltyPointsAwarded > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#ef3563]/10 p-4 my-6 flex items-center"
                >
                  <Star className="h-5 w-5 text-[#ef3563] mr-3" />
                  <div>
                    <p className="font-medium">Loyalty Points Earned!</p>
                    <p className="text-sm">
                      You earned {loyaltyPointsAwarded} points from this purchase.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 flex items-center justify-center py-3 px-6 bg-primary text-white font-bold hover:bg-[#0680d8] transition-colors cursor-pointer active:bg-[#0670c8] touch-auto"
                >
                  <Package className="h-5 w-5 mr-2" />
                  Dashboard
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/products')}
                  className="flex-1 flex items-center justify-center py-3 px-6 text-secondary font-bold hover:bg-[#ef3563]/20 transition-colors border-2 border-secondary cursor-pointer active:bg-[#ef3563]/30 touch-auto"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Continue Shopping
                  {countdown > 0 && (
                    <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {countdown}
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>Having trouble with your order? <a href="/support" className="text-[#0690f3] hover:underline">Contact our support team</a></p>
            </div>
          </div>

          {/* Right side - Image and user info */}
          <div className="max-w-xl h-screen md:w-2/5 bg-gradient-to-br from-[#d40a3d] to-[#ef3563] overflow-hidden max-md:static fixed right-0 max-md:pb-30 max-md:h-auto">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="h-full flex flex-col items-center justify-center text-white p-8 relative">
              {/* Show user info if available */}

              <div className="flex items-center mb-9">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="p-3 rounded-full mr-2"
                >
                  <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1745656618/playbox_ngofr5.png" alt="logo" className='h-15 rounded-full' />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Playbox</h1>
                  <p className="text-white">Gamers Republic</p>
                </div>
              </div>

              {/* Gaming character diving toward cart image */}
              <motion.div
                initial={{ y: -100, x: 50, opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  duration: 1.5,
                  delay: 0.4
                }}
                className="w-full max-w-xs mb-6"
              >
                <img
                  src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1745754160/fortnite-cart_fswafx.png"
                  alt="Character diving toward shopping cart"
                  className="w-full h-auto"
                />
              </motion.div>


              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className=" bg-white/10 backdrop-blur-sm py-2 px-10 rounded-full mb-6"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    {user.avatar && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/40/40"; // Fallback
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-bold">{user.username}</p>
                      <p className="text-sm opacity-80">Playbox Rating: <span className='font-extrabold'>{user.playboxRated}</span> </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-3">Ready. Set. Game!</h2>
                <p className="mb-6 opacity-90">
                  Your gaming upgrade is confirmed and will soon be in your hands!
                </p>

                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <p className="text-sm">
                    "The best part of a purchase is the anticipation of your
                    new gear arriving. It's like waiting for a new game release,
                    but better!" — Gamer Wisdom
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}