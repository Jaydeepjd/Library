import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import "./../Style/search.css";
import PopularRestaurant from "../Components/PopularRestaurant";
import SearcheData from "../Components/SearcheData";

const Search = () => {
  let { restaurantData } = useOutletContext();
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const items = restaurantData.slice(0, 8);
  return (
    <div className="search">
      <div className="searchContainer">
        <input
          type="text"
          className="searchField"
          placeholder="Search Restaurants and Food"
        />
      </div>

      {isInputEmpty && (
        <>
          <h3 className="heading">Popular Restaurants</h3>
          <div className="searCuisineContainer">
            {items.map((res) => (
              <PopularRestaurant res={res} />
            ))}
          </div>
        </>
      )}
      {!isInputEmpty && filteredRestaurants.length === 0 ? (
        <div className="searchNotFound">
          <p>This restaurant is not listed</p>
          <p>Please enter some Other Restaurant Name</p>
        </div>
      ) : (
        <div className="searched">
          {filteredRestaurants.map((res) => (
            <SearcheData res={res} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
