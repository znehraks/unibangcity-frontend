import React from "react";
import styled, { keyframes } from "styled-components";
const TwinkleAnimation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
`;
const MainContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;
const MainTitleContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainTitle = styled.div`
  width: 100%;
  font-size: 2vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
`;
const MainSubTitle = styled.div`
  width: 100%;
  font-size: 1vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${TwinkleAnimation} 1.5s linear infinite;
  cursor: pointer;
`;
const MainArticleContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const MainArticle = styled.div`
  width: 12vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  transition-duration: 0.4s;
  font-size: 1.2vw;
  font-weight: 600;
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
`;
const Recommendation = () => {
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainTitle>Recommendation</MainTitle>
        <MainSubTitle>유니방시티 소개 보러가기</MainSubTitle>
      </MainTitleContainer>
      <MainArticleContainer>
        <MainArticle>학우들의 추천</MainArticle>
        <MainArticle>직접 추천 받기</MainArticle>
        <MainArticle>유니방시티의 추천</MainArticle>
      </MainArticleContainer>
    </MainContainer>
  );
};

export default Recommendation;
