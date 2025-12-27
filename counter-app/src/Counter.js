import ButtonContainer from "./ButtonContainer";

const Counter = ({ a, handleDecrement, handleIncrement }) => {
  return (
    <div className="counter">
      <p>{a}</p>
      {a < 0 ? <p className="a">Negative Value</p> : null}
      <ButtonContainer
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      ></ButtonContainer>
    </div>
  );
};

export default Counter;
