import { useNavigate } from "react-router-dom";
const RestaurantCard = ({ res, show }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/restaurant/${res?._id}`)}>
      <img src={`/images/${res.cloudinaryImageId}.avif`}></img>
      <div className="card__details">
        <h3 className="card__name">{res?.name}</h3>
        {show && (
          <>
            {" "}
            <div className="card__cuisines">{res?.cuisines.join(", ")}</div>
            <div className="card__price">{res.costForTwo}</div>
            <div className="card__info">
              <span className="card__rating">
                {res?.avgRatingString} Rating
              </span>
              <span className="card__time">3.2 mins</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
