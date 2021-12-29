import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { ALL, BAR } from "../Enum";
const BarWrapper = styled.div`
  width: 60%;
  height: 25vw;
  display: ${(props) => (props.chartmode === ALL ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
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

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["June"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1500],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [500],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const BarRoom = ({ chartmode, setChartmode }) => {
  return (
    <BarWrapper chartmode={chartmode} onClick={() => setChartmode(BAR)}>
      <Bar options={options} data={data} />
    </BarWrapper>
  );
};
export default BarRoom;
