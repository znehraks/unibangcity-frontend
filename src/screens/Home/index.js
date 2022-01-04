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
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Unibangcity | Home</title>
      </Helmet>
      <MainContainer>
        <MainTitleContainer>
          <MainTitle>나만을 위한 자취방을 쉽고 빠르게 찾아보세요</MainTitle>
          <MainSubTitleLink to="/Aboutus">
            유니방시티 소개 보러가기
          </MainSubTitleLink>
        </MainTitleContainer>
        <MainArticleContainer>
          {/* <MainArticle
          onClick={() => {
            alert("준비중입니다. '직접 추천 받기'를 이용해주세요.");
          }}
        >
          학우들의 추천
        </MainArticle> */}
          <MainArticleLink to="/recommendation">직접 추천 받기</MainArticleLink>
          {/* <MainArticle
          onClick={() => {
            alert("준비중입니다. '직접 추천 받기'를 이용해주세요.");
          }}
        >
          유니방시티의 추천
        </MainArticle> */}
        </MainArticleContainer>
      </MainContainer>
    </>
  );
};

export default Home;
