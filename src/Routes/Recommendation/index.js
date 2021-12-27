import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Q1 from "../../components/Q1";
import Q2 from "../../components/Q2";
import Q3 from "../../components/Q3";
import Q4 from "../../components/Q4";
import Q5 from "../../components/Q5";
import QList from "../../components/QList";
import QWeight from "../../components/QWeight";
const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: red;
`;
const TitleSpan = styled.span`
  font-size: 2.5vw;
  margin-top: 5vw;
`;
const SubTitleSpan = styled.span`
  font-size: 1vw;
  margin-top: 1vw;
  margin-bottom: 6vw;
`;
const Article = styled.div`
  width: 70%;
  height: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vw;
`;
const InputBox = styled.input`
  width: 50%;
  height: 3vw;
  font-size: 2vw;
  border: none;
  border-bottom: 4px solid black;
  background: transparent;
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
const Recommendation = () => {
  //선택 문항 state hooks
  const [QNumber, setQNumber] = useState(1);
  const [univ_name, setUniv_name] = useState();
  const [univ_lat, setUniv_lat] = useState();
  const [univ_lon, setUniv_lon] = useState();
  const [Q2Answer, setQ2Answer] = useState();
  const [Q3Answer, setQ3Answer] = useState();
  const [Q4Answer, setQ4Answer] = useState();
  const [Q5Answer, setQ5Answer] = useState();

  //선택 현황 표시용 문항 이름
  const [Q1Name, setQ1Name] = useState();
  const [Q2Name, setQ2Name] = useState();
  const [Q3Name, setQ3Name] = useState();
  const [Q4Name, setQ4Name] = useState();
  const [Q5Name, setQ5Name] = useState();

  //주변 매물 정보 얻어와서 저장
  //...

  //가중치 state hooks(일단, 1순위 50%, 2순위 30%, 3순위 20%)
  const [Q3Weight, setQ3Weight] = useState(0.5);
  const [Q4Weight, setQ4Weight] = useState(0.3);
  const [Q5Weight, setQ5Weight] = useState(0.2);

  //최종 가중 합
  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);
  const [w3, setW3] = useState(0);
  const [w4, setW4] = useState(0);
  const [w5, setW5] = useState(0);

  const [finalWeight, setFinalWeight] = useState([]);
  const calFinalWeight = (Q3Weight, Q4Weight, Q5Weight) => {
    let w1 = 0,
      w2 = 0,
      w3 = 0,
      w4 = 0,
      w5 = 0;
    for (let i = 0; i < QWeight.length; i++) {
      if (QWeight[i].code === Q3Answer) {
        w1 += QWeight[i].w1 * Q3Weight;
        w2 += QWeight[i].w2 * Q3Weight;
        w3 += QWeight[i].w3 * Q3Weight;
        w4 += QWeight[i].w4 * Q3Weight;
        w5 += QWeight[i].w5 * Q3Weight;
      }
      if (QWeight[i].code === Q4Answer) {
        w1 += QWeight[i].w1 * Q4Weight;
        w2 += QWeight[i].w2 * Q4Weight;
        w3 += QWeight[i].w3 * Q4Weight;
        w4 += QWeight[i].w4 * Q4Weight;
        w5 += QWeight[i].w5 * Q4Weight;
      }
      if (QWeight[i].code === Q5Answer) {
        w1 += QWeight[i].w1 * Q5Weight;
        w2 += QWeight[i].w2 * Q5Weight;
        w3 += QWeight[i].w3 * Q5Weight;
        w4 += QWeight[i].w4 * Q5Weight;
        w5 += QWeight[i].w5 * Q5Weight;
      }
    }
    setFinalWeight([w1, w2, w3, w4, w5]);
    setW1(w1);
    setW2(w2);
    setW3(w3);
    setW4(w4);
    setW5(w5);
  };
  useEffect(() => {
    calFinalWeight(Q3Weight, Q4Weight, Q5Weight);
  }, [Q5Answer]);

  console.log(univ_name);
  console.log("univ_lat: 37..", univ_lat);
  console.log("univ_lon: 127..", univ_lon);
  console.log(Q2Answer);
  console.log(Q3Answer);
  console.log(Q4Answer);
  console.log(Q5Answer);
  console.log(finalWeight);
  return (
    <>
      <Helmet>
        <title>Recommendation</title>
      </Helmet>
      {QNumber === 1 && (
        <Q1
          Q1Name={Q1Name}
          setQ1Name={setQ1Name}
          QList={QList}
          QNumber={QNumber}
          setQNumber={setQNumber}
          univ_name={univ_name}
          setUniv_name={setUniv_name}
          univ_lat={univ_lat}
          setUniv_lat={setUniv_lat}
          univ_lon={univ_lon}
          setUniv_lon={setUniv_lon}
        />
      )}
      {QNumber === 2 && (
        <Q2
          Q1Name={Q1Name}
          Q2Name={Q2Name}
          setQ2Name={setQ2Name}
          QList={QList}
          univ_name={univ_name}
          Q2Answer={Q2Answer}
          QNumber={QNumber}
          setQNumber={setQNumber}
          Q2Answer={Q2Answer}
          setQ2Answer={setQ2Answer}
          univ_name={univ_name}
          univ_lat={univ_lat}
          univ_lon={univ_lon}
        />
      )}
      {QNumber === 3 && (
        <Q3
          Q1Name={Q1Name}
          Q2Name={Q2Name}
          Q3Name={Q3Name}
          setQ3Name={setQ3Name}
          univ_name={univ_name}
          Q2Answer={Q2Answer}
          Q3Answer={Q3Answer}
          QNumber={QNumber}
          setQNumber={setQNumber}
          Q3Answer={Q3Answer}
          setQ3Answer={setQ3Answer}
          QList={QList}
        />
      )}
      {QNumber === 4 && (
        <Q4
          Q1Name={Q1Name}
          Q2Name={Q2Name}
          Q3Name={Q3Name}
          Q4Name={Q4Name}
          setQ4Name={setQ4Name}
          univ_name={univ_name}
          Q2Answer={Q2Answer}
          Q3Answer={Q3Answer}
          Q4Answer={Q4Answer}
          Q3Answer={Q3Answer}
          QNumber={QNumber}
          setQNumber={setQNumber}
          Q4Answer={Q4Answer}
          setQ4Answer={setQ4Answer}
          QList={QList}
        />
      )}
      {QNumber === 5 && (
        <Q5
          Q1Name={Q1Name}
          Q2Name={Q2Name}
          Q3Name={Q3Name}
          Q4Name={Q4Name}
          Q5Name={Q5Name}
          setQ5Name={setQ5Name}
          univ_name={univ_name}
          univ_lat={univ_lat}
          univ_lon={univ_lon}
          Q2Answer={Q2Answer}
          Q3Answer={Q3Answer}
          Q4Answer={Q4Answer}
          Q5Answer={Q5Answer}
          QNumber={QNumber}
          setQNumber={setQNumber}
          setQ5Answer={setQ5Answer}
          QList={QList}
          finalWeight={finalWeight}
          w1={w1}
          w2={w2}
          w3={w3}
          w4={w4}
          w5={w5}
        />
      )}
    </>
  );
};

export default Recommendation;
