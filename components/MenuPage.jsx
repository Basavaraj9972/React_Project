import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [relatedRestaurants, setRelatedRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Fetch menus for the selected restaurant
    fetch(`http://localhost:8080/api/menus/getMenu?restaurantId=${restaurantId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Menu fetch error:", err));

    // Fetch all restaurants to find current and similar ones
    fetch("http://localhost:8080/api/restaurant/allrestuarant", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find(r => r.restaurantId == restaurantId);
        setRestaurant(selected);
        const related = data.filter(r =>
          r.restaurantId != restaurantId && r.cuisinType === selected.cuisinType
        );
        setRelatedRestaurants(related);
      })
      .catch((err) => console.error("Restaurant fetch error:", err));
  }, [restaurantId]);

  return (
    <div className="container mt-4">
      {restaurant && (
        <>
          <h2 className="fw-bold">{restaurant.name} - Menu</h2>
          <p className="text-muted">{restaurant.cuisinType}</p>
          <hr />
        </>
      )}
      
      <div className="row">
        {menus.map((menu) => (
          <div key={menu.menuId} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={menu.imagepath}
                className="card-img-top"
                alt={menu.name}
                style={{ height: "160px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{menu.name}</h5>
                <p className="card-text">{menu.description}</p>
                <p className="fw-bold">₹{menu.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <h4 className="fw-semibold">You may also like</h4>
      <div className="row">
        {relatedRestaurants.map((r) => (
          <div key={r.restaurantId} className="col-md-3 mb-3">
            <div className="card h-100">
              <img
                src={r.imagePath}
                className="card-img-top"
                alt={r.name}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="text-muted">{r.cuisinType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
