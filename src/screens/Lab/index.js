import React, { useState } from "react";
import { LOGIN, SIGNUP } from "../../components/Enum";
import {
  MainContainer,
  MainSubTitle,
  MainTitle,
  MainTitleContainer,
} from "../../components/styles/StyledComponents";

const Lab = () => {
  const [mode, setMode] = useState(LOGIN);
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainTitle>실험실에 오신걸 환영해요.</MainTitle>
        <MainSubTitle
          onClick={() => {
            setMode(mode === LOGIN ? SIGNUP : LOGIN);
          }}
        >
          실험실 속 컨텐츠는 변화무쌍합니다.
        </MainSubTitle>
      </MainTitleContainer>
    </MainContainer>
  );
};

export default Lab;
