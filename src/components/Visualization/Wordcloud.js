import React, { useEffect, useState } from "react";
import ReactWordCloud from "react-wordcloud";
import styled from "styled-components";
import { Resizable } from "re-resizable";

const Wrapper = styled.div`
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wordcloud = ({ hashtags, mobile }) => {
  const [hashtagsDict, setHashtagsDict] = useState([]);
  useEffect(() => {
    let temp = [];
    let count = 0;
    for (let i = 0; i < hashtags.length; i++) {
      let dict = {};
      if (
        i === 0 ||
        hashtags[i] !== hashtags[i - 1] ||
        (i === hashtags.length - 1 && hashtags[i] === hashtags[i - 1])
      ) {
        count++;
        dict["text"] = hashtags[i].trim();
        dict["value"] = count;
        temp.push(dict);
        count = 0;
      } else if (i === hashtags.length - 1 && hashtags[i] !== hashtags[i - 1]) {
        count++;
        dict["text"] = hashtags[i].trim();
        dict["value"] = count;
        temp.push(dict);
        count = 0;
      } else {
        count++;
      }
    }
    console.log(temp);
    setHashtagsDict(temp);
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
