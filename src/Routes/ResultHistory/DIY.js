import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Detail from "./Detail";
import Back from "../../components/Styles/images/back.png";
import Magnify from "../../components/Styles/images/magnify.png";
import useInput from "../../Hooks/useInput";
import { Api } from "../../api";

const Wrapper = styled.div`
  width: 100vw;
  height: 58vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 6vw;
  @media (max-width: 500px) {
    margin-top: 25vw;
    height: 90vh;
  }
`;

const TitleSpan = styled.span`
  margin: 2vw 0;
  font-size: 2vw;
  @media (max-width: 500px) {
    font-size: 5vw;
    margin-bottom: 5vh;
  }
`;
const SmallSpan = styled.span`
  font-size: 1.2vw;
`;
const Article = styled.div`
  width: 80%;
  height: 70%;
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
  @media (max-width: 500px) {
    display: none;
  }
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
  @media (max-width: 500px) {
    height: 10vw;
  }
`;
const Item = styled.div`
  display: ${(props) => (props.mobile ? `none` : ``)};
  flex: ${(props) => (props.flex ? `${props.flex}` : `1`)};
  font-size: 1.2vw;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;

const ButtonContainer = styled.div`
  width: 30%;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vw;
  @media (max-width: 500px) {
    width: 60%;
  }
`;
const Prev = styled.div`
  font-size: 1.3vw;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;
const Current = styled.div`
  font-size: 1.3vw;
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;
const Next = styled.div`
  font-size: 1.3vw;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerBgColor};
  }
  @media (max-width: 500px) {
    font-size: 4vw;
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
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const DIY = () => {
  const [page, setPage] = useState(1);
  const Search = useInput("");
  //히스토리 데이터를 useEffect에서 setHistory에 넣음
  const [history, setHistory] = useState();

  //메인인지, 상세인지 구분하게 하는 hook
  const [detail, setDetail] = useState(false);
  useEffect(() => {
    Api.getDiyHistory(localStorage.getItem("userId")).then((response) => {
      if (response.data) {
        setHistory(response.data);
      }
    });
  }, []);
  return (
    <>
      {/* {history && ( */}
      {!detail ? (
        <Wrapper>
          <TitleSpan>나의 DIY 추천 히스토리</TitleSpan>
          <Article>
            <SearchContainer>
              <SearchInput
                type={"text"}
                placeholder={"명지대학교"}
                {...Search}
              ></SearchInput>
              <SearchButton></SearchButton>
              <BackArrow to="/ResultHistory">
                <img src={Back}></img>
                <OptionSpan>뒤로가기</OptionSpan>
              </BackArrow>
              <MagnifyDiv>
                <img src={Magnify}></img>
              </MagnifyDiv>
            </SearchContainer>
            <ListContainer>
              {/*map으로 돌려서 ListItem 만들것임 */}
              <ListItem>
                <Item flex={2}>번호</Item>
                <Item flex={window.innerWidth <= 500 ? 4 : 2}>학교명</Item>
                <Item mobile={window.innerWidth <= 500} flex={4}>
                  추천받은지역
                </Item>
                <Item mobile={window.innerWidth <= 500} flex={2}>
                  일시
                </Item>
              </ListItem>
              {history &&
                history.map((item, index) => {
                  if ((index >= (page - 1) * 8) & (index < page * 8)) {
                    return (
                      <ListItem
                        to={{
                          pathname: `/RecommendationResult/${item.Q1}/${item.univ_lat}/${item.univ_lon}/${item.Q2}/${item.Q3}/${item.Q4}/${item.Q5}/${item.w1}/${item.w2}/${item.w3}/${item.w4}/${item.w5}/1`,
                        }}
                      >
                        <Item flex={2}>{item.diy_reco_history_no}</Item>
                        <Item flex={window.innerWidth <= 500 ? 4 : 2}>
                          {item.Q1}
                        </Item>
                        <Item mobile={window.innerWidth <= 500} flex={4}>
                          {item.Q1}
                        </Item>
                        <Item mobile={window.innerWidth <= 500} flex={2}>
                          {item.updated_at.split("T")[0]}
                        </Item>
                      </ListItem>
                    );
                  }
                })}
            </ListContainer>
          </Article>
          <ButtonContainer>
            <Prev
              onClick={() => {
                if (page < 2) {
                  alert("첫 번째 페이지 입니다.");
                  return;
                }
                setPage(page - 1);
              }}
            >
              이전
            </Prev>
            <Current>{page}</Current>
            <Next
              onClick={() => {
                if (Math.floor(history.length / 8) + 1 === page) {
                  alert("마지막 페이지 입니다.");
                  return;
                }
                setPage(page + 1);
              }}
            >
              다음
            </Next>
          </ButtonContainer>
        </Wrapper>
      ) : (
        <Detail
          setDetail={setDetail}
          data={"현재 선택된 리스트아이템 데이터"}
        />
      )}
      {/* )} */}
      {/* {!history && (
        <Wrapper>
          <Loader />
        </Wrapper>
      )} */}
    </>
  );
};

export default DIY;
