import { Link, NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { MONTHPAY, MONTHRESERV, RESERV, RESULT } from "../Enum";

export const TwinkleAnimation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f7323f;
`;
export const HeaderLogoContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  width: 30%;
  height: auto;
  @media (max-width: 550px) {
    width: 65%;
  }
`;
export const HeaderMenuContainer = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const HeaderMenu = styled(Link)`
  font-size: 1.2vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    color: white;
  }
  @media (max-width: 550px) {
    font-size: 2.5vw;
  }
`;

export const MainSubTitle = styled.div`
  width: 100%;
  font-size: 1vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${TwinkleAnimation} 1.5s linear infinite;
  cursor: pointer;
`;
export const MainSubTitleLink = styled(Link)`
  width: 100%;
  font-size: 1vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${TwinkleAnimation} 1.5s linear infinite;
  cursor: pointer;
  @media (max-width: 550px) {
    font-size: 2.5vw;
  }
`;

export const MainSubTitleSpan = styled.div`
  width: 100%;
  font-size: 1vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 550px) {
    font-size: 2.5vw;
  }
`;

export const TextArticle = styled.div`
  width: ${(props) => (props.width ? `${props.width}` : `45%`)};
  height: ${(props) => (props.height ? `${props.height}` : `100%`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: ${(props) => (props.width ? `${props.width}` : `100%`)};
    height: ${(props) => (props.height ? `${props.height}` : `100%`)};
  }
`;
export const TextArticleSpan = styled.span`
  width: 100%;
  height: 100%;
  font-size: 1.2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: ${(props) =>
    props.lineHeight ? `${props.lineHeight}` : `1.6vw`};
  @media (max-width: 550px) {
    font-size: 3vw;
    line-height: ${(props) =>
      props.lineHeight ? `${props.lineHeight}` : `120%`};
    height: 50%;
  }
`;

//Recommendation
export const MainContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.mode === RESULT ? `auto` : `80%`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
  @media (max-width: 550px) {
    height: ${(props) => (props.mode === RESULT ? `auto` : `85%`)};
  }
`;
export const SelectedContainer = styled.div`
  position: absolute;
  width: 15vw;
  height: 50vh;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 550px) {
  }
`;
export const SelectedSpan = styled.span`
  font-size: 1vw;
`;
export const MainTitleContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    height: 20%;
  }
`;
export const MainTitle = styled.div`
  width: 100%;
  font-size: 2vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
  @media (max-width: 550px) {
    font-size: 3.5vw;
  }
`;
export const MainArticleContainer = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? `${props.flexDirection}` : `row`};
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : `space-evenly`};
  align-items: center;
  @media (max-width: 550px) {
    width: ${(props) => (props.mobileWidth ? `${props.mobileWidth}` : `90%`)};
    height: ${(props) =>
      props.mobileHeight ? `${props.mobileHeight}` : `60%`};
  }
`;

export const ButtonContainer = styled.div`
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 550px) {
    width: 40%;
    height: 20%;
  }
`;
export const ButtonBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.8vw 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
  @media (max-width: 550px) {
    padding: 2vw 2vw;
    font-size: 4vw;
  }
`;
export const ButtonBoxLink = styled(NavLink)`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.8vw 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
  @media (max-width: 550px) {
    padding: 2vw 2vw;
    font-size: 4vw;
  }
`;
export const Input = styled.input`
  font-size: 1.6vw;
  width: 30%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  :focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.headerRed};
  }
  @media (max-width: 550px) {
    width: 65%;
    font-size: 5vw;
  }
`;

export const HiddenSearchBox = styled.div`
  width: 30%;
  height: ${(props) => (props.valueLength > 0 ? `50%` : `0`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  @media (max-width: 550px) {
    width: 65%;
  }
`;
export const HiddenSearchLine = styled.div`
  font-size: 1.2vw;
  padding: 1vw 0;
  height: 2vw;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerRed};
  }
  @media (max-width: 550px) {
    font-size: 4vw;
    height: 6vw;
  }
`;
export const MainArticle = styled.div`
  width: 12vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  font-size: 1.4vw;
  font-weight: 600;
  color: black;
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
  @media (max-width: 550px) {
    width: 40vw;
    height: 40vw;
    font-size: 5vw;
  }
`;
export const MainArticleLink = styled(Link)`
  width: 12vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  font-size: 1.4vw;
  font-weight: 600;
  color: black;
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
  @media (max-width: 550px) {
    width: 40vw;
    height: 40vw;
    font-size: 5vw;
  }
`;
export const ResultArticleContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 2vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  @media (max-width: 550px) {
    height: 130vh;
  }
`;
export const ResultTitleContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 550px) {
    height: 20%;
    align-items: center;
  }
`;
export const ResultTitleSpan = styled.div`
  font-size: 2vw;
  margin-bottom: 0.6vw;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 3.5vw;
    margin: 3vw 0;
  }
`;
export const ResultSubTitleSpan = styled.div`
  font-size: 1vw;
  margin: 1vw 0;
  text-align: center;
  strong {
    color: ${(props) => props.theme.headerRed};
  }
  @media (max-width: 550px) {
    font-size: 2vw;
    margin: 2vw 0;
  }
`;

export const ResultMainContainer = styled.div`
  width: 100%;
  height: 90%;
  min-height: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    height: 80%;
    flex-direction: column;
  }
`;

export const ResultSubContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "30%")};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
    height: ${(props) => (props.mobileHeight ? props.mobileHeight : `100%`)};
  }
`;

export const ResultDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const ResultDetailChartContainer = styled.div`
  width: 45%;
  height: 100%;
  display: ${(props) => (props.mobile ? `none` : `flex`)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
    height: 20%;
  }
`;

export const ResultDetailContentContainer = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4vw;
  @media (max-width: 550px) {
    width: 100%;
    height: 60%;
  }
`;
export const ResultTable = styled.div`
  margin-top: 1vw;
  width: 90%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
export const ResultRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  @media (max-width: 550px) {
    font-size: 2vw;
  }
`;
export const ResultCell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
export const ResultDetailSpanContainer = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 2vw;
  font-size: 1.2vw;
`;
export const ResultDetailSpan = styled.div`
  margin-top: 1vw;
  font-size: 1.2vw;
  strong {
    color: ${(props) => props.theme.headerRed};
  }
  @media (max-width: 550px) {
    font-size: 2vw;
  }
`;

export const ResultDetailImgContainer = styled.div`
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
    height: 40%;
  }
`;
export const ResultDetailImg = styled.img`
  @media (max-width: 550px) {
    height: 100%;
  }
`;
export const BarChartSelectContainer = styled.div`
  width: 60%;
  height: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const BarChartSelect = styled.span`
  font-size: 0.9vw;
  cursor: pointer;
  :first-child {
    color: ${(props) =>
      props.isChecked === MONTHRESERV && `${props.theme.headerRed}`};
  }
  :nth-child(2) {
    color: ${(props) =>
      props.isChecked === MONTHPAY && `${props.theme.headerRed}`};
  }
  :last-child {
    color: ${(props) =>
      props.isChecked === RESERV && `${props.theme.headerRed}`};
  }
`;
