const Button = ({ funcName, classs, text }) => {
  return (
    <button onClick={funcName} className={classs}>
      {text}
    </button>
  );
};

export default Button;
