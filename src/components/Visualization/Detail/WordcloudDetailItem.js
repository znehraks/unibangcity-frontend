import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ALL, WORDCLOUD } from "../../Enum";
import { chartmodeAtom, mobileAtom } from "../../recoil";
import Wordcloud from "../Wordcloud";

const DetailItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Detail = ({ hashtags }) => {
  const mobile = useRecoilValue(mobileAtom);
  console.log(hashtags);
  const [chartmode, setChartmode] = useRecoilState(chartmodeAtom);
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
