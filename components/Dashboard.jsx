import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent flickering while fetching data
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/auth/user", { withCredentials: true })
      .then(response => {
        setUser(response.data);
        // alert("Login Successfull");
        setLoading(false);
        sessionStorage.setItem("loginMethod", "google");
        // sessionStorage.setItem("googletokenExist", "true");
        localStorage.setItem("googletokenExist", "true");
        //  const isPresentGoogleToken = sessionStorage.getItem("googletokenExist");
        const isPresentGoogleToken = localStorage.getItem("googletokenExist");
        // alert(isPresentGoogleToken);
        navigate("/restaurants");
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  }, []);

  const handleLogout = async () => {
  try {
    await axios.post("http://localhost:8080/auth/logoutGoogle", {}, { withCredentials: true });
    // await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });

    // Clear cookies and local storage
    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    // Redirect to Google logout URL
    window.location.href = "https://accounts.google.com/Logout?continue=https://www.google.com/";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  

  if (loading) {
    return <h2 style={styles.loading}>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={styles.container}>
      <h2>Welcome, {user.name || "User"}!</h2>
      <p>Email: {user.email}</p>
      {user.picture && <img src={user.picture} alt="Profile" style={styles.image} />}
      <br /><br />
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
    
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "100px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#DB4437",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  },
  image: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "20px",
  }
};

export default Dashboard;
