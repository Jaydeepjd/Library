import { useState, useEffect } from "react";
const Help = () => {
  const [help, setHelp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/help.json");
        const data = await response.json();
        setHelp(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    fetchData();
  }, []);
  const [toggledTitle, setToggledTitle] = useState(null);
  const handleClick = (clickedTitle) => {
    setToggledTitle(toggledTitle === clickedTitle ? null : clickedTitle);
  };
  const renderArrow = (title) => {
    return toggledTitle === title
      ? "/images/up-arrow.png"
      : "/images/down-arrow.png";
  };
  return (
    <div className="help">
      <h1>Help & Support</h1>
      <p>Let's take a step ahead and help you better.</p>
      <div className="questionContainer">
        <div className="questionInnerContainer">
          <h1>Partner Onboarding</h1>
          {help.map((res) => {
            const title = res.title;
            return (
              <div className="question" key={title}>
                <div key={title} className="answer">
                  <div className="answerInfo">
                    <p>{res.title}</p>
                    <img
                      onClick={() => handleClick(title)}
                      src={renderArrow(res.title)}
                      alt="."
                    />
                  </div>
                </div>
                {toggledTitle === title && <p>{res.data}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Help;
