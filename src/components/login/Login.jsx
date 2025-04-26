import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { Bars } from "react-loader-spinner";
import { saveAuthToStorage } from "../../redux/userSlice";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_SERVER_URL;

const Login = ({ onClose, onSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!isForgotPassword && !formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/playbox_user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        }),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(
          saveAuthToStorage({
            user: {
              username: result.data.username,
              avatar: result.data.avatar,
              email: result.data.email,
              phone: result.data.phone,
              cart: result.data.cart || [],
              favorites: result.data.favorites || [],
              verified: result.data.verified,
              token: result.data.token,
              expiresIn: result.data.expiresIn,
            },
          })
        );

        toast.success("Login Successful")
        onClose();
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.message || "An error occurred." });
        }
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/playbox_password/requestPasswordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      console.log('TRY...')

      const result = await response.json();

      if (response.ok) {
        setErrors({});
        setIsEmailSent(true);
        toast.success("Password reset instructions have been sent to your email.");
      } else {
        setErrors({
          email: result.message || "Error sending password reset email."
        });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animated-background-overlay">
      <div className="auth-popup-overlay" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-fadeIn auth-popup"
        >
          <button className="text-4xl text-white absolute right-8 cursor-pointer" onClick={onClose}>
            &times;
          </button>
          <div className="flex gap-8">
            <div className="max-md:hidden">
              <img src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1743936148/fc25_ytr89z.jpg" alt="" className="w-200 h-full object-cover" />
            </div>
            {isEmailSent ? (
              <div className="h-full w-full lg:my-30">
                <div className="flex flex-col items-center justify-center ">
                  <img src="/gif/check-primary.gif" alt="Success" className="h-30"/>
                  <p className="text-2xl text-center">Password reset instructions have been sent to your email.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="header-image">
                  <img src="/favicon.png" alt="" />
                </div>
                <h2>{isForgotPassword ? "Forgot Password" : "Account Login"}</h2>
                <p className="auth-description">
                  Ready Player One? Log in to access your inventory, track your quests, and stay updated on the latest gaming loot drops. No cheat codes required!
                </p>

                {errors.general && (
                  <div className="text-red-500 mb-4 animate-fadeIn font-bold">
                    {errors.general}
                  </div>
                )}

                <form
                  onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}
                  className="login-input-form"
                >
                  <div className={`input-group border py-2 px-3 text-gray-400 ${errors.email ? 'border-red-500' : ''}`}>
                    <i className="fa fa-user"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1 mb-2 animate-fadeIn">
                      {errors.email}
                    </div>
                  )}

                  {!isForgotPassword && (
                    <>
                      <div className={`input-group border py-2 px-3 text-gray-400 ${errors.password ? 'border-red-500' : ''}`}>
                        <i className="fa fa-lock"></i>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <i
                          className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} cursor-pointer`}
                          onClick={togglePasswordVisibility}
                        ></i>
                      </div>
                      {errors.password && (
                        <div className="text-red-500 text-sm mt-1 mb-2 animate-fadeIn">
                          {errors.password}
                        </div>
                      )}

                      <div className="remember-me">
                        <label>
                          <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                          /> Remember me
                        </label>
                        <a
                          href="#"
                          className="forgot-password"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsForgotPassword(true);
                            setErrors({});
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="submit-btn flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Bars
                        height="20"
                        width="40"
                        color="#ffffff"
                        ariaLabel="loading"
                      />
                    ) :
                      <span>
                        {isForgotPassword ? "Send Reset Link" : "Login"}
                      </span>
                    }

                  </button>
                </form>

                {isForgotPassword ? (
                  <button
                    onClick={() => setIsForgotPassword(false)}
                    className="create-account-btn mt-4"
                  >
                    Back to Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose()
                      onSignUp()
                    }}
                    className="create-account-btn"
                  >
                    Create an Account
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;