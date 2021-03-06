import React, { useEffect, useState } from "react";
import ReactWordCloud from "react-wordcloud";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { chartDataAtom, isClickedAtom, mobileAtom } from "../recoil";

const Wrapper = styled.div`
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    height: 60vw;
  }
`;
const Wordcloud = () => {
  const chartData = useRecoilValue(chartDataAtom);
  const isClicked = useRecoilValue(isClickedAtom);
  const hashtags = chartData.hashtagsEach[isClicked.rank - 1];
  const mobile = useRecoilValue(mobileAtom);
  const [hashtagsDict, setHashtagsDict] = useState([]);
  const hashCount = () => {
    const count = {};
    for (let i = 0; i < hashtags.length; i++) {
      if (count[hashtags[i].trim()]) {
        count[hashtags[i].trim()] += 1;
      } else {
        count[hashtags[i].trim()] = 1;
      }
    }
    const wordcloudCount = [];
    for (let i = 0; i < Object.keys(count).length; i++) {
      let temp = {};
      temp["text"] = Object.keys(count)[i];
      temp["value"] = Object.values(count)[i];
      wordcloudCount.push(temp);
    }
    console.log(wordcloudCount);
    setHashtagsDict(wordcloudCount);
  };
  useEffect(() => {
    hashCount();
  }, []);
  const options = {
    rotations: 2,
    rotationAngles: [0, 0],
  };
  const minSize = [500, 1000];
  return (
    <Wrapper>
      <ReactWordCloud
        deterministic={true}
        fontWeight={"bold"}
        minSize={minSize}
        rotationAngles={[0, 0]}
        rotations={0}
        options={options}
        words={hashtagsDict}
        width={mobile && "100vw"}
      />
    </Wrapper>
  );
};

export default Wordcloud;
