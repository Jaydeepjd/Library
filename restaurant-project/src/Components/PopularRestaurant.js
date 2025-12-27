import "./../Style/search.css";
const PopularRestaurant = ({ res }) => {
  return (
    <div key={res.info.id} className="cuisineContainer">
      <img
        src={`images/${res.info.cloudinaryImageId}.avif`}
        alt={res.info.name}
      />
      <p>{res.info.name}</p>
    </div>
  );
};
export default PopularRestaurant;
