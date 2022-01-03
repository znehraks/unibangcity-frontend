import { Q1 } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
  TextArticle,
  TextArticleSpan,
} from "../styles/StyledComponents";

const Intro = ({ setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>유니방시티 이용 안내입니다.</MainTitle>
        <MainSubTitleSpan>
          아래 내용을 숙지해주시고 '다음'버튼을 눌러주세요
        </MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer flexDirection={"column"}>
        <TextArticle width={"35%"} height={"70%"} lineHeight="0.2vw">
          <TextArticleSpan>1. 나의 학교 이름을 입력해 주세요.</TextArticleSpan>
          <TextArticleSpan>
            2. 원하는 최대 거리를 선택해 주세요.
          </TextArticleSpan>
          <TextArticleSpan>
            3. 가장 많이 고려하는 요소를 1개 골라주세요.
          </TextArticleSpan>
          <TextArticleSpan>
            4. 두 번째로 많이 고려하는 요소를 1개 골라주세요.
          </TextArticleSpan>
          <TextArticleSpan>
            5. 세 번째로 많이 고려하는 요소를 1개 골라주세요.
          </TextArticleSpan>
          <TextArticleSpan>6. 조금만 기다리면 끝.</TextArticleSpan>
        </TextArticle>
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(Q1);
          }}
        >
          다음
        </ButtonBox>
      </ButtonContainer>
    </>
  );
};

export default Intro;
