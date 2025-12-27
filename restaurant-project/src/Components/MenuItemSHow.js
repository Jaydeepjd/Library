import { useOutletContext } from "react-router-dom";

const MenuDataShow = ({ item }) => {
  const { addItem, removeItem, cartItems } = useOutletContext();
  const isItemInCart = cartItems.some(
    (itm) => itm.card.info.id === item.card.info.id
  );
  const quantityInCart = isItemInCart
    ? cartItems.find((el) => el.card.info.id === item.card.info.id).quantity
    : 0;
  console.log(cartItems);

  return (
    <div className="restaurant__menu-item-card">
      <div className="restaurant__menu-item-info">
        <p className="restaurant__menu-item-name">{item?.card?.info?.name}</p>
        <p className="restaurant__menu-item-price">
          ₹ {item?.card?.info?.defaultPrice / 100}
        </p>
        <p className="restaurant__menu-item-desc">
          {item?.card?.info?.description}
        </p>
      </div>
      <div className="restaurant__menu-item-action">
        {isItemInCart ? (
          <div className="restaurant__menu-item-quantity-controls">
            <button onClick={() => removeItem(item)}>-</button>
            <span>{quantityInCart}</span>
            <button onClick={() => addItem(item)}>+</button>
          </div>
        ) : (
          <button
            className="restaurant__menu-item-add-btn"
            onClick={() => addItem(item)}
          >
            Add
          </button>
        )}

        <img src={`/images/${item?.card?.info?.imgName}`}></img>
      </div>
    </div>
  );
};

export default MenuDataShow;
