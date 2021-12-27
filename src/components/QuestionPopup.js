import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import QuestionPopupCheckBox from "./QuestionPopupCheckbox";

const QuestionDiv = styled.div`
  width: 100%;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid ${(props) => props.theme.headerBgColor};
  @media (max-width: 500px) {
    height: 100%;
  }
`;
const QuestionTitleSpan = styled.span`
  font-size: 1.5vw;
  @media (max-width: 500px) {
    font-size: 4.5vw;
  }
`;
const QuestionItemBigSpan = styled.span`
  margin-top: 1vw;
  font-size: 1.2vw;
  @media (max-width: 500px) {
    font-size: 3.2vw;
  }
`;

const QuestionItemSmallSpan = styled.span`
  margin-top: 0.5vw;
  font-size: 0.72vw;
  font-weight: 800;
  @media (max-width: 500px) {
    display: none;
  }
`;
const QuestionItemInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 75%;
  height: auto;
  margin: 1vw 0;
  padding-bottom: 0.2vw;
  border-bottom: 1px solid black;
  @media (max-width: 500px) {
    width: 95%;
    padding-bottom: 1vw;
    margin: 4vw 0;
  }
`;
const QuestionDivButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const QuestionDivButton = styled.span`
  margin-top: 1vw;
  font-size: 1.2vw;
  text-align: center;
  width: 6vw;
  height: 3vw;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
  @media (max-width: 500px) {
    font-size: 3vw;
    margin: 3vw;
  }
`;
export default ({
  popup,
  setPopup,
  setQComplete,
  setCanceled,
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
  TotalWeightAvg,
  TotalWeightRank01,
  TotalWeightRank02,
  TotalWeightRank03,
  TotalWeightRank04,
  TotalWeightRank05,
  mobile,
}) => {
  useEffect(() => {
    setQuestion01();
    setQuestion02();
    setQuestion03();
    setQuestion04();
    setQuestion05();
  }, []);
  const scores = [
    { key: 0, score: 5, name: "매우 만족" },
    { key: 1, score: 4, name: "만족" },
    { key: 2, score: 3, name: "보통" },
    { key: 3, score: 2, name: "불만족" },
    { key: 4, score: 1, name: "매우 불만족" },
  ];
  return (
    <Popup
      open={popup}
      closeOnEscape
      closeOnDocumentClick
      mouseEnterDelay
      mouseLeaveDelay
      overlayStyle={{ backdropFilter: "brightness(50%)" }}
      modal
      trigger={<></>}
      contentStyle={{
        width: mobile ? "80vw" : "40vw",
        height: mobile ? "70vh" : "",
        background: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QuestionDiv>
        <QuestionTitleSpan>더 나은 서비스를 위한 설문입니다</QuestionTitleSpan>

        <QuestionItemBigSpan>
          Q1.1번 지역의 결과에 대해 만족하시나요?
        </QuestionItemBigSpan>

        <QuestionItemSmallSpan>
          해당 지역은 평균보다 약{TotalWeightRank01 - TotalWeightAvg}점 더 높은
          점수를 받았네요.
        </QuestionItemSmallSpan>
        <QuestionItemInputContainer>
          {scores.map((score, index) => {
            return (
              <QuestionPopupCheckBox
                QuestionNumber={1}
                Question01={Question01}
                setQuestion01={setQuestion01}
                score={score}
                index={index}
              />
            );
          })}
        </QuestionItemInputContainer>

        <QuestionItemBigSpan>
          Q2.2번 지역의 결과에 대해 만족하시나요?
        </QuestionItemBigSpan>

        <QuestionItemSmallSpan>
          해당 지역은 평균보다 약 {TotalWeightRank02 - TotalWeightAvg}점 더 높은
          점수를 받았네요.
        </QuestionItemSmallSpan>

        <QuestionItemInputContainer>
          {scores.map((score, index) => {
            return (
              <QuestionPopupCheckBox
                QuestionNumber={2}
                Question02={Question02}
                setQuestion02={setQuestion02}
                score={score}
                index={index}
              />
            );
          })}
        </QuestionItemInputContainer>

        <QuestionItemBigSpan>
          Q3.3번 지역의 결과에 대해 만족하시나요?
        </QuestionItemBigSpan>

        <QuestionItemSmallSpan>
          해당 지역은 평균보다 약 {TotalWeightRank03 - TotalWeightAvg}점 더 높은
          점수를 받았네요.
        </QuestionItemSmallSpan>

        <QuestionItemInputContainer>
          {scores.map((score, index) => {
            return (
              <QuestionPopupCheckBox
                QuestionNumber={3}
                Question03={Question03}
                setQuestion03={setQuestion03}
                score={score}
                index={index}
              />
            );
          })}
        </QuestionItemInputContainer>

        <QuestionItemBigSpan>
          Q4.4번 지역의 결과에 대해 만족하시나요?
        </QuestionItemBigSpan>

        <QuestionItemSmallSpan>
          해당 지역은 평균보다 약 {TotalWeightRank04 - TotalWeightAvg}점 더 높은
          점수를 받았네요.
        </QuestionItemSmallSpan>

        <QuestionItemInputContainer>
          {scores.map((score, index) => {
            return (
              <QuestionPopupCheckBox
                QuestionNumber={4}
                Question04={Question04}
                setQuestion04={setQuestion04}
                score={score}
                index={index}
              />
            );
          })}
        </QuestionItemInputContainer>

        <QuestionItemBigSpan>
          Q5.5번 지역의 결과에 대해 만족하시나요?
        </QuestionItemBigSpan>

        <QuestionItemSmallSpan>
          해당 지역은 평균보다 약 {TotalWeightRank05 - TotalWeightAvg}점 더 높은
          점수를 받았네요.
        </QuestionItemSmallSpan>

        <QuestionItemInputContainer>
          {scores.map((score, index) => {
            return (
              <QuestionPopupCheckBox
                QuestionNumber={5}
                Question05={Question05}
                setQuestion05={setQuestion05}
                score={score}
                index={index}
              />
            );
          })}
        </QuestionItemInputContainer>
        <QuestionDivButtonContainer>
          <QuestionDivButton
            onClick={() => {
              setPopup(false);
              setCanceled(true);
            }}
          >
            취소
          </QuestionDivButton>
          <QuestionDivButton
            onClick={() => {
              if (
                Question01 &&
                Question02 &&
                Question03 &&
                Question04 &&
                Question05
              ) {
                setQComplete(true);
                setPopup(false);
              } else {
                alert("모든 항목을 체크해주셔야 합니다.");
              }
            }}
          >
            완료
          </QuestionDivButton>
        </QuestionDivButtonContainer>
      </QuestionDiv>
    </Popup>
  );
};
