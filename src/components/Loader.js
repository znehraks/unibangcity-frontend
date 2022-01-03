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
  img {
    animation: ${TwinkleAnimation} 1.3s linear infinite;
  }
`;
const Loader = () => (
  <LoaderComponent>
    <img src={Logo_img} alt="로고"></img>
  </LoaderComponent>
);

export default Loader;
