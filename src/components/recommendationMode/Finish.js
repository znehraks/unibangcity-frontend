import { RESULT } from "../Enum";
import {
  MainArticle,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";

const Finish = ({ setMode }) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>나만의 자취방을 보러가실 시간입니다.</MainTitle>
        <MainSubTitleSpan>아래 버튼을 눌러주세요.</MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer>
        <MainArticle
          onClick={() => {
            setMode(RESULT);
          }}
        >
          결과 보기
        </MainArticle>
      </MainArticleContainer>
    </>
  );
};

export default Finish;
