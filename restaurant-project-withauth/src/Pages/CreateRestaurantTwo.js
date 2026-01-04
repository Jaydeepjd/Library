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
  const onSubmit = async (data) => {
    // setRestaurantData([
    //   ...restaurantData,
    //   {
    //     name: data.name,
    //     cloudinaryImageId: data.cloudinaryImageId,
    //     locality: data.locality,
    //     areaName: data.areaName,
    //     costForTwo: data.costForTwo,
    //     cuisines: data.cuisines,
    //     avgRating: data.avgRating,
    //     avgRatingString: data.avgRatingString,
    //     totalRatingsString: data.totalRatingsString,
    //     parentId: data.parentId,
    //     nextCloseTime: data.nextCloseTime,
    //     opened: data.opened,
    //   },
    // ]);
    try {
      data.cuisines = data.cuisines.split(",");

      let payload = {
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
      };
      const response = await fetch("http://localhost:9000/api/v1/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setRestaurantData([...restaurantData, result.data.restaurant]);
      alert("Restaurant created succesfully");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
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
        <input type="text" {...register("email")}></input>
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
