import React from "react";
import {
  MainArticleContainer,
  MainArticleLink,
  MainContainer,
  MainSubTitleLink,
  MainTitle,
  MainTitleContainer,
} from "../../components/styles/StyledComponents";
import Helmet from "react-helmet";
const History = () => {
  return (
    <>
      <Helmet>
        <title>Unibangcity | History</title>
      </Helmet>
      <MainContainer>
        <MainTitleContainer>
          <MainTitle>History</MainTitle>
          <MainSubTitleLink to="/Aboutus">
            유니방시티 소개 보러가기
          </MainSubTitleLink>
        </MainTitleContainer>
        <MainArticleContainer>
          {/* <MainArticle>학우들의 추천</MainArticle> */}
          <MainArticleLink to="/Recommendation">직접 추천 받기</MainArticleLink>
          {/* <MainArticle>유니방시티의 추천</MainArticle> */}
        </MainArticleContainer>
      </MainContainer>
    </>
  );
};

export default History;
