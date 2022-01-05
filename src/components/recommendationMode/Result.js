import Loader from "../Loader";
import {
  BarChartSelect,
  BarChartSelectContainer,
  ResultArticleContainer,
  ResultCell,
  ResultDetailChartContainer,
  ResultDetailContainer,
  ResultDetailContentContainer,
  ResultDetailImg,
  ResultDetailImgContainer,
  ResultDetailSpan,
  ResultDetailSpanContainer,
  ResultMainContainer,
  ResultRow,
  ResultSubContainer,
  ResultSubTitleSpan,
  ResultTable,
  ResultTitleContainer,
  ResultTitleSpan,
} from "../styles/StyledComponents";
import Map from "../kakao/Map";
import Map2 from "../kakao/Map2";
import RadarArticle from "../Visualization/RadarArticle";
import BarComponent from "../Visualization/BarRoom";
import PieComponent from "../Visualization/PieRoom";
import WordcloudDetailItem from "../Visualization/Detail/WordcloudDetailItem";
import {
  ALL,
  BAR,
  MONTHPAY,
  MONTHRESERV,
  PIE,
  RESERV,
  WORDCLOUD,
} from "../Enum";
import PropTypes from "prop-types";
const Result = ({
  answers,
  data,
  house,
  setHouse,
  setCurrentAddress,
  setIsHovered,
  setIsClicked,
  aggregated,
  isHovered,
  isClicked,
  isChecked,
  chartData,
  currentAddress,
  chartmode,
  setChartmode,
  setIsChecked,
  unitTransformer,
  positions,
}) => {
  return (
    <>
      {data.length === 0 ? (
        <Loader />
      ) : (
        <>
          <ResultArticleContainer>
            <ResultTitleContainer>
              <ResultTitleSpan>
                "{answers.Q1Answer}" 주변 추천 자취지역 Top5
              </ResultTitleSpan>
              <ResultSubTitleSpan>
                마커에 마우스(손가락)를(을) 올리시면 해당 지역과 평균을 비교할
                수 있습니다.
              </ResultSubTitleSpan>
            </ResultTitleContainer>
            <ResultMainContainer>
              <ResultSubContainer mobileHeight={"50%"}>
                <ResultSubTitleSpan>
                  마커를 클릭하면 해당 지역의 상세정보를 확인할 수 있습니다.
                </ResultSubTitleSpan>
                {data.length !== 0 && (
                  <Map
                    mobile={window.innerWidth <= 550}
                    setHouse={setHouse}
                    setCurrentAddress={setCurrentAddress}
                    setIsHovered={setIsHovered}
                    setIsClicked={setIsClicked}
                    data={data}
                    univ_lat={answers.univ_lat}
                    univ_lon={answers.univ_lon}
                  />
                )}
              </ResultSubContainer>
              <ResultSubContainer width={"40%"} mobileHeight={"30%"}>
                <ResultSubTitleSpan>
                  선택된 지역과 5개 지역 평균의 차이입니다.
                </ResultSubTitleSpan>
                {aggregated.length !== 0 && (
                  <RadarArticle
                    mobile={window.innerWidth <= 550}
                    data={aggregated}
                    isHovered={isHovered}
                    isClicked={isClicked}
                  />
                )}
              </ResultSubContainer>
            </ResultMainContainer>
          </ResultArticleContainer>
          {isClicked && chartData.hashtagsTotal.length !== 0 && (
            <ResultArticleContainer>
              <ResultTitleContainer>
                <ResultTitleSpan>
                  "{isClicked.rank}위 지역(
                  {currentAddress ? `${currentAddress}` : ``})" 주변 매물 관련
                  통계
                </ResultTitleSpan>
                <ResultSubTitleSpan>
                  {chartmode === ALL
                    ? "차트를 클릭하면 자세한 정보를 볼 수 있습니다."
                    : "차트를 클릭하면 이전 화면으로 돌아갈 수 있습니다."}
                </ResultSubTitleSpan>
              </ResultTitleContainer>
              {chartmode === ALL && (
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

                    <BarComponent
                      isChecked={isChecked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                      monthlyDepositEachAggregated={
                        chartData.monthlyDepositEachAggregated
                      }
                      monthlyPayEachAggregated={
                        chartData.monthlyPayEachAggregated
                      }
                      reservDepositEachAggregated={
                        chartData.reservDepositEachAggregated
                      }
                      monthlyDepositTotalAggregated={
                        chartData.monthlyDepositTotalAggregated
                      }
                      monthlyPayTotalAggregated={
                        chartData.monthlyPayTotalAggregated
                      }
                      reservDepositTotalAggregated={
                        chartData.reservDepositTotalAggregated
                      }
                      clickedMarker={isClicked.rank - 1}
                    />
                  </ResultSubContainer>
                  <ResultSubContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 핵심 키워드
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <WordcloudDetailItem
                      mobile={window.innerWidth <= 500}
                      hashtags={chartData.hashtagsEach[isClicked.rank - 1]}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultSubContainer>
                  <ResultSubContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 매물 종류 분포
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <PieComponent
                      isClicked={isClicked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultSubContainer>
                </ResultMainContainer>
              )}
              {chartmode === BAR && (
                <ResultDetailContainer>
                  <ResultDetailChartContainer mobile={window.innerWidth <= 550}>
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
                    <BarComponent
                      isChecked={isChecked}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                      monthlyDepositEachAggregated={
                        chartData.monthlyDepositEachAggregated
                      }
                      monthlyPayEachAggregated={
                        chartData.monthlyPayEachAggregated
                      }
                      reservDepositEachAggregated={
                        chartData.reservDepositEachAggregated
                      }
                      monthlyDepositTotalAggregated={
                        chartData.monthlyDepositTotalAggregated
                      }
                      monthlyPayTotalAggregated={
                        chartData.monthlyPayTotalAggregated
                      }
                      reservDepositTotalAggregated={
                        chartData.reservDepositTotalAggregated
                      }
                      clickedMarker={isClicked.rank - 1}
                    />
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
                            chartData.monthlyDepositEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyDepositEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {
                            chartData.monthlyDepositEachAggregated.count[
                              isClicked.rank - 1
                            ]
                          }
                          개
                        </ResultCell>
                      </ResultRow>
                      <ResultRow>
                        <ResultCell>월세</ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.monthlyPayEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>''</ResultCell>
                      </ResultRow>
                      <ResultRow>
                        <ResultCell>전세 보증금</ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.max[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.min[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {unitTransformer(
                            chartData.reservDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ]
                          )}
                        </ResultCell>
                        <ResultCell>
                          {
                            chartData.reservDepositEachAggregated.count[
                              isClicked.rank - 1
                            ]
                          }
                          개
                        </ResultCell>
                      </ResultRow>
                    </ResultTable>
                    <ResultDetailSpanContainer>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>월세 보증금</strong>이
                        평균에 비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.monthlyDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.monthlyDepositTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.monthlyDepositEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.monthlyDepositTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>월세</strong>가 평균에
                        비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.monthlyPayEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.monthlyPayTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.monthlyPayEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.monthlyPayTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rank}위 지역은 <strong>전세 보증금</strong>이
                        평균에 비해{" "}
                        <strong>
                          {Math.abs(
                            chartData.reservDepositEachAggregated.avg[
                              isClicked.rank - 1
                            ] - chartData.reservDepositTotalAggregated.avg
                          )}
                          만 원{" "}
                        </strong>
                        {chartData.reservDepositEachAggregated.avg[
                          isClicked.rank - 1
                        ] -
                          chartData.reservDepositTotalAggregated.avg >=
                        0
                          ? "비싸네요."
                          : "싸네요."}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        그리고,{" "}
                        <strong>
                          {chartData.reservDepositEachAggregated.count[
                            isClicked.rank - 1
                          ] +
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
              )}
              {chartmode === WORDCLOUD && (
                <ResultDetailContainer>
                  <ResultDetailChartContainer>
                    <ResultSubTitleSpan>
                      {isClicked.rank}위 지역의 핵심 키워드
                    </ResultSubTitleSpan>
                    <BarChartSelectContainer></BarChartSelectContainer>
                    <WordcloudDetailItem
                      mobile={window.innerWidth <= 500}
                      hashtags={chartData.hashtagsEach[isClicked.rank - 1]}
                      chartmode={chartmode}
                      setChartmode={setChartmode}
                    />
                  </ResultDetailChartContainer>
                </ResultDetailContainer>
              )}
              {chartmode === PIE && (
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
                      <ResultDetailSpan>
                        {isClicked.rooms_desc[house]}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rooms_desc2[house]}
                      </ResultDetailSpan>
                      <ResultDetailSpan>
                        {isClicked.rooms_price_title[house]}
                      </ResultDetailSpan>
                    </ResultDetailChartContainer>
                  ) : (
                    <ResultDetailChartContainer>
                      <ResultSubTitleSpan>
                        {isClicked.rank}위 지역의 매물 종류 분포
                      </ResultSubTitleSpan>
                      <PieComponent
                        isClicked={isClicked}
                        chartmode={chartmode}
                        setChartmode={setChartmode}
                      />
                    </ResultDetailChartContainer>
                  )}
                  <ResultDetailContentContainer>
                    {positions.length !== 0 && (
                      <>
                        <ResultSubTitleSpan>
                          {isClicked.rank}위 지역의 매물 분포도
                        </ResultSubTitleSpan>
                        <Map2
                          isClicked={isClicked}
                          univ_lat={answers.univ_lat}
                          univ_lon={answers.univ_lon}
                          residencePositions={positions}
                          setHouse={setHouse}
                          mobile={window.innerWidth <= 550}
                        />
                      </>
                    )}
                  </ResultDetailContentContainer>
                </ResultDetailContainer>
              )}
            </ResultArticleContainer>
          )}
        </>
      )}
    </>
  );
};

export default Result;

Result.propTypes = {
  answers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  house: PropTypes.object,
  setHouse: PropTypes.func.isRequired,
  setCurrentAddress: PropTypes.func.isRequired,
  setIsHovered: PropTypes.func.isRequired,
  setIsClicked: PropTypes.func.isRequired,
  aggregated: PropTypes.array.isRequired,
  isHovered: PropTypes.string.isRequired,
  isClicked: PropTypes.string.isRequired,
  isChecked: PropTypes.string.isRequired,
  chartData: PropTypes.object.isRequired,
  currentAddress: PropTypes.string.isRequired,
  chartmode: PropTypes.string.isRequired,
  setChartmode: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
  unitTransformer: PropTypes.func.isRequired,
  positions: PropTypes.array.isRequired,
};
