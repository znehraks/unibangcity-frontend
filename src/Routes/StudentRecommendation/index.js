import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Api } from "../../api";
import styled from "styled-components";
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
  height: 66%;
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
const TitleSpan02 = styled.span`
  font-size: 2vw;
  margin-top: 4vw;
  margin-bottom: 1vw;
`;
const TitleSpan03 = styled.span`
  font-size: 2vw;
  margin-bottom: 2vw;
`;
const SubTitleSpan = styled.span`
  font-size: 0.9vw;
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
const RecommendationResult = withRouter(
  ({
    match: {
      params: {
        univ_name,
        univ_lat,
        univ_lon,
        Q2Answer,
        Q3Answer,
        Q4Answer,
        Q5Answer,
        w1,
        w2,
        w3,
        w4,
        w5,
      },
    },
    setDetail,
  }) => {
    const [data, setData] = useState();
    const [newData, setNewData] = useState();
    const [hashtags, setHashtags] = useState();

    const [isChecked, setIsChecked] = useState("monthReserv");
    const [monthlyDeposit, setMonthlyDeposit] = useState();
    const [monthlyPay, setMonthlyPay] = useState();
    const [reservDeposit, setReservDeposit] = useState();
    const [price, setPrice] = useState();
    const [isClicked, setIsClicked] = useState("");
    const [isHovered, setIsHovered] = useState("");
    const [count, setCount] = useState(0);
    const [mode, setMode] = useState("main");

    const [popup, setPopup] = useState(false);
    const [qComplete, setQComplete] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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
    console.log(newData);
    const SubmitEvaluation = (
      evaluation_category_no,
      univ_name,
      T_set,
      rank01_score,
      rank02_score,
      rank03_score,
      rank04_score,
      rank05_score
    ) => {
      Api.addEval(
        evaluation_category_no,
        univ_name,
        T_set,
        rank01_score,
        rank02_score,
        rank03_score,
        rank04_score,
        rank05_score
      ).then((response) => {
        if (response.status === 200) {
          console.log("DB 설문 저장 성공");
          console.log(response.data);
          setSubmitted(true);
        }
      });
    };
    useEffect(() => {
      if (count === 0) {
        Api.addDIYRecoHistory(
          9999,
          50,
          30,
          20,
          w1,
          w2,
          w3,
          w4,
          w5,
          Number(w1) + Number(w2) + Number(w3) + Number(w4) + Number(w5),
          univ_name,
          Q2Answer,
          Q3Answer,
          Q4Answer,
          Q5Answer,
          univ_lat,
          univ_lon,
          "T" +
            Q3Answer.split("T")[1] +
            Q4Answer.split("T")[1] +
            Q5Answer.split("T")[1]
        ).then((response) => {
          if (response.status === 200) {
            console.log("DB저장 성공");
            console.log(response.data);
          }
        });
      }
      if (!popup & !qComplete & !canceled) {
        setTimeout(() => {
          setPopup(true);
        }, 15000);
      }
      if (qComplete & !submitted) {
        SubmitEvaluation(
          1,
          univ_name,
          "T" +
            Q3Answer.split("T")[1] +
            Q4Answer.split("T")[1] +
            Q5Answer.split("T")[1],
          Question01.score,
          Question02.score,
          Question03.score,
          Question04.score,
          Question05.score
        );
      }
      if (count === 1) {
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
        let temp = [];
        if (data.length === 5) {
          temp = [
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
        } else if (data.length === 4) {
          temp = [
            {
              weight: "거리",
              "1위": data[0].T1,
              "2위": data[1].T1,
              "3위": data[2].T1,
              "4위": data[3].T1,
              평균: Math.round(data[0].T1_avg),
            },
            {
              weight: "역세권",
              "1위": data[0].T2,
              "2위": data[1].T2,
              "3위": data[2].T2,
              "4위": data[3].T2,
              평균: Math.round(data[0].T2_avg),
            },
            {
              weight: "가성비",
              "1위": data[0].T3,
              "2위": data[1].T3,
              "3위": data[2].T3,
              "4위": data[3].T3,
              평균: Math.round(data[0].T3_avg),
            },
            {
              weight: "안전",
              "1위": data[0].T4,
              "2위": data[1].T4,
              "3위": data[2].T4,
              "4위": data[3].T4,
              평균: Math.round(data[0].T4_avg),
            },
            {
              weight: "매물",
              "1위": data[0].T5,
              "2위": data[1].T5,
              "3위": data[2].T5,
              "4위": data[3].T5,
              평균: Math.round(data[0].T5_avg),
            },
          ];
          data.push(data[0]);
        } else if (data.length === 3) {
          temp = [
            {
              weight: "거리",
              "1위": data[0].T1,
              "2위": data[1].T1,
              "3위": data[2].T1,
              평균: Math.round(data[0].T1_avg),
            },
            {
              weight: "역세권",
              "1위": data[0].T2,
              "2위": data[1].T2,
              "3위": data[2].T2,
              평균: Math.round(data[0].T2_avg),
            },
            {
              weight: "가성비",
              "1위": data[0].T3,
              "2위": data[1].T3,
              "3위": data[2].T3,
              평균: Math.round(data[0].T3_avg),
            },
            {
              weight: "안전",
              "1위": data[0].T4,
              "2위": data[1].T4,
              "3위": data[2].T4,
              평균: Math.round(data[0].T4_avg),
            },
            {
              weight: "매물",
              "1위": data[0].T5,
              "2위": data[1].T5,
              "3위": data[2].T5,
              평균: Math.round(data[0].T5_avg),
            },
          ];
          data.push(data[0]);
          data.push(data[0]);
        } else if (data.length === 2) {
          temp = [
            {
              weight: "거리",
              "1위": data[0].T1,
              "2위": data[1].T1,
              평균: Math.round(data[0].T1_avg),
            },
            {
              weight: "역세권",
              "1위": data[0].T2,
              "2위": data[1].T2,
              평균: Math.round(data[0].T2_avg),
            },
            {
              weight: "가성비",
              "1위": data[0].T3,
              "2위": data[1].T3,
              평균: Math.round(data[0].T3_avg),
            },
            {
              weight: "안전",
              "1위": data[0].T4,
              "2위": data[1].T4,
              평균: Math.round(data[0].T4_avg),
            },
            {
              weight: "매물",
              "1위": data[0].T5,
              "2위": data[1].T5,
              평균: Math.round(data[0].T5_avg),
            },
          ];
          data.push(data[0]);
          data.push(data[0]);
          data.push(data[0]);
        } else if (data.length === 1) {
          temp = [
            {
              weight: "거리",
              "1위": data[0].T1,
              평균: Math.round(data[0].T1_avg),
            },
            {
              weight: "역세권",
              "1위": data[0].T2,
              평균: Math.round(data[0].T2_avg),
            },
            {
              weight: "가성비",
              "1위": data[0].T3,
              평균: Math.round(data[0].T3_avg),
            },
            {
              weight: "안전",
              "1위": data[0].T4,
              평균: Math.round(data[0].T4_avg),
            },
            {
              weight: "매물",
              "1위": data[0].T5,
              평균: Math.round(data[0].T5_avg),
            },
          ];
          data.push(data[0]);
          data.push(data[0]);
          data.push(data[0]);
          data.push(data[0]);
        }
        setNewData(temp);
        setTotalWeightAvg(Math.round(data[0].total_weight_avg));
        setTotalWeightRank01(Math.round(data[0].total_weight));
        setTotalWeightRank02(Math.round(data[1].total_weight));
        setTotalWeightRank03(Math.round(data[2].total_weight));
        setTotalWeightRank04(Math.round(data[3].total_weight));
        setTotalWeightRank05(Math.round(data[4].total_weight));
        console.log(hashtags);
        return;
      }
      Api.getResidence(
        univ_name,
        univ_lon,
        univ_lat,
        Q2Answer,
        Q3Answer,
        Q4Answer,
        Q5Answer,
        w1,
        w2,
        w3,
        w4,
        w5
      ).then((response) => {
        let json;
        try {
          json = JSON.parse(response.data);
          setData(json);
          console.log(json);
          setCount(count + 1);
        } catch (e) {
          setCount(0);
        } finally {
        }
      });
    }, [count, isClicked, isHovered, qComplete]);
    //weightcode 바탕으로
    console.log(w1);
    console.log(w2);
    console.log(w3);
    console.log(w4);
    console.log(w5);

    console.log(isClicked);
    console.log(data);
    console.log(Question01);
    console.log(Question02);
    console.log(Question03);
    console.log(Question04);
    console.log(Question05);
    if (!data) {
      console.log(data);
    }
    //로딩중 화면 추가
    //시각화 간단히 추가해보기
    //지도에 마크업해주고 이 지역에 사시면 00개의 카페, 00개의 공원을 이용하기 편리하고, 덤으로 맥도날드도 가깝군요! 등등 문구 추천

    //초반에 성별이나 나이도 받아도 될듯(선택)
    return (
      <>
        <Helmet>
          <title>Result</title>
        </Helmet>
        <Wrapper>
          {popup && (
            <QuestionPopup
              popup={popup}
              setPopup={setPopup}
              setQComplete={setQComplete}
              setCanceled={setCanceled}
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
                      <RadarArticle
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
                        hashtags={hashtags}
                        mode={mode}
                        setMode={setMode}
                      />
                      <PieDetailItem
                        isClicked={isClicked}
                        mode={mode}
                        setMode={setMode}
                      />
                      <Arrow
                        bottom={"-10vw"}
                        height={window.innerHeight + window.innerHeight - 100}
                      />
                    </DetailItemContainer>
                  </DetailArticle>
                )}
              </>
              {hashtags && isClicked && (
                <DetailArticle>
                  <TitleSpan03>매물과 주변지역 상세 정보</TitleSpan03>
                  <DetailItemContainer>
                    <DetailItem>
                      <SubTitleSpan>
                        선택된 지역과 관련있는 키워드입니다.
                      </SubTitleSpan>
                      <Wordcloud hashtags={hashtags} />
                    </DetailItem>
                    <DetailItem>
                      <SubTitleSpan>
                        선택된 지역의 매물 분포입니다.
                      </SubTitleSpan>
                      <PieRoom isClicked={isClicked} />
                    </DetailItem>
                  </DetailItemContainer>
                </DetailArticle>
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
  }
);

export default RecommendationResult;
