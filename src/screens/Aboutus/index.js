import React from "react";
import {
  MainArticleContainer,
  MainContainer,
  MainSubTitleLink,
  MainTitle,
  MainTitleContainer,
  TextArticle,
  TextArticleSpan,
} from "../../components/styles/StyledComponents";

const Aboutus = () => {
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainTitle>
          내가 원하는 나만의 자취지역을 추천받을 수는 없을까?
        </MainTitle>
        <MainSubTitleLink to="/Recommendation">
          나만의 자취방 추천 받으러 가기
        </MainSubTitleLink>
      </MainTitleContainer>
      <MainArticleContainer>
        <TextArticle>
          <TextArticleSpan>
            이러한 갈증으로부터 시작된 저희의 프로젝트는 '유니방시티'라는 이름
            처럼 '도심' 속에서 나에게 딱 맞는 '대학교' 주변의 '자취방'을
            자취지역을 추천해주는 시스템을 만드는 것이 목표입니다.
          </TextArticleSpan>
          <TextArticleSpan>
            서울 소재 대학교의 거리 데이터, 가까운 역과의 거리를 가중치로 한
            역세권 데이터, 인구대비 구별 범죄율 및 CCTV대수를 기반으로 한
            안전데이터, 25개 품목을 기반으로 정제한 물가데이터, 부동산 실 매물
            정보를 이용한 매물 데이터와 인공지능을 이용하여 나에게 딱 맞는
            자취지역을 추천해주는 것이 목표입니다.
          </TextArticleSpan>
          <TextArticleSpan>
            커뮤니티 기능을 이용하여, 추천받은 매물의 만족도와, 내 학우가 추천한
            매물 보기 등의 추가 기능도 구현중에 있습니다.
          </TextArticleSpan>
        </TextArticle>
      </MainArticleContainer>
    </MainContainer>
  );
};

export default Aboutus;
