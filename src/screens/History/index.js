import React from "react";
import {
  MainArticle,
  MainArticleContainer,
  MainContainer,
  MainSubTitleLink,
  MainTitle,
  MainTitleContainer,
} from "../../components/styles/StyledComponents";
const History = () => {
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainTitle>History</MainTitle>
        <MainSubTitleLink to="/Aboutus">
          유니방시티 소개 보러가기
        </MainSubTitleLink>
      </MainTitleContainer>
      <MainArticleContainer>
        {/* <MainArticle>학우들의 추천</MainArticle> */}
        <MainArticle>직접 추천 받기</MainArticle>
        {/* <MainArticle>유니방시티의 추천</MainArticle> */}
      </MainArticleContainer>
    </MainContainer>
  );
};

export default History;
