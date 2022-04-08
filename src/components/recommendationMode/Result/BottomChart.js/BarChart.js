import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ALL, MONTHPAY, MONTHRESERV, RESERV } from "../../../Enum";
import {
  chartDataAtom,
  chartmodeAtom,
  isCheckedAtom,
  isClickedAtom,
} from "../../../recoil";
import {
  BarChartSelect,
  BarChartSelectContainer,
  ResultCell,
  ResultDetailChartContainer,
  ResultDetailContainer,
  ResultDetailContentContainer,
  ResultDetailSpan,
  ResultDetailSpanContainer,
  ResultRow,
  ResultSubTitleSpan,
  ResultTable,
} from "../../../styles/StyledComponents";
import { unitTransformer } from "../../../utils";

import BarComponent from "../../../Visualization/BarRoom";
const BarChart = () => {
  const isClicked = useRecoilValue(isClickedAtom);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedAtom);
  const setChartmode = useSetRecoilState(chartmodeAtom);
  const chartData = useRecoilValue(chartDataAtom);
  return (
    <ResultDetailContainer>
      <ResultDetailChartContainer>
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
      </ResultDetailChartContainer>
      <ResultDetailContentContainer>
        {isClicked.rank}위 지역의 통계
        <ResultTable onClick={() => setChartmode(ALL)}>
          <ResultRow>
            <ResultCell></ResultCell>
            <ResultCell>최고가</ResultCell>
            <ResultCell>최저가</ResultCell>
            <ResultCell>평균가</ResultCell>
            <ResultCell>매물 수</ResultCell>
          </ResultRow>
          <ResultRow>
            <ResultCell>월세 보증금</ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyDepositEachAggregated.max[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyDepositEachAggregated.min[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyDepositEachAggregated.avg[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {chartData.monthlyDepositEachAggregated.count[isClicked.rank - 1]}
              개
            </ResultCell>
          </ResultRow>
          <ResultRow>
            <ResultCell>월세</ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyPayEachAggregated.max[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyPayEachAggregated.min[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.monthlyPayEachAggregated.avg[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>''</ResultCell>
          </ResultRow>
          <ResultRow>
            <ResultCell>전세 보증금</ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.reservDepositEachAggregated.max[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.reservDepositEachAggregated.min[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {unitTransformer(
                chartData.reservDepositEachAggregated.avg[isClicked.rank - 1]
              )}
            </ResultCell>
            <ResultCell>
              {chartData.reservDepositEachAggregated.count[isClicked.rank - 1]}
              개
            </ResultCell>
          </ResultRow>
        </ResultTable>
        <ResultDetailSpanContainer>
          <ResultDetailSpan>
            {isClicked.rank}위 지역은 <strong>월세 보증금</strong>이 평균에 비해{" "}
            <strong>
              {Math.abs(
                chartData.monthlyDepositEachAggregated.avg[isClicked.rank - 1] -
                  chartData.monthlyDepositTotalAggregated.avg
              )}
              만 원{" "}
            </strong>
            {chartData.monthlyDepositEachAggregated.avg[isClicked.rank - 1] -
              chartData.monthlyDepositTotalAggregated.avg >=
            0
              ? "비싸네요."
              : "싸네요."}
          </ResultDetailSpan>
          <ResultDetailSpan>
            {isClicked.rank}위 지역은 <strong>월세</strong>가 평균에 비해{" "}
            <strong>
              {Math.abs(
                chartData.monthlyPayEachAggregated.avg[isClicked.rank - 1] -
                  chartData.monthlyPayTotalAggregated.avg
              )}
              만 원{" "}
            </strong>
            {chartData.monthlyPayEachAggregated.avg[isClicked.rank - 1] -
              chartData.monthlyPayTotalAggregated.avg >=
            0
              ? "비싸네요."
              : "싸네요."}
          </ResultDetailSpan>
          <ResultDetailSpan>
            {isClicked.rank}위 지역은 <strong>전세 보증금</strong>이 평균에 비해{" "}
            <strong>
              {Math.abs(
                chartData.reservDepositEachAggregated.avg[isClicked.rank - 1] -
                  chartData.reservDepositTotalAggregated.avg
              )}
              만 원{" "}
            </strong>
            {chartData.reservDepositEachAggregated.avg[isClicked.rank - 1] -
              chartData.reservDepositTotalAggregated.avg >=
            0
              ? "비싸네요."
              : "싸네요."}
          </ResultDetailSpan>
          <ResultDetailSpan>
            그리고,{" "}
            <strong>
              {chartData.reservDepositEachAggregated.count[isClicked.rank - 1] +
                chartData.monthlyDepositEachAggregated.count[
                  isClicked.rank - 1
                ]}
              개의 전세/월세 매물
            </strong>
            이 있군요.
          </ResultDetailSpan>
        </ResultDetailSpanContainer>
      </ResultDetailContentContainer>
    </ResultDetailContainer>
  );
};

export default BarChart;
