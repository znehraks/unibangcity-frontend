import React, { useEffect, useState } from "react";
import styled from "styled-components";

const QuestionItemCheckbox = styled.div`
  text-align: center;
  width: 95%;
  height: 1.4vw;
  cursor: pointer;
  color: ${(props) =>
    props.checked ? `${props.theme.headerBgColor}` : `black`};
  font-weight: ${(props) => (props.checked ? `800` : ``)};
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
  @media (max-width: 500px) {
    font-size: 2.5vw;
  }
`;
export default ({
  QuestionNumber,
  Question01,
  setQuestion01,
  Question02,
  setQuestion02,
  Question03,
  setQuestion03,
  Question04,
  setQuestion04,
  Question05,
  setQuestion05,
  score,
  index,
}) => {
  const [checked, setChecked] = useState();
  return (
    <QuestionItemCheckbox
      checked={checked}
      onClick={() => {
        if (QuestionNumber === 1) {
          if (Question01) {
            if (Question01.key === index) {
              setChecked(false);
              setQuestion01();
            } else {
              alert("만족도는 한 개만 선택 가능합니다.");
            }
          } else {
            setChecked(true);
            setQuestion01(score);
          }
        } else if (QuestionNumber === 2) {
          if (Question02) {
            if (Question02.key === index) {
              setChecked(false);
              setQuestion02();
            } else {
              alert("만족도는 한 개만 선택 가능합니다.");
            }
          } else {
            setChecked(true);
            setQuestion02(score);
          }
        } else if (QuestionNumber === 3) {
          if (Question03) {
            if (Question03.key === index) {
              setChecked(false);
              setQuestion03();
            } else {
              alert("만족도는 한 개만 선택 가능합니다.");
            }
          } else {
            setChecked(true);
            setQuestion03(score);
          }
        } else if (QuestionNumber === 4) {
          if (Question04) {
            if (Question04.key === index) {
              setChecked(false);
              setQuestion04();
            } else {
              alert("만족도는 한 개만 선택 가능합니다.");
            }
          } else {
            setChecked(true);
            setQuestion04(score);
          }
        } else if (QuestionNumber === 5) {
          if (Question05) {
            if (Question05.key === index) {
              setChecked(false);
              setQuestion05();
            } else {
              alert("만족도는 한 개만 선택 가능합니다.");
            }
          } else {
            setChecked(true);
            setQuestion05(score);
          }
        }
      }}
    >
      {score.name}
    </QuestionItemCheckbox>
  );
};
