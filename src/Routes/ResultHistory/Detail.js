import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../api";
import StarChart from "../../components/Visualization/StarChart";
import StarChart02 from "../../components/Visualization/StarChart02";
import Pie from "../../components/Visualization/Pie";
import Bar from "../../components/Visualization/Bar";
import Line from "../../components/Visualization/Line";
import Doughnut from "../../components/Visualization/Doughnut";
import Loader from "../../components/Loader";
import Map from "../../components/Kakao/Map";
import Arrow from "../../components/Arrow";
import Back from "../../components/Styles/images/back.png";
import Magnify from "../../components/Styles/images/magnify.png";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const Article = styled.div`
  width: 100%;
  height: 37vw;
  margin-top: 2vw;
`;

const ArticleContentContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const RadarArticle = styled.div`
  width: 80%;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailArticle = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}` : `45vw`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DetailItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const DetailItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailTitleSpan = styled.span`
  font-size: 1.5vw;
`;
const DetailContentSpan = styled.span`
  font-size: 1.2vw;
`;
const RightFloatingDiv = styled.div`
  width: 5vw;
  height: 5vw;
  position: absolute;
  top: 11vw;
  right: 30vw;
  cursor: pointer;
  display: ${(props) => (props.isClicked ? `flex` : `none`)};
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const RightFloatingDiv02 = styled.div`
  width: 5vw;
  height: 5vw;
  position: absolute;
  top: 8vw;
  right: 15vw;
  cursor: pointer;
  display: ${(props) => (props.isClicked ? `none` : `flex`)};
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const BackArrow = styled.div`
  width: 3vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 2vw;
  }
`;
const MagnifyDiv = styled.div`
  width: 4vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 3vw;
  }
`;

const OptionSpan = styled.span`
  font-size: 0.5vw;
`;

const TitleSpan = styled.span`
  font-size: 2vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
`;
const SubTitleSpan = styled.span`
  font-size: 0.9vw;
  margin-top: 0.3vw;
`;

const RecommendationResult = ({ setDetail }) => {
  // const [data, setData] = useState();
  const univ_name = "한국대학교";
  const univ_lat = 37.5459469;
  const univ_lon = 126.9645778;
  const Q2Answer = 1000;
  const w1 = 21.5;
  const w2 = 19.5;
  const w3 = 12.5;
  const w4 = 20;
  const w5 = 27.5;

  const data = [
    {
      T1: 29,
      T2: 5,
      T3: 17,
      T4: 4,
      T5: 11,
      거리: 29,
      역세권: 5,
      가성비: 17,
      안전: 4,
      매물: 11,
      lat: 37.54533171,
      lgeo: "21221012032",
      lon: 126.96741253,
      rank_kr: "1등",
      total_weight: 66,
    },
    {
      T1: 27,
      T2: 1,
      T3: 17,
      T4: 4,
      T5: 10,
      거리: 27,
      역세권: 1,
      가성비: 17,
      안전: 4,
      매물: 10,
      lat: 37.54895548,
      lgeo: "21221012210",
      lon: 126.96744361,
      rank_kr: "2등",
      total_weight: 59,
    },
    {
      T1: 20,
      T2: 8,
      T3: 17,
      T4: 4,
      T5: 8,
      거리: 20,
      역세권: 8,
      가성비: 17,
      안전: 4,
      매물: 8,
      lat: 37.54453956,
      lgeo: "21221012033",
      lon: 126.9721917,
      rank_kr: "3등",
      total_weight: 58,
    },
    {
      T1: 24,
      T2: 5,
      T3: 17,
      T4: 4,
      T5: 5,
      거리: 24,
      역세권: 5,
      가성비: 17,
      안전: 4,
      매물: 5,
      lat: 37.54103374,
      lgeo: "21221012021",
      lon: 126.96429444,
      rank_kr: "4등",
      total_weight: 57,
    },
    {
      T1: 30,
      T2: 0,
      T3: 17,
      T4: 4,
      T5: 3,
      거리: 30,
      역세권: 0,
      가성비: 17,
      안전: 4,
      매물: 3,
      lat: 37.5472749,
      lgeo: "21221012201",
      lon: 126.9650988,
      rank_kr: "5등",
      total_weight: 55,
    },
  ];

  //weightcode 바탕으로
  console.log(w1);
  console.log(w2);
  console.log(w3);
  console.log(w4);
  console.log(w5);
  //로딩중 화면 추가
  //시각화 간단히 추가해보기
  //지도에 마크업해주고 이 지역에 사시면 00개의 카페, 00개의 공원을 이용하기 편리하고, 덤으로 맥도날드도 가깝군요! 등등 문구 추천

  //초반에 성별이나 나이도 받아도 될듯(선택)
  const [newData, setNewData] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (data) {
      const temp = [
        {
          weight: "거리",
          "1등": data[0].T1,
          "2등": data[1].T1,
          "3등": data[2].T1,
          "4등": data[3].T1,
          "5등": data[4].T1,
          평균: 10,
        },
        {
          weight: "역세권",
          "1등": data[0].T2,
          "2등": data[1].T2,
          "3등": data[2].T2,
          "4등": data[3].T2,
          "5등": data[4].T2,
          평균: 10,
        },
        {
          weight: "가성비",
          "1등": data[0].T3,
          "2등": data[1].T3,
          "3등": data[2].T3,
          "4등": data[3].T3,
          "5등": data[4].T3,
          평균: 10,
        },
        {
          weight: "안전",
          "1등": data[0].T4,
          "2등": data[1].T4,
          "3등": data[2].T4,
          "4등": data[3].T4,
          "5등": data[4].T4,
          평균: 10,
        },
        {
          weight: "매물",
          "1등": data[0].T5,
          "2등": data[1].T5,
          "3등": data[2].T5,
          "4등": data[3].T5,
          "5등": data[4].T5,
          평균: 10,
        },
      ];
      setNewData(temp);
    }
  }, []);
  console.log(isClicked);
  return (
    <>
      <Helmet>
        <title>History</title>
      </Helmet>
      <Wrapper>
        {data && (
          <>
            <RightFloatingDiv isClicked={isClicked}>
              <BackArrow>
                <img onClick={() => setIsClicked(false)} src={Back}></img>
                <OptionSpan>뒤로가기</OptionSpan>
              </BackArrow>
              {/* <MagnifyDiv>
              <img src={Magnify}></img>
              <OptionSpan>알고리즘</OptionSpan>
            </MagnifyDiv> */}
            </RightFloatingDiv>
            {isClicked ? (
              <>
                <RadarArticle>
                  <TitleSpan>내가 선택한 지역과 평균과의 비교</TitleSpan>
                  <SubTitleSpan>
                    차트를 누르면 이전 지도로 돌아갑니다.
                  </SubTitleSpan>
                  <TitleSpan></TitleSpan>
                  <StarChart data={newData} isClicked={isClicked} />
                  <Arrow />
                </RadarArticle>
                <DetailArticle>
                  <TitleSpan>내가 선택한 1,2,3위 지역 심층 분석</TitleSpan>
                  <DetailItemContainer>
                    <DetailItem>
                      <DetailTitleSpan>1위 지역</DetailTitleSpan>
                      <Pie input={data} number={0} />
                    </DetailItem>
                    <DetailItem>
                      <DetailTitleSpan>2위 지역</DetailTitleSpan>
                      <Pie input={data} number={1} />
                    </DetailItem>
                    <DetailItem>
                      <DetailTitleSpan>3위 지역</DetailTitleSpan>
                      <Pie input={data} number={2} />
                    </DetailItem>
                  </DetailItemContainer>
                </DetailArticle>
              </>
            ) : (
              <>
                <RightFloatingDiv02 isClicked={isClicked}>
                  <BackArrow>
                    <img onClick={() => setDetail(false)} src={Back}></img>
                    <OptionSpan>뒤로가기</OptionSpan>
                  </BackArrow>
                </RightFloatingDiv02>
                <TitleSpan>나의 추천 자취지역 Top5</TitleSpan>
                <SubTitleSpan>
                  마커에 마우스를 올리시면 해당 지역과 평균을 비교할 수
                  있습니다.
                </SubTitleSpan>
                <SubTitleSpan>
                  마커를 클릭하면 해당 지역의 상세정보를 확인할 수 있습니다.
                </SubTitleSpan>
                <Article>
                  <ArticleContentContainer>
                    <LeftContainer>
                      <Map
                        setIsHovered={setIsHovered}
                        setIsClicked={setIsClicked}
                        data={data}
                        univ_lat={univ_lat}
                        univ_lon={univ_lon}
                      />
                    </LeftContainer>

                    <RightContainer>
                      <RadarArticle>
                        {isHovered ? (
                          <>
                            <StarChart02
                              data={newData}
                              isClicked={isClicked}
                              isHovered={isHovered}
                            />
                            <Arrow height={window.innerHeight} />
                          </>
                        ) : (
                          <>
                            <TitleSpan>마커를 선택해주세요.</TitleSpan>
                          </>
                        )}
                      </RadarArticle>
                    </RightContainer>
                  </ArticleContentContainer>
                </Article>{" "}
                <DetailArticle>
                  <TitleSpan>
                    추천받은 상위 5개 지역의 총점(매물이나 마커 500m 이내에
                    맥날, 스벅이 몇개나 있군요. 새 지도에 표시
                  </TitleSpan>
                  <DetailItemContainer>
                    <DetailItem>
                      <DetailTitleSpan>1위 지역</DetailTitleSpan>
                      <Bar input={data} />
                      <Arrow height={window.innerHeight + window.innerHeight} />
                    </DetailItem>
                  </DetailItemContainer>
                </DetailArticle>
              </>
            )}
            <DetailArticle>
              <TitleSpan>
                매물정보 표시 request로 미리 백에서 가져와서 저장해두기
              </TitleSpan>
              <Line />
            </DetailArticle>
          </>
        )}
        {!data && (
          <Article>
            <Loader />
          </Article>
        )}
      </Wrapper>
    </>
  );
};

export default RecommendationResult;

// <Article>
// <TitleSpan>"{univ_name}"의 추천 3위 매물의 가중치 비율</TitleSpan>
// <Doughnut
//   w1={data[2].T1}
//   w2={data[2].T2}
//   w3={data[2].T3}
//   w4={data[2].T4}
//   w5={data[2].T5}
// />
// </Article>
//   <Article>
//   <TitleSpan>"{univ_name}"의 선택된 반영률</TitleSpan>
//   <Doughnut w1={w1} w2={w2} w3={w3} w4={w4} w5={w5} />
// </Article>
// <Article>
//   <TitleSpan>"{univ_name}"의 추천 1위 매물의 가중치 비율</TitleSpan>
//   <Doughnut
//     w1={data[0].T1}
//     w2={data[0].T2}
//     w3={data[0].T3}
//     w4={data[0].T4}
//     w5={data[0].T5}
//   />
// </Article>
// <Article>
//   <TitleSpan>"{univ_name}"의 추천 2위 매물의 가중치 비율</TitleSpan>
//   <Doughnut
//     w1={data[1].T1}
//     w2={data[1].T2}
//     w3={data[1].T3}
//     w4={data[1].T4}
//     w5={data[1].T5}
//   />
// </Article>
