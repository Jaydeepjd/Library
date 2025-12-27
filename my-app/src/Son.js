import GrandSon from "./GrandSon";

const Son = ({ aa }) => {
  return (
    <div className="container">
      <h1>Son Component</h1>
      {aa}
      <GrandSon myWill={aa}></GrandSon>
    </div>
  );
};

export default Son;
