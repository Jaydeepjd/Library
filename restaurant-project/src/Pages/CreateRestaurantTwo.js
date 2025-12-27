import "./../Style/create.css";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateRestaurantTwo = () => {
  const { restaurantData, setRestaurantData } = useOutletContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    data.cuisines = data.cuisines.split(",");
    setRestaurantData([
      ...restaurantData,
      {
        info: {
          id: restaurantData.length,
          name: data.name,
          cloudinaryImageId: data.cloudinaryImageId,
          locality: data.locality,
          areaName: data.areaName,
          costForTwo: data.costForTwo,
          cuisines: data.cuisines,
          avgRating: data.avgRating,
          avgRatingString: data.avgRatingString,
          totalRatingsString: data.totalRatingsString,
          parentId: data.parentId,
          nextCloseTime: data.nextCloseTime,
          opened: data.opened,
        },
      },
    ]);
    console.log(restaurantData);
  };

  return (
    <div className="restaurant ">
      <h2>Create New Restaurant</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: "Restaurant Name is required" })}
          placeholder="Restaurant Name"
        />
        {errors.name && <p className="errors">{errors.name.message}</p>}
        <input
          type="text"
          {...register("cloudinaryImageId", { required: "Image is required" })}
          placeholder="Image ID"
        />
        {errors.cloudinaryImageId && (
          <p className="errors">{errors.cloudinaryImageId.message}</p>
        )}
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        ></input>
        {errors.email && <p className="errors">{errors.email.message}</p>}
        <input type="text" {...register("locality")} placeholder="Locality" />
        <input type="text" {...register("areaName")} placeholder="Area Name" />
        <input
          type="text"
          {...register("costForTwo")}
          placeholder="Cost for Two"
        />
        <input
          type="text"
          {...register("cuisines")}
          placeholder="Cuisines (comma separated)"
        />
        <input
          type="number"
          {...register("avgRating")}
          placeholder="Average Rating"
        />
        <input
          type="text"
          {...register("avgRatingString")}
          placeholder="Average Rating (String)"
        />
        <input
          type="text"
          {...register("totalRatingsString")}
          placeholder="Total Ratings"
        />
        <input type="text" placeholder="Parent ID" {...register("parentId")} />
        <input
          type="text"
          placeholder="Next Close Time"
          {...register("nextCloseTime")}
        />
        <label>
          <input type="checkbox" {...register("opened")} />
          <span>Opened</span>
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRestaurantTwo;
