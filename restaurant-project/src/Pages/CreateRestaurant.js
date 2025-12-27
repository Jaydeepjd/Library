import { useState } from "react";
import "./../Style/create.css";
import { useOutletContext } from "react-router-dom";

const CreateRestaurant = () => {
  const { restaurantData, setRestaurantData } = useOutletContext();
  const [formData, setFormData] = useState({
    name: "",
    cloudinaryImageId: "",
    locality: "",
    areaName: "",
    costForTwo: "",
    cuisines: "",
    avgRating: "",
    avgRatingString: "",
    totalRatingsString: "",
    parentId: "",
    nextCloseTime: "",
    opened: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setRestaurantData([
      ...restaurantData,
      {
        info: {
          id: restaurantData.length,
          name: formData.name,
          cloudinaryImageId: formData.cloudinaryImageId,
          locality: formData.locality,
          areaName: formData.areaName,
          costForTwo: formData.costForTwo,
          cuisines: [formData.cuisines],
          avgRating: formData.avgRating,
          avgRatingString: formData.avgRatingString,
          totalRatingsString: formData.totalRatingsString,
          parentId: formData.parentId,
          nextCloseTime: formData.nextCloseTime,
          opened: formData.opened,
        },
      },
    ]);
    console.log(restaurantData);
  };

  return (
    <div className="restaurant ">
      <h2>Create New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          required
        />
        <input
          type="text"
          name="cloudinaryImageId"
          placeholder="Image ID"
          value={formData.cloudinaryImageId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={formData.locality}
          onChange={handleChange}
        />
        <input
          type="text"
          name="areaName"
          placeholder="Area Name"
          value={formData.areaName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="costForTwo"
          placeholder="Cost for Two"
          value={formData.costForTwo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cuisines"
          placeholder="Cuisines (comma separated)"
          value={formData.cuisines}
          onChange={handleChange}
        />
        <input
          type="number"
          name="avgRating"
          placeholder="Average Rating"
          value={formData.avgRating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="avgRatingString"
          placeholder="Average Rating (String)"
          value={formData.avgRatingString}
          onChange={handleChange}
        />
        <input
          type="text"
          name="totalRatingsString"
          placeholder="Total Ratings"
          value={formData.totalRatingsString}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parentId"
          placeholder="Parent ID"
          value={formData.parentId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nextCloseTime"
          placeholder="Next Close Time"
          value={formData.nextCloseTime}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="opened"
            checked={formData.opened}
            onChange={handleChange}
          />
          <span>Opened</span>
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
