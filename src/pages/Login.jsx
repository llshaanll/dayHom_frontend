// Login.jsx

import React, { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [otp, setOTP] = useState('');
  const [verified, setVerified] = useState(false);

  // Send OTP
  const handleSend = (e) => {
    e.preventDefault();
    if (!contact || !role) {
      return alert('Please enter contact number and select a role');
    }

    const payload = {
      contact: contact.toString(), // Ensure it's a string
      role: role.toString(),
    };

    console.log('Sending OTP payload:', payload); // Debug log

    axios
      .post('http://localhost:4000/auth/send-otp', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('Send OTP response:', res.data); // Debug log
        if (res.data.success) {
          setOtpSent(true);
        } else {
          alert(res.data.message || 'Failed to send OTP');
        }
      })
      .catch((err) => {
        console.error('Error sending OTP:', err);
        console.error('Error response:', err.response?.data); // More detailed error
        alert(err.response?.data.message);
      });
  };

  const [isVerifying, setIsVerifying] = useState(false); // Add this state

  // Verify OTP
  const handleVerify = (e) => {
    e.preventDefault();
    
    // Prevent double submissions
    if (isVerifying) {
      console.log('Already verifying, ignoring click');
      return;
    }
    
    if (!otp || otp.length < 4) {
      return alert('Please enter a valid OTP');
    }

    setIsVerifying(true); // Set verifying state

    // Ensure all values are strings and trim whitespace
    const payload = {
      contact: contact.toString().trim(),
      otp: otp.toString().trim(),
      role: role.toString().trim(),
    };

    console.log('=== FRONTEND VERIFICATION START ===');
    console.log('Verifying OTP payload:', payload); // Debug log
    console.log('OTP type:', typeof payload.otp, 'OTP value:', payload.otp); // Type check

    axios
      .post('http://localhost:4000/auth/verify-otp', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data) {
          setVerified(true);
          navigate(`/${role.toLowerCase()}/panel`);
        } else {
          alert(res.data.message || 'Invalid OTP');
          setTimeout(() => {
            setOtpSent(false);
            setOTP('');
            setContact('');
            setRole('');
          }, 1500); // Reset with a slight delay
        }
      })
      .catch((err) => {
        console.error('Error verifying OTP:', err);
        console.error('Error response:', err.response?.data); // More detailed error
        alert('Error verifying OTP');
      })
      .finally(() => {
        setIsVerifying(false); // Reset verifying state
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-orange-500">
      <div className="border-4 h-[200px] w-[400px] m-5 rounded-[50px] bg-white hover:shadow-xl/20 duration-300 group relative">
        <form
          className="absolute p-5 rounded-[45px] inset-1 flex flex-col gap-5 items-center justify-around"
          onSubmit={(e) => e.preventDefault()} // Just in case someone presses enter
        >
          {/* Role Selection */}
          <div className="flex absolute top-[-50px] w-full justify-around">
            {['Admin', 'Manager', 'Employee'].map((r) => (
              <label key={r} className="flex items-center gap-1">
                <input
                  className="accent-black"
                  type="radio"
                  name="role"
                  checked={role === r}
                  value={r}
                  onChange={(e) => setRole(e.target.value)}
                />
                {r}
              </label>
            ))}
          </div>

          {/* Contact Input */}
          <Input
            placeholder="Enter Contact Number"
            maxLength={13}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* Animate OTP Input if otpSent */}
          <AnimatePresence>
            {otpSent && (
              <motion.div
                key="otp-input"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Input
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    // Ensure only numbers are entered
                    const value = e.target.value.replace(/\D/g, '');
                    setOTP(value);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          {!otpSent ? (
            <button
              onClick={handleSend}
              type="button"
              className="border-1 rounded-full hover:bg-white hover:text-black bg-black text-white duration-200 w-full h-10"
            >
              Send OTP
            </button>
          ) : (
            <button
              onClick={handleVerify}
              type="button"
              disabled={isVerifying} // Disable when verifying
              className={`border-1 rounded-full ${
                isVerifying 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'hover:bg-white hover:text-black bg-black text-white'
              } duration-200 w-full h-10`}
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
          )}

          {/* Success message */}
          {verified && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-green-600 text-center font-bold"
            >
              OTP Verified Successfully
            </motion.h1>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;