import { useEffect, useState } from "react";
import styled from "styled-components";
import { Q2, Q3, Q4, Q5 } from "./Enum";
import PropTypes from "prop-types";
const MainArticle = styled.div`
  width: 12vw;
  height: 12vw;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.isSelected ? `4px solid #f7323f` : `4px solid rgba(0, 0, 0, 0.5)`};
  border-radius: 10%;
  font-size: 1.4vw;
  font-weight: 600;
  color: ${(props) => (props.isSelected ? `#f7323f` : `black`)};
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
  img {
    display: ${(props) => props.current === Q2 && "none"};
  }
  @media (max-width: 550px) {
    font-size: 3vw;
    width: 18vw;
    height: 18vw;
  }
`;
const MainArticleButtonImg = styled.img`
  height: 60%;
  width: auto;
  margin-bottom: 1vw;
`;

const ArticleButton = ({
  current,
  name,
  kr_name,
  black_img,
  red_img,
  answers,
  setAnswers,
  isSelected,
}) => {
  const [buttonOnMouse, setButtonOnMouse] = useState(false);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    if (current === Q4) {
      setDisplay(answers.Q3Answer !== name);
    } else if (current === Q5) {
      setDisplay(answers.Q3Answer !== name && answers.Q4Answer !== name);
    }
  }, [current, answers.Q3Answer, answers.Q4Answer, name]);
  return (
    <MainArticle
      current={current}
      display={display}
      isSelected={isSelected}
      onClick={() => {
        if (current === Q2) {
          setAnswers({ ...answers, Q2Answer: name });
        } else if (current === Q3) {
          setAnswers({ ...answers, Q3Answer: name, Q3Answer_kr: kr_name });
        } else if (current === Q4) {
          setAnswers({ ...answers, Q4Answer: name, Q4Answer_kr: kr_name });
        } else {
          setAnswers({ ...answers, Q5Answer: name, Q5Answer_kr: kr_name });
        }
      }}
      onMouseLeave={() => setButtonOnMouse(false)}
      onMouseEnter={() => setButtonOnMouse(true)}
    >
      <MainArticleButtonImg
        src={buttonOnMouse || isSelected ? red_img : black_img}
      />
      {kr_name}
    </MainArticle>
  );
};

export default ArticleButton;

ArticleButton.propTypes = {
  current: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  kr_name: PropTypes.string.isRequired,
  black_img: PropTypes.string.isRequired,
  red_img: PropTypes.string.isRequired,
  answers: PropTypes.object.isRequired,
  setAnswers: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
