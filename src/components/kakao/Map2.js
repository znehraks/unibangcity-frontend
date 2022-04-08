import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  answersAtom,
  houseAtom,
  isClickedAtom,
  mobileAtom,
  positionsAtom,
} from "../recoil";
import clickedMarker from "../styles/images/selectedMarker.png";
const { kakao } = window;

const MapContainer = () => {
  const { univ_lat, univ_lon } = useRecoilValue(answersAtom);
  const mobile = useRecoilValue(mobileAtom);
  const isClicked = useRecoilValue(isClickedAtom);
  const setHouse = useSetRecoilState(houseAtom);
  const residencePositions = useRecoilValue(positionsAtom);
  useEffect(() => {
    console.log(univ_lat, univ_lon, residencePositions);
    //지도 넣을 컨테이너
    const container = document.getElementById("myMap2");

    // 지도에 들어가는 옵션
    const options = {
      center: new kakao.maps.LatLng(univ_lat, univ_lon),
      level: 6,
      draggable: true,
      scrollwheel: true,
    };

    //지도 객체 생성
    const map = new kakao.maps.Map(container, options);

    //마커 크기와 옵션
    const imageSize = new kakao.maps.Size(64, 69);
    const imageOption = { offset: new kakao.maps.Point(30, 60) };

    let selectedMarker = null;

    // MakrerImage 객체를 생성하여 반환하는 함수입니다
    function createMarkerImage() {
      // //마커 이미지 생성
      const markerImage = new kakao.maps.MarkerImage(
        clickedMarker,
        imageSize,
        imageOption
      );

      return markerImage;
    }
    const addMarker = (position, i) => {
      let normalImage;
      let overImage = createMarkerImage();

      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, //마커의 위치
      });
      marker.image = normalImage;
      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          marker.setImage(overImage);
          // setIsHovered(data[i]);
        }
      });

      // 마커에 mouseout 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 기본 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          marker.setImage(normalImage);
        }
      });

      // 마커에 click 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 클릭 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!selectedMarker &&
            selectedMarker.setImage(selectedMarker.normalImage);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(overImage);
          setHouse(i);
          if (mobile) {
            window.scrollTo(window.innerHeight + 200, window.innerHeight + 200);
          }
          // setIsClicked(data[i]);
          // window.scrollTo(window.innerHeight, window.innerHeight);
        }

        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        selectedMarker = marker;
      });
    };

    //마커 생성
    const createMarkers = () => {
      for (let i = 0; i < residencePositions.length; i++) {
        // 마커를 생성합니다
        addMarker(residencePositions[i], i);
      }
    };
    createMarkers();
  }, [isClicked, univ_lat, univ_lon, residencePositions]);

  return (
    <div
      id="myMap2"
      style={{
        width: mobile ? "80vw" : "25vw",
        height: mobile ? "80vw" : "25vw",
      }}
    ></div>
  );
};

export default MapContainer;
