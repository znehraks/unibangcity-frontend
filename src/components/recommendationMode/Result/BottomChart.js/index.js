import { useRecoilValue } from "recoil";
import { ALL, BAR, PIE, WORDCLOUD } from "../../../Enum";
import {
  chartmodeAtom,
  currentAddressAtom,
  isClickedAtom,
} from "../../../recoil";
import {
  ResultArticleContainer,
  ResultSubTitleSpan,
  ResultTitleContainer,
  ResultTitleSpan,
} from "../../../styles/StyledComponents";

import ALLChart from "./ALLChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import WordCloudChart from "./WordCloudChart";
const BottomChart = () => {
  const isClicked = useRecoilValue(isClickedAtom);
  const currentAddress = useRecoilValue(currentAddressAtom);
  const chartmode = useRecoilValue(chartmodeAtom);
  return (
    <ResultArticleContainer>
      <ResultTitleContainer>
        <ResultTitleSpan>
          "{isClicked.rank}위 지역(
          {currentAddress ? `${currentAddress}` : ``})" 주변 매물 관련 통계
        </ResultTitleSpan>
        <ResultSubTitleSpan>
          {chartmode === ALL
            ? "차트를 클릭하면 자세한 정보를 볼 수 있습니다."
            : "차트를 클릭하면 이전 화면으로 돌아갈 수 있습니다."}
        </ResultSubTitleSpan>
      </ResultTitleContainer>
      {chartmode === ALL && <ALLChart />}
      {chartmode === BAR && <BarChart />}
      {chartmode === WORDCLOUD && <WordCloudChart />}
      {chartmode === PIE && <PieChart />}
    </ResultArticleContainer>
  );
};
export default BottomChart;
