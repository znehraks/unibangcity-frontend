import { Link } from "react-router-dom";
import styled from "styled-components";
import logo_white from "./styles/logo_white.png";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f7323f;
`;
const HeaderLogoContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 30%;
  height: auto;
`;
const HeaderMenuContainer = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const HeaderMenu = styled(Link)`
  font-size: 1.2vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    font-weight: 600;
  }
`;
const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogoContainer>
        <HeaderMenu to="/">
          <HeaderLogo src={logo_white} />
        </HeaderMenu>
      </HeaderLogoContainer>
      <HeaderMenuContainer>
        <HeaderMenu to={"/Aboutus"}>프로젝트소개</HeaderMenu>
        <HeaderMenu to={"/Recommendation"}>추천 받기</HeaderMenu>
        <HeaderMenu to={"/History"}>추천 히스토리</HeaderMenu>
        <HeaderMenu to={"/Auth"}>로그인</HeaderMenu>
      </HeaderMenuContainer>
    </HeaderWrapper>
  );
};
export default Header;
