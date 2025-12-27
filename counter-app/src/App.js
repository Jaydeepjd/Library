import "./App.css";
import { useState, useEffect } from "react";
import Counter from "./Counter";

function App() {
  // 1: Varibale 2: Function to update the variable
  let [val, setVal] = useState(0);

  const handleIncrement = () => {
    setVal(val + 1);
  };
  const handleDecrement = () => {
    setVal(val - 1);
  };
  // 2 arguments
  // 1. callback function
  // 2. Array of dependencies(States/props)
  // 3 cases
  // Case 1. With EMpty array of dependencies
  // -  Only first time after rendering
  // Case 2. With dependencies
  // -  First time after rendering + every time when dependencies change
  // Case 3. Without dependencies Array
  // -  First time after rendering + every time when state/props change
  //
  useEffect(() => {
    if (val < 0) {
      let timer = setTimeout(() => {
        setVal(0);
      }, 2000);

      // cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [val]);
  return (
    <div className="App">
      <Counter
        a={val}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      ></Counter>
    </div>
  );
}

export default App;
