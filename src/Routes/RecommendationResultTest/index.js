import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Api } from "../../api";
import styled, { keyframes } from "styled-components";
import PieRoom from "../../components/Visualization/PieRoom";
import Bar from "../../components/Visualization/Bar";
import Loader from "../../components/Loader";
import Map from "../../components/Kakao/Map";
import Arrow from "../../components/Arrow";
import Back from "../../components/Styles/images/back.png";
import BarDetailItem from "../../components/Visualization/Detail/BarDetailItem";
import PieDetailItem from "../../components/Visualization/Detail/PieDetailItem";
import WordcloudDetailItem from "../../components/Visualization/Detail/WordcloudDetailItem";
import { Helmet } from "react-helmet";
import RadarArticle from "../../components/Visualization/RadarArticle";
import Wordcloud from "../../components/Visualization/Wordcloud";
import Popup from "reactjs-popup";
import QuestionPopup from "../../components/QuestionPopup";

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
  @media (max-width: 500px) {
    height: 50vw;
    margin-bottom: 20vw;
    padding-top: 40vh;
  }
`;

const ArticleContentContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 100vw;
    height: 80vw;
    flex-direction: column;
  }
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
  @media (max-width: 500px) {
    width: 100vw;
    height: 80vw;
    justify-content: center;
    align-items: center;
    margin-bottom: 50vw;
  }
`;

const DetailArticle = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}` : `48vw`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  @media (max-width: 500px) {
    margin-top: 50vh;
    height: 280vw;
  }
`;
const DetailArticle03 = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}` : `48vw`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  @media (max-width: 500px) {
    margin-top: -10vh;
    height: 50vh;
  }
`;

const DetailItemContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  @media (max-width: 500px) {
    flex-direction: column;
    height: 200vh;
  }
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
  @media (max-width: 500px) {
    display: none;
  }
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
  @media (max-width: 500px) {
    font-size: 4vw;
    margin-top: 10vh;
    margin-bottom: 5vw;
  }
`;
const TitleSpan02 = styled.span`
  font-size: 2vw;
  margin-top: 4vw;
  margin-bottom: 1vw;
  @media (max-width: 500px) {
    font-size: 5vw;
  }
`;
const TitleSpan03 = styled.span`
  font-size: 2vw;
  margin-bottom: 2vw;
  margin-top: 5vw;
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;
const SubTitleSpan = styled.span`
  font-size: 0.9vw;
  @media (max-width: 500px) {
    margin-bottom: 5vh;
    font-size: 3vw;
  }
`;
const CheckSpan = styled.span`
  font-size: 0.8vw;
  color: ${(props) => (props.fontColor ? `${props.theme.headerBgColor}` : ``)};
  margin-bottom: 0.5vw;
  cursor: pointer;
`;

const BarChartTitleSpan = styled.span`
  font-size: 1vw;
  font-weight: bold;
`;
const BarChartYaxisSpan = styled.span`
  position: relative;
  top: 1vw;
  left: -13.5vw;
  font-size: 0.3vw;
  font-weight: bold;
`;

const CheckSpanDiv = styled.div`
  width: 7vw;
  height: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  top: 5vw;
  left: 14vw;
`;

const QuestionDiv = styled.div`
  width: 100%;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid ${(props) => props.theme.headerBgColor};
`;
const QuestionTitleSpan = styled.span`
  font-size: 1.5vw;
`;
const QuestionItemBigSpan = styled.span`
  margin-top: 1vw;
  font-size: 1vw;
`;

const QuestionItemSmallSpan = styled.span`
  margin-top: 0.5vw;
  font-size: 0.8vw;
`;
const QuestionItemInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 75%;
  height: auto;
  margin: 1vw 0;
`;
const QuestionItemCheckbox = styled.div`
  text-align: center;
  width: 80%;
  height: 2vw;
`;
const QuestionDivButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const QuestionDivButton = styled.span`
  margin-top: 2vw;
  font-size: 1.5vw;
  text-align: center;
  width: 6vw;
  height: 3vw;
`;
const DetailItemContainer03 = styled.div`
  width: auto;
  height: 66%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`;
const Rotation = keyframes`
  0%{
    transform: translateX(-37.5vw)
  }
  100%{
    transform: translateX(300vw)
  }
`;

const RotationArticle = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: translateX(30vw);
  animation: ${Rotation} 25s linear infinite;
  img {
    width: auto;
    height: auto;
  }
  @media (max-width: 500px) {
    animation: ${Rotation} 12s linear infinite;
    img {
      width: 50vw;
      max-height: 30vw;
    }
  }
`;
const RotationDetailBox = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: 50vw;
  }
`;
const PriceSpan = styled.span`
  font-size: 1vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const RoomDescSpan = styled.span`
  font-size: 1vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const RoomDescSpan02 = styled.span`
  font-size: 1vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
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
      rank: 1,
      code: "126.970346000063415_37.5436866666651241_0.0057935_0.0048256",
      T1: 19,
      T2: 21,
      T3: 12,
      T4: 3,
      T5: 7,
      total_weight: 63,
      거리: 19,
      역세권: 21,
      가성비: 12,
      안전: 3,
      매물: 7,
      총점: 63,
      lat: 37.543650143476114,
      lon: 126.97012617932113,
      T1_avg: 17.125,
      T2_avg: 11.75,
      T3_avg: 11.75,
      T4_avg: 2.75,
      T5_avg: 6.5,
      total_weight_avg: 50.975,
      "평균 거리": 17.125,
      "평균 역세권": 11.75,
      "평균 가성비": 11.75,
      "평균 안전": 2.75,
      "평균 매물": 6.5,
      "평균 총점": 9.975,
      rooms_id: [
        "609b663670d2552626babf25",
        "6088dd236197aa4c11cb6a3f",
        "609b668063c53a512bd6375c",
        "609b66306ba8ed57f0776377",
        "609b663398655d1ea5230de9",
        "609ca906dde2624d3a45aa23",
        "609ce2561b011f1f6f5ebb83",
        "609b664e179c746568acf23c",
        "609b662dd6be2a512b76cab7",
        "6064287188dc391d40ca270d",
        "609caa281e0de72fb1016815",
        "609b66259ba9ea65688e9481",
        "609b66388fd89a1ea5b37ebb",
        "607cff532172072bad9a59fd",
        "608a685b69c8342e6f71b8a0",
        "607a397d6be823635a8b0964",
        "609cefa6581a6154a4439251",
        "608a1a182c20db09f9a11700",
        "609a4e56b4f78a63042d2ee3",
        "609a2b6792df3015f78439b7",
        "609498ca0ea2d46e7ead5621",
        "609b923e0b7e1b2908ad928e",
        "6088d8545755433f1ef2258e",
        "5fc86c43351df6746bbc53a4",
      ],
      rooms_type: [
        0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 3, 0, 3, 0, 1, 0, 1, 0, 1, 1, 3,
      ],
      rooms_location_lat: [
        37.5417327044, 37.5455208742829, 37.54132196303978, 37.5425331319,
        37.5417327044, 37.541659305353, 37.5434883297, 37.5434883297,
        37.5425331319, 37.5416650874, 37.541659305353, 37.5425331319,
        37.5438937310541, 37.541904, 37.541659305353, 37.541562,
        37.54391396368047, 37.5440393762, 37.54555765241213, 37.5455208742829,
        37.5435980567064, 37.541659305353, 37.54542707260585, 37.541562,
      ],
      rooms_location_lon: [
        126.9683444219, 126.968712282177, 126.96877457319059, 126.9696385633,
        126.9683444219, 126.967469218302, 126.9701813213, 126.9701813213,
        126.9696385633, 126.9717299739, 126.967469218302, 126.9696385633,
        126.969637898413, 126.970384, 126.967469218302, 126.972465,
        126.97165217870739, 126.9687689136, 126.97278314034024,
        126.968712282177, 126.968731077468, 126.967469218302,
        126.96937033634026, 126.972465,
      ],
      rooms_hash_tags_count: [
        3, 8, 2, 2, 3, 6, 3, 2, 2, 5, 6, 2, 2, 4, 6, 5, 2, 1, 3, 6, 3, 7, 7, 5,
      ],
      rooms_hash_tags: [
        "분리형",
        "풀옵션",
        "빌트인",
        "주차",
        "반려동물",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "풀옵션",
        "빌트인",
        "분리형",
        "풀옵션",
        "빌트인",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "풀옵션",
        "빌트인",
        "단기가능",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "발코니",
        "주차",
        "빌트인",
        "분리형",
        "주차",
        "풀옵션",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "복층",
        "주차",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "풀옵션",
        "보안/안전",
        "전세자금대출",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "전세자금대출",
        "주차",
        "반려동물",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "반려동물",
        "빌트인",
        "엘리베이터",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "복층",
        "주차",
        "풀옵션",
        "빌트인",
        "보안/안전",
      ],
      rooms_desc: [
        "원룸 | 1층 | 23.14m²",
        "투룸 | 6층 | 46.28m² | 관리비 5만",
        "원룸 | 2층 | 16.52m² | 관리비 3.5만",
        "원룸 | 옥탑 | 19.83m² | 관리비 3만",
        "원룸 | 1층 | 23.14m²",
        "투룸 | 2층 | 39.66m² | 관리비 6만",
        "원룸 | 4층 | 23.14m² | 관리비 5만",
        "원룸 | 3층 | 19.83m² | 관리비 5만",
        "원룸 | 2층 | 13.22m²",
        "원룸 | 고층 | 23.14m² | 관리비 7만",
        "투룸 | 4층 | 36.36m² | 관리비 6만",
        "쓰리룸 이상 | 3층 | 69.5m² | 관리비 2만",
        "쓰리룸 이상 | 4층 | 82.64m²",
        "오피스텔 | 중층 | 25.76m² | 관리비 11만",
        "원룸 ∙ 미등기건물 | 2층 | 33m² | 관리비 7만",
        "오피스텔 | 11층 | 40.98m² | 관리비 15만",
        "원룸 | 3층 | 19.8m² | 관리비 5만",
        "투룸 | 2층 | 36.36m²",
        "원룸 | 3층 | 19.83m² | 관리비 5만",
        "투룸 | 5층 | 33.05m² | 관리비 7만",
        "원룸 | 3층 | 16.52m² | 관리비 5만",
        "투룸 ∙ 미등기건물 | 2층 | 27.57m² | 관리비 7만",
        "투룸 | 5층 | 42.97m²",
        "오피스텔 | 8층 | 33.77m² | 관리비 10만",
      ],
      rooms_desc2: [
        "1층, 23.14m²",
        "6층, 46.28m², 관리비 5만",
        "2층, 16.52m², 관리비3.5만",
        "옥탑, 19.83m², 관리비 3만",
        "1층, 23.14m²",
        "2층, 39.66m², 관리비 6만",
        "4층, 23.14m², 관리비 5만",
        "3층, 19.83m², 관리비 5만",
        "2층, 13.22m²",
        "고층, 23.14m², 관리비 7만",
        "4층, 36.36m², 관리비 6만",
        "3층, 69.5m², 관리비 2만",
        "4층, 82.64m²",
        "중층, 25.76m², 관리비 11만",
        "2층, 33m², 관리비 7만",
        "11층, 40.98m², 관리비 15만",
        "3층, 19.8m², 관리비 5만",
        "2층, 36.36m²",
        "3층, 19.83m², 관리비 5만",
        "5층, 33.05m², 관리비 7만",
        "3층, 16.52m², 관리비 5만",
        "2층, 27.57m², 관리비 7만",
        "5층, 42.97m²",
        "8층, 33.77m², 관리비 10만",
      ],
      rooms_img_url_01: [
        "http://d1774jszgerdmk.cloudfront.net/512/56397c08-2f88-405a-8c63-901b3b2738f4",
        "http://d1774jszgerdmk.cloudfront.net/512/696f07b9-0516-44c6-97b7-f35c93118a62",
        "http://d1774jszgerdmk.cloudfront.net/512/8465ef3c-8ae7-4497-9e04-3e711b412c3a",
        "http://d1774jszgerdmk.cloudfront.net/512/ca7d1f3b-c3e0-44b6-bd32-394c4a664616",
        "http://d1774jszgerdmk.cloudfront.net/512/dfd469a3-b14a-4c02-a864-a0d1dba4f9f2",
        "http://d1774jszgerdmk.cloudfront.net/512/d34035e8-d702-430a-ad1a-9b39aa13a157",
        "http://d1774jszgerdmk.cloudfront.net/512/6f137c4a-9d5f-4a05-a38c-28805608c5db",
        "http://d1774jszgerdmk.cloudfront.net/512/ddcc8628-1769-4107-b365-7d08dbc0d363",
        "http://d1774jszgerdmk.cloudfront.net/512/67b3127b-813b-4810-939b-f6505e63e7f6",
        "http://d1774jszgerdmk.cloudfront.net/512/52a319d2-43b7-4740-b8da-0fd85cdd5d31",
        "http://d1774jszgerdmk.cloudfront.net/512/bc63d990-4984-44e2-966a-f0e22ac4066c",
        "http://d1774jszgerdmk.cloudfront.net/512/912bd56d-851b-450f-91f3-2ff0948afb19",
        "http://d1774jszgerdmk.cloudfront.net/512/9c0b56f1-537c-4282-b2d6-35d16ec4877b",
        "http://d1774jszgerdmk.cloudfront.net/512/8f28abfe-c7bf-4df1-b296-4c5f91e0217b",
        "http://d1774jszgerdmk.cloudfront.net/512/bbd3b50a-877a-46b2-9632-ee2e8708387e",
        "http://d1774jszgerdmk.cloudfront.net/512/8df7718f-0d2a-4979-b855-2c338d1abc16",
        "http://d1774jszgerdmk.cloudfront.net/512/6a434ed0-ca2a-427a-a744-fbf6afc98902",
        "http://d1774jszgerdmk.cloudfront.net/512/9ce6ea59-dc19-44b3-9c32-d20bd8fbc8ec",
        "http://d1774jszgerdmk.cloudfront.net/512/f14531ed-b530-4bc0-b814-fc6c4bd87df6-2",
        "http://d1774jszgerdmk.cloudfront.net/512/9edfe857-7478-416e-8c13-a4668deed017",
        "http://d1774jszgerdmk.cloudfront.net/512/7aa26699-40b1-47d8-b1ef-4d3c2605ea06",
        "http://d1774jszgerdmk.cloudfront.net/512/a28205be-07f7-4db7-979b-2268067170dc",
        "http://d1774jszgerdmk.cloudfront.net/512/9eacf037-53fc-47f5-a244-9d45c91ce19a",
        "http://d1774jszgerdmk.cloudfront.net/512/9fefd6ce-01d9-4ab4-a7c2-d0e06578f817",
      ],
      rooms_price_title: [
        "1000/35",
        "3억2000",
        "1000/45",
        "500/40",
        "500/40",
        "3억3000",
        "1억/10",
        "1000/50",
        "500/30",
        "1억",
        "2억8000",
        "3000/120",
        "3억5000",
        "3억5000",
        "2억8000",
        "1000/90",
        "6000",
        "1억7000",
        "1000/50",
        "3억2000",
        "9000",
        "3억3000",
        "3억2000",
        "1000/75",
      ],
      rooms_selling_type: [
        0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0,
      ],
    },
    {
      rank: 2,
      code: "126.964552500063405_37.5436866666651241_0.0057935_0.0048256",
      T1: 30,
      T2: 10,
      T3: 12,
      T4: 3,
      T5: 1,
      total_weight: 58,
      거리: 30,
      역세권: 10,
      가성비: 12,
      안전: 3,
      매물: 1,
      총점: 58,
      lat: 37.5432412425433,
      lon: 126.96442917268848,
      T1_avg: 17.125,
      T2_avg: 11.75,
      T3_avg: 11.75,
      T4_avg: 2.75,
      T5_avg: 6.5,
      total_weight_avg: 9.975,
      "평균 거리": 17.125,
      "평균 역세권": 11.75,
      "평균 가성비": 11.75,
      "평균 안전": 2.75,
      "평균 매물": 6.5,
      "평균 총점": 9.975,
      rooms_id: [
        "60838da61a5536037bd7a0c5",
        "6098970ee1e7793744e94541",
        "608675ac5544780a48230521",
        "609cd489356eab7ad789b7cd",
        "6052ae3bd17085650566657c",
        "606698b8ea86b3748696e216",
        "608fbaffafded1030a11c255",
        "608ba96033f95c51fc58162c",
        "609f336cf20d8729b0a0fd5d",
        "608ba949a4db122f971ff2d6",
        "5fcdb90bf84488728f413892",
        "606aa77b0e522332a20dd9c1",
        "608e3a6e5ca7e9250cedcc78",
        "6092491239f5c4196a403c7d",
      ],
      rooms_type: [0, 1, 1, 1, 1, 0, 1, 1, 1, 2, 0, 1, 0, 1],
      rooms_location_lat: [
        37.5434595302347, 37.543003736963726, 37.5434595302347, 37.541481724877,
        37.5433965987, 37.5433965987, 37.541481724877, 37.54203737489365,
        37.5419433693, 37.542333121236084, 37.54361726636776,
        37.541526508049046, 37.54500076020961, 37.543003736963726,
      ],
      rooms_location_lon: [
        126.962974476154, 126.96421600686956, 126.962974476154,
        126.967167405277, 126.964301817, 126.964301817, 126.967167405277,
        126.9626323256162, 126.9616909401, 126.96332920373592,
        126.96713965092873, 126.96559717105077, 126.96559104825872,
        126.96421600686956,
      ],
      rooms_hash_tags_count: [4, 4, 1, 6, 5, 5, 6, 2, 2, 4, 3, 2, 2, 3],
      rooms_hash_tags: [
        "분 리형",
        "반려동물",
        "풀옵션",
        "빌트인",
        "풀옵션",
        "빌트인",
        "발코니",
        "보안/안전",
        "빌트인",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "발코니",
        "보안/안전",
        "분리형",
        "풀옵션",
        "빌트인",
        "발코니",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "보안/안전",
        "엘리베이터",
        "발코니",
        "주차",
        "빌트인",
        "발코니",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "주차",
        "발코니",
        "직거래",
        "풀옵션",
        "직거래",
        "풀옵션",
        "발코니",
      ],
      rooms_desc: [
        "원룸 | 반지층 | 23.14m²",
        "투룸 | 2층 | 29.75m² | 관리비 4만",
        "투룸 | 반지층 | 36.36m²",
        "투룸 | 2층 | 36.36m² | 관리비 6만",
        "투룸 | 반지층 | 36.36m² | 관리비 2만",
        "원룸 | 2층 | 26.44m² | 관리비 2만",
        "투룸 | 2층 | 39.66m² | 관리비 7만",
        "투룸 | 중층 | 50.07m² | 관리비 2만",
        "투룸 | 고층 | 66.12m² | 관리비 9만",
        "쓰리룸 이상 | 중층 | 67.92m² | 관리비 2만",
        "원룸 | 2층 | 19.83m² | 관리비 5만",
        "투룸 | 4층 | 35.84m² | 관리비 5만",
        "원룸 | 3층 | 33.05m² | 관리비 5만",
        "투룸 | 2층 | 36m² | 관리비 4만",
      ],
      rooms_desc2: [
        "반지층, 23.14m²",
        "2층, 29.75m², 관리비 4만",
        "반지층, 36.36m²",
        "2층, 36.36m², 관리비 6만",
        "반지층, 36.36m², 관리비2만",
        "2층, 26.44m², 관리비 2만",
        "2층, 39.66m², 관리비 7만",
        "중층, 50.07m², 관리비 2만",
        "고층, 66.12m², 관리비 9만",
        "중층, 67.92m², 관리비 2만",
        "2층, 19.83m², 관리비 5만",
        "4층, 35.84m², 관리비 5만",
        "3층, 33.05m², 관리비 5만",
        "2층, 36m², 관리비 4만",
      ],
      rooms_img_url_01: [
        "http://d1774jszgerdmk.cloudfront.net/512/a3242a7b-7932-4009-b2b7-ebcbf9480a67",
        "http://d1774jszgerdmk.cloudfront.net/512/6d58a056-e928-49c1-8900-e0fcc642703d",
        "http://d1774jszgerdmk.cloudfront.net/512/b992f9c1-3b1b-4816-8428-a97971289e41",
        "http://d1774jszgerdmk.cloudfront.net/512/25bf896a-c5c2-401d-85ae-55a3f062e7bb",
        "http://d1774jszgerdmk.cloudfront.net/512/81fa6e61-4033-4940-972e-90241b011ed4-2",
        "http://d1774jszgerdmk.cloudfront.net/512/6e378fd5-9066-4196-98a6-25022c01dcef-2",
        "http://d1774jszgerdmk.cloudfront.net/512/3a20b4fb-39fb-41a5-a24f-862ffd4b8e18",
        "http://d1774jszgerdmk.cloudfront.net/512/2ad6f800-9d3a-4126-854a-7847b0864c2e",
        "http://d1774jszgerdmk.cloudfront.net/512/2c329eac-6e75-4aaf-8b6c-d3ab016bd839",
        "http://d1774jszgerdmk.cloudfront.net/512/f388567b-375a-4217-8114-1498803587b1",
        "http://d1774jszgerdmk.cloudfront.net/512/563c7297-cf89-437c-9429-7b046e9fb8c9-2",
        "http://d1774jszgerdmk.cloudfront.net/512/9acd1099-be67-40ea-a392-0b90a15451e7",
        "http://d1774jszgerdmk.cloudfront.net/512/5c483350-2ad9-4d90-b080-8c2fd7979cdd",
        "http://d1774jszgerdmk.cloudfront.net/512/15D02ED7-73E7-4A69-B2F7-932BD4C4EAEC",
      ],
      rooms_price_title: [
        "500/40",
        "2000/70",
        "1000/50",
        "2억6000",
        "1000/55",
        "1000/50",
        "2억6000",
        "4억5000",
        "5000/80",
        "6억",
        "1000/50",
        "2억3000",
        "2000/60",
        "2000/70",
      ],
      rooms_selling_type: [0, 0, 0, 1, 0, 0, 1, 2, 0, 2, 0, 1, 0, 0],
    },
    {
      rank: 3,
      code: "126.964552500063405_37.5485123333317929_0.0057935_0.0048256",
      T1: 27,
      T2: 3,
      T3: 12,
      T4: 3,
      T5: 12,
      total_weight: 56,
      거리: 27,
      역세권: 3,
      가성비: 12,
      안전: 3,
      매물: 12,
      총점: 56,
      lat: 37.54869335869727,
      lon: 126.96450663709203,
      T1_avg: 17.125,
      T2_avg: 11.75,
      T3_avg: 11.75,
      T4_avg: 2.75,
      T5_avg: 6.5,
      total_weight_avg: 9.975,
      "평균 거리": 17.125,
      "평균 역세권": 11.75,
      "평균 가성비": 11.75,
      "평균 안전": 2.75,
      "평균 매물": 6.5,
      "평균 총점": 9.975,
      rooms_id: [
        "6081285d784f776722841fc5",
        "60836e646ced396096cba469",
        "608f6f9679fac41c83035b8f",
        "6088bb2b3bbfa92a3e8fcb22",
        "609f2f29e4605273808025ff",
        "6088bc104b78312a3e3406d3",
        "6090b0e1b35b32684ebc5048",
        "60824cd76054cd384c4633c3",
        "609353991473153e0e013cd6",
        "608cb73e30cf9c6b44db5b4c",
        "609cb535a7150e2e8e8c48a6",
        "6087a686f3dc7130b0cc3773",
        "608e0ed194a9fe01f5fe0585",
        "608805d6b21fb42a0937eccf",
        "60964ce78339fc10cd980ff8",
        "6094dd2b9d7f252b81df505f",
        "6086700c1a09677694c67dbb",
        "607559bd25803b22c016fb4c",
        "60934cb271ce3a215be55b8d",
        "607983ddec70b1271d83dd8a",
        "609f22c0316ccb22db662c6d",
        "60764fbeed4d16032fc6d28e",
        "6087c019d580bf674e73dd63",
        "6088043c8f63e92c0eb085be",
      ],
      rooms_type: [
        1, 0, 1, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 2, 1, 2, 0, 0, 2, 0,
      ],
      rooms_location_lat: [
        37.5483198575, 37.549648736989774, 37.5473002872, 37.5486936772,
        37.5490075344, 37.5489042987934, 37.5487845591648, 37.549174416,
        37.5484357252, 37.547329347000975, 37.5473002872, 37.5494079489,
        37.5473002872, 37.548871769, 37.5489042987934, 37.5494665598,
        37.5486610898874, 37.547819126780695, 37.54902596557021,
        37.547819126780695, 37.5478159568, 37.5480268635422, 37.547819126780695,
        37.548871769,
      ],
      rooms_location_lon: [
        126.9649693917, 126.96176394873162, 126.9662055873, 126.9617599101,
        126.9627284303, 126.962788118819, 126.966089264352, 126.9663858034,
        126.9668387861, 126.96701128108958, 126.9662055873, 126.9639232451,
        126.9662055873, 126.9666982703, 126.962788118819, 126.9671687692,
        126.96298129596, 126.96573459991858, 126.96405469899581,
        126.96573459991858, 126.9672645491, 126.965930048994,
        126.96573459991858, 126.9666982703,
      ],
      rooms_hash_tags_count: [
        0, 2, 6, 1, 0, 2, 1, 2, 7, 3, 6, 2, 6, 3, 0, 6, 2, 3, 1, 4, 4, 3, 3, 3,
      ],
      rooms_hash_tags: [
        "반려동물",
        "전세자금대출",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "보안/안전",
        "전세자금대출",
        "보안/안전",
        "보안/안전",
        "주차",
        "반려동물",
        "분리형",
        "주차",
        "풀옵션",
        "빌트인",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "반려동물",
        "풀옵션",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "발코니",
        "보안/안전",
        "주차",
        "풀옵션",
        "엘리베이터",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "반려동물",
        "풀옵션",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "보안/안 전",
        "주차",
        "빌트인",
        "발코니",
        "전세자금대출",
        "주차",
        "반려동물",
        "발코니",
        "보안/안전",
        "분리형",
        "반려동물",
        "풀옵션",
        "보안/안전",
        "분리형",
        "풀옵션",
        "보안/안전",
        "주차",
        "발코니",
        "전세자금대출",
        "반려동물",
        "풀옵션",
        "보안/안전",
      ],
      rooms_desc: [
        "투룸 | 3층 | 49.58m²",
        "원룸 | 반지층 | 26.4m²",
        "투룸 | 저층 | 30.52m² | 관리비 7만",
        "쓰리룸 이상 | 1층 | 56.19m² | 관리비 1만",
        "투룸 | 반지층 | 33.05m²",
        "투룸 | 2층 | 42.85m² | 관리비 1만",
        "투룸 | 1층 | 29.75m²",
        "원룸 | 1층 | 19.8m² | 관리비 1만",
        "원룸 | 1층 | 39.66m² | 관리비 3만",
        "원룸 | 2층 | 29.75m² | 관리비 2만",
        "투룸 | 1층 | 33.05m² | 관리비 7만",
        "투룸 | 1층 | 39.66m²",
        "투룸 | 1층 | 36.36m² | 관리비 7만",
        "원룸 | 반지층 | 23.14m² | 관리비 3만",
        "투룸 | 2층 | 39.66m²",
        "원룸 | 1층 | 33.05m² | 관리비 3만",
        "원룸 | 2층 | 16.5m² | 관리비 2만",
        "쓰리룸 이상 | 2층 | 49.58m² | 관리비 1만",
        "투룸 | 반지층 | 26.44m²",
        "쓰리룸 이상 | 2층 | 56.19m² | 관리비 1만",
        "원룸 | 1층 | 29.75m²",
        "원룸 | 1층 | 29.75m² | 관리비 2만",
        "쓰리룸 이상 | 3층 | 55.44m² | 관리비 2만",
        "원룸 | 반지층 | 23.14m² | 관리비 3만",
      ],
      rooms_desc2: [
        "3층, 49.58m²",
        "반지층, 26.4m²",
        "저층, 30.52m², 관리비 7만",
        "1층, 56.19m², 관리비 1 만",
        "반지층, 33.05m²",
        "2층, 42.85m², 관리비 1만",
        "1층, 29.75m²",
        "1층, 19.8m², 관리비 1만",
        "1층, 39.66m², 관리비 3만",
        "2층, 29.75m², 관리비 2만",
        "1층, 33.05m², 관리비 7만",
        "1층, 39.66m²",
        "1층, 36.36m², 관리비 7만",
        "반지층, 23.14m², 관리비 3만",
        "2층, 39.66m²",
        "1층, 33.05m², 관리비 3��",
        "2층, 16.5m², 관리비 2만",
        "2층, 49.58m², 관리비 1만",
        "반지층, 26.44m²",
        "2층, 56.19m², 관리비 1만",
        "1층, 29.75m²",
        "1층, 29.75m², 관리비 2만",
        "3층, 55.44m², 관리비 2만",
        "반지층, 23.14m², 관리비 3만",
      ],
      rooms_img_url_01: [
        "http://d1774jszgerdmk.cloudfront.net/512/6ed9d509-d49b-4a45-8ce2-c1bc221e12b9",
        "http://d1774jszgerdmk.cloudfront.net/512/307dad96-4884-4075-a93d-c4ab068ddab5-2",
        "http://d1774jszgerdmk.cloudfront.net/512/c490613c-a52c-4c3d-8d4f-f69b75c49cac",
        "http://d1774jszgerdmk.cloudfront.net/512/1acfc5c7-4b1e-4178-8e14-f22c91ffc720",
        "http://d1774jszgerdmk.cloudfront.net/512/0c4e02fb-54d5-4650-ae2f-f9f76714c3b9",
        "http://d1774jszgerdmk.cloudfront.net/512/f363d467-c703-4f14-a4d2-1551fe28016d",
        "http://d1774jszgerdmk.cloudfront.net/512/58cdcfb0-15be-46da-b09c-30eedb861405",
        "http://d1774jszgerdmk.cloudfront.net/512/c6c29c6a-01ce-41f9-8e54-b416021df212",
        "http://d1774jszgerdmk.cloudfront.net/512/8dddf30a-7e32-4720-bb42-0d6b17697762",
        "http://d1774jszgerdmk.cloudfront.net/512/ce5344b7-5823-4bc6-b7fe-0ddb4b91a605",
        "http://d1774jszgerdmk.cloudfront.net/512/afdd6a79-50f5-443e-a197-0259b464e940",
        "http://d1774jszgerdmk.cloudfront.net/512/fce1ebc8-4fa2-42fb-8c7c-083d3df679fb",
        "http://d1774jszgerdmk.cloudfront.net/512/3566abdd-abbe-4eba-96e9-ef7f6a57c136",
        "http://d1774jszgerdmk.cloudfront.net/512/1d89d6c9-34c5-4211-ae6a-2fff17bb4ec7",
        "http://d1774jszgerdmk.cloudfront.net/512/1e2bdb7d-2445-4a5f-80b0-b6ccc91903cb",
        "http://d1774jszgerdmk.cloudfront.net/512/cc1cad50-f07e-4449-af0e-f1a2674738fd",
        "http://d1774jszgerdmk.cloudfront.net/512/6c649a24-d2b6-48aa-8f8c-e3fbcdeda92f",
        "http://d1774jszgerdmk.cloudfront.net/512/07b1f32f-5ae7-4d5a-9722-97553c0d5c08",
        "http://d1774jszgerdmk.cloudfront.net/512/c3b8363d-419d-43e6-b75c-0898cb081ec7",
        "http://d1774jszgerdmk.cloudfront.net/512/77bf7130-36ac-4333-aff8-1e1387b7089f",
        "http://d1774jszgerdmk.cloudfront.net/512/8db8d010-f7e5-4ccb-9c77-8775dfd4d320",
        "http://d1774jszgerdmk.cloudfront.net/512/8ff6facd-6cf3-4eb6-927e-7d85120ea851",
        "http://d1774jszgerdmk.cloudfront.net/512/18163388-00f2-4a09-b387-80b9a8db8cd7",
        "http://d1774jszgerdmk.cloudfront.net/512/ca9360d2-090b-4f63-8f82-48a894d55182",
      ],
      rooms_price_title: [
        "1억8000",
        "4000",
        "2억2500",
        "3500/60",
        "1000/40",
        "7000/30",
        "500/40",
        "500/40",
        "1억7000",
        "500/40",
        "2억2500",
        "1000/35",
        "2억2500",
        "1000/40",
        "7000/30",
        "1억7000",
        "500/40",
        "3000/80",
        "5000",
        "3000/80",
        "500/40",
        "200/43",
        "5000/75",
        "7000",
      ],
      rooms_selling_type: [
        1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,
      ],
    },
    {
      rank: 4,
      code: "126.958759000063409_37.5485123333317929_0.0057935_0.0048256",
      T1: 23,
      T2: 8,
      T3: 12,
      T4: 3,
      T5: 6,
      total_weight: 52,
      거리: 23,
      역세권: 8,
      가성비: 12,
      안전: 3,
      매물: 6,
      총점: 52,
      lat: 37.54864494823593,
      lon: 126.95932577845261,
      T1_avg: 17.125,
      T2_avg: 11.75,
      T3_avg: 11.75,
      T4_avg: 2.75,
      T5_avg: 6.5,
      total_weight_avg: 9.975,
      "평균 거리": 17.125,
      "평균 역세권": 11.75,
      "평균 가성비": 11.75,
      "평균 안전": 2.75,
      "평균 매물": 6.5,
      "평균 총점": 9.975,
      rooms_id: [
        "6088bc9edc6b832f06fdb7c4",
        "608b9d792b535432f9c31e21",
        "609b780f933cde071d8278f1",
        "609b790d0406c70bdcf1e37e",
        "606fce6209e2a845a1f20343",
        "608bafbfbe91865d6a2bd831",
        "60682165fc47473da531058f",
        "609dd5950787b0582609c47e",
        "6095f43f043528251ee063ed",
        "608bae730cd1564b9c8e0297",
        "6088bac2aebb6221b49eb98c",
        "60960ad6a731c431132771a5",
        "609fb3aa93616441b12535fb",
        "60681e8caf2f524275f365e3",
        "608ba2e5282ac042f6053e28",
        "60867e578db92e29cd6f56f0",
        "6087c2f3a5cc97674e1ba007",
        "609dd850e4bf2a66564c0904",
        "609f227f3563384376bb0ccb",
        "609a339dd479192f2a5d41d4",
        "609f2302c638274ef7666d99",
        "6088bb731bcfc219ad542aac",
        "6087dc4a86178d2aa43d63dd",
      ],
      rooms_type: [
        2, 0, 0, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 3, 3, 0, 0, 1, 0, 1, 2, 1, 0,
      ],
      rooms_location_lat: [
        37.54932793163854, 37.54932793163854, 37.5473119049892,
        37.5473119049892, 37.550889, 37.54791428172669, 37.547063,
        37.54779247919615, 37.548242713676544, 37.5492809317, 37.54887340044998,
        37.547242, 37.54640089647188, 37.546895, 37.55025, 37.5482357541,
        37.549428811, 37.5470281188092, 37.54793650423225, 37.5470281188092,
        37.5489815096, 37.54920524782354, 37.54793650423225,
      ],
      rooms_location_lon: [
        126.96161020943123, 126.96161020943123, 126.957041347474,
        126.957041347474, 126.961246, 126.95898105043979, 126.957398,
        126.96114929684236, 126.9603523994587, 126.9611575774,
        126.9603158531132, 126.957618, 126.95983284044772, 126.957179,
        126.960486, 126.9610992753, 126.9615105732, 126.96020819716324,
        126.9607418389083, 126.96020819716324, 126.96028411, 126.9611576166972,
        126.9607418389083,
      ],
      rooms_hash_tags_count: [
        3, 2, 6, 6, 4, 4, 3, 2, 3, 2, 1, 5, 5, 4, 7, 3, 1, 1, 3, 1, 2, 1, 3,
      ],
      rooms_hash_tags: [
        "주차",
        "발코니",
        "보안/안전",
        "분리형",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "전세자금대출",
        "보안/안전",
        "주차",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "주차",
        "풀옵션",
        "보안/안전",
        "발코니",
        "보안/안전",
        "반려동물",
        "발코니",
        "보안/안전",
        "주차",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "빌트인",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "분리형",
        "풀옵션",
        "보안/안전",
        "분리형",
        "보안/안전",
        "풀옵션",
        "엘리베이터",
        "보안/안전",
        "보안/안전",
        "발코니",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "엘리베이터",
        "보안/안전",
      ],
      rooms_desc: [
        "쓰리룸 이상 | 1층 | 49.58m² | 관리비 1만",
        "원룸 | 옥탑 | 23.14m² | 관리비 1만",
        "원룸 | 2층 | 23.14m² | 관리비 6만",
        "투룸 | 3층 | 39.66m² | 관리비 6만",
        "오피스텔 | 고층 | 22.82m² | 관리비 7.8만",
        "투룸 | 10층 | 29.75m² | 관리비 9만",
        "오피스텔 | 18층 | 16.76m² | 관리비 8만",
        "투룸 |  반지층 | 33.05m² | 관리비 1만",
        "투룸 | 2층 | 49.58m²",
        "투룸 | 3층 | 53.94m²",
        "투룸 | 반지층 | 51.49m²",
        "오피스텔 | 18층 | 19.73m² | 관리비 9만",
        "투룸 | 3층 | 36.3m² | 관리비 4만",
        "오피스텔 | 8층 | 17.73m² | 관리비 10만",
        "오피스텔 | 고층 | 18.79m² | 관리비 14만",
        "원룸 | 1층 | 29.75m²",
        "원룸 | 1층 | 26.4m²",
        "투룸 | 반지층 | 36.36m² | 관리비 1만",
        "원룸 | 5층 | 19.83m² | 관리비 10만",
        "투룸 | 반지층 | 36.36m² | 관리비 1만",
        "쓰리룸 이상 | 반지층 | 57m²",
        "투룸 | 1층 | 39.8m²",
        "원룸 | 3층 | 19.83m² | 관리비 10만",
      ],
      rooms_desc2: [
        "1층, 49.58m², 관리비 1만",
        "옥탑, 23.14m², 관리비 1만",
        "2층, 23.14m², 관리비 6만",
        "3층, 39.66m², 관리비 6만",
        "고층, 22.82m², 관리비 7.8만",
        "10층, 29.75m², 관리비 9만",
        "18층, 16.76m², 관리비 8만",
        "반지층, 33.05m², 관리비 1만",
        "2층, 49.58m²",
        "3층, 53.94m²",
        "반지층, 51.49m²",
        "18층, 19.73m², 관리비 9만",
        "3층, 36.3m², 관리비 4만",
        "8층, 17.73m², 관리비 10만",
        "고층, 18.79m², 관리비 14만",
        "1층, 29.75m²",
        "1층, 26.4m²",
        "반지층, 36.36m², 관리비 1만",
        "5층, 19.83m², 관리비 10만",
        "반지층, 36.36m², 관리비 1만",
        "반지층, 57m²",
        "1층, 39.8m²",
        "3층, 19.83m², 관리비 10만",
      ],
      rooms_img_url_01: [
        "http://d1774jszgerdmk.cloudfront.net/512/4b836a99-84a9-4ff4-98f6-5af2ed287c30",
        "http://d1774jszgerdmk.cloudfront.net/512/195d56ca-0506-450a-932c-7bc0b6bf335e",
        "http://d1774jszgerdmk.cloudfront.net/512/e660e931-4574-4463-aaa6-8ad683af539b",
        "http://d1774jszgerdmk.cloudfront.net/512/19e4ecb5-4fdc-4f7d-b335-bd64a88d4cd6",
        "http://d1774jszgerdmk.cloudfront.net/512/5b64fa49-f869-47a9-a0f4-e15943f2dae5",
        "http://d1774jszgerdmk.cloudfront.net/512/52ae4bdc-8b9b-48a4-9a61-ab7fa2467b6d",
        "http://d1774jszgerdmk.cloudfront.net/512/8208bd52-b333-4986-94dd-843365526574",
        "http://d1774jszgerdmk.cloudfront.net/512/40f31043-4065-47ae-aa5b-bf01bcc79321",
        "http://d1774jszgerdmk.cloudfront.net/512/dde53854-ac8f-4e60-8951-981af9311885",
        "http://d1774jszgerdmk.cloudfront.net/512/501ed0c5-c8de-44cc-a3de-8f6c8491c448",
        "http://d1774jszgerdmk.cloudfront.net/512/1af0a8ab-971e-45c7-9735-a176c5308f17",
        "http://d1774jszgerdmk.cloudfront.net/512/02bac7bd-90d5-40f9-9d5c-3375c941e949",
        "http://d1774jszgerdmk.cloudfront.net/512/0a702e25-8521-4e46-afc3-95735e8b0dc1",
        "http://d1774jszgerdmk.cloudfront.net/512/46a037cd-8376-4de1-a32c-51fcab80fd45-2",
        "http://d1774jszgerdmk.cloudfront.net/512/41eab119-ea7f-42b6-85dc-5c58fa9435d0",
        "http://d1774jszgerdmk.cloudfront.net/512/81df88e8-95dc-4582-9c18-29af7018f9ea",
        "http://d1774jszgerdmk.cloudfront.net/512/808451ed-c46f-4e5e-8c70-a601c239e5f0-2",
        "http://d1774jszgerdmk.cloudfront.net/512/fc2d8d87-0ea0-4b6c-abe5-b826428a9ed6",
        "http://d1774jszgerdmk.cloudfront.net/512/bafcbca2-ba6a-4c16-88a8-229e315730a6",
        "http://d1774jszgerdmk.cloudfront.net/512/08d47928-afc4-41ff-8e58-3af8c179f8cb",
        "http://d1774jszgerdmk.cloudfront.net/512/8ee072a7-3504-44e6-9f25-b4b10c41678c",
        "http://d1774jszgerdmk.cloudfront.net/512/db989d99-ed90-4f6c-8521-6bb735ed8191",
        "http://d1774jszgerdmk.cloudfront.net/512/aa326dd0-404b-4412-869d-63ce4ba02291",
      ],
      rooms_price_title: [
        "1000/63",
        "1000/40",
        "2억2000",
        "3억",
        "1억9500",
        "2억9800",
        "500/55",
        "1000/40",
        "3000/60",
        "2000/55",
        "1억2000",
        "1억4990",
        "2000/70",
        "1000/65",
        "2억9000",
        "500/35",
        "500/25",
        "500/50",
        "500/40",
        "500/50",
        "2000/70",
        "1000/50",
        "500/35",
      ],
      rooms_selling_type: [
        0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    },
    {
      rank: 5,
      code: "126.964552500063405_37.5388609999984624_0.0057935_0.0048256",
      T1: 8,
      T2: 18,
      T3: 12,
      T4: 3,
      T5: 10,
      total_weight: 52,
      거리: 8,
      역세권: 18,
      가성비: 12,
      안전: 3,
      매물: 10,
      총점: 52,
      lat: 37.53892793414318,
      lon: 126.96456533304249,
      T1_avg: 17.125,
      T2_avg: 11.75,
      T3_avg: 11.75,
      T4_avg: 2.75,
      T5_avg: 6.5,
      total_weight_avg: 9.975,
      "평균 거리": 17.125,
      "평균 역세권": 11.75,
      "평균 가성비": 11.75,
      "평균 안전": 2.75,
      "평균 매물": 6.5,
      "평균 총점": 9.975,
      rooms_id: [
        "607fb42323c2352ee5477409",
        "609cd90f310622752c40444e",
        "609c8b831e5f192de09c5dde",
        "609b66a5a935021ea5068102",
        "609b664a2f6e23512b7b21fb",
        "607fb4ff0ee39016aa377ac5",
        "609f27b5bc41b12ea03ad291",
        "609b668c03b2a513e0405460",
        "609b663b092953512bc37fc8",
        "609c8c62cbd73a2de0280907",
        "609b66417f682813e0f27cdf",
        "609b66287f9770512b5b5f1f",
        "609b6643f8e8c958dc25a1eb",
        "609b66562578b913e0865534",
        "60878a223b45eb55d378735b",
        "608b8172be7ea07556a80396",
        "609e2fca4d165167f41ed113",
        "609e255342d35709e25efdd6",
        "609e2614cc9c67436c463127",
        "609b5504409a27689e8b002f",
        "609cd60f8cdb5a3f7e672258",
        "6094e74bae63c85612fdcf27",
        "606c21e5901d162e7f875767",
        "6093a1ad9800c72812fac4f5",
      ],
      rooms_type: [
        0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 2, 2, 1, 2, 0, 1, 0, 1, 0, 2, 1, 0, 1, 2,
      ],
      rooms_location_lat: [
        37.5369950895665, 37.54101484517815, 37.5391719754606, 37.5392269663,
        37.5401862705443, 37.5369950895665, 37.5407946697, 37.54011768016925,
        37.540831147639096, 37.5391719754606, 37.54032669938324,
        37.54116627814319, 37.54050297635571, 37.54101484517815,
        37.539777571047, 37.5400154643366, 37.5391719754606, 37.5391719754606,
        37.5391719754606, 37.5406870900947, 37.5406860546, 37.5407946697,
        37.5384081392, 37.54032658389923,
      ],
      rooms_location_lon: [
        126.962572838135, 126.96595949106002, 126.967362128725, 126.9649510163,
        126.966856470596, 126.962572838135, 126.9648280791, 126.9667700542187,
        126.96633071070029, 126.967362128725, 126.96672470125863,
        126.96618572574181, 126.9656112194234, 126.96595949106002,
        126.96176853736, 126.965062213103, 126.967362128725, 126.967362128725,
        126.967362128725, 126.96393140768, 126.9632032813, 126.9648280791,
        126.9626069813, 126.96631735952637,
      ],
      rooms_hash_tags_count: [
        4, 2, 6, 2, 3, 4, 5, 2, 1, 7, 1, 3, 3, 3, 2, 5, 8, 6, 7, 4, 4, 1, 2, 1,
      ],
      rooms_hash_tags: [
        "분리형",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "풀옵션",
        "빌트인",
        "반려동물",
        "풀옵션",
        "발코니",
        "분리형",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "빌트인",
        "보안/안전",
        "분리형",
        "빌트인",
        "풀옵션",
        "분리형",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "발코니",
        "주차",
        "발코니",
        "전세자금대출",
        "풀옵션",
        "빌트인",
        "발코니",
        "풀옵션",
        " 빌트인",
        "전세자금대출",
        "풀옵션",
        "빌트인",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "보안/안전",
        "분리형",
        "주차",
        "반려동물",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        " 전세자금대출",
        "보안/안전",
        "분리형",
        "주차",
        "풀옵션",
        "빌트인",
        "엘리베이터",
        "전세자금대출",
        "보안/안전",
        "주차",
        "빌트인",
        "엘리베이터",
        "보안/안전",
        "주차",
        "빌트인",
        "발코니",
        "보안/안전",
        "분리형",
        "반려동물",
        "발코니",
        "발코니",
      ],
      rooms_desc: [
        "원룸 | 1층 | 19.83m² | 관리비 7만",
        "쓰리룸 이상 | 2층 | 49.58m² | 관리비 1만",
        "투룸 | 15층 | 39.66m² | 관리비 12만",
        "원룸 | 1층 | 29.75m² | 관리비 3만",
        "투룸 | 2층 | 36.15m²",
        "원룸 | 2층 | 29.75m² | 관리비 7만",
        "원룸 | 4층 | 29.75m² | 관리비 3만",
        "원룸 | 반지층 | 26.44m²",
        "원룸 | 3층 | 26.44m² | 관리비 5만",
        "원룸 | 4층 | 23.14m² | 관리비 10만",
        "쓰리룸 이상 | 1층 | 62.81m²",
        "쓰리룸 이상 | 2층 | 28.6m²",
        "투룸 | 2층 | 39.65m²",
        "쓰리룸 이상 | 2층 | 49.58m² | 관리비 1만",
        "원룸 | 4층 | 19.83m² | 관리비 5만",
        "투룸 | 4층 | 29m² | 관리비 6만",
        "원룸 | 8층 | 23.14m² | 관리비 10만",
        "투룸 | 15층 | 39.66m² | 관리비 12만",
        "원룸 | 8층 | 23.14m² | 관리비 10만",
        "쓰리룸 이상 | 중층 | 52.89m² | 관리비 10만",
        "투룸 | 2층 | 42.97m²",
        "원룸 | 1층 | 26.4m² | 관리비 3만",
        "투룸 | 1층 | 33.05m²",
        "쓰리룸 이상 | 고층 | 51.89m²",
      ],
      rooms_desc2: [
        "1층, 19.83m², 관리비 7만",
        "2층, 49.58m², 관리비 1만",
        "15층, 39.66m², 관리비 12만",
        "1층, 29.75m², 관리비 3만",
        "2층, 36.15m²",
        "2층, 29.75m², 관리비 7만",
        "4층, 29.75m², 관리비 3만",
        "반지층, 26.44m²",
        "3층, 26.44m², 관리비 5만",
        "4층, 23.14m², 관리비 10만",
        "1층, 62.81m²",
        "2층, 28.6m²",
        "2층, 39.65m²",
        "2층, 49.58m², 관리비 1만",
        "4층, 19.83m², 관리비 5만",
        "4층, 29m², 관리비 6만",
        "8층, 23.14m², 관리비 10만",
        "15층, 39.66m², 관리비 12만",
        "8층, 23.14m², 관리비 10만",
        "중층, 52.89m², 관리비 10만",
        "2층, 42.97m²",
        "1층, 26.4m², 관리비 3만",
        "1층, 33.05m²",
        "고층, 51.89m²",
      ],
      rooms_img_url_01: [
        "http://d1774jszgerdmk.cloudfront.net/512/36c5517a-2055-4b85-9e63-8d82cd7e09e0",
        "http://d1774jszgerdmk.cloudfront.net/512/4aecacb6-6cec-45b9-9133-f81cc8d55b1d",
        "http://d1774jszgerdmk.cloudfront.net/512/379f4ee1-ec60-4ff1-9732-c3f1a5c80f57",
        "http://d1774jszgerdmk.cloudfront.net/512/b276551d-a2ec-46b4-b7ff-74ef0ee21b3a-2",
        "http://d1774jszgerdmk.cloudfront.net/512/714f2399-38b7-4478-a77a-d7df26aa9e15",
        "http://d1774jszgerdmk.cloudfront.net/512/7afd93a7-f430-450c-99ee-4092fa2d5ee3",
        "http://d1774jszgerdmk.cloudfront.net/512/194444f0-5aea-4573-af9a-06fed04bd2bc",
        "http://d1774jszgerdmk.cloudfront.net/512/c36e41f0-e0ac-4764-ba76-c9ad5eca33a1",
        "http://d1774jszgerdmk.cloudfront.net/512/1f757380-c866-481c-b887-8f9b71655b50",
        "http://d1774jszgerdmk.cloudfront.net/512/9d03be9a-96f5-4646-ab77-79c1f61bfafa",
        "http://d1774jszgerdmk.cloudfront.net/512/6451083e-22a0-4e15-904b-db32fb1d8645",
        "http://d1774jszgerdmk.cloudfront.net/512/0761b197-068b-4e52-ac55-9ac2bc957f4c",
        "http://d1774jszgerdmk.cloudfront.net/512/17363ae0-37dc-4279-9914-ab9b14d803d2",
        "http://d1774jszgerdmk.cloudfront.net/512/83ebc318-15c5-4480-9e9f-d621ac389fb8",
        "http://d1774jszgerdmk.cloudfront.net/512/c7222674-0753-4f44-b205-053521f7f56e",
        "http://d1774jszgerdmk.cloudfront.net/512/bbe2b318-10f4-4404-ab53-2a45f5fb2cf2",
        "http://d1774jszgerdmk.cloudfront.net/512/b038c636-741a-44ad-9b9f-bfbb0467914a",
        "http://d1774jszgerdmk.cloudfront.net/512/b792a406-f1e1-46e7-b3e9-efacb5597d6f",
        "http://d1774jszgerdmk.cloudfront.net/512/30dc579d-fa9e-47e9-ab72-1b2bfa8be152",
        "http://d1774jszgerdmk.cloudfront.net/512/0d301e9f-760c-43db-9f98-c384cc128d43",
        "http://d1774jszgerdmk.cloudfront.net/512/61898853-2b13-4644-995e-85b0c3724b81",
        "http://d1774jszgerdmk.cloudfront.net/512/586930e3-2412-4e19-b92b-403d20e159ff",
        "http://d1774jszgerdmk.cloudfront.net/512/66ecd9bb-e164-46cb-9953-f443c110ffb2",
        "http://d1774jszgerdmk.cloudfront.net/512/d4a75d87-9ebe-47e4-9483-c76958f68e8d",
      ],
      rooms_price_title: [
        "1000/50",
        "3000/100",
        "3억",
        "1000/50",
        "1000/50",
        "2000/80",
        "1000/60",
        "1000/30",
        "1000/50",
        "2억2500",
        "3000/80",
        "2억",
        "2000/65",
        "8000/60",
        "500/45",
        "2000/94",
        "2억5000",
        "3억",
        "2억2000",
        "7억4000",
        "3억3000",
        "1000/60",
        "2000/55",
        "2억",
      ],
      rooms_selling_type: [
        0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1,
      ],
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
  // const [data, setData] = useState();
  const [newData, setNewData] = useState();
  const [hashtags, setHashtags] = useState();

  const [isChecked, setIsChecked] = useState("monthReserv");
  const [monthlyDeposit, setMonthlyDeposit] = useState();
  const [monthlyPay, setMonthlyPay] = useState();
  const [reservDeposit, setReservDeposit] = useState();
  const [price, setPrice] = useState();
  const [currentAddress, setCurrentAddress] = useState("");
  const [house, setHouse] = useState();

  const [isClicked, setIsClicked] = useState("");
  const [isHovered, setIsHovered] = useState("");
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("main");
  const [popup, setPopup] = useState(false);
  const [qComplete, setQComplete] = useState(false);

  const [QuestionNumber, setQuestionNumber] = useState();
  const [Question01, setQuestion01] = useState();
  const [Question02, setQuestion02] = useState();
  const [Question03, setQuestion03] = useState();
  const [Question04, setQuestion04] = useState();
  const [Question05, setQuestion05] = useState();
  const [TotalWeightAvg, setTotalWeightAvg] = useState();
  const [TotalWeightRank01, setTotalWeightRank01] = useState();
  const [TotalWeightRank02, setTotalWeightRank02] = useState();
  const [TotalWeightRank03, setTotalWeightRank03] = useState();
  const [TotalWeightRank04, setTotalWeightRank04] = useState();
  const [TotalWeightRank05, setTotalWeightRank05] = useState();
  useEffect(() => {
    // if (!popup & !qComplete) {
    //   setTimeout(() => {
    //     setPopup(true);
    //   }, 10000);
    // }
    if (count == 1) {
      //해시태그 모음
      const hashtagsTemp = [];

      //월세보증금
      const monthlyDepositTemp = [];

      //월세
      const monthlyPayTemp = [];

      //전세
      const reservDepositTemp = [];

      //매매
      const priceTemp = [];

      //

      for (let i = 0; i < data.length; i++) {
        try {
          for (let j = 0; j < data[i].rooms_hash_tags.length; j++) {
            hashtagsTemp.push(data[i].rooms_hash_tags[j]);
          }

          for (let j = 0; j < data[i].rooms_desc.length; j++) {
            hashtagsTemp.push(data[i].rooms_desc[j].split("|")[0].trim());

            hashtagsTemp.push(data[i].rooms_desc2[j].split(",")[0].trim());

            if (data[i].rooms_selling_type[j] == 0) {
              if (data[i].rooms_price_title[j].includes("억")) {
                monthlyDepositTemp.push(
                  Number(data[i].rooms_price_title[j].split("억")[0]) * 10000
                );
                monthlyPayTemp.push(
                  Number(data[i].rooms_price_title[j].split("억")[0]) * 10000
                );
              } else {
                monthlyDepositTemp.push(
                  Number(data[i].rooms_price_title[j].split("/")[0])
                );
                monthlyPayTemp.push(
                  Number(data[i].rooms_price_title[j].split("/")[1])
                );
              }
            } else if (data[i].rooms_selling_type[j] == 1) {
              if (data[i].rooms_price_title[j].includes("억")) {
                reservDepositTemp.push(
                  Number(data[i].rooms_price_title[j].split("억")[0]) * 10000
                );
              } else {
                reservDepositTemp.push(Number(data[i].rooms_price_title[j]));
              }
            } else {
              if (data[i].rooms_price_title[j].includes("억")) {
                priceTemp.push(
                  Number(data[i].rooms_price_title[j].split("억")[0]) * 10000
                );
              } else {
                priceTemp.push(Number(data[i].rooms_price_title[j]));
              }
            }
          }
        } catch (e) {}
      }
      setMonthlyDeposit(monthlyDepositTemp);
      setMonthlyPay(monthlyPayTemp);
      setReservDeposit(reservDepositTemp);
      setPrice(priceTemp);
      setHashtags(hashtagsTemp.sort());
      const temp = [
        {
          weight: "거리",
          "1위": data[0].T1,
          "2위": data[1].T1,
          "3위": data[2].T1,
          "4위": data[3].T1,
          "5위": data[4].T1,
          평균: Math.round(data[0].T1_avg),
        },
        {
          weight: "역세권",
          "1위": data[0].T2,
          "2위": data[1].T2,
          "3위": data[2].T2,
          "4위": data[3].T2,
          "5위": data[4].T2,
          평균: Math.round(data[0].T2_avg),
        },
        {
          weight: "가성비",
          "1위": data[0].T3,
          "2위": data[1].T3,
          "3위": data[2].T3,
          "4위": data[3].T3,
          "5위": data[4].T3,
          평균: Math.round(data[0].T3_avg),
        },
        {
          weight: "안전",
          "1위": data[0].T4,
          "2위": data[1].T4,
          "3위": data[2].T4,
          "4위": data[3].T4,
          "5위": data[4].T4,
          평균: Math.round(data[0].T4_avg),
        },
        {
          weight: "매물",
          "1위": data[0].T5,
          "2위": data[1].T5,
          "3위": data[2].T5,
          "4위": data[3].T5,
          "5위": data[4].T5,
          평균: Math.round(data[0].T5_avg),
        },
      ];
      setNewData(temp);
      setTotalWeightAvg(Math.round(data[0].total_weight_avg));
      setTotalWeightRank01(Math.round(data[0].total_weight));
      setTotalWeightRank02(Math.round(data[1].total_weight));
      setTotalWeightRank03(Math.round(data[2].total_weight));
      setTotalWeightRank04(Math.round(data[3].total_weight));
      setTotalWeightRank05(Math.round(data[4].total_weight));
      console.log(hashtags);
      console.log(monthlyDeposit);
      console.log(monthlyPay);
      console.log(reservDeposit);
      console.log(price);
      return;
    }
    setCount(count + 1);
  }, [count, isClicked, isHovered]);
  console.log(isClicked);
  console.log(data);
  console.log(Question01);
  console.log(Question02);
  console.log(Question03);
  console.log(Question04);
  console.log(Question05);
  return (
    <>
      <Helmet>
        <title>Result</title>
      </Helmet>
      <Wrapper>
        {popup && (
          <QuestionPopup
            mobile={window.innerWidth <= 500}
            popup={popup}
            setPopup={setPopup}
            setQComplete={setQComplete}
            QuestionNumber={QuestionNumber}
            setQuestionNumber={setQuestionNumber}
            Question01={Question01}
            setQuestion01={setQuestion01}
            Question02={Question02}
            setQuestion02={setQuestion02}
            Question03={Question03}
            setQuestion03={setQuestion03}
            Question04={Question04}
            setQuestion04={setQuestion04}
            Question05={Question05}
            setQuestion05={setQuestion05}
            TotalWeightAvg={TotalWeightAvg}
            TotalWeightRank01={TotalWeightRank01}
            TotalWeightRank02={TotalWeightRank02}
            TotalWeightRank03={TotalWeightRank03}
            TotalWeightRank04={TotalWeightRank04}
            TotalWeightRank05={TotalWeightRank05}
          />
        )}
        {data && (
          <>
            <>
              <RightFloatingDiv02 isClicked={isClicked}>
                <BackArrow>
                  <img onClick={() => setDetail(false)} src={Back}></img>
                  <OptionSpan>뒤로가기</OptionSpan>
                </BackArrow>
              </RightFloatingDiv02>
              <TitleSpan>나의 "{univ_name}"주변 추천 자취지역 Top5</TitleSpan>
              <SubTitleSpan>
                마커에 마우스를 올리시면 해당 지역과 평균을 비교할 수 있습니다.
              </SubTitleSpan>
              <SubTitleSpan>
                마커를 클릭하면 해당 지역의 상세정보를 확인할 수 있습니다.
              </SubTitleSpan>
              <Article>
                <ArticleContentContainer>
                  <LeftContainer>
                    <Map
                      mobile={window.innerWidth <= 500}
                      setHouse={setHouse}
                      setCurrentAddress={setCurrentAddress}
                      isClicked={isClicked}
                      setIsHovered={setIsHovered}
                      setIsClicked={setIsClicked}
                      data={data}
                      univ_lat={univ_lat}
                      univ_lon={univ_lon}
                    />
                  </LeftContainer>

                  <RightContainer>
                    <RadarArticle
                      mobile={window.innerWidth <= 500}
                      data={newData}
                      isHovered={isHovered}
                      isClicked={isClicked}
                    />
                  </RightContainer>
                </ArticleContentContainer>
              </Article>{" "}
              {isClicked && monthlyDeposit && monthlyPay && reservDeposit && (
                <DetailArticle>
                  <TitleSpan02>매물 관련 통계</TitleSpan02>
                  {mode === "main" ? (
                    <SubTitleSpan>
                      차트를 클릭하면 자세한 정보를 볼 수 있습니다.
                    </SubTitleSpan>
                  ) : (
                    <SubTitleSpan>
                      차트를 클릭하면 이전 메뉴로 돌아갑니다.
                    </SubTitleSpan>
                  )}
                  <DetailItemContainer>
                    <BarDetailItem
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                      isClicked={isClicked}
                      monthlyDeposit={monthlyDeposit}
                      monthlyPay={monthlyPay}
                      reservDeposit={reservDeposit}
                      price={price}
                      mode={mode}
                      setMode={setMode}
                    />
                    <WordcloudDetailItem
                      mobile={window.innerWidth <= 500}
                      hashtags={hashtags}
                      mode={mode}
                      setMode={setMode}
                    />
                    <PieDetailItem
                      house={house}
                      setHouse={setHouse}
                      isClicked={isClicked}
                      mode={mode}
                      setMode={setMode}
                    />
                    {window.innerWidth > 500 && (
                      <Arrow
                        bottom={"-10vw"}
                        height={window.innerHeight + window.innerHeight - 100}
                      />
                    )}
                  </DetailItemContainer>
                </DetailArticle>
              )}
            </>
            {hashtags && isClicked && (
              <DetailArticle03>
                <TitleSpan03>선택된 지역의 매물 한 눈에 보기</TitleSpan03>
                <DetailItemContainer03>
                  <RotationArticle>
                    {isClicked &&
                      isClicked.rooms_img_url_01.map((item, index) => {
                        return (
                          <RotationDetailBox>
                            <img src={item} />
                            <PriceSpan>
                              {isClicked.rooms_price_title[index]}
                            </PriceSpan>
                            <RoomDescSpan>
                              {isClicked.rooms_desc[index]}
                            </RoomDescSpan>
                            <RoomDescSpan02>
                              {isClicked.rooms_desc2[index]}
                            </RoomDescSpan02>
                          </RotationDetailBox>
                        );
                      })}
                  </RotationArticle>
                </DetailItemContainer03>
              </DetailArticle03>
            )}
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
