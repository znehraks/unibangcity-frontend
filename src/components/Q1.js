import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import UniversityList from "./UniversityList";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -ms-overflow-style: none;
  @media (max-width: 500px) {
    justify-content: center;
  }
`;
const TitleSpan = styled.span`
  font-size: 2.5vw;
  margin-top: 5vw;
  @media (max-width: 500px) {
    font-size: 4.5vw;
    margin: 4vw 0;
  }
`;
const SubTitleSpan = styled.span`
  font-size: 1vw;
  margin-top: 1vw;
  margin-bottom: 6vw;
  @media (max-width: 500px) {
    font-size: 2vw;
    padding: 0 19vw;
  }
`;
const Article = styled.div`
  width: 70%;
  height: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vw;
  @media (max-width: 500px) {
    width: 100%;
    height: 30vw;
  }
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
const HiddenList = styled.div`
  width: 50%;
  height: 5vw;
  font-size: 1.5vw;
  display: ${(props) => (props.name !== "" ? `flex` : `none`)};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 5px;
    height: 0;
    background-color: black; /* or add it to the track */
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.headerBgColor}; /* or add it to the track */
  }
  overflow: scroll;
  /* display: {props=>props.} */
  @media (max-width: 500px) {
    width: 60%;
    height: 20vw;
  }
`;
const HiddenListItem = styled.span`
  margin-top: 0.8vw;
  padding-bottom: 0.5vw;
  font-size: 1.5vw;
  border-bottom: 3px solid black;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
    font-weight: 800;
  }
  @media (max-width: 500px) {
    font-size: 3.5vw;
  }
`;
const ButtonContainer = styled.div`
  width: 50%;
  height: 4vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
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
const Q1 = ({
  Q1Name,
  setQ1Name,
  setQNumber,
  univ_name,
  setUniv_name,
  univ_lat,
  setUniv_lat,
  univ_lon,
  setUniv_lon,
}) => {
  const name = useInput("");
  //학교이름 DB에서 가져오기. 이름 한글자라도 틀리면 백엔드에서 에러생김
  const [isClicked, setIsClicked] = useState(false);
  const filtered = (list) => {
    list = list.filter((item) => item.name.indexOf(name.value) > -1);
    return list.map((item, index) => (
      <HiddenListItem
        key={index}
        onClick={() => {
          name.setValue(item.name);
          setUniv_name(item.name);
          setUniv_lat(item.address_lat);
          setUniv_lon(item.address_lon);
        }}
      >
        {item.name}
      </HiddenListItem>
    ));
  };
  return (
    <Wrapper>
      <TitleSpan>#1.자신의 학교 이름을 입력해 주세요.</TitleSpan>
      <SubTitleSpan>
        ex."명지대학교" 검색을 원하는 경우 "명지" 혹은 "명지대학교"를 입력 후
        리스트에서 선택해 주세요.
      </SubTitleSpan>
      <Article>
        <InputBox
          placeholder={"ex.명지대학교"}
          {...name}
          type="text"
          onClick={() => {
            name.setValue("");
            setUniv_name();
            setUniv_lat();
            setUniv_lon();
          }}
        ></InputBox>
        {univ_name === undefined && (
          <HiddenList name={name.value} onClick={() => setIsClicked(true)}>
            {filtered(UniversityList)}
          </HiddenList>
        )}
      </Article>
      <ButtonContainer>
        <Next
          onClick={() => {
            if ((name.value.length === 0) | !isClicked) {
              alert("학교이름은 필수 항목 입니다.");
              return;
            }
            setQ1Name(univ_name);
            setQNumber(2);
          }}
        >
          다음
        </Next>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Q1;
