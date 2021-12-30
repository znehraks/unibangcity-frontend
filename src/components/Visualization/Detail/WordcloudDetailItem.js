import React from "react";
import styled from "styled-components";
import { ALL, WORDCLOUD } from "../../Enum";
import Wordcloud from "../Wordcloud";

const DetailItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Detail = ({ hashtags, chartmode, setChartmode, mobile }) => {
  console.log(hashtags);
  return (
    <>
      <DetailItem
        chartmode={chartmode}
        onClick={() => {
          setChartmode(chartmode === WORDCLOUD ? ALL : WORDCLOUD);
        }}
      >
        <Wordcloud chartmode={chartmode} mobile={mobile} hashtags={hashtags} />
      </DetailItem>
    </>
  );
};

export default Detail;
