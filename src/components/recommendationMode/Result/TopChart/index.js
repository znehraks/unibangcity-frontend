import {
  ResultArticleContainer,
  ResultMainContainer,
  ResultSubContainer,
  ResultSubTitleSpan,
  ResultTitleContainer,
  ResultTitleSpan,
} from "../../../styles/StyledComponents";

import Map from "../../../kakao/Map";
import { useRecoilValue } from "recoil";
import { aggregatedAtom, answersAtom, dataAtom } from "../../../recoil";
import RadarArticle from "../../../Visualization/RadarArticle";
const TopChart = () => {
  const answers = useRecoilValue(answersAtom);
  const data = useRecoilValue(dataAtom);
  const aggregated = useRecoilValue(aggregatedAtom);
  return (
    <ResultArticleContainer>
      <ResultTitleContainer>
        <ResultTitleSpan>
          "{answers.Q1Answer}" 주변 추천 자취지역 Top5
        </ResultTitleSpan>
        <ResultSubTitleSpan>
          마커에 마우스(손가락)를(을) 올리시면 해당 지역과 평균을 비교할 수
          있습니다.
        </ResultSubTitleSpan>
      </ResultTitleContainer>
      <ResultMainContainer>
        <ResultSubContainer mobileHeight={"50%"}>
          <ResultSubTitleSpan>
            마커를 클릭하면 해당 지역의 상세정보를 확인할 수 있습니다.
          </ResultSubTitleSpan>
          {data.length !== 0 && <Map />}
        </ResultSubContainer>
        <ResultSubContainer width={"40%"} mobileHeight={"30%"}>
          <ResultSubTitleSpan>
            선택된 지역과 5개 지역 평균의 차이입니다.
          </ResultSubTitleSpan>
          {aggregated.length !== 0 && <RadarArticle />}
        </ResultSubContainer>
      </ResultMainContainer>
    </ResultArticleContainer>
  );
};

export default TopChart;
