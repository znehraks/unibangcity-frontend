import ArticleButton from "../ArticleButton";
import { Q3, Q4, Q5 } from "../Enum";
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
const Q4Component = () => {
  const [answers, setAnswers] = useRecoilState(answersAtom);
  const setMode = useSetRecoilState(modeAtom);
  return (
    <>
      <MainTitleContainer>
        <MainTitle>4. 두 번째로 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer mobileHeight={"20%"}>
        {ArticleButtonElements(answers).map((elem) => (
          <ArticleButton
            current={Q4}
            name={elem.name}
            kr_name={elem.kr_name}
            black_img={elem.black_img}
            red_img={elem.red_img}
            isSelected={answers.Q4Answer === elem.name}
          />
        ))}
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
