import ArticleButton from "../ArticleButton";
import { COST, DISTANCE, HOUSE, Q3, Q4, Q5, SAFETY, SUBWAY } from "../Enum";
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

const Q4Component = ({ answers, setAnswers, setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>4. 두 번째로 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer>
        <ArticleButton
          current={Q4}
          name={DISTANCE}
          kr_name={"거리"}
          black_img={distance_img}
          red_img={distance_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q4Answer === DISTANCE}
        />
        <ArticleButton
          current={Q4}
          name={SUBWAY}
          kr_name={"역세권"}
          black_img={subway_img}
          red_img={subway_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q4Answer === SUBWAY}
        />
        <ArticleButton
          current={Q4}
          name={COST}
          kr_name={"가성비"}
          black_img={cost_img}
          red_img={cost_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q4Answer === COST}
        />
        <ArticleButton
          current={Q4}
          name={SAFETY}
          kr_name={"안전"}
          black_img={safety_img}
          red_img={safety_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q4Answer === SAFETY}
        />
        <ArticleButton
          current={Q4}
          name={HOUSE}
          kr_name={"주변 매물 수"}
          black_img={house_img}
          red_img={house_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q4Answer === HOUSE}
        />
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(Q3);
            setAnswers({ ...answers, Q4Answer: "", Q4Answer_kr: "" });
          }}
        >
          이전
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            if (answers.Q4Answer !== "") {
              setMode(Q5);
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

export default Q4Component;
