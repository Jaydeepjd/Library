import Son from "./Son";

const Father = ({ will }) => {
  return (
    <div className="container">
      <h1>Father Component</h1>
      {will}
      <Son aa={`${will}`}></Son>
    </div>
  );
};

export default Father;
