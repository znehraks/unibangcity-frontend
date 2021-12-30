import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  FINISH,
  INTRO,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  DISTANCE,
  SUBWAY,
  COST,
  SAFETY,
  HOUSE,
  RESULT,
  ALL,
  BAR,
  WORDCLOUD,
  PIE,
  MONTHRESERV,
  MONTHPAY,
  RESERV,
} from "../../components/Enum";
import useInput from "../../components/hooks/useInput";
import {
  MainSubTitleSpan,
  TextArticle,
  TextArticleSpan,
} from "../../components/styles/StyledComponents";
import universityList from "../../components/data/universityList";
import Q2Map from "../../components/kakao/Q2Map";
import distance_img from "../../components/styles/images/distance.png";
import subway_img from "../../components/styles/images/subway.png";
import cost_img from "../../components/styles/images/cost.png";
import safety_img from "../../components/styles/images/safety.png";
import house_img from "../../components/styles/images/house.png";
import distance_red_img from "../../components/styles/images/distance_red.png";
import subway_red_img from "../../components/styles/images/subway_red.png";
import cost_red_img from "../../components/styles/images/cost_red.png";
import safety_red_img from "../../components/styles/images/safety_red.png";
import house_red_img from "../../components/styles/images/house_red.png";
import ArticleButton from "../../components/ArticleButton";
import { Api } from "../../api";
import Map from "../../components/kakao/Map";
import Map2 from "../../components/kakao/Map2";
import RadarArticle from "../../components/Visualization/RadarArticle";
import WordcloudDetailItem from "../../components/Visualization/Detail/WordcloudDetailItem";
import BarComponent from "../../components/Visualization/BarRoom";
import PieComponent from "../../components/Visualization/PieRoom";
const { kakao } = window;

const MainContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.mode === RESULT ? `auto` : `80%`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
`;
const SelectedContainer = styled.div`
  position: absolute;
  width: 15vw;
  height: 50vh;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const SelectedSpan = styled.span`
  font-size: 1vw;
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
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? `${props.flexDirection}` : `row`};
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : `space-evenly`};
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.8vw 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
`;
const Input = styled.input`
  font-size: 1.6vw;
  width: 30%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  :focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.headerRed};
  }
`;

const HiddenSearchBox = styled.div`
  width: 30%;
  height: ${(props) => (props.valueLength > 0 ? `50%` : `0`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
`;
const HiddenSearchLine = styled.div`
  font-size: 1.2vw;
  padding: 1vw 0;
  height: 2vw;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerRed};
  }
`;
const MainArticle = styled.div`
  width: 12vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  font-size: 1.4vw;
  font-weight: 600;
  color: black;
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
`;
const ResultArticleContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const ResultTitleContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ResultTitleSpan = styled.div`
  font-size: 2vw;
  margin-bottom: 0.6vw;
  text-align: center;
`;
const ResultSubTitleSpan = styled.div`
  font-size: 1vw;
  margin: 1vw 0;
  text-align: center;
  strong {
    color: ${(props) => props.theme.headerRed};
  }
`;

const ResultMainContainer = styled.div`
  width: 100%;
  height: 90%;
  min-height: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ResultSubContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ResultDetailChartContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultDetailContentContainer = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4vw;
`;
const ResultTable = styled.div`
  margin-top: 1vw;
  width: 90%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const ResultRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
`;
const ResultCell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const ResultDetailSpanContainer = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 2vw;
  font-size: 1.2vw;
`;
const ResultDetailSpan = styled.div`
  margin-top: 1vw;
  font-size: 1.2vw;
  strong {
    color: ${(props) => props.theme.headerRed};
  }
`;

const ResultDetailImgContainer = styled.div`
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ResultDetailImg = styled.img``;
const BarChartSelectContainer = styled.div`
  width: 60%;
  height: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const BarChartSelect = styled.span`
  font-size: 0.9vw;
  cursor: pointer;
  :first-child {
    color: ${(props) =>
      props.isChecked === MONTHRESERV && `${props.theme.headerRed}`};
  }
  :nth-child(2) {
    color: ${(props) =>
      props.isChecked === MONTHPAY && `${props.theme.headerRed}`};
  }
  :last-child {
    color: ${(props) =>
      props.isChecked === RESERV && `${props.theme.headerRed}`};
  }
`;

const Recommendation = () => {
  const [mode, setMode] = useState(INTRO);
  const schoolNameInput = useInput("");
  const schoolNameInputRef = useRef();
  const [answers, setAnswers] = useState({
    Q1Answer: "",
    univ_lat: "",
    univ_lon: "",
    Q2Answer: "",
    Q3Answer: "",
    Q4Answer: "",
    Q5Answer: "",
    Q3Answer_kr: "",
    Q4Answer_kr: "",
    Q5Answer_kr: "",
  });
  const [data, setData] = useState([]);
  const [aggregated, setAggregated] = useState([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [house, setHouse] = useState();
  const [isClicked, setIsClicked] = useState("");
  const [isHovered, setIsHovered] = useState("");
  const [chartData, setChartData] = useState({
    hashtagsEach: [],
    monthlyDepositEachAggregated: {},
    monthlyPayEachAggregated: {},
    reservDepositEachAggregated: {},
    hashtagsTotal: [],
    monthlyDepositTotalAggregated: {},
    monthlyPayTotalAggregated: {},
    reservDepositTotalAggregated: {},
  });
  const [isChecked, setIsChecked] = useState("monthReserv");
  const [chartmode, setChartmode] = useState(ALL);
  const [positions, setPositions] = useState([]);

  const getAggregated = () => {
    //마커 레이더차트
    let weight_names = ["거리", "역세권", "가성비", "안전", "매물"];
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      let tempObj = {};
      tempObj["weight"] = weight_names[i];
      for (let j = 0; j < 5; j++) {
        tempObj[`${j + 1}위`] = data[j][`T${i + 1}`];
      }
      tempObj[`평균`] = Math.round(data[0][`T${i + 1}_avg`]);
      newArr.push(tempObj);
    }
    console.log(newArr);
    setAggregated(newArr);
  };

  const getChartAggregated = () => {
    //해시태그 모음
    const hashtagsEach = [];
    const hashtagsTotalTemp = [];
    const hashtagsTotal = [];

    //월세보증금
    const monthlyDepositEachAggregated = {
      max: [],
      min: [],
      avg: [],
      count: [],
    };
    const monthlyDepositTotalTemp = [];
    const monthlyDepositTotalAggregated = {
      max: [],
      min: [],
      avg: [],
      count: [],
    };

    //월세
    const monthlyPayEachAggregated = { max: [], min: [], avg: [], count: [] };
    const monthlyPayTotalTemp = [];
    const monthlyPayTotalAggregated = { max: [], min: [], avg: [], count: [] };

    //전세
    const reservDepositEachAggregated = {
      max: [],
      min: [],
      avg: [],
      count: [],
    };
    const reservDepositTotalTemp = [];
    const reservDepositTotalAggregated = {
      max: [],
      min: [],
      avg: [],
      count: [],
    };

    //매매
    for (let i = 0; i < data.length; i++) {
      const hashtagsTemp = [];
      const monthlyDepositTemp = [];
      const monthlyPayTemp = [];
      const reservDepositTemp = [];
      const priceTemp = [];
      for (let j = 0; j < data[i].rooms_hash_tags.length; j++) {
        hashtagsTemp.push(data[i].rooms_hash_tags[j]);
      }

      for (let j = 0; j < data[i].rooms_price_title.length; j++) {
        hashtagsTemp.push(data[i].rooms_desc[j].split("|")[0].trim());

        hashtagsTemp.push(data[i].rooms_desc2[j].split(",")[0].trim());

        if (data[i].rooms_selling_type[j] === 0) {
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
        } else if (data[i].rooms_selling_type[j] === 1) {
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
      hashtagsEach.push(hashtagsTemp);

      monthlyDepositEachAggregated.max.push(Math.max(...monthlyDepositTemp));
      monthlyPayEachAggregated.max.push(Math.max(...monthlyPayTemp));
      reservDepositEachAggregated.max.push(Math.max(...reservDepositTemp));

      monthlyDepositEachAggregated.min.push(Math.min(...monthlyDepositTemp));
      monthlyPayEachAggregated.min.push(Math.min(...monthlyPayTemp));
      reservDepositEachAggregated.min.push(Math.min(...reservDepositTemp));

      monthlyDepositEachAggregated.avg.push(
        Math.round(
          monthlyDepositTemp.reduce((a, b) => a + b, 0) /
            monthlyDepositTemp.length
        )
      );
      monthlyPayEachAggregated.avg.push(
        Math.round(
          monthlyPayTemp.reduce((a, b) => a + b, 0) / monthlyPayTemp.length
        )
      );
      reservDepositEachAggregated.avg.push(
        Math.round(
          reservDepositTemp.reduce((a, b) => a + b, 0) /
            reservDepositTemp.length
        )
      );

      monthlyDepositEachAggregated.count.push(monthlyDepositTemp.length);
      monthlyPayEachAggregated.count.push(monthlyPayTemp.length);
      reservDepositEachAggregated.count.push(reservDepositTemp.length);

      hashtagsTotalTemp.push(...hashtagsTemp);
      monthlyDepositTotalTemp.push(...monthlyDepositTemp);
      monthlyPayTotalTemp.push(...monthlyPayTemp);
      reservDepositTotalTemp.push(...reservDepositTemp);
    }

    hashtagsTotal.push(...hashtagsTotalTemp);

    monthlyDepositTotalAggregated.max.push(
      Math.max(...monthlyDepositTotalTemp)
    );
    monthlyPayTotalAggregated.max.push(Math.max(...monthlyPayTotalTemp));
    reservDepositTotalAggregated.max.push(Math.max(...reservDepositTotalTemp));

    monthlyDepositTotalAggregated.min.push(
      Math.min(...monthlyDepositTotalTemp)
    );
    monthlyPayTotalAggregated.min.push(Math.min(...monthlyPayTotalTemp));
    reservDepositTotalAggregated.min.push(Math.min(...reservDepositTotalTemp));

    monthlyDepositTotalAggregated.avg.push(
      Math.round(
        monthlyDepositTotalTemp.reduce((a, b) => a + b, 0) /
          monthlyDepositTotalTemp.length
      )
    );
    monthlyPayTotalAggregated.avg.push(
      Math.round(
        monthlyPayTotalTemp.reduce((a, b) => a + b, 0) /
          monthlyPayTotalTemp.length
      )
    );
    reservDepositTotalAggregated.avg.push(
      Math.round(
        reservDepositTotalTemp.reduce((a, b) => a + b, 0) /
          reservDepositTotalTemp.length
      )
    );

    monthlyDepositTotalAggregated.count.push(monthlyDepositTotalTemp.length);
    monthlyPayTotalAggregated.count.push(monthlyPayTotalTemp.length);
    reservDepositTotalAggregated.count.push(reservDepositTotalTemp.length);

    setChartData({
      hashtagsEach,
      monthlyDepositEachAggregated,
      monthlyPayEachAggregated,
      reservDepositEachAggregated,
      hashtagsTotal,
      monthlyDepositTotalAggregated,
      monthlyPayTotalAggregated,
      reservDepositTotalAggregated,
    });

    console.log(chartData);
  };

  const unitTransformer = (value) => {
    return value >= 10000
      ? `${Math.round(value / 10000)}억 ${
          value % 10000 === 0 ? "(원)" : `${value % 10000}(만 원)`
        }`
      : `${value}천(만 원)`;
  };

  const getPositions = () => {
    console.log(isClicked.rooms_location_lat);
    if (isClicked) {
      let temp = [];
      for (let i = 0; i < isClicked.rooms_location_lat.length; i++) {
        temp.push({
          latlng: new kakao.maps.LatLng(
            isClicked.rooms_location_lat[i],
            isClicked.rooms_location_lon[i]
          ),
        });
      }
      setPositions(temp);
    }
  };
  useEffect(() => {
    if (
      answers.Q1Answer !== "" &&
      answers.Q2Answer !== "" &&
      answers.Q3Answer !== "" &&
      answers.Q4Answer !== "" &&
      answers.Q5Answer !== "" &&
      answers.univ_lat !== "" &&
      answers.univ_lon !== "" &&
      mode === FINISH
    ) {
      console.log(answers);
      Api.getResidence(answers).then((res) => {
        if (res.data.success) {
          let parsed = res.data.data.replaceAll("'", '"');
          parsed = JSON.parse(parsed);
          console.log(parsed);
          console.log(typeof parsed);
          setData(parsed);
        } else {
          alert(res.data.err_msg);
        }
      });
    }
    if (data.length !== 0 && aggregated.length === 0) {
      getAggregated();
    }
    if (data.length !== 0) {
      getChartAggregated();
    }
    if (data.length !== 0) {
      getPositions();
    }
    console.log(isClicked);
  }, [mode, isHovered, isClicked]);
  return (
    <MainContainer mode={mode}>
      {mode !== RESULT && (
        <SelectedContainer>
          <SelectedSpan>{answers.Q1Answer}</SelectedSpan>+
          <SelectedSpan>
            {answers.Q2Answer ? `${answers.Q2Answer}m` : ``}
          </SelectedSpan>
          +<SelectedSpan>{answers.Q3Answer_kr}</SelectedSpan>+
          <SelectedSpan>{answers.Q4Answer_kr}</SelectedSpan>+
          <SelectedSpan>{answers.Q5Answer_kr}</SelectedSpan>
        </SelectedContainer>
      )}
      {mode === INTRO && (
        <>
          <MainTitleContainer>
            <MainTitle>유니방시티 이용 안내입니다.</MainTitle>
            <MainSubTitleSpan>
              아래 내용을 숙지해주시고 '다음'버튼을 눌러주세요
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer flexDirection={"column"}>
            <TextArticle width={"35%"} height={"70%"} lineHeight="0.2vw">
              <TextArticleSpan>
                1. 나의 학교 이름을 입력해 주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                2. 원하는 최대 거리를 선택해 주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                3. 가장 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                4. 두 번째로 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                5. 세 번째로 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>6. 조금만 기다리면 끝.</TextArticleSpan>
            </TextArticle>
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q1);
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q1 && (
        <>
          <MainTitleContainer>
            <MainTitle>1. 나의 학교를 선택해주세요.</MainTitle>
            <MainSubTitleSpan>
              ex. '명지대학교'검색 시 '명지' 입력 후 아래에서 선택
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer flexDirection="column" justifyContent="center">
            <Input
              ref={schoolNameInputRef}
              autoFocus
              type="text"
              placeholder="ex. 명지대학교"
              {...schoolNameInput}
              onClick={() => {
                setAnswers({
                  ...answers,
                  Q1Answer: "",
                  univ_lat: "",
                  univ_lon: "",
                });
                schoolNameInput.setValue("");
              }}
            />
            {answers.Q1Answer === "" && (
              <HiddenSearchBox valueLength={schoolNameInput.value.length}>
                {universityList.map((item) => {
                  if (
                    item.name.includes(schoolNameInput.value) &&
                    schoolNameInput.value !== ""
                  ) {
                    return (
                      <HiddenSearchLine
                        key={item.name}
                        onClick={() => {
                          setAnswers({
                            ...answers,
                            Q1Answer: item.name,
                            univ_lat: item.address_lat,
                            univ_lon: item.address_lon,
                          });
                          schoolNameInput.setValue(item.name);
                        }}
                      >
                        {item.name}
                      </HiddenSearchLine>
                    );
                  } else {
                    return null;
                  }
                })}
              </HiddenSearchBox>
            )}
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(INTRO);
                setAnswers({ ...answers, Q1Answer: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q1Answer !== "") {
                  setMode(Q2);
                  schoolNameInput.setValue("");
                } else {
                  alert("학교를 선택해주세요.");
                  schoolNameInputRef.current.focus();
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q2 && (
        <>
          <MainTitleContainer>
            <MainTitle>2. 원하는 거리를 선택해주세요.</MainTitle>
            <MainSubTitleSpan>
              지도를 마우스로 클릭하면 원 그리기가 시작되고 오른쪽 마우스를
              클릭하면 원 그리기가 종료됩니다.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <Q2Map
              answers={answers}
              setAnswers={setAnswers}
              mobile={false}
              univ_lat={answers.univ_lat}
              univ_lon={answers.univ_lon}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q1);
                setAnswers({ ...answers, Q2Answer: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q2Answer !== "") {
                  setMode(Q3);
                } else {
                  alert("거리를 설정해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q3 && (
        <>
          <MainTitleContainer>
            <MainTitle>3. 가장 중요시 여기는 요소를 선택해주세요.</MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q3}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === DISTANCE}
            />
            <ArticleButton
              current={Q3}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === SUBWAY}
            />
            <ArticleButton
              current={Q3}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === COST}
            />
            <ArticleButton
              current={Q3}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === SAFETY}
            />
            <ArticleButton
              current={Q3}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q2);
                setAnswers({ ...answers, Q3Answer: "", Q3Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q3Answer !== "") {
                  setMode(Q4);
                } else {
                  alert("항목을 선택해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q4 && (
        <>
          <MainTitleContainer>
            <MainTitle>
              4. 두 번째로 중요시 여기는 요소를 선택해주세요.
            </MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q4}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === DISTANCE}
            />
            <ArticleButton
              current={Q4}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === SUBWAY}
            />
            <ArticleButton
              current={Q4}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === COST}
            />
            <ArticleButton
              current={Q4}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === SAFETY}
            />
            <ArticleButton
              current={Q4}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q3);
                setAnswers({ ...answers, Q4Answer: "", Q4Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q4Answer !== "") {
                  setMode(Q5);
                } else {
                  alert("항목을 선택해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q5 && (
        <>
          <MainTitleContainer>
            <MainTitle>
              5. 세 번째로 중요시 여기는 요소를 선택해주세요.
            </MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q5}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === DISTANCE}
            />
            <ArticleButton
              current={Q5}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === SUBWAY}
            />
            <ArticleButton
              current={Q5}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === COST}
            />
            <ArticleButton
              current={Q5}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === SAFETY}
            />
            <ArticleButton
              current={Q5}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q4);

                setAnswers({ ...answers, Q5Answer: "", Q5Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q1Answer === "") {
                  alert("1단계가 완료되지 않았습니다.");
                  setMode(Q1);
                } else if (answers.Q2Answer === "") {
                  alert("2단계가 완료되지 않았습니다.");
                  setMode(Q2);
                } else if (answers.Q3Answer === "") {
                  alert("3단계가 완료되지 않았습니다.");
                  setMode(Q3);
                } else if (answers.Q4Answer === "") {
                  alert("4단계가 완료되지 않았습니다.");
                  setMode(Q4);
                } else if (answers.Q5Answer === "") {
                  alert("항목을 선택해주세요.");
                  setMode(Q5);
                } else {
                  setMode(FINISH);
                }
              }}
            >
              완료
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === FINISH && (
        <>
          <MainTitleContainer>
            <MainTitle>나만의 자취방을 보러가실 시간입니다.</MainTitle>
            <MainSubTitleSpan>아래 버튼을 눌러주세요.</MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <MainArticle
              onClick={() => {
                setMode(RESULT);
              }}
            >
              결과 보기
            </MainArticle>
          </MainArticleContainer>
        </>
      )}
      {mode === RESULT && (
        <>
          <ResultArticleContainer>
            <ResultTitleContainer>
              <ResultTitleSpan>
                "{answers.Q1Answer}" 주변 추천 자취지역 Top5
              </ResultTitleSpan>
              <ResultSubTitleSpan>
                마커에 마우스(손가락)를(을) 올리시면 해당 지역과 평균을 비교할
                수 있습니다.
              </ResultSubTitleSpan>
            </ResultTitleContainer>
            <ResultMainContainer>
              <ResultSubContainer>
                <ResultSubTitleSpan>
                  마커를 클릭하면 해당 지역의 상세정보를 확인할 수 있습니다.
                </ResultSubTitleSpan>
                {data.length !== 0 && (
                  <Map
                    mobile={window.innerWidth <= 500}
                    setHouse={setHouse}
                    setCurrentAddress={setCurrentAddress}
                    setIsHovered={setIsHovered}
                    setIsClicked={setIsClicked}
                    data={data}
                    univ_lat={answers.univ_lat}
                    univ_lon={answers.univ_lon}
                  />
                )}
              </ResultSubContainer>
              <ResultSubContainer>
                <ResultSubTitleSpan>레이더차트</ResultSubTitleSpan>
                {aggregated.length !== 0 && (
                  <RadarArticle
                    mobile={window.innerWidth <= 500}
                    data={aggregated}
                    isHovered={isHovered}
                    isClicked={isClicked}
                  />
                )}
              </ResultSubContainer>
            </ResultMainContainer>
          </ResultArticleContainer>
          {isClicked && chartData.hashtagsTotal.length !== 0 && (
            <ResultArticleContainer>
              <ResultTitleContainer>
                <ResultTitleSpan>
                  "{isClicked.rank}위 지역(
                  {currentAddress ? `${currentAddress}` : ``})" 주변 매물 관련
                  통계
                </ResultTitleSpan>
                <ResultSubTitleSpan>
                  {chartmode === ALL
                    ? "차트를 클릭하면 자세한 정보를 볼 수 있습니다."
                    : "차트를 클릭하면 이전 화면으로 돌아갈 수 있습니다."}
                </ResultSubTitleSpan>
              </ResultTitleContainer>
              {chartmode === ALL && (
                <ResultMainContainer>
                  <ResultSubContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역과 전체 평균 간{" "}
                      <strong>
                        {isChecked === MONTHRESERV
                          ? "월세 보증금"
                          : isChecked === MONTHPAY
                          ? "월세"
                          : "전세 보증금"}
                      </strong>{" "}
                      보증금 비교
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(MONTHRESERV)}
                      >
                        월세 보증금
                      </BarChartSelect>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(MONTHPAY)}
                      >
                        월세
                      </BarChartSelect>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(RESERV)}
                      >
                        전세
                      </BarChartSelect>
                    </BarChartSelectContainer>

                    <BarComponent
                      isChecked={isChecked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                      monthlyDepositEachAggregated={
                        chartData.monthlyDepositEachAggregated
                      }
                      monthlyPayEachAggregated={
                        chartData.monthlyPayEachAggregated
                      }
                      reservDepositEachAggregated={
                        chartData.reservDepositEachAggregated
                      }
                      monthlyDepositTotalAggregated={
                        chartData.monthlyDepositTotalAggregated
                      }
                      monthlyPayTotalAggregated={
                        chartData.monthlyPayTotalAggregated
                      }
                      reservDepositTotalAggregated={
                        chartData.reservDepositTotalAggregated
                      }
                      clickedMarker={isClicked.rank - 1}
                    />
                  </ResultSubContainer>
                  <ResultSubContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 핵심 키워드
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <WordcloudDetailItem
                      mobile={window.innerWidth <= 500}
                      hashtags={chartData.hashtagsEach[isClicked.rank - 1]}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultSubContainer>
                  <ResultSubContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 매물 종류 분포
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <PieComponent
                      isClicked={isClicked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultSubContainer>
                </ResultMainContainer>
              )}
              {chartmode === BAR && (
                <ResultDetailContainer>
                  <ResultDetailChartContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역과 전체 평균 간{" "}
                      <strong>
                        {isChecked === MONTHRESERV
                          ? "월세 보증금"
                          : isChecked === MONTHPAY
                          ? "월세"
                          : "전세 보증금"}
                      </strong>{" "}
                      보증금 비교
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(MONTHRESERV)}
                      >
                        월세 보증금
                      </BarChartSelect>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(MONTHPAY)}
                      >
                        월세
                      </BarChartSelect>
                      <BarChartSelect
                        isChecked={isChecked}
                        onClick={() => setIsChecked(RESERV)}
                      >
                        전세
                      </BarChartSelect>
                    </BarChartSelectContainer>
                    <BarComponent
                      isChecked={isChecked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                      monthlyDepositEachAggregated={
                        chartData.monthlyDepositEachAggregated
                      }
                      monthlyPayEachAggregated={
                        chartData.monthlyPayEachAggregated
                      }
                      reservDepositEachAggregated={
                        chartData.reservDepositEachAggregated
                      }
                      monthlyDepositTotalAggregated={
                        chartData.monthlyDepositTotalAggregated
                      }
                      monthlyPayTotalAggregated={
                        chartData.monthlyPayTotalAggregated
                      }
                      reservDepositTotalAggregated={
                        chartData.reservDepositTotalAggregated
                      }
                      clickedMarker={isClicked.rank - 1}
                    />
                  </ResultDetailChartContainer>
                  <ResultDetailContentContainer>
                    {isClicked.rank}위 지역의 통계
                    <ResultTable>
                      <ResultRow>
                        <ResultCell></ResultCell>
                        <ResultCell>최고가</ResultCell>
                        <ResultCell>최저가</ResultCell>
                        <ResultCell>평균가</ResultCell>
                        <ResultCell>매물 수</ResultCell>
                      </ResultRow>
                      <ResultRow>
                        <ResultCell>월세 보증금</ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyDepositEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyDepositEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {
                            chartData.monthlyDepositEachAggregated.count[
                              isClicked.rank - 1
                            ]
                          }
                          개
                        </ResultCell>
                      </ResultRow>
                      <ResultRow>
                        <ResultCell>월세</ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>''</ResultCell>
                      </ResultRow>
                      <ResultRow>
                        <ResultCell>전세 보증금</ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {
                            chartData.reservDepositEachAggregated.count[
                              isClicked.rank - 1
                            ]
                          }
                          개
                        </ResultCell>
                      </ResultRow>
                    </ResultTable>
                    <ResultDetailSpanContainer>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>월세 보증금</strong>이
                        평균에 비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.monthlyDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.monthlyDepositTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.monthlyDepositEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.monthlyDepositTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>월세</strong>가 평균에
                        비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.monthlyPayEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.monthlyPayTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.monthlyPayEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.monthlyPayTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>전세 보증금</strong>이
                        평균에 비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.reservDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.reservDepositTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.reservDepositEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.reservDepositTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        그리고,{" "}
                        <strong>
                          {chartData.reservDepositEachAggregated.count[
                            isClicked.rank - 1
                          ] +
                            chartData.monthlyDepositEachAggregated.count[
                              isClicked.rank - 1
                            ]}
                          개의 전세/월세 매물
                        </strong>
                        이 있군요.
                      </ResultDetailSpan>
                    </ResultDetailSpanContainer>
                  </ResultDetailContentContainer>
                </ResultDetailContainer>
              )}
              {chartmode === WORDCLOUD && (
                <ResultDetailContainer>
                  <ResultDetailChartContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 핵심 키워드
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <WordcloudDetailItem
                      mobile={window.innerWidth <= 500}
                      hashtags={chartData.hashtagsEach[isClicked.rank - 1]}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultDetailChartContainer>
                </ResultDetailContainer>
              )}
              {chartmode === PIE && (
                <ResultDetailContainer>
                  {house ? (
                    <ResultDetailChartContainer>
                      <ResultSubTitleSpan>선택된 매물 정보</ResultSubTitleSpan>
                      <ResultDetailImgContainer>
                        <ResultDetailImg
                          onClick={() => setHouse()}
                          src={isClicked.rooms_img_url_01[house]}
                          alt="매물 사진"
                        />
                      </ResultDetailImgContainer>
                      <ResultDetailSpan>
                        {isClicked.rooms_desc[house]}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rooms_desc2[house]}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rooms_price_title[house]}
                      </ResultDetailSpan>
                    </ResultDetailChartContainer>
                  ) : (
                    <ResultDetailChartContainer>
                      <ResultSubTitleSpan>
                        {isClicked.rank}위 지역의 매물 종류 분포
                      </ResultSubTitleSpan>
                      <PieComponent
                        isClicked={isClicked}
                        chartmode={chartmode}
                        setChartmode={setChartmode}
                      />
                    </ResultDetailChartContainer>
                  )}
                  <ResultDetailContentContainer>
                    {positions.length !== 0 && (
                      <>
                        <Map2
                          isClicked={isClicked}
                          univ_lat={answers.univ_lat}
                          univ_lon={answers.univ_lon}
                          residencePositions={positions}
                          setHouse={setHouse}
                          mobile={false}
                        />
                      </>
                    )}
                  </ResultDetailContentContainer>
                </ResultDetailContainer>
              )}
            </ResultArticleContainer>
          )}
          <ResultArticleContainer>
            <ResultTitleContainer>
              <ResultTitleSpan>선택된 지역 매물 한 눈에 보기</ResultTitleSpan>
              <ResultSubTitleSpan>
                마커에 마우스(손가락)를(을) 올리시면 해당 지역과 평균을 비교할
                수 있습니다.
              </ResultSubTitleSpan>
            </ResultTitleContainer>
            <ResultMainContainer>
              <ResultSubContainer></ResultSubContainer>
              <ResultSubContainer></ResultSubContainer>
            </ResultMainContainer>
          </ResultArticleContainer>
        </>
      )}
    </MainContainer>
  );
};
export default Recommendation;
