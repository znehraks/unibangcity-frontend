import React, { useEffect } from "react";
import { FINISH } from "../../components/Enum";
import { Api } from "../../api";
import RecommendationPresenter from "./RecommendationPresenter";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aggregatedAtom,
  answersAtom,
  dataAtom,
  modeAtom,
  isClickedAtom,
  isHoveredAtom,
  chartDataAtom,
  positionsAtom,
} from "../../components/recoil";
const { kakao } = window;

const RecommendationContainer = () => {
  const [mode, setMode] = useRecoilState(modeAtom);
  const answers = useRecoilValue(answersAtom);
  const [data, setData] = useRecoilState(dataAtom);
  const [aggregated, setAggregated] = useRecoilState(aggregatedAtom);
  const isClicked = useRecoilValue(isClickedAtom);
  const isHovered = useRecoilValue(isHoveredAtom);
  const [chartData, setChartData] = useRecoilState(chartDataAtom);
  const setPositions = useSetRecoilState(positionsAtom);

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
          if (data[i].rooms_price_title[j].split("/")[0].includes("억")) {
            monthlyDepositTemp.push(
              Number(
                data[i].rooms_price_title[j].split("/")[0].split("억")[0]
              ) *
                10000 +
                Number(
                  data[i].rooms_price_title[j].split("/")[0].split("억")[1]
                )
            );
          } else {
            monthlyDepositTemp.push(
              Number(data[i].rooms_price_title[j].split("/")[0])
            );
          }
          if (data[i].rooms_price_title[j].split("/")[1].includes("억")) {
            monthlyPayTemp.push(
              Number(
                data[i].rooms_price_title[j].split("/")[1].split("억")[0]
              ) *
                10000 +
                Number(
                  data[i].rooms_price_title[j].split("/")[1].split("억")[1]
                )
            );
          } else {
            monthlyPayTemp.push(
              Number(data[i].rooms_price_title[j].split("/")[1])
            );
          }
        } else if (data[i].rooms_selling_type[j] === 1) {
          if (data[i].rooms_price_title[j].includes("억")) {
            reservDepositTemp.push(
              Number(data[i].rooms_price_title[j].split("억")[0]) * 10000 +
                Number(data[i].rooms_price_title[j].split("억")[1])
            );
          } else {
            reservDepositTemp.push(Number(data[i].rooms_price_title[j]));
          }
        } else {
          if (data[i].rooms_price_title[j].includes("억")) {
            priceTemp.push(
              Number(data[i].rooms_price_title[j].split("억")[0]) * 10000 +
                Number(data[i].rooms_price_title[j].split("억")[1])
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
        console.log(res.data);
        if (res.data.success) {
          let parsed = res.data.data.replaceAll("'", '"');
          parsed = JSON.parse(parsed);
          console.log(parsed);
          console.log(typeof parsed);
          setData(parsed);
          if (parsed) {
            Api.saveResult(
              answers.Q1Answer,
              answers.univ_lat,
              answers.univ_lon,
              `[${parsed[0].code},${parsed[1].code},${parsed[2].code},${parsed[3].code},${parsed[4].code}]`,
              `[${parsed[0].T1},${parsed[0].T2},${parsed[0].T3},${parsed[0].T4},${parsed[0].T5}]`,

              `[${parsed[1].T1},${parsed[1].T2},${parsed[1].T3},${parsed[1].T4},${parsed[1].T5}]`,

              `[${parsed[2].T1},${parsed[2].T2},${parsed[2].T3},${parsed[2].T4},${parsed[2].T5}]`,

              `[${parsed[3].T1},${parsed[3].T2},${parsed[3].T3},${parsed[3].T4},${parsed[3].T5}]`,

              `[${parsed[4].T1},${parsed[4].T2},${parsed[4].T3},${parsed[4].T4},${parsed[4].T5}]`,

              `[${Math.round(parsed[0].T1_avg)},${Math.round(
                parsed[0].T2_avg
              )},${Math.round(parsed[0].T3_avg)},${Math.round(
                parsed[0].T4_avg
              )},${Math.round(parsed[0].T5_avg)}]`
            ).then((res) => {
              console.log(res.data);
            });
          }
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
    <RecommendationPresenter mode={mode} answers={answers} setMode={setMode} />
  );
};
export default RecommendationContainer;
