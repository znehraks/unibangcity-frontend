import React, { useEffect, useState } from "react";
import styled from "styled-components";
import distance from "./Styles/images/distance.png";
import subway from "./Styles/images/subway.png";
import cost from "./Styles/images/cost.png";
import safety from "./Styles/images/safety.png";
import house from "./Styles/images/house.png";
import QList from "./QList";
const Item = styled.div`
  width: 13.5vw;
  height: 15vw;
  padding: 0.2vw;
  margin: 0 0.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) =>
    props.checked ? ` ${props.theme.headerBgColor}` : `black`};
  box-shadow: ${(props) =>
    props.checked ? `4px 4px ${props.theme.headerBgColor}` : `4px 4px black`};
  border: ${(props) =>
    props.checked ? `4px solid ${props.theme.headerBgColor}` : `none`};
  :hover {
    color: ${(props) => props.theme.headerBgColor};
    box-shadow: 4px 4px ${(props) => props.theme.headerBgColor};
    transition-duration: 0.1s;
  }
  @media (max-width: 500px) {
    width: 18vw;
    height: 80%;
    transition-duration: none;
    box-shadow: ${(props) =>
      props.checked ? `1px 1px ${props.theme.headerBgColor}` : `1px 1px black`};
    border: ${(props) =>
      props.checked ? `1px solid ${props.theme.headerBgColor}` : `none`};
    :hover {
      color: ${(props) =>
        props.checked ? ` ${props.theme.headerBgColor}` : `black`};
      box-shadow: ${(props) =>
        props.checked
          ? `1px 1px ${props.theme.headerBgColor}`
          : `1px 1px black`};
      transition-duration: 0.01s;
    }
  }
`;
const ItemImage = styled.img`
  width: auto;
  height: 50%;
`;
const ItemSpanContainer = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
    height: 80%;
  }
`;
const ItemTitle = styled.span`
  font-size: 2.4vw;
  margin-bottom: 0.5vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const ItemDetail = styled.span`
  font-size: 0.9vw;
  @media (max-width: 500px) {
    display: none;
  }
`;
const QButton = ({
  QNumber,
  QItem,
  Q3Answer,
  setQ3Answer,
  Q4Answer,
  setQ4Answer,
  Q5Answer,
  setQ5Answer,
  setQ3Name,
  setQ4Name,
  setQ5Name,
}) => {
  const [checked, setChecked] = useState(
    ((QNumber === 3) & (QItem.code === Q3Answer)) |
      ((QNumber === 4) & (QItem.code === Q4Answer)) |
      ((QNumber === 5) & (QItem.code === Q5Answer))
      ? true
      : false
  );
  return (
    <Item
      checked={checked}
      onClick={() => {
        if (QNumber === 3) {
          if (QItem.code === Q3Answer) {
            setQ3Answer(null);
            setQ3Name(null);
            setChecked(!checked);
            return;
          }
          if (Q3Answer) {
            alert("한 개만 선택 가능합니다.");
            return;
          }
          setChecked(!checked);
          setQ3Answer(QItem.code);
          setQ3Name(QItem.name);
        } else if (QNumber === 4) {
          if (Q4Answer) {
            if (QItem.code === Q4Answer) {
              setQ4Answer(null);
              setQ4Name(null);
              setChecked(!checked);
              return;
            }
            alert("한 개만 선택 가능합니다.");
            return;
          }
          setChecked(!checked);
          setQ4Answer(QItem.code);
          setQ4Name(QItem.name);
        } else if (QNumber === 5) {
          if (QItem.code === Q5Answer) {
            setQ5Answer(null);
            setQ5Name(null);
            setChecked(!checked);
            return;
          }
          if (Q5Answer) {
            alert("한 개만 선택 가능합니다.");
            return;
          }
          setChecked(!checked);
          setQ5Answer(QItem.code);
          setQ5Name(QItem.name);
        }
      }}
    >
      <ItemImage
        src={
          QItem.code === "T1"
            ? `${distance}`
            : QItem.code === "T2"
            ? `${subway}`
            : QItem.code === "T3"
            ? `${cost}`
            : QItem.code === "T4"
            ? `${safety}`
            : `${house}`
        }
      ></ItemImage>
      <ItemSpanContainer>
        <ItemTitle>{QItem.name}</ItemTitle>
        <ItemDetail>{QItem.detail}</ItemDetail>
      </ItemSpanContainer>
    </Item>
  );
};

export default QButton;
