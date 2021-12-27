import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Burger, Menu } from "./HamburgerMenu";
import logo from "./Styles/images/logo_white.png";

const Wrapper = styled.div`
  width: 100vw;
  height: 6vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.theme.headerBgColor};
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  @media (max-width: 500px) {
    height: 20vw;
  }
`;

const LogoContainer = styled(Link)`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    padding-left: 5vw;
    justify-content: flex-start;
    width: 20vw;
  }
`;

const LogoImage = styled.img`
  width: 6vw;
  height: auto;
  @media (max-width: 500px) {
    width: 20vw;
  }
`;

const HelloContainer = styled.div`
  flex: ${(props) => (props.flex ? `${props.flex}` : `1`)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const MenuContainer = styled.div`
  flex: ${(props) => (props.flex ? `${props.flex}` : `1`)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    display: none;
  }
`;
const HamburgerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5vw;
`;

const MenuSpan = styled(Link)`
  font-size: 1vw;
  color: ${(props) => (props.selected ? `black` : `white`)};
  :hover {
    color: black;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const BurgerComponent = styled(Burger)``;

const MenuComponent = styled(Menu)``;
const Header = () => {
  const location = useNavigate();
  const [open, setOpen] = useState(false);
  const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user_no");
    window.location.href = "/";
  };
  return (
    <Wrapper>
      <LogoContainer to="/">
        <LogoImage src={logo}></LogoImage>
      </LogoContainer>
      {localStorage.getItem("userId") ? (
        <HelloContainer flex={2}>
          <MenuSpan>{localStorage.getItem("userId")}님 반가워요!</MenuSpan>
        </HelloContainer>
      ) : (
        <></>
      )}
      <MenuContainer>
        <MenuSpan to="/AboutUs" selected={location.pathname === "/AboutUs"}>
          프로젝트소개
        </MenuSpan>
      </MenuContainer>
      <MenuContainer>
        <MenuSpan
          to="/RecommendationIntro"
          selected={
            location.pathname === "/RecommendationIntro" ||
            location.pathname === "/Recommendation" ||
            location.pathname === "/RecommendationResult"
          }
        >
          추천 받기
        </MenuSpan>
      </MenuContainer>
      <MenuContainer>
        <MenuSpan
          to="/ResultHistory"
          selected={location.pathname === "/ResultHistory"}
        >
          추천 히스토리
        </MenuSpan>
      </MenuContainer>
      {/* <MenuContainer>
        <MenuSpan to="/Lab" selected={location.pathname === "/Lab"}>
          실험실
        </MenuSpan>
      </MenuContainer> */}
      <MenuContainer>
        {localStorage.getItem("userId") ? (
          <MenuSpan
            onClick={() => {
              Logout();
            }}
          >
            로그아웃
          </MenuSpan>
        ) : (
          <MenuSpan to="/Auth" selected={location.pathname === "/Auth"}>
            로그인
          </MenuSpan>
        )}
      </MenuContainer>
      {window.innerWidth <= 500 ? (
        <HamburgerContainer>
          <BurgerComponent open={open} setOpen={setOpen} />
          <MenuComponent open={open} setOpen={setOpen} />
        </HamburgerContainer>
      ) : (
        <MenuContainer />
      )}
    </Wrapper>
  );
};

export default Header;
