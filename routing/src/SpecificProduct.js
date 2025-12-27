import { useParams } from "react-router-dom";
const Specific = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Specific Page pfroduct id is {id}</h1>
    </div>
  );
};

export default Specific;
