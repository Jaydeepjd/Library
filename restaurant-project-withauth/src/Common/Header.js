import { NavLink } from "react-router-dom";

const Header = ({ cartItems }) => {
  return (
    <div className="header">
      <div className="header__logo-conatiner">
        <NavLink to={"/"}>
          <img
            className="header__logo"
            src="https://svgsilh.com/svg/2085075.svg"
            alt="to"
          ></img>
        </NavLink>
      </div>
      <div className="header__nav">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/search"}>Search</NavLink>
          </li>
          <li>
            <NavLink to={"/help"}>Help</NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>
              Cart
              {cartItems.length >= 1 && (
                <span className="cartItemCount">{cartItems.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
