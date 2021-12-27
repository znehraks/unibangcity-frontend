import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 3vw;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  @media (max-width: 500px) {
    height: 10vw;
  }
`;

const Span = styled.span`
  font-size: 0.7vw;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Span>Copyright© 2021 All rights reserved by DesignC</Span>
    </Wrapper>
  );
};

export default Footer;
