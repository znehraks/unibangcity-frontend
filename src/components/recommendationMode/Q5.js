import ArticleButton from "../ArticleButton";
import { FINISH, Q1, Q2, Q3, Q4, Q5 } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";
import { useRecoilState, useSetRecoilState } from "recoil";
import { answersAtom, modeAtom } from "../recoil";
import { ArticleButtonElements } from "../utils";
const Q5Component = () => {
  const [answers, setAnswers] = useRecoilState(answersAtom);
  const setMode = useSetRecoilState(modeAtom);
  return (
    <>
      <MainTitleContainer>
        <MainTitle>5. 세 번째로 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer mobileHeight={"20%"}>
        {ArticleButtonElements(answers).map((elem) => (
          <ArticleButton
            current={Q5}
            name={elem.name}
            kr_name={elem.kr_name}
            black_img={elem.black_img}
            red_img={elem.red_img}
            isSelected={answers.Q5Answer === elem.name}
          />
        ))}
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
