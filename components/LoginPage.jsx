import { useState, useEffect } from "react";
import { sendOtp } from "../services/EmloyeeServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageType, setOtpMessageType] = useState("success"); // "success" or "error"

  function sendOtpTOEmail() {
    if (!email.trim()) {
      setEmailMessage("❌ Please enter an email address.");
      return;
    }

    sendOtp(email)
      .then((response) => {
        console.log(response.data);
        setOtpSent(response.data);
        setAttempts(0); // Reset attempts when a new OTP is sent
        setIsBlocked(false);
        setOtpMessage("✅ OTP sent to your email.");
        setOtpMessageType("success");

        // Clear OTP message after 5 seconds
        
      })
      .catch((error) => {
        setEmailMessage("❌ Invalid email ID.");
        console.error(error);
      });
  }

  const handleSendOtp = (e) => {
    e.preventDefault();
    sendOtpTOEmail();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (isBlocked) return;

    console.log("Entered OTP: " + otp + " | Sent OTP: " + otpSent);

    if (String(otp).trim() === String(otpSent).trim()) {
      setOtpMessage("✅ OTP Verified! Login Successful.");
      setOtpMessageType("success");

      // Clear OTP message after 5 seconds
      setTimeout(() => {
        setOtpMessage("");
      }, 5000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsBlocked(true);
        setOtpMessage("❌ Too many failed attempts! Please request a new OTP.");
        setOtpMessageType("error");
        setOtpSent("");

        // Clear error message after 5 seconds
        setTimeout(() => {
          setOtpMessage("");
          setOtpMessage("");
          setOtp("");
          setEmail("");
        }, 5000);
      } else {
        setOtpMessage(`❌ Invalid OTP. You have ${3 - newAttempts} attempts left.`);
        setOtpMessageType("error");
      }
    }
  };

  // Clear email error message after 5 seconds
  useEffect(() => {
    if (emailMessage) {
      const timer = setTimeout(() => {
        setEmailMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailMessage]);

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <h3 className="card-title text-center">Login</h3>
            <form>
              <div className="form-group mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Show email error message below input */}
                {emailMessage && <p style={{ color: "red", marginTop: "5px" }}>{emailMessage}</p>}
              </div>

              <button className="btn btn-primary" onClick={handleSendOtp}>
                Send OTP
              </button>

              {/* OTP Message Section */}
              {otpMessage && (
                <p
                  style={{
                    color: otpMessageType === "success" ? "green" : "red",
                    marginTop: "10px",
                  }}
                >
                  {otpMessage}
                </p>
              )}

              {otpSent && !isBlocked && (
                <>
                  <div className="form-group mt-3">
                    <label>OTP:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-success mt-2" onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
