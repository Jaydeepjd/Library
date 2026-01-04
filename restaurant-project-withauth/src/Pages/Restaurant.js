import { useOutletContext, useParams } from "react-router-dom";
import "./../Style/restaurant.css";
import { useEffect, useState } from "react";
import MenuDataShow from "../Components/MenuItemSHow";
import RestaurantMenu from "../Components/RestaurantMenu";
const Restaurant = () => {
  const { resId } = useParams();
  const { restaurantData } = useOutletContext();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const foundRestaurantObj = restaurantData.find((e) => e._id === resId);
        // setRestaurant(foundRestaurantObj);
        const response = await fetch("http://localhost:3000/menu.json");
        const data = await response.json();
        setMenu(data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchApi = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/restaurant/${resId}`
        );
        const data = await response.json();
        setRestaurant(data.data.restaurant);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
    fetchData();
  }, [restaurantData]);
  console.log(restaurant);

  return (
    <div className="restaurant">
      <div className="restaurant__breadcrumb">
        <span>Home / Noida /{restaurant?.name}</span>
      </div>
      <div className="restaurant__container">
        <div className="restaurant__info">
          <p>{restaurant?.name}</p>
          <div className="restaurant__services">
            <p>Order Online</p>
            <p>DineOut</p>
          </div>
          {/* others Fields come here */}
        </div>
        <div className="restaurant__menu">
          {menu.map((menud) => {
            return <RestaurantMenu menud={menud}></RestaurantMenu>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
