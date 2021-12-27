import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Back from "../../components/Styles/images/back.png";
import Magnify from "../../components/Styles/images/magnify.png";
import useInput from "../../Hooks/useInput";
import { Api } from "../../api";

const Wrapper = styled.div`
  width: 100vw;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6vw;
`;

const TitleSpan = styled.span`
  margin: 2vw 0;
  font-size: 2vw;
`;
const SmallSpan = styled.span`
  font-size: 1.2vw;
`;
const Article = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const SearchContainer = styled.div`
  width: 50%;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: Center;
  margin-bottom: 2vw;
`;
const SearchInput = styled.input`
  width: 60%;
  text-decoration: none;
  font-size: 1.5vw;
  background: transparent;
  border: none;
  border-bottom: 2px solid black;
  transition-duration: 0.5s;
  :hover,
  :focus {
    border-bottom: 2px solid ${(props) => props.theme.headerBgColor};
  }
`;
const SearchButton = styled.img``;
const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const ListItem = styled(Link)`
  width: 100%;
  height: 2vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1vw 0;
  padding-bottom: 1vw;
  border-bottom: 1px solid black;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
`;
const Item = styled.div`
  flex: ${(props) => (props.flex ? `${props.flex}` : `1`)};
  font-size: 1.2vw;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 30%;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vw;
`;
const Prev = styled.div`
  font-size: 1.3vw;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
`;
const Current = styled.div`
  font-size: 1.3vw;
`;
const Next = styled.div`
  font-size: 1.3vw;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
`;

const BackArrow = styled(Link)`
  cursor: pointer;
  position: absolute;
  right: 10vw;
  width: 4vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 2vw;
  }
`;
const MagnifyDiv = styled.div`
  cursor: pointer;
  position: absolute;
  left: 35vw;
  width: 4vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 2vw;
  }
`;

const OptionSpan = styled.span`
  font-size: 1vw;
`;

const Lab = () => {
  const [page, setPage] = useState(1);
  const Search = useInput("");
  //히스토리 데이터를 useEffect에서 setHistory에 넣음
  const [history, setHistory] = useState();

  //메인인지, 상세인지 구분하게 하는 hook
  const [detail, setDetail] = useState(false);
  return (
    <>
      <Wrapper>
        <TitleSpan>저기어때. 의 실험실입니다.</TitleSpan>
        <Article>
          <SmallSpan>저기어때. 유저에게 자주 선택된 조합은?</SmallSpan>
        </Article>
        <Article>
          <SmallSpan>저기어때. 유저에게 자주 조회된 학교는?</SmallSpan>
        </Article>
        <Article>
          <SmallSpan>저기어때. 의 추천 결과 중 만족도가 높은 조합은?</SmallSpan>
        </Article>
        <Article>
          <SmallSpan>저기어때. 의 총 추천 횟수는?</SmallSpan>
        </Article>
      </Wrapper>
    </>
  );
};
export default Lab;
