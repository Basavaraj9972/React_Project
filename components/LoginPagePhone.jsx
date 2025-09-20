import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // const [restaurants, setRestaurants] = useState([]);

  // Fetch authenticated user details on mount
  useEffect(() => {
    axios.get("http://localhost:8080/auth/user", { withCredentials: true }) 
      .then(response => {
        setUser(response.data);
        if (response.data) {
          document.write(response.data.email);
          document.write(response.data.name);
          document.write(response.data.picture);
          navigate("/restaurants"); // Redirect to dashboard if user is logged in
        }
      })
      .catch(() => setUser(null));
     
      // fetch("http://localhost:8080/api/restaurant/allrestuarant", {
      //   method: "GET",
      //   credentials: "include",
      // })
      //   .then((res) => {
      //     if (!res.ok) {
      //       throw new Error(`HTTP error! Status: ${res.status}`);
      //     }
      //     return res.text();
      //   })
      //   .then((text) => {
      //     if (!text) {
      //       throw new Error("Empty response from server");
      //     }
      //     return JSON.parse(text);
      //   })
      //   .then((data) => setRestaurants(data))
      //   .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle Google login
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google"; // Redirect to Google login
  };

  // Handle Google logout
  const handleLogout = () => {
    axios.post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/"); // Redirect to login page after logout
      })
      .catch(error => console.error("Logout failed", error));
  };

  return (
    <div style={styles.container}>
      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleLogout} style={styles.buttonLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login with Google</h2>
          <button onClick={handleLogin} style={styles.buttonLogin}>Sign in with Google</button>
        </>
      )}
    </div>
    
    
    
  );
}

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
  },
  buttonLogout: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  }
};

export default LoginPage;
