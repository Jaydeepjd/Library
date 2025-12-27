import Father from "./Father";

const GrandFather = ({ a }) => {
  return (
    <div className="container">
      <h1>GrandFather Component</h1>
      {a}
      <Father will={`${a} 12909090`}></Father>
    </div>
  );
};

export default GrandFather;
