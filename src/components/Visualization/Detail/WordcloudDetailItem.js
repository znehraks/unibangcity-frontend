import React from "react";
import styled from "styled-components";
import { ALL, WORDCLOUD } from "../../Enum";
import Wordcloud from "../Wordcloud";

const DetailItem = styled.div`
  width: 60%;
  display: ${(props) =>
    (props.chartmode === ALL) | (props.chartmode === WORDCLOUD)
      ? `flex`
      : "none"};
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

const Detail = ({ hashtags, chartmode, setChartmode, mobile }) => {
  console.log(hashtags);
  return (
    <>
      <DetailItem
        chartmode={chartmode}
        onClick={() => {
          if (chartmode !== WORDCLOUD) {
            setChartmode(WORDCLOUD);
          } else {
            setChartmode(ALL);
          }
        }}
      >
        <Wordcloud mobile={mobile} hashtags={hashtags} />
      </DetailItem>
    </>
  );
};

export default Detail;
