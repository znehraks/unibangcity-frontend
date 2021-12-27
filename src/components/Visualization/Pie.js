import React from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

const PieDiv = styled.div`
  width: 20vw;
`;

const PieChart = ({ input, number }) => {
  const data = {
    labels: ["거리", "역세권", "가성비", "안전", "매물"],
    datasets: [
      {
        data: [
          input[number].T1,
          input[number].T2,
          input[number].T3,
          input[number].T4,
          input[number].T5,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <PieDiv>
      <Pie data={data} />
    </PieDiv>
  );
};

export default PieChart;
