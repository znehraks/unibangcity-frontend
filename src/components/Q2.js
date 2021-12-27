import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import Q2Map from "./Kakao/Q2Map";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 45vw;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 500px) {
    min-height: 100vh;
    justify-content: center;
  }
`;
const TitleSpan = styled.span`
  font-size: 2.5vw;
  margin-top: 3vw;
  @media (max-width: 500px) {
    font-size: 5.5vw;
  }
`;
const SubTitleSpan = styled.span`
  font-size: 1vw;
  margin-top: 0.5vw;
  @media (max-width: 500px) {
    display: none;
  }
`;
const SubTitleMobileSpan = styled.span`
  font-size: 3vw;
  margin-top: 0.5vw;
  @media (min-width: 500px) {
    display: none;
  }
`;
const Article = styled.div`
  width: 80%;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
  @media (max-width: 500px) {
    display: none;
  } ;
`;
const MobileArticle = styled.div`
  width: 80%;
  height: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
  @media (min-width: 500px) {
    display: none;
  } ;
`;
const HiddenList = styled.div`
  width: 50%;
  height: auto;
  font-size: 1.5vw;
  /* display: {props=>props.} */
`;
const HiddenListItem = styled.span`
  font-size: 2vw;
`;
const ButtonContainer = styled.div`
  width: 50%;
  height: 4vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const Prev = styled.span`
  width: 6vw;
  height: 3.5vw;
  font-size: 1.5vw;
  border: 2px solid rgba(0, 0, 0, 0.4);
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: white;
    background: black;
    font-weight: 800;
  }
  @media (max-width: 500px) {
    width: 18vw;
    height: 8.5vw;
    font-size: 5vw;
  }
`;
const Next = styled.span`
  width: 6vw;
  height: 3.5vw;
  font-size: 1.5vw;
  border: 2px solid rgba(0, 0, 0, 0.4);
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: white;
    background: black;
    font-weight: 800;
  }
  @media (max-width: 500px) {
    width: 18vw;
    height: 8.5vw;
    font-size: 5vw;
  }
`;
const Submit = styled(Link)`
  width: 6vw;
  height: 3.5vw;
  font-size: 1.5vw;
  border: 2px solid rgba(0, 0, 0, 0.4);
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: white;
    background: black;
    font-weight: 800;
  }
`;

const ItemList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div`
  width: 13vw;
  height: 15vw;
  padding: 1vw;
  margin: 0 0.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 5px 5px #dd0000;
  :hover {
    color: white;
    box-shadow: 5px 5px #880000;
    transition-duration: 0.5s;
  }
`;
const ItemImage = styled.img`
  width: 90%;
  height: auto;
`;
const ItemSpanContainer = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemTitle = styled.span`
  font-size: 2.4vw;
  margin-bottom: 0.5vw;
`;
const ItemDetail = styled.span`
  font-size: 0.9vw;
`;

const CurrentSelectedDiv = styled.div`
  position: absolute;
  top: 14vw;
  right: 0.5vw;
  width: auto;
  max-width: 15vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    align-items: flex-start;
    flex-direction: row;
  }
`;
const CurrentSelectedList = styled.div`
  width: 100%;
  height: 20%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CurrentSelectedSpan = styled.span`
  font-size: 1vw;
  margin-bottom: 2vw;
`;
const InputBox = styled.input`
  width: 50%;
  height: 3vw;
  font-size: 2vw;
  border: none;
  border-bottom: 4px solid black;
  background: transparent;
  @media (max-width: 500px) {
    width: 60%;
    height: 8vw;
    font-size: 4vw;
  }
`;
const Q2 = ({
  Q1Name,
  Q2Name,
  setQNumber,
  Q2Answer,
  setQ2Answer,
  univ_name,
  univ_lat,
  univ_lon,
}) => {
  const distance = useInput("");
  useEffect(() => {
    setQ2Answer();
  }, []);
  return (
    <>
      <CurrentSelectedDiv>
        <CurrentSelectedList>
          <CurrentSelectedSpan>{Q1Name}</CurrentSelectedSpan>
          <CurrentSelectedSpan>+</CurrentSelectedSpan>
        </CurrentSelectedList>
      </CurrentSelectedDiv>
      <Wrapper>
        <TitleSpan>#2.원하는 거리를 선택해 주세요.</TitleSpan>
        <SubTitleSpan>
          지도를 마우스로 클릭하면 원 그리기가 시작되고
        </SubTitleSpan>
        <SubTitleSpan>
          오른쪽 마우스를 클릭하면 원 그리기가 종료됩니다
        </SubTitleSpan>
        <SubTitleSpan>
          드래그와 휠을 통해 지도를 확대/축소/이동이 가능합니다
        </SubTitleSpan>
        <SubTitleMobileSpan>
          학교와의 최대 허용 거리를 입력해주세요.
        </SubTitleMobileSpan>
        <SubTitleMobileSpan>
          ex.1000m까지 허용할 경우, 1000 입력
        </SubTitleMobileSpan>
        <Article>
          <Q2Map
            mobile={window.innerWidth <= 500}
            univ_lat={univ_lat}
            univ_lon={univ_lon}
            setQ2Answer={setQ2Answer}
          />
        </Article>
        <MobileArticle>
          <InputBox
            placeholder={"ex.1000"}
            {...distance}
            type="text"
          ></InputBox>
        </MobileArticle>
        <ButtonContainer>
          <Prev
            onClick={() => {
              setQ2Answer();
              setQNumber(1);
            }}
          >
            이전
          </Prev>
          <Next
            onClick={() => {
              if (window.innerWidth <= 500) {
                if (distance.value === "") {
                  alert("거리는 필수 항목입니다.");
                  return;
                } else if (
                  Number(distance.value) < 200 ||
                  Number(distance.value) > 5000 ||
                  isNaN(Number(distance.value))
                ) {
                  alert(
                    "거리가 허용범위 밖이거나 올바른 값이 아닙니다. 다시 입력해주세요."
                  );
                  return;
                } else {
                  setQ2Answer(distance.value);
                }
              } else {
                if (!Q2Answer) {
                  alert("거리는 필수 항목입니다.");
                  return;
                }
              }
              setQNumber(3);
            }}
          >
            다음
          </Next>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

export default Q2;
