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
import { ALL, BAR, MONTHPAY, MONTHRESERV } from "../Enum";
const BarWrapper = styled.div`
  width: 60%;
  height: 25vw;
  display: flex;
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

const BarRoom = ({
  isChecked,
  chartmode,
  setChartmode,
  monthlyDepositEachAggregated,
  monthlyPayEachAggregated,
  reservDepositEachAggregated,
  monthlyDepositTotalAggregated,
  monthlyPayTotalAggregated,
  reservDepositTotalAggregated,
  clickedMarker,
}) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: ``,
      },
    },
  };

  const labels = [`${clickedMarker + 1}위 지역과 평균 비교`];

  const data = {
    labels,
    datasets: [
      {
        label: `${clickedMarker + 1}위 지역`,
        data:
          isChecked === MONTHRESERV
            ? [monthlyDepositEachAggregated.avg[clickedMarker]]
            : isChecked === MONTHPAY
            ? [monthlyPayEachAggregated.avg[clickedMarker]]
            : [reservDepositEachAggregated.avg[clickedMarker]],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "5개 지역 평균",
        data:
          isChecked === MONTHRESERV
            ? [monthlyDepositTotalAggregated.avg[0]]
            : isChecked === MONTHPAY
            ? [monthlyPayTotalAggregated.avg[0]]
            : [reservDepositTotalAggregated.avg[0]],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <BarWrapper
      chartmode={chartmode}
      onClick={() => setChartmode(chartmode === BAR ? ALL : BAR)}
    >
      <Bar options={options} data={data} />
    </BarWrapper>
  );
};
export default BarRoom;
