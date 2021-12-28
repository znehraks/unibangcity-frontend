import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const TwinkleAnimation = keyframes`
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
`;

export const TextArticle = styled.div`
  width: ${(props) => (props.width ? `${props.width}` : `45%`)};
  height: ${(props) => (props.height ? `${props.height}` : `100%`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    line-height: ${(props) =>
      props.lineHeight ? `${props.lineHeight}` : `1.6vw`};
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
`;
