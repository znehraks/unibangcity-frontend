import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
const Div = styled.div`
  width: 40%;
  height: 25vw;
`;

const BarChart = ({ isClicked }) => {
  const data = {
    labels: ["1위", "2위", "3위", "4위", "5위"],
    datasets: [
      {
        label: "1~5위 까지 총점",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          input[0].total_weight,
          input[1].total_weight,
          input[2].total_weight,
          input[3].total_weight,
          input[4].total_weight,
        ],
      },
    ],
  };
  const options = {
    legend: {
      display: false, // label 숨기기
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
            stepSize: 1, // 스케일에 대한 사용자 고정 정의 값
          },
        },
      ],
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  };

  return (
    <Div>
      <Bar data={data} width={150} height={100} options={options} />
    </Div>
  );
};

export default BarChart;
