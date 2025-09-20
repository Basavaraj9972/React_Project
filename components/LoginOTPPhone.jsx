import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../services/firebase";

const LoginOTPPhone = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // Generate reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  // Send OTP to Phone Number
  const sendOtp = async () => {
    if (phone.length < 10) {
      alert("Enter a valid phone number!");
      return;
    }
    try {
      setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      alert("OTP Sent Successfully!");
    } catch (error) {
      console.error("OTP Sending Error:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp || !confirmation) {
      alert("Enter OTP!");
      return;
    }
    try {
      const result = await confirmation.confirm(otp);
      alert(`OTP Verified! Welcome, ${result.user.phoneNumber}`);
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Phone OTP Authentication</h2>
      <input
        type="text"
        placeholder="Enter phone number (e.g. 9876543210)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginOTPPhone;
