import React from "react";
import styled, { keyframes } from "styled-components";
import Arrow from "./Styles/images/arrow_v.png";

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
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${Animation} 1s linear infinite;
  text-align: center;
  cursor: pointer;
`;
const Img = styled.img`
  bottom: ${(props) => (props.bottom ? `-15wv` : `-20vw`)};
  left: ${(props) => (props.left ? `${props.left}` : ``)};
  width: 8vw;
  position: absolute;
  @media (max-width: 500px) {
    bottom: -40vw;
    width: 20vw;
  }
`;

export default ({ height, bottom, left }) => (
  <Loader
    bottom={bottom}
    onClick={() => {
      window.scrollTo(
        height ? `${height}` : `window.innerHeight`,
        height ? `${height}` : `window.innerHeight`
      );
    }}
  >
    <Img left={left} src={Arrow} />
  </Loader>
);
