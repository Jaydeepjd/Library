import { useOutletContext } from "react-router-dom";
import "./../Style/home.css";
import RestaurantCard from "../Components/RestaurantCard";
import Carousel from "../Components/Carousuel";
const Home = () => {
  let { loading, restaurantData } = useOutletContext();
  return (
    <div className="home">
      <Carousel></Carousel>
      <h2 className="home__heading">
        Restaurants with online food delivery in Noida
      </h2>
      <div className="home__card-container">
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          restaurantData.map((res) => {
            return <RestaurantCard res={res} show={true}></RestaurantCard>;
          })
        )}
      </div>
    </div>
  );
};

export default Home;
