import { hydrateCartFromLocalStorage, selectCartLength, selectCartTotal, clearCart } from '../../redux/cartSlice';
import { loadUserFromStorage, saveAuthToStorage, toggleLogin, toggleSignup } from '../../redux/userSlice';
import { Banknote, ChevronDown, CreditCard, Phone } from 'lucide-react';
import ContactUsPopup from '../../components/ContactUsPopup/ContactUsPopup';
import RefundPolicyPopup from '../policies/RefundPolicy';
import Register from '../auth/register/Register';
import { MpesaPayment } from './components/mpesa/Mpesa'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Login from '../auth/login/Login';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './checkout.css';
import TermsPopup from '../policies/TermsofUse';
import PrivacyPopup from '../policies/PrivacyPolicy';

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
    postalCode: '',
    specialInstructions: '',
  });
  const [shippingMethod, setShippingMethod] = useState('within');
  const [specialDeliveryNote, setSpecialDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [transactionData, setTransactionData] = useState(null);


  const [savedShippingAddresses, setSavedShippingAddresses] = useState([]);
  const [savedBillingAddresses, setSavedBillingAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [showShippingForm, setShowShippingForm] = useState(true);
  const [showBillingForm, setShowBillingForm] = useState(false);

  // ✅ Get all product categories at once
  const allProducts = useSelector((state) => state.products);
  const navigate = useNavigate();

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
  const stateProducts = useSelector((state) => state.products);

  const serverURL = import.meta.env.VITE_SERVER_URL;
  //------- POLICIES 
  const [showRefundPopup, setShowRefundPopup] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleOpenPopup = () => setShowContactPopup(true);
  const handleClosePopup = () => setShowContactPopup(false);

  //------------ Load user data on mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(hydrateCartFromLocalStorage());
  }, [dispatch]);

  // Fetch user addresses when component mounts and user exists
  useEffect(() => {
    if (user && user.email) {
      fetchUserAddresses(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to your cart before checking out.");
      navigate('/products');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array so it only runs once on mount

  //---------- Function to fetch user addresses from server
  const fetchUserAddresses = async (email) => {
    try {
      const response = await fetch(`${serverURL}/playbox_user/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Set saved addresses
        setSavedShippingAddresses(data.data.shippingAddresses || []);
        setSavedBillingAddresses(data.data.billingAddresses || []);

        // Set default selections if addresses exist
        if (data.data.shippingAddresses && data.data.shippingAddresses.length > 0) {
          // setSelectedShippingAddress(data.data.shippingAddresses[0]);
          setShowShippingForm(false);
        }

        // Pre-fill user contact info if available
        if (data.data.email) setEmail(data.data.email);
        if (data.data.phoneNumber) setPhone(data.data.phoneNumber);
      }
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    }
  };

  // Function to handle selecting a shipping address
  const handleSelectShippingAddress = (address) => {
    setSelectedShippingAddress(address);
    setShippingAddress({
      country: 'Kenya',
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      apartment: address.apartment,
      city: address.city,
      postalCode: address.postalCode
    });
  };

  // Function to handle selecting a billing address
  const handleSelectBillingAddress = (address) => {
    setSelectedBillingAddress(address);
    setBillingAddress({
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      apartment: address.apartment,
      city: address.city,
      postalCode: address.postalCode,
      phone: address.phone || ''
    });
  };

  //---------Handle Auth Pop-ups
  const handleSignUpToggle = () => dispatch(toggleSignup());
  const handleLoginToggle = () => dispatch(toggleLogin());


  // Get cart items with product details from global products
  const cartWithDetails = cartItems.map((cartItem) => {
    const allProducts = Object.values(stateProducts).flat();

    const product = allProducts.find((p) => p.productID === cartItem.productId);

    if (!product) return null;

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
  const handleOrderSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Use selected shipping address if available, otherwise use form data
      const finalShippingAddress = selectedShippingAddress
        ? {
          ...selectedShippingAddress,
          email: (user && showContactForm) ? user.email : email,
          phone: (user && showContactForm) ? user.phone : phone
        }
        : {
          ...shippingAddress,
          email: (user && showContactForm) ? user.email : email,
          phone: (user && showContactForm) ? user.phone : phone
        };

      // Determine billing address based on selection
      let finalBillingAddress = finalShippingAddress;

      if (useDifferentBilling) {
        finalBillingAddress = selectedBillingAddress || billingAddress;
      }

      const orderData = {
        user: user && showContactForm ? user : { email: email, phone: phone },
        items: cartWithDetails,
        shippingAddress: finalShippingAddress,
        billingAddress: finalBillingAddress,
        newsUpdates,
        shippingMethod,
        paymentMethod,
        specialDeliveryNote,
        transactionData,
        total: totalWithShipping,
        contactEmail: (user && showContactForm) ? user.email : email,
        contactPhone: (user && showContactForm) ? user.phone : phone,
      };

      // Rest of the function remains the same
      const response = await fetch(`${serverURL}/playbox_order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const responseData = await response.json();
      console.log(`responseData`, responseData);

      if (response.ok) {
        dispatch(
          saveAuthToStorage({
            user: {
              username: responseData.data.user.username,
              avatar: responseData.data.user.avatar,
              email: responseData.data.user.email,
              phone: responseData.data.user.phone,
              cart: responseData.data.user.cart || [],
              favorites: responseData.data.user.favorites || [],
              verified: responseData.data.user.verified,
              token: responseData.data.token,
              expiresIn: responseData.data.expiresIn,
            },
          })
        );

        setOrderStatus('success');
        toast.success("Order placed successfully!")
        dispatch(clearCart());
        navigate('/checkout/success', { state: { order: responseData } });
      } else {
        const errorData = await response.json();
        setOrderStatus('failed');
        toast.error(errorData.message || 'Order submission failed')
        setFormErrors([errorData.message || 'Order submission failed']);
      }
    } catch (err) {
      setOrderStatus('failed');
      setFormErrors(['An unexpected error occurred. Please Check your internet or contact support.']);
      toast.error('An unexpected error occurred.')
      toast.error('Please Check internet or contact support')
      console.error('Order submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedShippingAddress && !showShippingForm) {
      toast.error("Please select a delivery address or fill in the form.")
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fix errors in the form to continue")
      return;
    }


    const selectedMethod = paymentMethod || 'mpesa';

    if (selectedMethod === 'mpesa') {
      setShowMpesaPopup(true);
    } else {
      setPaymentStatus(true);
      handleOrderSubmit();
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
          <a href='/'>
            <img src="/primary-logo.png" alt="" />
          </a>
          <div className="checkout-page-header-icons">
            <button onClick={handleOpenPopup}>
              <i className="fas fa-headset" title='contact'></i>
            </button>
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
                  <div>
                    <input
                      className={`checkout-input ${formErrors.phone ? 'error' : ''}`}
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (Recommended)"
                      required
                    />
                    {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
                  </div>
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

              {/* Display saved shipping addresses if available */}
              {user && savedShippingAddresses.length > 0 && (
                <div className="saved-addresses-container">
                  <h3>Your Saved Addresses(Please Select One)</h3>
                  <div className="saved-addresses-list">
                    {savedShippingAddresses.map((address, index) => (
                      <div
                        key={index}
                        className={`saved-address ${selectedShippingAddress === address ? 'selected' : ''}`}
                        onClick={() => handleSelectShippingAddress(address)}
                      >
                        <p><strong>{address.firstName} {address.lastName}</strong></p>
                        <p>{address.address}</p>
                        <p>{address.apartment}</p>
                        <p>{address.city}, {address.postalCode}</p>
                        <p>{address.phone}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="toggle-form-btn"
                    onClick={() => setShowShippingForm(!showShippingForm)}
                  >
                    {showShippingForm ? 'Hide Form' : 'Add New Address'}
                  </button>
                </div>
              )}

              {/* Shipping address form */}
              {showShippingForm && (
                <div className="shipping-form">
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
                </div>
              )}
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


            {/* Billing Address Section */}
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
                    {/* Display saved billing addresses if available */}
                    {user && savedBillingAddresses.length > 0 && (
                      <div className="saved-addresses-container col-span-2 mb-4">
                        <h3>Your Saved Billing Addresses</h3>
                        <div className="saved-addresses-list">
                          {savedBillingAddresses.map((address, index) => (
                            <div
                              key={index}
                              className={`saved-address ${selectedBillingAddress === address ? 'selected' : ''}`}
                              onClick={() => handleSelectBillingAddress(address)}
                            >
                              <p><strong>{address.firstName} {address.lastName}</strong></p>
                              <p>{address.address}</p>
                              <p>{address.apartment}</p>
                              <p>{address.city}, {address.postalCode}</p>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="toggle-form-btn"
                          onClick={() => setShowBillingForm(!showBillingForm)}
                        >
                          {showBillingForm ? 'Hide Form' : 'Use New Billing Address'}
                        </button>
                      </div>
                    )}

                    {/* Show billing form if no saved address is selected or if user wants to enter a new one */}
                    {(showBillingForm || (!user || savedBillingAddresses.length === 0)) && (
                      <>
                        <div className="w-full">
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
                        <div className="w-full">
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
                        <div className="w-full">
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
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* /* Special Note/Delivery Instructions */}
            <section className="checkout-section">
              <h2>Special Note/Delivery Instructions</h2>
              <textarea
                className="border border-gray-200 outline-none p-3"
                placeholder="Add any special instructions for delivery (optional)"
                rows="4"
                style={{ width: '100%', resize: 'vertical' }}
                value={specialDeliveryNote}
                onChange={(e) => setSpecialDeliveryNote(e.target.value)}
              />
            </section>

            <button type="submit" disabled={isSubmitting} className="place-order-btn-lg" onClick={handleSubmit}>
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
            <span> <i className="fa fa-tags"></i>{cartLength} items</span> in your bag
          </p>
          <>
            <div className="checkout-cart-items">
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


        </div>

        <button type="submit" disabled={isSubmitting} className="place-order-btn-lg place-order-btn-lg-mobile" onClick={handleSubmit}>
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

      <div className='bg-black h-15 text-gray-400'>
        <div className='container p-4 flex justify-between max-md:flex-col'>
          <p>&copy; All right reserved. Playbox @2025</p>
          <div className='flex gap-2 max-md:flex-wrap max-md:mt-2 max-md:pb-25'>
            <button className='cursor-pointer' onClick={() => setShowRefundPopup(true)}>Refund Policy</button>|
            <button className='cursor-pointer' onClick={() => setShowTerms(true)}>Terms of Service</button>|
            <button className='cursor-pointer' onClick={() => setShowPrivacy(true)} >Privacy Policy</button>|
            <button className='cursor-pointer' onClick={handleOpenPopup} >Contact Us</button>|
            <a href='/faq'>FAQ</a>
          </div>
        </div>
      </div>
      {paymentStatus && isSubmitting && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-50 flex items-center justify-center'>
          <img src="/gif/circular-loaders.gif" alt="" className='h-50 max-md:h-20' />
        </div>
      )}
      {showRefundPopup && <RefundPolicyPopup onClose={() => setShowRefundPopup(false)} />}
      {showTerms && <TermsPopup onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPopup onClose={() => setShowPrivacy(false)} />}
      {isLoginOpen && <Login onClose={handleLoginToggle} onSignUp={handleSignUpToggle} />}
      {showContactPopup && <ContactUsPopup onClose={handleClosePopup} />}
      {isSignupOpen && <Register onClose={handleSignUpToggle} onLogin={handleLoginToggle} />}
      {showMpesaPopup && (
        <MpesaPayment
          onClose={() => setShowMpesaPopup(false)}
          total={totalWithShipping}
          setTransactionData={setTransactionData}
          setPaymentStatus={setPaymentStatus}
          handleOrderSubmit={handleOrderSubmit}
        />
      )}
    </section>
  );
}