import React, { useEffect } from "react";
import styled from "styled-components";
import Wordcloud from "../Wordcloud";

const DetailItem = styled.div`
  width: 100%;
  display: ${(props) =>
    (props.mode === "main") | (props.mode === "Wordcloud") ? `flex` : "none"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitleSpan = styled.span`
  font-size: 1vw;
  margin-top: 0.5vw;
  @media (max-width: 500px) {
    font-size: 4vw;
    padding-top: 10vw;
  }
`;

const Detail = ({ hashtags, mode, setMode, mobile }) => {
  return (
    <>
      <DetailItem
        mode={mode}
        onClick={() => {
          if (mode !== "Wordcloud") {
            setMode("Wordcloud");
          } else {
            setMode("main");
          }
        }}
      >
        <SubTitleSpan>선택된 지역과 관련있는 키워드입니다.</SubTitleSpan>
        <Wordcloud mobile={mobile} hashtags={hashtags} />
      </DetailItem>
    </>
  );
};

export default Detail;
