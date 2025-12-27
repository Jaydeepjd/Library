import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <img src="https://codehubnexus.com/assets/logov2.png" alt="as"></img>
      <div className="linkss">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/search"}>Search</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>Cart</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
