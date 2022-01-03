import { Q1, Q3 } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";
import Q2Map from "../kakao/Q2Map";
const Q2Component = ({ answers, setAnswers, setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>2. 원하는 거리를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>
          지도를 마우스로 클릭하면 원 그리기가 시작되고 마우스 우클릭하면 원
          그리기가 종료됩니다.
        </MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer>
        <Q2Map
          answers={answers}
          setAnswers={setAnswers}
          mobile={false}
          univ_lat={answers.univ_lat}
          univ_lon={answers.univ_lon}
        />
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(Q1);
            setAnswers({ ...answers, Q2Answer: "" });
          }}
        >
          이전
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            if (answers.Q2Answer !== "") {
              setMode(Q3);
            } else {
              alert("거리를 설정해주세요.");
            }
          }}
        >
          다음
        </ButtonBox>
      </ButtonContainer>
    </>
  );
};

export default Q2Component;
