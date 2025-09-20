import { Ban, FileX, MousePointerBan, PointerOffIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { loginByUserNameEmailPassword } from "../services/useService";
import axios from "axios";

const SignIn = () => {
  // const [form, setForm] = useState({
  //   emailOrUsername: "",
  //   password: "",
  // });
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });

  // const location = useLocation();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
  });

  useEffect(() => {
    const fetchAndLogoutIfNeeded = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/message", {
          method: "GET",
          credentials: "include",
        });
        const msg = await res.text();

        if (msg) {
          setMessage(msg);

          alert(msg);
          // const isPresentGoogleToken = sessionStorage.getItem("googletokenExist");
          const isPresentGoogleToken = localStorage.getItem("googletokenExist");
          // alert(isPresentGoogleToken);

          // Check condition properly
          if (isPresentGoogleToken !== "true") {
            // Call logout endpoint and clear storage before redirect
            // alert("hi");
            // alert(isPresentGoogleToken);
            try {
              const logoutMessage = await axios.post(
                "http://localhost:8080/auth/logoutGoogle_Auth",
                {},
                { withCredentials: true }
              );
              localStorage.clear();
              sessionStorage.clear();
              console.log(logoutMessage);
              window.location.href =
                "https://accounts.google.com/Logout?continue=https://www.google.com/";
              //   window.open(
              //   "https://accounts.google.com/Logout",
              //   "_blank",
              //   "width=500,height=600"
              // );
              //   setTimeout(() => {
              //     window.location.href = "http://localhost:3000/signin";
              //   }, 2000);
              //  window.location.href =  "https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/signin";
              // alert("Logout success: " + JSON.stringify(logoutMessage.data));
            } catch (error) {
              console.error("Logout failed:", error);
              alert(
                "Logout failed: " + (error?.response?.data || error.message)
              );
            }
          }
        }
      } catch (err) {
        console.error("Error fetching auth message or logging out:", err);
      }
    };

    fetchAndLogoutIfNeeded();
  }, []);

  //   const handleLogout = async () => {
  //        try {
  //             await axios.post("http://localhost:8080/auth/logoutGoogle", {}, { withCredentials: true });
  //             // await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
  //             // Clear cookies and local storage
  //             // window.location.href = "https://accounts.google.com/logout";
  //             localStorage.clear();
  //             sessionStorage.clear();
  //             alert("google logout calling");

  //   // Redirect to Google logout (logs user out of all Google services)
  //   window.location.href = "https://accounts.google.com/logout";
  //             // setUser(null);
  //             // Redirect to Google logout URL
  //             // window.location.href = "https://accounts.google.com/Logout?continue=https://www.google.com/";
  //           } catch (error) {
  //             console.error("Logout failed", error);
  //           }

  // };

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

  // Handle Google login
  const handleLoginGoogle = () => {
    // Sign In Page
    document.cookie = "oauth_source=signin; path=/";
    window.location.href = "http://localhost:8080/oauth2/authorization/google"; // Redirect to Google login
  };

  // const handleChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    // const { name, value } = e.target;
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // { ...credentials, [e.target.name]: e.target.value }

    if (e.target.name === "password") {
      const errorMsg = validatePassword(e.target.value);
      setErrors((prev) => ({ ...prev, password: errorMsg }));
    }
  };

  const isFormValid = () => {
    return (
      credentials.emailOrUsername.trim() !== "" &&
      credentials.password.trim() !== "" &&
      errors.password === ""
    );
  };

  const handleLogin = async () => {
    try {
      // alert(credentials.password);
      let response;
      response = await loginByUserNameEmailPassword(credentials);
      // alert(response.data.message);
      if (response?.data.message === "Login successful") {
        setMessage(response.data.message);
        sessionStorage.setItem("loginMethod", "not_google");
        navigate("/restaurants");
      } else {
        setMessage(response?.data.message || "Login failed");
      }
      alert(response.data.message);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    handleLogin();
    //  let response;
    // try{
    //   response = await loginByUserNameEmailPassword(form);

    // } catch (error) {
    //   console.error("Login error:", error);
    //   setMessage("Login failed. Please try again.");
    // }
    // alert("Sign Up successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign In To Your Account
        </h2>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
        <div className="min-h-screen flex items-center justify-center bg-gray-500 p-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col items-center"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold"
                  htmlFor="emailOrUsername"
                >
                  Email or Username
                </label>
                <br></br>
                <input
                  style={{
                    width: "30vw",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  id="emailOrUsername"
                  name="emailOrUsername"
                  type="text"
                  value={credentials.emailOrUsername}
                  onChange={handleChange}
                  placeholder="Enter your email or username"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#578af8ff";
                    e.target.style.boxShadow = "0 0 0 3px #c9d3f0ff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ccc";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
              </div>

              <div className="mb-4 relative w-full">
                <label className="block mb-2 font-semibold" htmlFor="password">
                  Password
                </label>
                <br></br>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    width: "30vw",
                    padding: "8px",
                    paddingRight: "48px", // for show/hide icon space
                    border: `1px solid ${errors.password ? "#f87171" : "#ccc"}`, // red if error
                    borderRadius: "4px",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.password
                      ? "#f87171"
                      : "#2daaf1";
                    e.target.style.boxShadow = errors.password
                      ? "0 0 0 3px #fecaca" // light red
                      : "0 0 0 3px #91a8f0"; // light blue
                    e.target.style.outline = "none";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password
                      ? "#f87171"
                      : "#ccc";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  style={{ marginLeft: "-40px", border: "none" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fa-regular ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
                <div
                  style={{
                    marginTop: "10px",
                    color: "#1A67FF",
                    cursor: "Pointer",
                  }}
                >
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
                  <Link
                    to="/forgetPassword"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forget password
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                onClick={handleSubmit}
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
                // className={`mt-6 w-full p-3 rounded text-white font-semibold ${
                // isFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                // }`}
              >
                SIGN IN
              </button>
            </form>
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
              Sign in with Google
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
export default SignIn;
