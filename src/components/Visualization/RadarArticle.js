import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { aggregatedAtom, isClickedAtom, isHoveredAtom } from "../recoil";
import StarChart02 from "./RadarChart";

const Wrapper = styled.div`
  width: 80%;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
    height: 40vh;
    margin-bottom: 5vw;
  }
`;
const TitleSpan = styled.span`
  font-size: 2vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
`;
const RadarArticle = () => {
  const isHovered = useRecoilValue(isHoveredAtom);
  const aggregated = useRecoilValue(aggregatedAtom);
  const isClicked = useRecoilValue(isClickedAtom);
  return (
    <>
      {(isHovered.rank !== 0 || isClicked !== 0) && aggregated.length !== 0 ? (
        <Wrapper>
          <StarChart02 />
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
