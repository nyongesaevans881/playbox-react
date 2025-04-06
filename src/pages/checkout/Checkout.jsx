import { hydrateCartFromLocalStorage, selectCartLength, selectCartTotal } from '../../redux/cartSlice';
import { loadUserFromStorage, toggleLogin, toggleSignup } from '../../redux/userSlice';
import { Banknote, ChevronDown, CreditCard, Phone } from 'lucide-react';
import Register from '../../components/register/Register';
import { MpesaPayment } from './components/mpesa/Mpesa'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/login/Login';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './checkout.css';
import { Link } from 'react-router-dom';


export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsUpdates, setNewsUpdates] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    country: 'Kenya',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: ''
  });
  const [shippingMethod, setShippingMethod] = useState('within');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // ✅ Get all product categories at once
  const allProducts = useSelector((state) => state.products);

  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const cartTotal = useSelector(selectCartTotal);
  const cartLength = useSelector(selectCartLength);
  const isLoginOpen = useSelector((state) => state.user.isLoginOpen);
  const isSignupOpen = useSelector((state) => state.user.isSignUpOpen);
  const dispatch = useDispatch();

  const shippingCost = shippingMethod === 'within' ? 0 : 1000;
  const totalWithShipping = cartTotal + shippingCost;

  const [showMpesaPopup, setShowMpesaPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [showContactForm, setShowContactForm] = useState(!user);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //------------ Load user data on mount
  useEffect(() => {
    setIsClient(true);
    dispatch(loadUserFromStorage());
    dispatch(hydrateCartFromLocalStorage());
  }, [dispatch]);

  //---------Handle Auth Pop-ups
  const handleSignUpToggle = () => dispatch(toggleSignup());
  const handleLoginToggle = () => dispatch(toggleLogin());

  // Get cart items with product details from global products
  const cartWithDetails = cartItems.map((cartItem) => {
    const categoryProducts = allProducts[cartItem.category] || [];
    const product = categoryProducts.find((p) => p.productID === cartItem.productId);

    if (!product) return null; // Avoid errors if product is missing

    const colorImage = product.imageColorMap.find(
      (img) => img.color === cartItem.color
    );

    return {
      ...product,
      quantity: cartItem.quantity,
      color: cartItem.color,
      selectedImage: colorImage ? colorImage.image : product.mainproductImage,
    };
  }).filter(Boolean);

  // Valdate form 
  const validateForm = () => {
    const errors = {};

    // Contact validation
    if (!user && !email) errors.email = "Email is required.";
    if (!user && !phone) errors.phone = "Phone number is required.";

    // Shipping address validation
    if (!shippingAddress.firstName) errors.firstName = "First name is required.";
    if (!shippingAddress.apartment) errors.apartment = "Apartment or suite is required.";
    if (!shippingAddress.address) errors.address = "Address is required.";
    if (!shippingAddress.city) errors.city = "City is required.";

    // Payment method validation
    if (!paymentMethod) errors.paymentMethod = "Please select a payment method.";

    // Billing address validation if different
    if (useDifferentBilling) {
      if (!billingAddress?.firstName) errors.billingFirstName = "Billing first name is required.";
      if (!billingAddress?.lastName) errors.billingLastName = "Billing last name is required.";
      if (!billingAddress?.address) errors.billingAddress = "Billing address is required.";
      if (!billingAddress?.city) errors.billingCity = "Billing city is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  // Add this function to handle order submission
  const handleOrderSubmit = async (paymentData) => {
    try {
      setIsSubmitting(true);

      const orderData = {
        user: user?._id,
        items: cartWithDetails,
        shippingAddress: {
          ...shippingAddress,
          email: user?.email || email,
          phone: user?.phone || phone
        },
        billingAddress: useDifferentBilling ? billingAddress : shippingAddress,
        shippingMethod,
        paymentMethod,
        paymentDetails: {
          amount: paymentData.amount,
          phone: paymentData.phone,
          transactionId: paymentData.transactionId,
          method: 'mpesa'
        },
        total: totalWithShipping
      };

      const response = await fetch('http:localhost:5173/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setOrderStatus('success');
        // Clear cart and redirect to success page
      } else {
        const errorData = await response.json();
        setOrderStatus('failed');
        setFormErrors([errorData.message || 'Order submission failed']);
      }
    } catch (err) {
      setOrderStatus('failed');
      setFormErrors(['An unexpected error occurred']);
      console.error('Order submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fix errors in the form to continue")
      return;
    }

    const selectedMethod = paymentMethod || 'mpesa';

    if (selectedMethod === 'mpesa') {
      setShowMpesaPopup(true);
    }
  };


  const PaymentMethods = [
    {
      id: 'mpesa',
      title: 'Mpesa',
      icon: <Phone />,
      description: 'You will receive an M-Pesa prompt to complete your payment.',
      logos: [
        '/icons/payment/mpesa.png',
      ]
    },
    {
      id: 'cod',
      title: 'Cash on Delivery (COD)',
      icon: <Banknote />,
      description: 'Pay for your order upon delivery.'
    }
  ]

  const PaymentMethodsBackup = [
    {
      id: 'card',
      title: 'Pay With Card',
      icon: <CreditCard />,
      description: 'After clicking "Pay now", you will be redirected to Stripe to complete your purchase securely.',
      logos: [
        '/icons/payment/stripe.png',
        '/icons/payment/visa.png',
        '/icons/payment/mastercad.png',
      ]
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: <CreditCard />,
      description: 'After clicking "Pay now", you will be redirected to Paypal to complete your purchase securely.',
      logos: [
        '/icons/payment/paypal.png',
      ]
    },
    {
      id: 'mpesa',
      title: 'Mpesa',
      icon: <Phone />,
      description: 'You will receive an M-Pesa prompt to complete your payment.',
      logos: [
        '/icons/payment/mpesa.png',
      ]
    },
    {
      id: 'cod',
      title: 'Cash on Delivery (COD)',
      icon: <Banknote />,
      description: 'Pay for your order upon delivery.'
    }
  ]

  return (
    <section className="checkout-page-canvas">
      <div className="checkout-page-header">
        <div className="checkout-page-header-wrapper container">
          <Link href='/'>
            <img src="/primary-logo.png" alt="" />
          </Link>
          <div className="checkout-page-header-icons">
            <a href=""><i className="fas fa-headset" title='Need to ask something?'></i></a>
            <a href="/cart"><i className="fas fa-shopping-basket" title='Check your cart'></i></a>
          </div>
        </div>
      </div>
      <div className="checkout-container container">
        <div className="checkout-main">
          <div className="checkout-header">
            <h1>Contact Information</h1>
            {user ? (
              <></>
            ) : (
              <div className="checkout-auth-buttons">
                <button className="checkout-login-btn" onClick={() => handleLoginToggle()}>Log in</button>
                <button className="checkout-sign-up-btn" onClick={() => handleSignUpToggle()} >Sign Up</button>
              </div>
            )}
          </div>

          <form>
            {/* Contact Section */}
            {user && showContactForm ? (
              <div className="loggedin-user-info">
                <div className="loggedin-user-info-card">
                  <img
                    src={user.avatar || "/auth/avators/astro-kratos.png"}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                  <div className="loggedin-user-info-details">
                    <p>Username: <span>{user.username || "Username"}</span> </p>
                    <p>Email: <span>{user.email || "Email"}</span> </p>
                    <p>Phone: <span>{user.phone || "Phone Number"}</span> </p>
                  </div>
                </div>
                <div className="loggedin-alternative">
                  <label className="checkout-checkbox-label">
                    <input
                      className='checkout-input'
                      type="checkbox"
                      checked={showContactForm}
                      onChange={(e) => setShowContactForm(e.target.checked)}
                    />
                    Use different Details
                  </label>
                </div>
              </div>
            ) : (
              <section className="checkout-section">
                <div className="checkout-input-group">
                  <div className="checkout-input-singel">
                    <input
                      className={`checkout-input ${formErrors.email ? 'error' : ''}`}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </div>
                  <input
                    className={`checkout-input`}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (Recommended)"
                    required
                  />
                </div>
                <label className="checkout-checkbox-label">
                  <input
                    className='checkout-input'
                    type="checkbox"
                    checked={newsUpdates}
                    onChange={(e) => setNewsUpdates(e.target.checked)}
                  />
                  Email me with news and updates
                </label>

                {user && (
                  <label className="checkout-checkbox-label">
                    <input
                      className='checkout-input'
                      type="checkbox"
                      checked={showContactForm}
                      onChange={(e) => setShowContactForm(e.target.checked)}
                    />
                    Use Logged-in user info
                  </label>
                )}
              </section>
            )}

            {/* Delivery Section */}
            <section className="checkout-section">
              <h2>Delivery Address</h2>
              <select
                className='checkout-input'
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              >
                <option value="Kenya">Kenya</option>
              </select>

              <div className="chekout-name-group">
                <div className="checkout-input-singel">
                  <input
                    className={`checkout-input ${formErrors.firstName ? 'error' : ''}`}
                    type="text"
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                    placeholder="First Name"
                    required
                  />
                  {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
                </div>
                <input
                  className='checkout-input'
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                  placeholder="Last Name (optional)"
                  required
                />
                <div className="checkout-input-singel">
                  <input
                    className={`checkout-input ${formErrors.address ? 'error' : ''}`}
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    placeholder="Address"
                    required
                  />
                  {formErrors.address && <p className="error-message">{formErrors.address}</p>}
                </div>
                <div className="checkout-input-singel">
                  <input
                    className={`checkout-input ${formErrors.apartment ? 'error' : ''}`}
                    type="text"
                    value={shippingAddress.apartment}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                    placeholder="Apartment, suite, house no. etc."
                    required
                  />
                  {formErrors.apartment && <p className="error-message">{formErrors.apartment}</p>}
                </div>
                <div className="checkout-input-singel">
                  <input
                    className={`checkout-input ${formErrors.city ? 'error' : ''}`}
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    placeholder="City"
                    required
                  />
                  {formErrors.city && <p className="error-message">{formErrors.city}</p>}
                </div>
                <input
                  className='checkout-input'
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder="Postal Code"
                  required
                />

              </div>
            </section>

            {/* Shipping Method */}
            <section className="checkout-section">
              <h2>Shipping Method</h2>
              <div className="shipping-options">
                <label className={`shipping-option ${shippingMethod === 'within' ? 'selected' : ''}`}>
                  <div>
                    <input
                      className='checkout-input'
                      type="radio"
                      name="shipping"
                      value="within"
                      checked={shippingMethod === 'within'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                  </div>
                  <div className="option-content">
                    <span>Within Nairobi</span>
                    <span className="checkout-delivery-price">FREE</span>
                  </div>
                </label>

                <label className={`shipping-option ${shippingMethod === 'outside' ? 'selected' : ''}`}>
                  <div>
                    <input
                      className='checkout-input'
                      type="radio"
                      name="shipping"
                      value="outside"
                      checked={shippingMethod === 'outside'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                  </div>
                  <div className="option-content">
                    <span>Outside Nairobi [Courior]</span>
                    <span className="checkout-delivery-price">Ksh 1,000</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                {PaymentMethods.map((method, index) => (
                  <label
                    key={index}
                    className={`payment-option  ${paymentMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="option-header">
                      {method.icon}
                      <span>{method.title}</span>
                      {method.logos && (
                        <div className="payment-logos">
                          {method.logos.map((logo, index) => (
                            <img key={index} src={logo} alt="payment method" />
                          ))}
                        </div>
                      )}
                      <ChevronDown className={`chevron ${paymentMethod === method.id ? 'expanded' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {paymentMethod === method.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="payment-option-content"
                        >
                          <p>{method.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                ))}
              </div>
            </section>


            {/* Billing Address */}
            <section className="checkout-section">
              <h2>Billing Address</h2>
              <label className="checkout-checkbox-label">
                <input
                  className='checkout-input'
                  type="checkbox"
                  checked={!useDifferentBilling}
                  onChange={(e) => setUseDifferentBilling(!e.target.checked)}
                />
                Same as shipping address
              </label>

              <AnimatePresence>
                {useDifferentBilling && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="billing-form grid grid-cols-2 gap-x-4 items-start max-md:flex max-md:flex-col"
                  >
                    {/* Billing address form fields - similar to shipping address fields */}
                    <div>
                      <input
                        className={`checkout-input ${formErrors.billingFirstName ? 'error' : ''}`}
                        type="text"
                        value={billingAddress?.firstName || ''}
                        onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                        placeholder="First name"
                        required
                      />
                      {formErrors.billingFirstName && <p className="text-red-500 bg-red-500/20 font-bold py-1 px-2">{formErrors.billingFirstName}</p>}
                    </div>
                    <div>
                      <input
                        className={`checkout-input ${formErrors.billingLastName ? 'error' : ''}`}
                        type="text"
                        value={billingAddress?.lastName || ''}
                        onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                        placeholder="Last name"
                        required
                      />
                      {formErrors.billingLastName && <p className="text-red-500 bg-red-500/20 font-bold py-1 px-2">{formErrors.billingLastName}</p>}
                    </div>
                    <input
                      className={`checkout-input col-span-2 ${formErrors.billingLastName ? 'error' : ''}`}
                      type="text"
                      value={billingAddress?.address || ''}
                      onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                      placeholder="Address"
                      required
                    />
                    {formErrors.billingAddress && <p className="text-red-500 bg-red-500/20 font-bold py-1 px-2">{formErrors.billingAddress}</p>}
                    <input
                      className='col-span-2'
                      type="text"
                      value={billingAddress?.apartment || ''}
                      onChange={(e) => setBillingAddress({ ...billingAddress, apartment: e.target.value })}
                      placeholder="Apartment, Suite, etc.(optional)"
                      required
                    />
                    <div>
                      <input
                        className={`checkout-input ${formErrors.billingCity ? 'error' : ''}`}
                        type="text"
                        value={billingAddress?.city || ''}
                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                        placeholder="City/Town"
                        required
                      />
                      {formErrors.billingCity && <p className="text-red-500 bg-red-500/20 font-bold py-1 px-2">{formErrors.billingCity}</p>}
                    </div>
                    <input
                      className='checkout-input'
                      type="text"
                      value={billingAddress?.postalCode || ''}
                      onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                      placeholder="Postal Code (Optional)"
                      required
                    />
                    <input
                      className='col-span-2'
                      type="text"
                      value={billingAddress?.phone || ''}
                      onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                      placeholder="Phone (optional)"
                      required
                    />
                    {/* Add remaining billing address fields */}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <button type="submit" className="place-order-btn-lg" onClick={handleSubmit}>
              Place Order
            </button>

            {formErrors.length > 0 && (
              <div className="checkout-errors">
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <p className="checkout-items-count">
            <span> <i className="fa fa-tags"></i>{isClient ? cartLength : 0} items</span> in your bag
          </p>
          {isClient && (
            <>
              <div className="cart-items">
                {cartWithDetails.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="checkout-cart-image-container">
                      <span>{item.quantity}</span>
                      <img src={item.selectedImage} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3 className='leading-tight line-clamp-2'>{item.Title}</h3>
                      <p className='checkout-cart-items-basic-specs'>Color: <span>{item.color || item.defaultColor}</span></p>
                      <p className='checkout-cart-items-basic-specs'>Condition: <span>{item.condition || '42'}</span></p>
                      <p className="price">Ksh {item.nowPrice.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-totals">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span>Ksh {cartTotal.toLocaleString()}</span>
                </div>
                <div className="shipping">
                  <span>Shipping</span>
                  <span>Ksh {shippingCost.toLocaleString()}</span>
                </div>
                <div className="shipping">
                  <span>Taxes</span>
                  <span>Ksh 0</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span>Ksh {totalWithShipping.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}


        </div>

        <button type="submit" className="place-order-btn-lg place-order-btn-lg-mobile" onClick={handleSubmit}>
          Place Order
        </button>

        {formErrors.length > 0 && (
          <div className="checkout-errors checkout-error-mobile">
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isLoginOpen && <Login onClose={handleLoginToggle} onSignUp={handleSignUpToggle} />}
      {isSignupOpen && <Register onClose={handleSignUpToggle} onLogin={handleLoginToggle}/>}
      {showMpesaPopup && (<MpesaPayment onClose={() => setShowMpesaPopup(false)} total={totalWithShipping} onSuccess={handleOrderSubmit} />
      )}
    </section>
  );
}