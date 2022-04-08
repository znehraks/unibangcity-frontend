import { useRecoilState, useRecoilValue } from "recoil";
import { MONTHPAY, MONTHRESERV, RESERV } from "../../../Enum";
import { chartDataAtom, isCheckedAtom, isClickedAtom } from "../../../recoil";
import {
  BarChartSelect,
  BarChartSelectContainer,
  ResultMainContainer,
  ResultSubContainer,
  ResultSubTitleSpan,
} from "../../../styles/StyledComponents";

import BarComponent from "../../../Visualization/BarRoom";
import PieComponent from "../../../Visualization/PieRoom";
import WordcloudDetailItem from "../../../Visualization/Detail/WordcloudDetailItem";

const ALLChart = () => {
  const isClicked = useRecoilValue(isClickedAtom);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedAtom);
  const chartData = useRecoilValue(chartDataAtom);
  return (
    <ResultMainContainer>
      <ResultSubContainer>
        <ResultSubTitleSpan>
          {isClicked.rank}위 지역과 전체 평균 간{" "}
          <strong>
            {isChecked === MONTHRESERV
              ? "월세 보증금"
              : isChecked === MONTHPAY
              ? "월세"
              : "전세 보증금"}
          </strong>{" "}
          보증금 비교(단위: 만 원)
        </ResultSubTitleSpan>
        <BarChartSelectContainer>
          <BarChartSelect
            isChecked={isChecked}
            onClick={() => setIsChecked(MONTHRESERV)}
          >
            월세 보증금
          </BarChartSelect>
          <BarChartSelect
            isChecked={isChecked}
            onClick={() => setIsChecked(MONTHPAY)}
          >
            월세
          </BarChartSelect>
          <BarChartSelect
            isChecked={isChecked}
            onClick={() => setIsChecked(RESERV)}
          >
            전세
          </BarChartSelect>
        </BarChartSelectContainer>

        <BarComponent clickedMarker={isClicked.rank - 1} />
      </ResultSubContainer>
      <ResultSubContainer>
        <ResultSubTitleSpan>
          {isClicked.rank}위 지역의 핵심 키워드
        </ResultSubTitleSpan>
        <BarChartSelectContainer></BarChartSelectContainer>
        <WordcloudDetailItem
          hashtags={chartData.hashtagsEach[isClicked.rank - 1]}
        />
      </ResultSubContainer>
      <ResultSubContainer>
        <ResultSubTitleSpan>
          {isClicked.rank}위 지역의 매물 종류 분포
        </ResultSubTitleSpan>
        <BarChartSelectContainer></BarChartSelectContainer>
        <PieComponent />
      </ResultSubContainer>
    </ResultMainContainer>
  );
};

export default ALLChart;
