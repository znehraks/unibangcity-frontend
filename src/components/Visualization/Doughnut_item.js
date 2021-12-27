import React from "react";
import { Doughnut } from "react-chartjs-2";

const App = ({ w1, w2, w3, w4, w5 }) => {
  const data = {
    labels: ["거리", "역세권", "가성비", "안전", "매물"],
    datasets: [
      {
        data: [w1, w2, w3, w4, w5],
        // data: [100, 50, 200, 40, 300],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#888888", "4738AD"],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#888888",
          "4738AD",
        ],
      },
    ],
  };
  return (
    <div>
      <h2>매물의 주된 비중은?</h2>
      <Doughnut data={data} />
    </div>
  );
};
export default App;
