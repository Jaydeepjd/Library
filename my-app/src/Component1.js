const Component1 = ({ as, variable }) => {
  //   console.log(props);

  return (
    <>
      <h2>This is Component 1</h2>
      {as}
      <h2>{variable}</h2>
      <p>Hello from para</p>
    </>
  );
};

export default Component1;
