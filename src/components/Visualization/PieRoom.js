import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

const PieDiv = styled.div`
  width: ${(props) => (props.mode === "Pie" ? `30vw` : `20vw`)};
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 500px) {
    width: 69vw;
    height: 70vw;
  }
`;

const PieText = styled.span`
  font-size: 1vw;
  color: black;
  font-weight: 800;
  position: relative;
  top: ${(props) => (props.top ? `${props.top}` : ``)};
  left: ${(props) => (props.top ? `${props.left}` : ``)};
`;

const PieChart = ({ mode, isClicked }) => {
  const [data, setData] = useState();
  const [roomCategory, setRoomCategory] = useState();
  useEffect(() => {
    let pre = [];
    isClicked.rooms_desc.map((item) => {
      pre.push(item.split("|")[0].trim());
    });
    pre.sort();
    console.log(pre);
    let temp = [];
    let count = 1;
    for (let i = 1; i < pre.length; i++) {
      let dict = {};
      if (i === pre.length - 1) {
        count++;
        dict["text"] = pre[i - 1];
        dict["value"] = count;
        temp.push(dict);
        count = 1;
      } else if (pre[i] !== pre[i - 1]) {
        dict["text"] = pre[i - 1];
        dict["value"] = count;
        temp.push(dict);
        count = 1;
      } else {
        count++;
      }
    }
    setRoomCategory(temp);
    console.log(temp);
    const labels = [];
    const datasetsData = [];
    for (let i = 0; i < temp.length; i++) {
      labels.push(temp[i].text);
      datasetsData.push(temp[i].value);
    }
    const tempData = {
      labels: labels,
      datasets: [
        {
          data: datasetsData,
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
    setData(tempData);
  }, [isClicked]);
  return (
    <>
      <PieDiv mode={mode}>
        {/* {roomCategory &&
          roomCategory.map((item, index) => {
            let top, left;
            switch (index) {
              case 0:
                top = "6vw";
                left = "9vw";
                break;
              case 1:
                top = "19vw";
                left = "8vw";
                break;
              case 2:
                top = "7vw";
                left = "-9vw";
                break;
              case 3:
                top = "20vw";
                left = "40vw";
                break;
              default:
                top = "6vw";
                left = "9vw";
            }
            return (
              <PieText top={top} left={left}>
                {`${item.text}(${item.value}개)`}
              </PieText>
            );
          })} */}
        <Pie data={data} />
      </PieDiv>
    </>
  );
};

export default PieChart;
