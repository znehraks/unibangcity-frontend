import styled from "styled-components";
const FooterWrapper = styled.div`
  width: 100%;
  height: 10%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return <FooterWrapper>made by DesignC</FooterWrapper>;
};

export default Footer;
