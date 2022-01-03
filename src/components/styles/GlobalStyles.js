import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Jalnan from "./fonts/Jalnan.ttf";

const GlobalStyle = createGlobalStyle`
    ${reset};
    @font-face {
        font-family: "Jalnan"; 
        src: url(${Jalnan}) format('truetype');
        font-style: normal;
        font-display: auto;
    }
    *{
        box-sizing: border-box;
        margin: 0;
        a{
            text-decoration: none;
            color: black;
            :visited{
                color: black;
            }
        }
    }
    body{
        font-family: 'Jalnan';
    }
`;
export default GlobalStyle;
