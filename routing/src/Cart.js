import { useOutletContext } from "react-router-dom";

const Cart = () => {
  let { msg } = useOutletContext();
  return (
    <div>
      <h1>Cart Page</h1>
      <p>{msg}</p>
    </div>
  );
};

export default Cart;
