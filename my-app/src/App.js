import "./App.css";
import GrandFather from "./GrandFather";
// import Button from "./Button";
// import Component1 from "./Component1";
// import Component3, { Component2, Component4 } from "./Component2";

function App() {
  let myWill = "i will be a successful developer";
  // let msg = "Hello from App.js";
  return (
    <div className="App">
      <GrandFather a={myWill}></GrandFather>

      {/* <h1 className="a">Hello World!</h1>
      {msg}
      <Component1
        as={msg}
        variable={"Hello from app this is a string"}
      ></Component1>
      <Button></Button>
      <Component2></Component2>
      <Component3></Component3>
      <Component4></Component4> */}
    </div>
  );
}

export default App;
