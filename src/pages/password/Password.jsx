import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  // Check password strength
  useEffect(() => {
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/playbox_password/resetPassword`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 400) {
          toast.error(data.message);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
          return;
        }
        throw new Error(data.message || 'Failed to reset password');
      }
      
      setStatus('success');
      setMessage('Password reset successful! Redirecting to login...');
      
      // Redirect after successful reset
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const gamingQuotes = [
    "The best gamers don't just play, they respawn.",
    "Keep calm and game on.",
    "Life is short. Respawn and carry on.",
    "It's dangerous to forget your password. Take this reset!",
    "Player 1 Ready: New password loading..."
  ];
  
  const randomQuote = gamingQuotes[Math.floor(Math.random() * gamingQuotes.length)];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-[#031d5c] to-[#0690f3] p-8 flex items-center justify-center"
      >
        <div className="max-w-md text-center">
          <div className="relative mx-auto w-64 h-64 mb-6" style={{ position: 'relative' }}>
            {/* Placeholder for PS5 controller image */}
            <img 
              src="https://res.cloudinary.com/dnrlt7lhe/image/upload/v1745669152/image-removebg-preview_2_zghhh6.png" 
              alt="PS5 Controller" 
              className="object-contain"
            />
            <motion.div 
              animate={{ 
                boxShadow: ['0 0 0 0px rgba(255, 255, 255, 0.5)', '0 0 0 20px rgba(239, 53, 99, 0)'] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeOut" 
              }}
              className="absolute inset-0 rounded-full"
            />
          </div>
          
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Power Up Your Security</h2>
          <p className="text-blue-100 mb-6 text-lg">{randomQuote}</p>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-white text-sm">
              Level up your account security with a strong password. 
              It's your shield against the gaming world's dark forces!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 p-8 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary">Reset Password</h1>
            <p className="text-gray-600 mt-2">Create a new password for your PlayBox account</p>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{message}</span>
              </div>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{message}</span>
              </div>
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                <p className='text-gray-700'>New Password</p>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your new password"
                  required
                />
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Password strength:</span>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0 && "Weak"}
                      {passwordStrength === 1 && "Fair"}
                      {passwordStrength === 2 && "Good"}
                      {passwordStrength >= 3 && "Strong"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        passwordStrength === 0 ? "w-1/4 bg-red-500" : 
                        passwordStrength === 1 ? "w-2/4 bg-yellow-500" : 
                        passwordStrength === 2 ? "w-3/4 bg-blue-500" : 
                        "w-full bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              <p className='text-gray-700'>Confirm Password</p>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              
              {/* Password match indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center">
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-500">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0690f3] hover:bg-[#0680d8] focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-[#0690f3] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Processing..." : "Reset Password"}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a href="/dashboard" className="font-medium text-[#0690f3] hover:text-[#0680d8]">
                Back to login
              </a>
            </p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-xs text-center text-gray-500">
              By resetting your password, you agree to PlayBox's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}