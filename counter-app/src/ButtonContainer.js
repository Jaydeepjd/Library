import Button from "./Button";

const ButtonContainer = ({ handleDecrement, handleIncrement }) => {
  return (
    <div className="buttons">
      <Button
        funcName={handleIncrement}
        classs={"inc"}
        text={" Increment"}
      ></Button>
      <Button
        funcName={handleDecrement}
        classs={"dec"}
        text={" Decrement"}
      ></Button>
    </div>
  );
};

export default ButtonContainer;
