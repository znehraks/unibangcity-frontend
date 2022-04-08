import { Q1, Q2, Q3 } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";
import Q2Map from "../kakao/Q2Map";
import ArticleButton from "../ArticleButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import { answersAtom, modeAtom } from "../recoil";
const Q2Component = () => {
  const [answers, setAnswers] = useRecoilState(answersAtom);
  const setMode = useSetRecoilState(modeAtom);
  return (
    <>
      <MainTitleContainer>
        <MainTitle>2. 원하는 거리를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>
          {window.innerWidth <= 550
            ? `
            학교에서부터 원하는 최대 거리를 선택해주세요.`
            : `
          지도를 마우스로 클릭하면 원 그리기가 시작되고 마우스 우클릭하면 원
          그리기가 종료됩니다.`}
        </MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer mobileHeight={"20%"}>
        {window.innerWidth <= 550 ? (
          <>
            <ArticleButton
              current={Q2}
              name={1000}
              kr_name={"1km"}
              black_img={null}
              red_img={null}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q2Answer === 1000}
            />
            <ArticleButton
              current={Q2}
              name={2000}
              kr_name={"2km"}
              black_img={null}
              red_img={null}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q2Answer === 2000}
            />
            <ArticleButton
              current={Q2}
              name={3000}
              kr_name={"3km"}
              black_img={null}
              red_img={null}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q2Answer === 3000}
            />
          </>
        ) : (
          <Q2Map
            answers={answers}
            setAnswers={setAnswers}
            mobile={false}
            univ_lat={answers.univ_lat}
            univ_lon={answers.univ_lon}
          />
        )}
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
