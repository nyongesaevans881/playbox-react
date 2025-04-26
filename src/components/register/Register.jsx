import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import { saveAuthToStorage } from "../../redux/userSlice";
import "./Register.css";

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
    const [errors, setErrors] = useState([]);
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
        const validationErrors = [];

        if (!formData.username) validationErrors.push("Username is required.");
        if (!formData.email) validationErrors.push("Email address is required.");
        if (!formData.password) validationErrors.push("Password is required.");
        if (!formData.confirmPassword)
            validationErrors.push("Confirm Password is required.");
        if (formData.password !== formData.confirmPassword)
            validationErrors.push("Passwords do not match.");
        if (!formData.termsAccepted)
            validationErrors.push("You must accept the Terms & Conditions.");

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        const validationErrors = validateForm();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
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
                setErrors([result.message || "An error occurred."]);
                if (result.error) {
                    setErrors([result.error] || "Unknown Error Occurred");
                }
            }
        } catch (error) {
            setLoading(false);
            setErrors(["An error occurred. Please try again later."]);
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

                {/* Right Section */}
                {success ? (
                    <div className={success ? "register-success-message register-scale" : "register-success-message"}>
                        <img src="/gif/check-primary.gif" alt="Success" />
                        <h1>Account Created Successfully!</h1>
                        <p>Glad to have you onboard, <strong>{user?.username} </strong>!</p>
                        {user?.avatar && (
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="user-avatar"
                            />
                        )}
                        <button onClick={onClose}>
                            Great
                            <i className="fa fa-thumbs-up"></i>
                        </button>
                    </div>
                ) : (
                    <div className="register-form">
                        <h1>
                            <span>Create</span> an Account
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="sign-up-input-group border py-2 px-3 text-gray-700">
                                <i className="fa fa-user"></i>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="sign-up-input-group border py-2 px-3 text-gray-700">
                                <i className="fa fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="sign-up-input-group border py-2 px-3 text-gray-700">
                                <i className="fa fa-phone"></i>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number (Recommended)"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="register-input-group">
                                <div className="sign-up-input-group border py-2 px-3 text-gray-700">
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
                                <div className="sign-up-input-group border py-2 px-3 text-gray-700">
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

                            <div className="mb-3 flex items-center gap-2">
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
                            {errors.length > 0 && (
                                <div className="sign-up-error-message">
                                    <p>Please fix the following errors to continue:</p>
                                    <ul>
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
