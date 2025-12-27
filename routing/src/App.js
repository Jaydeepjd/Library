import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Header";

function App() {
  let msg = "Hello from App";
  return (
    <div className="App">
      <Header></Header>
      <Outlet
        context={{
          msg,
        }}
      ></Outlet>
    </div>
  );
}

export default App;
