import Intro from "../../components/recommendationMode/Intro";
import Q1Component from "../../components/recommendationMode/Q1";
import Q2Component from "../../components/recommendationMode/Q2";
import Q3Component from "../../components/recommendationMode/Q3";
import Q4Component from "../../components/recommendationMode/Q4";
import Q5Component from "../../components/recommendationMode/Q5";
import Finish from "../../components/recommendationMode/Finish";
import Result from "../../components/recommendationMode/Result";
import {
  FINISH,
  INTRO,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  RESULT,
} from "../../components/Enum";
import {
  MainContainer,
  SelectedContainer,
  SelectedSpan,
} from "../../components/styles/StyledComponents";
import Helmet from "react-helmet";
const RecommendationPresenter = ({
  mode,
  answers,
  setMode,
  setAnswers,
  schoolNameInputRef,
  schoolNameInput,
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
      <Helmet>
        <title>Unibangcity | Recommendation</title>
      </Helmet>
      <MainContainer mode={mode}>
        {mode !== RESULT && window.innerWidth > 550 && (
          <SelectedContainer>
            <SelectedSpan>{answers.Q1Answer}</SelectedSpan>+
            <SelectedSpan>
              {answers.Q2Answer ? `${answers.Q2Answer}m` : ``}
            </SelectedSpan>
            +<SelectedSpan>{answers.Q3Answer_kr}</SelectedSpan>+
            <SelectedSpan>{answers.Q4Answer_kr}</SelectedSpan>+
            <SelectedSpan>{answers.Q5Answer_kr}</SelectedSpan>
          </SelectedContainer>
        )}
        {mode === INTRO && <Intro setMode={setMode} />}
        {mode === Q1 && (
          <Q1Component
            setMode={setMode}
            answers={answers}
            setAnswers={setAnswers}
            schoolNameInputRef={schoolNameInputRef}
            schoolNameInput={schoolNameInput}
          />
        )}
        {mode === Q2 && (
          <Q2Component
            answers={answers}
            setAnswers={setAnswers}
            setMode={setMode}
          />
        )}
        {mode === Q3 && (
          <Q3Component
            answers={answers}
            setAnswers={setAnswers}
            setMode={setMode}
          />
        )}
        {mode === Q4 && (
          <Q4Component
            answers={answers}
            setAnswers={setAnswers}
            setMode={setMode}
          />
        )}
        {mode === Q5 && (
          <Q5Component
            answers={answers}
            setAnswers={setAnswers}
            setMode={setMode}
          />
        )}
        {mode === FINISH && <Finish setMode={setMode} />}
        {mode === RESULT && (
          <Result
            answers={answers}
            data={data}
            house={house}
            setHouse={setHouse}
            setCurrentAddress={setCurrentAddress}
            setIsHovered={setIsHovered}
            setIsClicked={setIsClicked}
            aggregated={aggregated}
            isHovered={isHovered}
            isClicked={isClicked}
            isChecked={isChecked}
            chartData={chartData}
            currentAddress={currentAddress}
            chartmode={chartmode}
            setChartmode={setChartmode}
            setIsChecked={setIsChecked}
            unitTransformer={unitTransformer}
            positions={positions}
          />
        )}
      </MainContainer>
    </>
  );
};

export default RecommendationPresenter;
