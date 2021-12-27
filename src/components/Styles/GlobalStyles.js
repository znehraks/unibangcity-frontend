import { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";
import Jalnan from "./fonts/Jalnan.ttf";

const initialAnimation = keyframes`
0%{
  transform: translateY(20%)
}
100%{
  transform: translateY(0)
}
`;
export default createGlobalStyle`
    ${reset};

    @font-face {
        font-family: "Jalnan"; 
        src: url(${Jalnan}) format('truetype');
        font-style: normal;
        font-display: auto;
    }
    *{
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        @media(max-width: ${(props) => props.theme.mobileMaxWidth}){

            img{
            pointer-events: none;
        }
        };
    }
    body{
        background: #eee;
        color: black;
        font-size: 14px;
        font-family: 'Jalnan'
        ;
        ::-webkit-scrollbar{
            display: none;
        }
        -ms-overflow-style: none; 
        min-height: 650px;
        
    }
    a{
        color: #000;
        text-decoration: none;
        :focus{
            outline: none;
        }
    }
    input:focus{
        outline: none;
    }
    button:focus{
        outline: none;
    }
    span,a{
        animation: ${initialAnimation} 0.3s ease-in-out;}
`;
