import { useRecoilValue } from "recoil";
import { isCheckedAtom } from "../../../recoil";
import {
  BarChartSelectContainer,
  ResultDetailChartContainer,
  ResultDetailContainer,
  ResultSubTitleSpan,
} from "../../../styles/StyledComponents";
import WordcloudDetailItem from "../../../Visualization/Detail/WordcloudDetailItem";
const WordCloudChart = () => {
  const isClicked = useRecoilValue(isCheckedAtom);
  return (
    <ResultDetailContainer>
      <ResultDetailChartContainer>
        <ResultSubTitleSpan>
          {isClicked.rank}위 지역의 핵심 키워드
        </ResultSubTitleSpan>
        <BarChartSelectContainer></BarChartSelectContainer>
        <WordcloudDetailItem />
      </ResultDetailChartContainer>
    </ResultDetailContainer>
  );
};
export default WordCloudChart;
