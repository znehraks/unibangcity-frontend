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
const RecommendationPresenter = ({ mode, answers, setMode }) => {
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
        {mode === Q1 && <Q1Component />}
        {mode === Q2 && <Q2Component />}
        {mode === Q3 && <Q3Component />}
        {mode === Q4 && <Q4Component />}
        {mode === Q5 && <Q5Component />}
        {mode === FINISH && <Finish />}
        {mode === RESULT && <Result />}
      </MainContainer>
    </>
  );
};

export default RecommendationPresenter;
