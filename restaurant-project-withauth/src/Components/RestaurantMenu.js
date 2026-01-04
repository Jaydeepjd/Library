import MenuDataShow from "./MenuItemSHow";

const RestaurantMenu = ({ menud }) => {
  return (
    <div className="restaurant__menu-category">
      <div className="foodCat">
        <p>
          {menud?.card?.card?.title} ({menud?.card?.card.itemCards.length})
        </p>
      </div>
      <div className="restaurant__menu-items">
        {menud?.card?.card?.itemCards.map((item) => {
          return <MenuDataShow item={item}></MenuDataShow>;
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
