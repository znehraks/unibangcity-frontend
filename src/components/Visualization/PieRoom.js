import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { ALL, PIE } from "../Enum";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieWrapper = styled.div`
  width: 60%;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieRoom = ({ isClicked, chartmode, setChartmode }) => {
  const [pieData, setPieData] = useState({ labels: [], data: [] });
  const getAggregatedRoom = () => {
    const count = {};
    for (let i = 0; i < isClicked.rooms_desc.length; i++) {
      const type = isClicked.rooms_desc[i].split("|")[0].trim();
      if (count[type]) {
        count[type] += 1;
      } else {
        count[type] = 1;
      }
    }
    console.log(count);
    setPieData({ labels: Object.keys(count), data: Object.values(count) });
  };
  useEffect(() => {
    getAggregatedRoom();
  }, []);
  const data = {
    labels: pieData.labels,
    datasets: [
      {
        label: "# of Votes",
        data: pieData.data,
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
    <PieWrapper
      chartmode={chartmode}
      onClick={() => setChartmode(chartmode === ALL ? PIE : ALL)}
    >
      <Pie data={data} />
    </PieWrapper>
  );
};

export default PieRoom;
