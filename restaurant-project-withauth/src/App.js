import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Common/Header";
import { useEffect, useState } from "react";

function App() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:9000/api/v1/restaurant");
        const data = await response.json();
        setRestaurantData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addItem = (item) => {
    const existingProduct = cartItems.findIndex(
      (cartItem) => cartItem.card.info.id === item.card.info.id
    );
    if (existingProduct !== -1) {
      const updateCart = [...cartItems];
      updateCart[existingProduct].quantity += 1;
      setCartItems(updateCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item) => {
    const existingProduct = cartItems.findIndex(
      (cartItem) => cartItem.card.info.id === item.card.info.id
    );
    if (existingProduct !== -1) {
      const updateCart = [...cartItems];
      if (updateCart[existingProduct].quantity > 1) {
        updateCart[existingProduct].quantity -= 1;
      } else {
        updateCart.splice(existingProduct, 1);
      }
      setCartItems(updateCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      <Header cartItems={cartItems}></Header>
      <Outlet
        context={{
          restaurantData,
          setRestaurantData,
          loading,
          cartItems,
          setCartItems,
          addItem,
          removeItem,
          clearCart,
        }}
      ></Outlet>
    </div>
  );
}

export default App;
