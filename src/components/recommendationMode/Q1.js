import UniversityList from "../data/universityList";
import { INTRO, Q2 } from "../Enum";
import {
  ButtonBox,
  ButtonContainer,
  HiddenSearchBox,
  HiddenSearchLine,
  Input,
  MainArticleContainer,
  MainSubTitleSpan,
  MainTitle,
  MainTitleContainer,
} from "../styles/StyledComponents";
import PropTypes from "prop-types";
const Q1Component = ({
  schoolNameInputRef,
  schoolNameInput,
  setAnswers,
  answers,
  setMode,
}) => {
  return (
    <>
      <MainTitleContainer>
        <MainTitle>1. 나의 학교를 선택해주세요.</MainTitle>
        <MainSubTitleSpan>
          ex. '명지대학교'검색 시 '명지' 입력 후 아래에서 선택
        </MainSubTitleSpan>
      </MainTitleContainer>
      <MainArticleContainer flexDirection="column" justifyContent="center">
        <Input
          ref={schoolNameInputRef}
          autoFocus
          type="text"
          placeholder="ex. 명지대학교"
          {...schoolNameInput}
          onClick={() => {
            setAnswers({
              ...answers,
              Q1Answer: "",
              univ_lat: "",
              univ_lon: "",
            });
            schoolNameInput.setValue("");
          }}
        />
        {answers.Q1Answer === "" && (
          <HiddenSearchBox valueLength={schoolNameInput.value.length}>
            {UniversityList.map((item) => {
              if (
                item.name.includes(schoolNameInput.value) &&
                schoolNameInput.value !== ""
              ) {
                return (
                  <HiddenSearchLine
                    key={item.name}
                    onClick={() => {
                      setAnswers({
                        ...answers,
                        Q1Answer: item.name,
                        univ_lat: item.address_lat,
                        univ_lon: item.address_lon,
                      });
                      schoolNameInput.setValue(item.name);
                    }}
                  >
                    {item.name}
                  </HiddenSearchLine>
                );
              } else {
                return null;
              }
            })}
          </HiddenSearchBox>
        )}
      </MainArticleContainer>
      <ButtonContainer>
        <ButtonBox
          onClick={() => {
            setMode(INTRO);
            setAnswers({ ...answers, Q1Answer: "" });
          }}
        >
          이전
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            if (answers.Q1Answer !== "") {
              setMode(Q2);
              schoolNameInput.setValue("");
            } else {
              alert("학교를 선택해주세요.");
              schoolNameInputRef.current.focus();
            }
          }}
        >
          다음
        </ButtonBox>
      </ButtonContainer>
    </>
  );
};

export default Q1Component;

Q1Component.propTypes = {
  schoolNameInputRef: PropTypes.object.isRequired,
  schoolNameInput: PropTypes.object.isRequired,
  setAnswers: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
};
