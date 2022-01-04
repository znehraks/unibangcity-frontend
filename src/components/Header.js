import logo_white from "./styles/images/logo_white.png";
import {
  HeaderLogo,
  HeaderLogoContainer,
  HeaderMenu,
  HeaderMenuContainer,
  HeaderWrapper,
} from "./styles/StyledComponents";

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
        {/* <HeaderMenu to={"/History"}>추천 히스토리</HeaderMenu> */}
        <HeaderMenu to={"/Lab"}>실험실</HeaderMenu>
      </HeaderMenuContainer>
    </HeaderWrapper>
  );
};
export default Header;
