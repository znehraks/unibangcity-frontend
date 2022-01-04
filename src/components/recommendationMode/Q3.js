import ArticleButton from "../ArticleButton";
import { COST, DISTANCE, HOUSE, Q2, Q3, Q4, SAFETY, SUBWAY } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";
import distance_img from "../styles/images/distance.png";
import subway_img from "../styles/images/subway.png";
import cost_img from "../styles/images/cost.png";
import safety_img from "../styles/images/safety.png";
import house_img from "../styles/images/house.png";
import distance_red_img from "../styles/images/distance_red.png";
import subway_red_img from "../styles/images/subway_red.png";
import cost_red_img from "../styles/images/cost_red.png";
import safety_red_img from "../styles/images/safety_red.png";
import house_red_img from "../styles/images/house_red.png";
import PropTypes from "prop-types";
const Q3Component = ({ answers, setAnswers, setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>3. 가장 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer>
        <ArticleButton
          current={Q3}
          name={DISTANCE}
          kr_name={"거리"}
          black_img={distance_img}
          red_img={distance_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q3Answer === DISTANCE}
        />
        <ArticleButton
          current={Q3}
          name={SUBWAY}
          kr_name={"역세권"}
          black_img={subway_img}
          red_img={subway_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q3Answer === SUBWAY}
        />
        <ArticleButton
          current={Q3}
          name={COST}
          kr_name={"가성비"}
          black_img={cost_img}
          red_img={cost_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q3Answer === COST}
        />
        <ArticleButton
          current={Q3}
          name={SAFETY}
          kr_name={"안전"}
          black_img={safety_img}
          red_img={safety_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q3Answer === SAFETY}
        />
        <ArticleButton
          current={Q3}
          name={HOUSE}
          kr_name={"주변 매물 수"}
          black_img={house_img}
          red_img={house_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q3Answer === HOUSE}
        />
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(Q2);
            setAnswers({ ...answers, Q3Answer: "", Q3Answer_kr: "" });
          }}
        >
          이전
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            if (answers.Q3Answer !== "") {
              setMode(Q4);
            } else {
              alert("항목을 선택해주세요.");
            }
          }}
        >
          다음
        </ButtonBox>
      </ButtonContainer>
    </>
  );
};

export default Q3Component;

Q3Component.propTypes = {
  answers: PropTypes.object.isRequired,
  setAnswers: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
