import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import { saveAuthToStorage } from "../../../redux/userSlice";
import "./Register.css";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = import.meta.env.VITE_SERVER_URL;

const Register = ({ onClose, onLogin }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        avatar: null,
        termsAccepted: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: ""
    });
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    // Access cart and wishlist from Redux state
    const cart = useSelector((state) => state.products.cart);
    const wishlist = useSelector((state) => state.products.wishlist);

    const avatars = [
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/smile_uxvv67.jpg",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/astro-kratos_egjz48.png",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/axe_svnmzd.jpg",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938819/bmw_o1erp5.png",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938819/joker_cyxum7.jpg",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938819/girl_x4mpzx.jpg",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/peter_qizvfd.jpg",
        "https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938818/roblox_wubln5.png",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarClick = (avatar) => {
        setFormData({ ...formData, avatar });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateForm = () => {
        const newFieldErrors = {
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            termsAccepted: ""
        };
        let isValid = true;

        if (!formData.username) {
            newFieldErrors.username = "Username is required";
            isValid = false;
        }

        if (!formData.phone) {
            newFieldErrors.phone = "Phone number is required";
            isValid = false;
        }

        if (!formData.email) {
            newFieldErrors.email = "Email address is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newFieldErrors.email = "Email address is invalid";
            isValid = false;
        }

        if (!formData.password) {
            newFieldErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newFieldErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newFieldErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newFieldErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        if (!formData.termsAccepted) {
            newFieldErrors.termsAccepted = "You must accept the Terms & Conditions";
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(""); // Clear any previous API errors
        setLoading(true);

        const isValid = validateForm();

        if (!isValid) {
            toast.error("Please fix the errors before submitting.");
            setLoading(false);
            return;
        }

        // Prepare data for submission, including cart and wishlist
        const payload = {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            avatar: formData.avatar,
            cart: cart || [],
            favorites: wishlist || [],
        };

        try {
            const response = await fetch(`${API_URL}/playbox_user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            setLoading(false);
            const result = await response.json();

            if (response.ok) {
                dispatch(
                    saveAuthToStorage({
                        user: {
                            username: formData.username,
                            avatar: result.data.avatar,
                            email: formData.email,
                            phone: formData.phone,
                            cart: cart || [],
                            favorites: wishlist || [],
                            verified: false,
                            token: result.data.token,
                            expiresIn: result.data.expiresIn,
                        },
                    })
                );

                setUser({
                    username: formData.username,
                    avatar: formData.avatar,
                });

                setSuccess(true);
            } else {
                setApiError(result.message || result.error || "An error occurred.");
                toast.error(result.message || result.error || "An error occurred.");
            }
        } catch (error) {
            setLoading(false);
            setApiError("An error occurred. Please try again later.");
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="register-auth-popup-overlay" onClick={onClose}>
            <div className="register-auth-popup" onClick={(e) => e.stopPropagation()}>
                <button className="register-close-btn" onClick={onClose}>
                    &times;
                </button>
                {/* Left Section: Image Slider */}
                <div className="register-banner">
                    <div className="slider">
                        <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743938538/ghost_jdkhdq.jpg" alt="Banner 1" />
                    </div>
                </div>

                {/* /* Right Section */}
                {success ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="register-success-message"
                        >
                            <img src="/gif/check-primary.gif" alt="Success" />
                            <h1>Account Created Successfully!</h1>
                            <p>Glad to have you onboard, <strong>{user?.username} </strong>!</p>
                            {user?.avatar && (
                                <motion.img
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    src={user.avatar}
                                    alt="User Avatar"
                                    className="user-avatar"
                                />
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                            >
                                Great
                                <i className="fa fa-thumbs-up"></i>
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>

                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="register-form"
                    >
                        <h1>
                            <span>Create</span> an Account
                        </h1>
                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="api-error-container"
                            >
                                <p>{apiError}</p>
                            </motion.div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {/* Username Field with Error Handling */}
                            <div className={`sign-up-input-group border py-2 px-3 text-gray-700 ${fieldErrors.username ? 'has-error input-error' : ''}`}>
                                <i className="fa fa-user"></i>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {fieldErrors.username && <div className="register-error-message">{fieldErrors.username}</div>}

                            {/* Email Field with Error Handling */}
                            <div className={`sign-up-input-group border py-2 px-3 text-gray-700 ${fieldErrors.email ? 'has-error input-error' : ''}`}>
                                <i className="fa fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {fieldErrors.email && <div className="register-error-message">{fieldErrors.email}</div>}

                            {/* Phone Field with Error Handling */}
                            <div className={`sign-up-input-group border py-2 px-3 text-gray-700 ${fieldErrors.phone ? 'has-error input-error' : ''}`}>
                                <i className="fa fa-phone"></i>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Phone Number (Recommended)"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {fieldErrors.phone && <div className="register-error-message">{fieldErrors.phone}</div>}

                            {/* Password Field with Error Handling */}
                            <div className="register-input-group">
                                <div className="flex flex-col">
                                    <div className={`sign-up-input-group border py-2 px-3 text-gray-700 ${fieldErrors.password ? 'has-error input-error' : ''}`}>
                                        <i className="fa fa-lock"></i>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        <i
                                            className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                    {fieldErrors.password && <div className="register-error-message">{fieldErrors.password}</div>}
                                </div>

                                <div className="flex flex-col">
                                    <div className={`sign-up-input-group border py-2 px-3 text-gray-700 ${fieldErrors.confirmPassword ? 'has-error input-error' : ''}`}>
                                        <i className="fa fa-lock"></i>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                        <i
                                            className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                    {fieldErrors.confirmPassword && <div className="register-error-message">{fieldErrors.confirmPassword}</div>}
                                </div>
                            </div>


                            {/* Avatar Selection */}
                            <h3>Choose an Avatar</h3>
                            <div className="avatar-selection">
                                {avatars.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        className={`avatar ${formData.avatar === avatar ? "selected" : ""
                                            }`}
                                        onClick={() => handleAvatarClick(avatar)}
                                    />
                                ))}
                            </div>

                            {/* Terms & Conditions with Error Handling */}
                            <div className={`mb-3 flex items-center gap-2 ${fieldErrors.termsAccepted ? 'has-error' : ''}`}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    onChange={(e) =>
                                        setFormData({ ...formData, termsAccepted: e.target.checked })
                                    }
                                />
                                <label htmlFor="terms">
                                    I agree to the <a href="#" className="text-secondary">Terms & Conditions</a>
                                </label>
                            </div>
                            {fieldErrors.termsAccepted && <div className="register-error-message">{fieldErrors.termsAccepted}</div>}

                            <button className="sign-up-submitt-button" type="submit" disabled={loading}>
                                {loading ? (
                                    <Bars
                                        height="20"
                                        width="40"
                                        color="#ffffff"
                                        ariaLabel="loading"
                                    />
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            <div className="mt-4 flex items-center gap-4">
                                Have an acoount?
                                <button
                                    onClick={() => {
                                        onClose()
                                        onLogin()
                                    }}
                                    className="bg-blue-900 py-1 px-6 cursor-pointer"
                                >
                                    Login
                                </button>
                            </div>

                            {/* Error Container */}
                            {/* {errors.length > 0 && (
                                <div className="sign-up-error-message">
                                    <p>Please fix the following errors to continue:</p>
                                    <ul>
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}

                            {/* Success Pop-Up */}
                            {success && (
                                <div className="success-popup">
                                    <div className="success-message">
                                        <img src="/auth/success.gif" alt="Success" />
                                        <p>Account Created Successfully!</p>
                                        <button onClick={() => setSuccess(false)}>OK</button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Register;
