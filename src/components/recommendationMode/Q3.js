import ArticleButton from "../ArticleButton";
import { Q2, Q3, Q4 } from "../Enum";
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
const Q3Component = () => {
  const [answers, setAnswers] = useRecoilState(answersAtom);
  const setMode = useSetRecoilState(modeAtom);

  return (
    <>
      <MainTitleContainer>
        <MainTitle>3. 가장 중요시 여기는 요소를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>아래 항목 중 한 개만 선택해 주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer mobileWidth={"100%"} mobileHeight={"20%"}>
        {ArticleButtonElements(answers).map((elem) => (
          <ArticleButton
            current={Q3}
            name={elem.name}
            kr_name={elem.kr_name}
            black_img={elem.black_img}
            red_img={elem.red_img}
            isSelected={answers.Q3Answer === elem.name}
          />
        ))}
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
