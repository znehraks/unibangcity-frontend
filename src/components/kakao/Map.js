import React, { useEffect } from "react";
import first from "../styles/images/1st.png";
import second from "../styles/images/2nd.png";
import third from "../styles/images/3rd.png";
import fourth from "../styles/images/4th.png";
import fifth from "../styles/images/5th.png";
import first_h from "../styles/images/1st_hover.png";
import second_h from "../styles/images/2nd_hover.png";
import third_h from "../styles/images/3rd_hover.png";
import fourth_h from "../styles/images/4th_hover.png";
import fifth_h from "../styles/images/5th_hover.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  answersAtom,
  currentAddressAtom,
  dataAtom,
  houseAtom,
  isClickedAtom,
  isHoveredAtom,
  mobileAtom,
} from "../recoil";
const { kakao } = window;

const MapContainer = () => {
  const { univ_lat, univ_lon } = useRecoilValue(answersAtom);
  const mobile = useRecoilValue(mobileAtom);
  const setHouse = useSetRecoilState(houseAtom);
  const data = useRecoilValue(dataAtom);
  const setIsClicked = useSetRecoilState(isClickedAtom);
  const setIsHovered = useSetRecoilState(isHoveredAtom);
  const setCurrentAddress = useSetRecoilState(currentAddressAtom);
  useEffect(() => {
    //지도 넣을 컨테이너
    const container = document.getElementById("myMap1");

    // 지도에 들어가는 옵션
    const options = {
      center: new kakao.maps.LatLng(univ_lat, univ_lon),
      level: mobile ? 6 : 5,
      draggable: true,
      scrollwheel: true,
    };

    //지도 객체 생성
    const map = new kakao.maps.Map(container, options);

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    //마커 크기와 옵션
    const imageSize = mobile
      ? new kakao.maps.Size(25, 30)
      : new kakao.maps.Size(50, 60);
    const imageOption = {
      offset: mobile
        ? new kakao.maps.Point(15, 30)
        : new kakao.maps.Point(30, 60),
    };

    //마커 정보 담은 객체 생성
    let residencePositions = [];
    for (let i = 0; i < data.length; i++) {
      let tempObj = {};
      tempObj["latlng"] = new kakao.maps.LatLng(data[i].lat, data[i].lon);
      residencePositions.push(tempObj);
    }
    var selectedMarker = null;

    let markers = [first, second, third, fourth, fifth];
    let hoverMarkers = [first_h, second_h, third_h, fourth_h, fifth_h];
    function createMarkerImage(i) {
      // //마커 이미지 생성
      const firstMarkerImage = new kakao.maps.MarkerImage(
        markers[i],
        imageSize,
        imageOption
      );
      return firstMarkerImage;
    }
    // MakrerImage 객체를 생성하여 반환하는 함수입니다
    function createMarkerOverImage(i) {
      // //마커 이미지 생성
      const markerImage = new kakao.maps.MarkerImage(
        hoverMarkers[i],
        imageSize,
        imageOption
      );

      return markerImage;
    }
    const addMarker = (position, i) => {
      var normalImage = createMarkerImage(i);
      var overImage = createMarkerOverImage(i);

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, //마커의 위치
        image: normalImage,
      });

      marker.normalImage = normalImage;
      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
          marker.setImage(overImage);
          setIsHovered(data[i]);
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

          searchDetailAddrFromCoords(position.latlng, (res, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setCurrentAddress(
                `${res[0].address.region_1depth_name} ${res[0].address.region_2depth_name} ${res[0].address.region_3depth_name}`
              );
            }
          });
          marker.setImage(overImage);
          setIsClicked(data[i]);
          setHouse();
          window.scrollTo(
            mobile ? window.innerHeight * 0.5 : window.innerHeight * 0.9,
            mobile ? window.innerHeight * 0.5 : window.innerHeight * 0.9
          );
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
    // var marker = new kakao.maps.Marker({
    //   map: map, // 마커를 표시할 지도
    //   position: residencePositions[i].latlng,
    //   image: residencePositions[i].image, // 마커의 위치
    // });

    // const marker01 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(data[0].lat, data[0].lon),
    // });
    // const marker02 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(data[1].lat, data[1].lon),
    // });
    // const marker03 = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(data[2].lat, data[2].lon),
    // });
  }, []);

  return (
    <div
      id="myMap1"
      style={{
        width: mobile ? "80vw" : "30vw",
        height: mobile ? "80vw" : "30vw",
      }}
    ></div>
  );
};

export default MapContainer;
