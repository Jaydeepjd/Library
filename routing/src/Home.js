import { useOutletContext } from "react-router-dom";

const Home = () => {
  let { msg } = useOutletContext();
  return (
    <div>
      <h1>Home Page</h1>
      <h2>{msg}</h2>
    </div>
  );
};

export default Home;
