import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PieRoom from "../PieRoom";
import Map2 from "../../Kakao/Map2";
const { kakao } = window;

const DetailItem = styled.div`
  width: 100%;
  padding-top: 5vw;
  display: ${(props) =>
    (props.mode === "main") | (props.mode === "Pie") ? `flex` : "none"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitleSpan = styled.span`
  font-size: 0.9vw;
  margin-top: 0.5vw;
  @media (max-width: 500px) {
    font-size: 4vw;
    margin-bottom: 3vw;
    padding: 0 10vw;
  }
`;

const DetailBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: auto;
  height: 26vw;
  @media (max-width: 500px) {
    height: 40vw;
  }
`;

const Span = styled.span`
  font-size: 1.5vw;
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;

const Detail = ({ mobile, house, setHouse, isClicked, mode, setMode }) => {
  if (isClicked && house) {
    console.log(isClicked.rooms_desc[house]);
  }
  //매물 별로 지도에 다르게 뿌려주기
  const [positions, setPositions] = useState();
  console.log(house);
  useEffect(() => {
    console.log(isClicked.rooms_location_lat);
    if (isClicked) {
      let temp = [];
      for (let i = 0; i < isClicked.rooms_location_lat.length; i++) {
        temp.push({
          latlng: new kakao.maps.LatLng(
            isClicked.rooms_location_lat[i],
            isClicked.rooms_location_lon[i]
          ),
        });
      }
      setPositions(temp);
    }
  }, [isClicked]);
  return (
    <>
      <DetailItem
        mode={mode}
        onClick={() => {
          if (mode !== "Pie") {
            setMode("Pie");
          } else {
            setMode("main");
            setHouse();
          }
        }}
      >
        <SubTitleSpan>
          {house
            ? "선택된 매물의 상세정보 입니다."
            : "선택된 지역의 매물 분포입니다."}
        </SubTitleSpan>
        {house ? (
          <DetailBox>
            <Img src={isClicked.rooms_img_url_01[house]} />
            <Span>{isClicked.rooms_desc[house]}</Span>
            <Span>{isClicked.rooms_desc2[house]}</Span>
            <Span>{isClicked.rooms_price_title[house]}</Span>
          </DetailBox>
        ) : (
          <PieRoom mode={mode} isClicked={isClicked} />
        )}
      </DetailItem>
      {mode === "Pie" && (
        <DetailItem mode={mode}>
          <SubTitleSpan>
            마커를 클릭하시면 해당 매물의 상세 정보를 볼 수 있습니다.
          </SubTitleSpan>

          {positions && (
            <Map2
              mobile={mobile}
              setHouse={setHouse}
              isClicked={isClicked}
              univ_lat={isClicked.lat}
              univ_lon={isClicked.lon}
              residencePositions={positions}
            />
          )}
        </DetailItem>
      )}
    </>
  );
};

export default Detail;
