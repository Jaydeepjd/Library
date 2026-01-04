import "./../Style/search.css";
const PopularRestaurant = ({ res }) => {
  return (
    <div key={res._id} className="cuisineContainer">
      <img src={`images/${res.cloudinaryImageId}.avif`} alt={res.name} />
      <p>{res.name}</p>
    </div>
  );
};
export default PopularRestaurant;
