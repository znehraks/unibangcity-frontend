import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
const Div = styled.div`
  width: 30vw;
  height: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4vw;
  @media (max-width: 500px) {
    width: 85vw;
    height: 50vw;
    margin-top: 5vw;
  }
`;

const BarChart = ({
  mode,
  setMode,
  isClicked,
  isChecked,
  monthlyDeposit,
  monthlyPay,
  reservDeposit,
  price,
  setDetailData,
}) => {
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  useEffect(() => {
    //월세보증금
    const monthlyDepositTemp = [];

    //월세
    const monthlyPayTemp = [];

    //전세
    const reservDepositTemp = [];

    //매매
    const priceTemp = [];

    const monthlyDepositAvg = Math.round(
      monthlyDeposit.reduce((a, b) => a + b, 0) / monthlyDeposit.length
    );
    const monthlyPayAvg = Math.round(
      monthlyPay.reduce((a, b) => a + b, 0) / monthlyPay.length
    );
    const reservDepositAvg = Math.round(
      reservDeposit.reduce((a, b) => a + b, 0) / reservDeposit.length
    );
    const priceAvg = Math.round(
      price.reduce((a, b) => a + b, 0) / price.length
    );

    for (let j = 0; j < isClicked.rooms_desc.length; j++) {
      if (isClicked.rooms_selling_type[j] == 0) {
        if (isClicked.rooms_price_title[j].includes("억")) {
          monthlyDepositTemp.push(
            Number(isClicked.rooms_price_title[j].split("억")[0]) * 10000
          );
          monthlyPayTemp.push(
            Number(isClicked.rooms_price_title[j].split("/")[1])
          );
        } else {
          monthlyDepositTemp.push(
            Number(isClicked.rooms_price_title[j].split("/")[0])
          );
          monthlyPayTemp.push(
            Number(isClicked.rooms_price_title[j].split("/")[1])
          );
        }
      }
      if (isClicked.rooms_selling_type[j] == 1) {
        if (isClicked.rooms_price_title[j].includes("억")) {
          reservDepositTemp.push(
            Number(isClicked.rooms_price_title[j].split("억")[0]) * 10000
          );
        } else {
          reservDepositTemp.push(Number(isClicked.rooms_price_title[j]));
        }
      }
      if (isClicked.rooms_selling_type[j] == 2) {
        if (isClicked.rooms_price_title[j].includes("억")) {
          priceTemp.push(
            Number(isClicked.rooms_price_title[j].split("억")[0]) * 10000
          );
        } else {
          priceTemp.push(Number(isClicked.rooms_price_title[j]));
        }
      }
    }

    const clickedMonthlyDepositAvg = Math.round(
      monthlyDepositTemp.reduce((a, b) => a + b, 0) / monthlyDepositTemp.length
    );
    const clickedMonthlyPayAvg = Math.round(
      monthlyPayTemp.reduce((a, b) => a + b, 0) / monthlyPayTemp.length
    );
    const clickedReservDepositAvg = Math.round(
      reservDepositTemp.reduce((a, b) => a + b, 0) / reservDepositTemp.length
    );
    const clickedPriceAvg = Math.round(
      priceTemp.reduce((a, b) => a + b, 0) / priceTemp.length
    );

    console.log(monthlyDepositTemp);
    console.log(monthlyPayTemp);
    console.log(reservDepositTemp);
    console.log(priceTemp);

    console.log(clickedMonthlyDepositAvg);
    console.log(clickedMonthlyPayAvg);
    console.log(clickedReservDepositAvg);
    console.log(clickedPriceAvg);

    console.log(monthlyDepositAvg);
    console.log(monthlyPayAvg);
    console.log(reservDepositAvg);
    console.log(priceAvg);

    console.log(Math.max(...monthlyDepositTemp));
    console.log(Math.max(...monthlyPayTemp));
    console.log(Math.max(...reservDepositTemp));
    console.log(Math.max(...monthlyDeposit));
    console.log(Math.max(...monthlyPay));
    console.log(Math.max(...reservDeposit));

    setDetailData([
      Math.round(Math.max(...monthlyDepositTemp)),
      Math.round(Math.max(...monthlyPayTemp)),
      Math.round(Math.max(...reservDepositTemp)),
      clickedMonthlyDepositAvg,
      clickedMonthlyPayAvg,
      clickedReservDepositAvg,
      Math.round(Math.max(...monthlyDeposit)),
      Math.round(Math.max(...monthlyPay)),
      Math.round(Math.max(...reservDeposit)),
      monthlyDepositAvg,
      monthlyPayAvg,
      reservDepositAvg,
      Math.round(Math.min(...monthlyDepositTemp)),
      Math.round(Math.min(...monthlyPayTemp)),
      Math.round(Math.min(...reservDepositTemp)),
      monthlyDepositTemp.length,
      monthlyPayTemp.length,
      reservDepositTemp.length,
    ]);
    let label = [];
    let labels = [];
    let datasetsData = [];

    if (isChecked === "monthReserv") {
      label = ["선택된 지역과 평균의 월세(보증금)비교"];
      labels = ["월세(보증금)"];
      datasetsData = [clickedMonthlyDepositAvg, monthlyDepositAvg];
    } else if (isChecked === "monthPay") {
      label = ["선택된 지역과 평균의 월세 비교"];
      labels = ["월세"];
      datasetsData = [clickedMonthlyPayAvg, monthlyPayAvg];
    } else if (isChecked === "reserv") {
      label = ["선택된 지역과 평균의 전세가 비교"];
      labels = ["전세가"];
      datasetsData = [clickedReservDepositAvg, reservDepositAvg];
    }
    //  else {
    //   label = ["선택된 지역과 평균의 매매가 비교"];
    //   labels = ["매매가", "평균 매매가"];
    //   datasetsData = [clickedPriceAvg, priceAvg];
    // }
    const tempData = {
      labels: labels,
      datasets: [
        {
          label: "선택된 지역",
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
          data: [datasetsData[0]],
        },
        {
          label: "평균",
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
          data: [datasetsData[1]],
        },
      ],
    };
    const tempOptions = {
      legend: {
        display: true, // label 숨기기
      },
      scales: {
        yAxes: [
          {
            scaleLabel: { display: true, labelString: "만원" },
            ticks: {
              min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
              stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
            },
          },
        ],
      },
      maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    };
    setOptions(tempOptions);
    setData(tempData);
  }, [isClicked, isChecked]);

  return (
    <Div
      onClick={() => {
        if (mode !== "Bar") {
          setMode("Bar");
        } else {
          setMode("main");
        }
      }}
    >
      <Bar data={data} width={150} height={100} options={options} />
    </Div>
  );
};

export default BarChart;
