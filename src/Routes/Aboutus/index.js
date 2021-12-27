import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import homeEx from "../../components/Styles/images/homeEx.jpg";
import homeEx2 from "../../components/Styles/images/homeEx2.jpg";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 40vw;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  @media (max-width: 500px) {
    margin-top: 0vw;
    height: 90vh;
  }
`;

const Article = styled.div`
  width: 100%;
  height: 40vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: auto;
  }
`;

const OuterBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    width: 90%;
  }
`;
const TitleContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleSpan = styled.span`
  font-size: 2vw;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vw;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0.5px;
`;
const SpanContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vw;
`;
const RightTopContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const RightBottomContainer = styled(Link)`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 10vw;
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ContentTitleSpan = styled.span`
  font-size: 2vw;
  margin: 5vw 0;
  @media (max-width: 500px) {
    font-size: 5.5vw;
  }
`;
const ContentSpan = styled.span`
  font-size: 1.2vw;
  line-height: 150%;
  margin-bottom: 2vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const SpanLink = styled(Link)`
  font-size: 1.2vw;
  border: 4px solid black;
  padding: 1vw 2vw;
  :hover {
    background: black;
    color: white;
    font-weight: 800;
  }
  @media (max-width: 500px) {
    padding: 2vw 4vw;
    font-size: 3vw;
  }
`;

const Aboutus = () => {
  return (
    <>
      <Helmet>
        <title>Aboutus</title>
      </Helmet>
      <Wrapper>
        <Article>
          <OuterBox>
            <ContentContainer>
              <SpanContainer>
                <RightTopContainer>
                  <ContentTitleSpan>
                    내가 원하는 나만의 자취지역을 추천받을 수는 없을까?
                  </ContentTitleSpan>
                  <ContentSpan>
                    이러한 갈증으로부터 시작된 저희의 프로젝트는
                    '유니방시티(Unibangcity)'라는 이름 처럼 '도심' 속에서 나에게
                    딱 맞는 '대학교' 주변의 '자취방'을 자취지역을 추천해주는
                    시스템을 만드는 것이 목표입니다.
                  </ContentSpan>
                  <ContentSpan>
                    서울 소재 대학교의 거리 데이터, 가까운 역과의 거리를
                    가중치로 한 역세권 데이터, 인구대비 구별 범죄율 및
                    CCTV대수를 기반으로 한 안전데이터, 25개 품목을 기반으로
                    정제한 물가데이터, 부동산 실 매물 정보를 이용한 매물
                    데이터와 인공지능을 이용하여 나에게 딱 맞는 자취지역을
                    추천해주는 것이 목표입니다.
                  </ContentSpan>
                  <ContentSpan>
                    커뮤니티 기능을 이용하여, 추천받은 매물의 만족도와, 내
                    학우가 추천한 매물 보기 등의 추가 기능도 구현중에 있습니다.
                  </ContentSpan>
                </RightTopContainer>
                <RightBottomContainer>
                  <SpanLink to="/RecommendationIntro">
                    바로 찾으러 가기
                  </SpanLink>
                </RightBottomContainer>
              </SpanContainer>
            </ContentContainer>
          </OuterBox>
        </Article>
      </Wrapper>
    </>
  );
};

export default Aboutus;
