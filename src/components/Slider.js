import React from "react";
import Slider from "infinite-react-carousel";
import styled from "styled-components";
import "./Slider.css";

const ImageSlider = styled(Slider)`
  width: 60%;
  background: ${(props) => props.theme.bgColor};
  height: 15vw;
`;

const Container = styled.div``;

const Img = styled.img`
  width: 100%;
  height: 15vw;
`;

export default ({ imgs }) => (
  <ImageSlider arrows={false} autoplay={true} autoplaySpeed={3000}>
    <Container>
      <Img src={imgs[0]} />
    </Container>
    <Container>
      <Img src={imgs[1]} />
    </Container>
    <Container>
      <Img src={imgs[2]} />
    </Container>
  </ImageSlider>
);
