import React from "react";
import styled from "styled-components";
import { MainSubTitleLink } from "../../components/styles/StyledComponents";

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
const Auth = () => {
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainTitle>AUTH</MainTitle>
        <MainSubTitleLink>유니방시티 소개 보러가기</MainSubTitleLink>
      </MainTitleContainer>
      <MainArticleContainer>
        <MainArticle>학우들의 추천</MainArticle>
        <MainArticle>직접 추천 받기</MainArticle>
        <MainArticle>유니방시티의 추천</MainArticle>
      </MainArticleContainer>
    </MainContainer>
  );
};

export default Auth;
