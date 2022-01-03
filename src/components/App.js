import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import RouterComponent from "./RouterComponent";
import GlobalStyle from "./styles/GlobalStyles";
import Theme from "./styles/Theme";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
`;
const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Wrapper>
        <BrowserRouter>
          <Header />
          <RouterComponent />
          <Footer />
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
