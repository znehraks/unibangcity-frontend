import ArticleButton from "../ArticleButton";
import {
  COST,
  DISTANCE,
  FINISH,
  HOUSE,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  SAFETY,
  SUBWAY,
} from "../Enum";
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

const Q5Component = ({ answers, setAnswers, setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>5. 세 번째로 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer>
        <ArticleButton
          current={Q5}
          name={DISTANCE}
          kr_name={"거리"}
          black_img={distance_img}
          red_img={distance_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q5Answer === DISTANCE}
        />
        <ArticleButton
          current={Q5}
          name={SUBWAY}
          kr_name={"역세권"}
          black_img={subway_img}
          red_img={subway_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q5Answer === SUBWAY}
        />
        <ArticleButton
          current={Q5}
          name={COST}
          kr_name={"가성비"}
          black_img={cost_img}
          red_img={cost_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q5Answer === COST}
        />
        <ArticleButton
          current={Q5}
          name={SAFETY}
          kr_name={"안전"}
          black_img={safety_img}
          red_img={safety_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q5Answer === SAFETY}
        />
        <ArticleButton
          current={Q5}
          name={HOUSE}
          kr_name={"주변 매물 수"}
          black_img={house_img}
          red_img={house_red_img}
          answers={answers}
          setAnswers={setAnswers}
          isSelected={answers.Q5Answer === HOUSE}
        />
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(Q4);

            setAnswers({ ...answers, Q5Answer: "", Q5Answer_kr: "" });
          }}
        >
          이전
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            if (answers.Q1Answer === "") {
              alert("1단계가 완료되지 않았습니다.");
              setMode(Q1);
            } else if (answers.Q2Answer === "") {
              alert("2단계가 완료되지 않았습니다.");
              setMode(Q2);
            } else if (answers.Q3Answer === "") {
              alert("3단계가 완료되지 않았습니다.");
              setMode(Q3);
            } else if (answers.Q4Answer === "") {
              alert("4단계가 완료되지 않았습니다.");
              setMode(Q4);
            } else if (answers.Q5Answer === "") {
              alert("항목을 선택해주세요.");
              setMode(Q5);
            } else {
              setMode(FINISH);
            }
          }}
        >
          완료
        </ButtonBox>
      </ButtonContainer>
    </>
  );
};

export default Q5Component;
