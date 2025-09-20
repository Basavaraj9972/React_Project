import { FileX } from "lucide-react";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const SignUp = () => {
  const [step, setStep] = useState("start"); // start -> otp -> password
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const otpRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    pin: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateUsername = (name) => {
    const regex = /^[a-zA-Z]{3,16}$/;
    return regex.test(name);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/\d/.test(password)) errors.push("one digit");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("one special character");

    return errors.length > 0
      ? `Password must contain ${errors.join(", ")}.`
      : "";
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      const errorMsg = validatePassword(e.target.value);
      setErrors((prev) => ({ ...prev, password: errorMsg }));
      // alert(errors.password)
    }
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setErrors((prev) => ({ ...prev, email: "Email should not empty" }));
      } else if (!validateEmail(e.target.value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
    if (e.target.name === "username") {
      if (e.target.value === "") {
        setErrors((prev) => ({
          ...prev,
          username: "User name should not empty",
        }));
      } else if (!validateUsername(e.target.value)) {
        setErrors((prev) => ({
          ...prev,
          username:
            "Username must be 3–16 letters only (no digits or symbols).",
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    }
  };

  // Handle Google login
  const handleLoginGoogle = () => {
    // Sign Up Page
    document.cookie = "oauth_source=signup; path=/";
    window.location.href = "http://localhost:8080/oauth2/authorization/google"; // Redirect to Google login
  };

  const handleOtpChange = (value, idx) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < otp.length - 1) {
        otpRefs.current[idx + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSignupSubmit = async () => {
    try {
      if (credentials.email === "" && credentials.username === "") {
        alert("Please Enter user name and email");
      } else if (credentials.email === "") {
        alert("Please enter email");
      } else if (credentials.username === "") {
        alert("Please Enter user name");
      } else {
        const response = await axios.post(
          "http://localhost:8080/auth/SignUp_Existing_User_Checking",
          {
            username: credentials.username,
            email: credentials.email,
          }
        );

        if (response.data.message === "OTP sent to email.") {
          setStep("otp");
          setMessage("OTP sent to your email.");
          startTimer();
        } else {
          setMessage(response.data.message);
        }
      }
    } catch (err) {
      setMessage("Signup failed.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/verify-otp",
        null,
        {
          params: {
            email: credentials.email,
            otp: otp.join(""),
          },
        }
      );
      if (response.data === true) {
        setStep("password");
        setMessage("OTP verified. Please set your Password.");
      } else {
        setMessage("Invalid OTP.");
      }
    } catch (err) {
      setMessage("OTP verification failed.");
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      if (credentials.password === "" && credentials.confirmpassword === "") {
        alert("Please enter password and confirm password");
      } else if (credentials.password === "") {
        alert("Plese enter password");
      } else if (credentials.confirmpassword === "") {
        alert("Please enter confirm password");
      } else if (
        credentials.password != "" &&
        credentials.confirmpassword != "" &&
        credentials.password != credentials.confirmpassword
      ) {
        alert("Pass do not match");
      } else if (credentials.password === credentials.confirmpassword) {
        const response = await axios.post(
          "http://localhost:8080/auth/RegisterByUserNameEmail",
          {
            email: credentials.email,
            username: credentials.username,
            password: credentials.password,
          }
        );

        setMessage(response.data.message || "Password set.");
        setStep("start");
        alert(response.data.message);
        navigate("/signin");
      }
    } catch (err) {
      setMessage("Failed to set PASSWORD.");
    }
  };

  const isFormValid = () => {
    return (
      credentials.email.trim() !== "" && credentials.username.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
        <div className="min-h-screen flex items-center justify-center bg-gray-500 p-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            {step === "start" && (
              <form noValidate className="flex flex-col items-center">
                <div className="mb-4">
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="username"
                  >
                    UserName*
                  </label>
                  <br></br>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    style={{
                      width: "30vw",
                      padding: "8px",
                      border: `1px solid ${errors.username ? "red" : "#ccc"}`, // red if error
                      borderRadius: "6px",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => {
                      if (errors.username) {
                        e.target.style.borderColor = "red";
                        e.target.style.boxShadow = "0 0 0 3px #f5a3a3"; // light red glow
                      } else {
                        e.target.style.borderColor = "#2daaf1"; // blue border
                        e.target.style.boxShadow = "0 0 0 3px #91a8f0"; // blue glow
                      }
                    }}
                    onBlur={(e) => {
                      if (errors.username) {
                        e.target.style.borderColor = "red"; // keep red if error
                      } else {
                        e.target.style.borderColor = "#ccc"; // default gray
                      }
                      e.target.style.boxShadow = "none"; // remove glow
                    }}
                    required
                  />

                  {errors.username && (
                    <p
                      style={{
                        color: "red",
                        whiteSpace: "wrap",
                        width: "30vw",
                      }}
                    >
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-semibold" htmlFor="email">
                    Email*
                  </label>
                  <br></br>
                  <input
                    style={{
                      width: "30vw",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    id="email"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2daaf1"; // blue
                      e.target.style.boxShadow = "0 0 0 3px #91a8f0"; // glow
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ccc"; // default gray
                      e.target.style.boxShadow = "none"; // remove glow
                    }}
                    placeholder="Enter your email"
                    required
                  />

                  {errors.email && (
                    <p
                      style={{
                        color: "red",
                        whiteSpace: "wrap",
                        width: "30vw",
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSignupSubmit}
                  disabled={!isFormValid()}
                  style={
                    isFormValid()
                      ? {
                          width: "30vw",
                          color: "white",
                          backgroundColor: "blue",
                          padding: "10px",
                          marginTop: "10px",
                          border: "none",
                          borderRadius: "5px",
                        }
                      : {
                          width: "30vw",
                          color: "black",
                          backgroundColor: "gray",
                          padding: "10px",
                          marginTop: "10px",
                          border: "none",
                          borderRadius: "5px",
                        }
                  }
                >
                  SEND OTP
                </button>
              </form>
            )}

            {step === "otp" && (
              <>
                <div className="flex justify-between gap-2 mb-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      onFocus={(e) => {
                        if (message === "Invalid OTP.") {
                          e.target.style.borderColor = "red";
                          e.target.style.boxShadow = "0 0 0 3px #f5a3a3"; // red glow
                        } else if (
                          message === "OTP verified. Please set your Password."
                        ) {
                          e.target.style.borderColor = "green";
                          e.target.style.boxShadow = "0 0 0 3px #90ee90"; // green glow
                        } else {
                          e.target.style.borderColor = "#2daaf1"; // blue
                          e.target.style.boxShadow = "0 0 0 3px #91a8f0"; // blue glow
                        }
                        e.target.style.outline = "none";
                      }}
                      onBlur={(e) => {
                        if (message === "Invalid OTP.") {
                          e.target.style.borderColor = "red";
                        } else if (
                          message === "OTP verified. Please set your Password."
                        ) {
                          e.target.style.borderColor = "green";
                        } else {
                          e.target.style.borderColor = "#ccc"; // default gray
                        }
                        e.target.style.boxShadow = "none";
                      }}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                        textAlign: "center",
                        border:
                          message === "Invalid OTP."
                            ? "1px solid red"
                            : message ===
                              "OTP verified. Please set your Password."
                            ? "1px solid green"
                            : "1px solid #ccc",
                        borderRadius: "6px",
                        fontSize: "1.125rem",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </div>
                <div className="text-start text-sm text-gray-600 mb-2">
                  {canResend ? (
                    <button
                      className="text-blue-600 underline"
                      onClick={handleSignupSubmit}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span>
                      Resend available in <b>{timer}</b> seconds
                    </span>
                  )}
                </div>
                <button
                  style={{
                    backgroundColor: "darkgoldenrod",
                    width: "30vw",
                    border: "none",
                    marginTop: "15px",
                  }}
                  onClick={handleOtpVerify}
                  className="w-full p-2 bg-green-500 text-white rounded"
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === "password" && (
              <>
                {/* <input
                  type="password"
                  name="pin"
                  value={credentials.pin}
                  onChange={handleChange}
                  placeholder="Set your PIN"
                  className="w-full p-2 border rounded mb-2"
                /> */}

                <div className="mb-4 relative w-full">
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="password"
                  >
                    Password*
                  </label>
                  <br></br>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    style={{ width: "30vw" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2daaf1ff"; // blue-800
                      e.target.style.boxShadow = "0 0 0 3px #91a8f0ff";
                      e.target.style.outline = "none";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ccc"; // back to normal
                      e.target.style.boxShadow = "none";
                    }}
                    className={`p-2 pr-12 border rounded w-full focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((show) => !show)}
                    style={{ marginLeft: "-40px", border: "none" }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={`fa-regular ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                  {errors.password && (
                    <p
                      style={{
                        color: "red",
                        whiteSpace: "wrap",
                        width: "30vw",
                      }}
                    >
                      {errors.password}
                    </p>
                  )}
                  <br></br>
                  <br></br>
                  <label
                    className="block mb-2 font-semibold"
                    htmlFor="password"
                  >
                    Confirm Password*
                  </label>
                  <br></br>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={credentials.confirmpassword}
                    onChange={handleChange}
                    placeholder="Enter your confirm password"
                    style={{ width: "30vw" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2daaf1ff"; // blue-800
                      e.target.style.boxShadow = "0 0 0 3px #91a8f0ff";
                      e.target.style.outline = "none";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ccc"; // back to normal
                      e.target.style.boxShadow = "none";
                    }}
                    className={`p-2 pr-12 border rounded w-full focus:outline-none focus:ring-2 ${
                      errors.password != ""
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    style={{ marginLeft: "-40px", border: "none" }}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={`fa-regular ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
                <button
                  style={{
                    backgroundColor: "green",
                    width: "30vw",
                    border: "none",
                  }}
                  onClick={handlePasswordSubmit}
                  className="w-full p-2 bg-green -600 text-white rounded"
                >
                  Set Password
                </button>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "25px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5>OR</h5>
            <br></br>
            <button onClick={handleLoginGoogle} style={styles.buttonLogin}>
              Sign Up with Google
            </button>
          </div>
        </div>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "100px",
  },
  buttonLogin: {
    padding: "10px 20px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    width: "30vw",
  },
  buttonLogout: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default SignUp;
