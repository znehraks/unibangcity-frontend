import React from "react";
import styled from "styled-components";

import Logo_img from "../components/styles/images/logo.png";
import { TwinkleAnimation } from "./styles/StyledComponents";
export const LoaderComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 99vw;
  height: 80vh;
  text-align: center;
  z-index: 999;
  color: ${(props) => props.theme.headerRed};
  span {
    margin-top: 1vw;
    font-size: 1.2vw;
    animation: ${TwinkleAnimation} 1.3s linear infinite;
  }
  img {
    animation: ${TwinkleAnimation} 1.3s linear infinite;
  }
  @media (max-width: 550px) {
    font-size: 3vw;
    img {
      width: 30vw;
      animation: ${TwinkleAnimation} 1.3s linear infinite;
    }
  }
`;
const Loader = () => (
  <LoaderComponent>
    <img src={Logo_img} alt="로고"></img>
    <span>잠시만 기다려주세요...</span>
    <span>유니방시티가 열심히 자취방을 찾고있습니다.</span>
  </LoaderComponent>
);

export default Loader;
