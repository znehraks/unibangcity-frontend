import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  transform: ${({ open }) => (open ? "translateX(80vw)" : "translateX(130vw)")};
  width: 30vw;
  height: 100vh;
  text-align: left;
  position: absolute;
  top: -8vh;
  left: -3vw;
  transition: transform 0.8s ease-in-out;
  /* @media (max-height: 800px) {
    transform: translateY(-1000000%);
    transition: transform 0.01s ease-in-out;
  } */
  a {
    text-transform: uppercase;
    padding: 1vw 1.5vw;
    font-weight: 500;
    letter-spacing: 0.5vw;
    color: ${(props) => props.theme.pointColor};
    text-decoration: none;
    transition: color 0.3s linear;
    &:hover {
      color: "#343078";
    }
  }
  @media (max-width: 500px) {
    width: 50vw;
    left: -25vw;
  }
`;
