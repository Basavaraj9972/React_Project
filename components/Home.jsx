import React, { useState } from "react";
import {
  loginByUserNamePassword,
  loginByEmailPassword,
  loginByEmailPin,
  loginByPhonePin,
} from "../services/useService.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// Create refs for each OTP input

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("emailPassword");
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    pin: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [step, setStep] = useState("start"); // start -> otp -> pin
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const otpRefs = useRef([]);
  const [timer, setTimer] = useState(60);  // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);  // controls resend button

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const handleOtpChange = (value, index) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);
  // };

       const handleOtpChange = (value, idx) => {
        // Only allow digits
        if (/^\d?$/.test(value)) {
          const newOtp = [...otp];
          newOtp[idx] = value;
          setOtp(newOtp);

          // Auto-focus next
          if (value && idx < otp.length - 1) {
            otpRefs.current[idx + 1]?.focus();
          }
        }
      };

    const handleOtpKeyDown = (e, idx) => {
    // On backspace in an empty box, move focus backwards
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };
      const startTimer = () => {
        setTimer(60);         // Reset timer
        setCanResend(false);  // Disable resend initially
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              setCanResend(true);  // Enable resend after timeout
            }
            return prev - 1;
          });
        }, 1000);
      };

      // const handleOtpChange = (value, idx) => {
      //   if (/^\d?$/.test(value)) {
      //     const newOtp = [...otp];
      //     newOtp[idx] = value;
      //     setOtp(newOtp);

      //     // Focus next input if not the last and value is not empty
      //     if (value && idx < otp.length - 1) {
      //       otpRefs.current[idx + 1]?.focus();
      //     }
      //   }
      // };

  const handleLogin = async () => {
    try {
      let response;

      if (loginMethod === "usernamePassword") {
        response = await loginByUserNamePassword(credentials);
      } else if (loginMethod === "emailPassword") {
        response = await loginByEmailPassword(credentials);
      } else if (loginMethod === "emailPin") {
        response = await loginByEmailPin(credentials);
      } else if (loginMethod === "phonePin") {
        response = await loginByPhonePin(credentials);
      }

      if (response?.data.message === "Login successful") {
        setMessage(response.data.message);
        sessionStorage.setItem("loginMethod", "not_google");
        navigate("/restaurants");
      } else {
        setMessage(response?.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      setMessage(response.data.message);
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/SignUp_Existing_User_Checking", {
        username: credentials.username,
        email: credentials.email,
      });

      if (response.data.message === "OTP sent to email.") {
        setStep("otp");
        setMessage("OTP sent to your email.");
        startTimer();  // start countdown
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage("Signup failed.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await axios.post(
    "http://localhost:8080/api/user/verify-otp",
    null, // No request body
    {
      params: {
        email: credentials.email,
        otp: otp.join(""),
      },
    }
  );
      if (response.data === true) {
        setStep("pin");
        setMessage("OTP verified. Please set your PIN.");
      } else {
        setMessage("Invalid OTP.");
      }
    } catch (err) {
      setMessage("OTP verification failed.");
    }
  };

  const handlePinSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/RegisterByUserNameEmail", {
        email: credentials.email,
        username:credentials.username,
        pin: credentials.pin,
      });

      setMessage(response.data.message || "PIN set.");
      setIsSignup(false);
      setStep("start");
    } catch (err) {
      setMessage("Failed to set PIN.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>

        {!isSignup && (
          <>
            <select
              className="w-full p-2 border rounded mb-4"
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
            >
              <option value="emailPassword">Email & Password</option>
              <option value="phonePin">Phone & PIN</option>
              <option value="emailPin">Email & PIN</option>
              <option value="usernamePassword">Username & Password</option>
            </select>

            {(loginMethod === "emailPassword" || loginMethod === "emailPin") && (
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            {loginMethod === "phonePin" && (
              <input
                type="text"
                name="phone"
                value={credentials.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            {loginMethod === "usernamePassword" && (
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            {(loginMethod === "emailPassword" ||
              loginMethod === "usernamePassword") && (
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            {(loginMethod === "phonePin" || loginMethod === "emailPin") && (
              <input
                type="password"
                name="pin"
                value={credentials.pin}
                onChange={handleChange}
                placeholder="Enter your PIN"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            <button
              onClick={handleLogin}
              className="w-full p-2 bg-red-500 text-white rounded mt-4"
            >
              Sign In
            </button>
          </>
        )}

        {isSignup && step === "start" && (
          <>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleSignupSubmit}
              className="w-full p-2 bg-blue-500 text-white rounded mt-2"
            >
              Send OTP
            </button>
          </>
        )}

        {isSignup && step === "otp" && (
          <>
            <div className="gap-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  style={{ width: "50px", height: "50px",marginRight:'10px' }}
                  className="text-center border rounded text-lg"
                />
              ))}
            </div><br></br>
            <div className="text-center text-sm text-gray-600 mb-2">
              {canResend ? (
                <button
                  className="text-blue-600 underline"
                  onClick={handleSignupSubmit}
                >
                  Resend OTP
                </button>
              ) : (
                <span>Resend available in <b>{timer}</b> seconds</span>
              )}
            </div>

            <button
              onClick={handleOtpVerify}
              className="w-full p-2 bg-green-500 text-white rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {isSignup && step === "pin" && (
          <>
            <input
              type="password"
              name="pin"
              value={credentials.pin}
              onChange={handleChange}
              placeholder="Set your PIN"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handlePinSubmit}
              className="w-full p-2 bg-purple-600 text-white rounded"
            >
              Set PIN
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="w-full p-2 bg-gray-400 text-white rounded mt-4"
        >
          Sign Out
        </button>

        <p
          className="text-center text-blue-600 mt-4 cursor-pointer"
          onClick={() => {
            setIsSignup(!isSignup);
            setStep("start");
            setMessage("");
          }}
        >
          {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
