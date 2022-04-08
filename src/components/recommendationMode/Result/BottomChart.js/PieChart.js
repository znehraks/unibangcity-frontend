import { useRecoilState, useRecoilValue } from "recoil";

import { houseAtom, isClickedAtom, positionsAtom } from "../../../recoil";
import {
  ResultDetailChartContainer,
  ResultDetailContainer,
  ResultDetailContentContainer,
  ResultDetailImg,
  ResultDetailImgContainer,
  ResultDetailSpan,
  ResultSubTitleSpan,
} from "../../../styles/StyledComponents";

import Map2 from "../../../kakao/Map2";
import PieComponent from "../../../Visualization/PieRoom";
const PieChart = () => {
  const isClicked = useRecoilValue(isClickedAtom);
  const [house, setHouse] = useRecoilState(houseAtom);
  const positions = useRecoilValue(positionsAtom);
  return (
    <ResultDetailContainer>
      {house ? (
        <ResultDetailChartContainer>
          <ResultSubTitleSpan>선택된 매물 정보</ResultSubTitleSpan>
          <ResultDetailImgContainer>
            <ResultDetailImg
              onClick={() => setHouse()}
              src={isClicked.rooms_img_url_01[house]}
              alt="매물 사진"
            />
          </ResultDetailImgContainer>
          <ResultDetailSpan>{isClicked.rooms_desc[house]}</ResultDetailSpan>
          <ResultDetailSpan>{isClicked.rooms_desc2[house]}</ResultDetailSpan>
          <ResultDetailSpan>
            {isClicked.rooms_price_title[house]}
          </ResultDetailSpan>
        </ResultDetailChartContainer>
      ) : (
        <ResultDetailChartContainer>
          <ResultSubTitleSpan>
            {isClicked.rank}위 지역의 매물 종류 분포
          </ResultSubTitleSpan>
          <PieComponent />
        </ResultDetailChartContainer>
      )}
      <ResultDetailContentContainer>
        {positions.length !== 0 && (
          <>
            <ResultSubTitleSpan>
              {isClicked.rank}위 지역의 매물 분포도
            </ResultSubTitleSpan>
            <Map2 />
          </>
        )}
      </ResultDetailContentContainer>
    </ResultDetailContainer>
  );
};
export default PieChart;
