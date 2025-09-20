import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurant/allrestuarant", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json() )
      .then((data) => setRestaurants(data) )
      .catch((err) => console.error("Error fetching data:", err));
        // if(res){
        //   alert("Login successfull");
        // }
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  const handleLogout = async () => {
    const method = sessionStorage.getItem("loginMethod");
    console.log("Logged in via:", method);
    
      if(method === "not_google"){
        try {
         await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
         localStorage.clear();
          sessionStorage.clear();
          navigate("/"); // ✅ Redirect to home page            
          alert("Logout successfull");

        } catch (error) {
          console.error("Logout failed", error);
        }
      }
      else if(method === "google"){
         try {
              await axios.post("http://localhost:8080/auth/logoutGoogle", {}, { withCredentials: true });
              // await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
              // Clear cookies and local storage
              
              localStorage.clear();
              sessionStorage.clear();
              localStorage.setItem("googletokenExist", "false");
              // setUser(null);
              // Redirect to Google logout URL
              window.location.href = "https://accounts.google.com/Logout?continue=https://www.google.com/";
            } catch (error) {
              console.error("Logout failed", error);
            }
      }
      
      // Optionally verify user is logged out
      // try {
      //   await axios.get("http://localhost:8080/auth/user", { withCredentials: true });
      //   console.log("Still logged in.");
      // } catch (error) {
      //   console.log("User is logged out.");
      // }
      // setUser(null);
      
  };

//    const handleLogout = async () => {
//   try {
//     await axios.post("http://localhost:8080/auth/logoutGoogle", {}, { withCredentials: true });
//     // await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });

//     // Clear cookies and local storage
//     localStorage.clear();
//     sessionStorage.clear();

//     setUser(null);
//     // Redirect to Google logout URL
//     window.location.href = "https://accounts.google.com/Logout?continue=https://www.google.com/";
//   } catch (error) {
//     console.error("Logout failed", error);
//   }
// };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded mt-4"
      >
        Sign Out
      </button>

      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {restaurants.map((restaurant) => (
            <div key={restaurant.restaurantId} className="col">
              <div
                className="p-3 shadow-lg rounded bg-white"
                style={{ cursor: "pointer" }}
                onClick={() => handleRestaurantClick(restaurant.restaurantId)}
              >
                <img
                  src={restaurant.imagePath}
                  alt={restaurant.name}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
                <div className="mt-2">
                  <h2 className="fs-5 fw-semibold">{restaurant.name}</h2>
                  <p className="fs-6 text-secondary">{restaurant.cuisinType}</p>
                  <div className="d-flex align-items-center gap-1 text-warning mt-1">
                    <Star size={16} />
                    <span className="fs-6 fw-medium">{restaurant.rating}</span>
                  </div>
                  <p className="fs-6 text-muted">ETA: {restaurant.eta} mins</p>
                  <p className="fs-6 fw-medium">{restaurant.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
