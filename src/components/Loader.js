import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "./Styles/images/logo_black.png";

const Animation = keyframes`
    0% {
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${Animation} 1.3s linear infinite;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 999;
`;

const Img = styled.img`
  width: ${(props) => (props.mobile ? `40vw` : `20vw`)};
`;
const Span = styled.span`
  margin-top: 4vw;
  font-size: 1.5vw;
`;
export default () => (
  <Loader>
    <Img mobile={window.innerWidth <= 500} src={logo} />
    <Span>결과가 오랫동안 나오지 않으면 새로고침을 해주세요.</Span>
  </Loader>
);
