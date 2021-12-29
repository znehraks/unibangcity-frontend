import React from "react";
import styled from "styled-components";
import StarChart02 from "./StarChart02";

const Wrapper = styled.div`
  width: 80%;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
    height: 50vh;
  }
`;
const TitleSpan = styled.span`
  font-size: 2vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
`;
const RadarArticle = ({ isHovered, data, isClicked, mobile }) => {
  console.log(isHovered);
  console.log(data);
  console.log(isClicked);
  return (
    <>
      {(isHovered || isClicked) && data ? (
        <Wrapper>
          <StarChart02
            mobile={mobile}
            data={data}
            isHovered={isHovered}
            isClicked={isClicked}
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <TitleSpan>마커를 선택해주세요.</TitleSpan>
        </Wrapper>
      )}
    </>
  );
};

export default RadarArticle;
