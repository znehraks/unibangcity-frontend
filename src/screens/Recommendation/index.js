import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  FINISH,
  INTRO,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  DISTANCE,
  SUBWAY,
  COST,
  SAFETY,
  HOUSE,
  RESULT,
} from "../../components/Enum";
import useInput from "../../components/hooks/useInput";
import {
  MainSubTitleSpan,
  TextArticle,
  TextArticleSpan,
} from "../../components/styles/StyledComponents";
import universityList from "../../components/data/universityList";
import Q2Map from "../../components/kakao/Q2Map";
import distance_img from "../../components/styles/images/distance.png";
import subway_img from "../../components/styles/images/subway.png";
import cost_img from "../../components/styles/images/cost.png";
import safety_img from "../../components/styles/images/safety.png";
import house_img from "../../components/styles/images/house.png";
import distance_red_img from "../../components/styles/images/distance_red.png";
import subway_red_img from "../../components/styles/images/subway_red.png";
import cost_red_img from "../../components/styles/images/cost_red.png";
import safety_red_img from "../../components/styles/images/safety_red.png";
import house_red_img from "../../components/styles/images/house_red.png";
import ArticleButton from "../../components/ArticleButton";
import { Api } from "../../api";
import preCalculate from "../../components/preCalulateFunc";
const MainContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
`;
const SelectedContainer = styled.div`
  position: absolute;
  width: 15vw;
  height: 50vh;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const SelectedSpan = styled.span`
  font-size: 1vw;
`;
const MainTitleContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainTitle = styled.div`
  width: 100%;
  font-size: 2vw;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;
`;
const MainArticleContainer = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? `${props.flexDirection}` : `row`};
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : `space-evenly`};
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.8vw 1.2vw;
  font-size: 1.2vw;
  cursor: pointer;
  :hover {
    color: white;
    background-color: black;
  }
`;
const Input = styled.input`
  font-size: 1.6vw;
  width: 30%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  :focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.headerRed};
  }
`;

const HiddenSearchBox = styled.div`
  width: 30%;
  height: ${(props) => (props.valueLength > 0 ? `50%` : `0`)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
`;
const HiddenSearchLine = styled.div`
  font-size: 1.2vw;
  padding: 1vw 0;
  height: 2vw;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.headerRed};
  }
`;
const MainArticle = styled.div`
  width: 12vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10%;
  font-size: 1.4vw;
  font-weight: 600;
  color: black;
  cursor: pointer;
  :hover {
    border: 4px solid #f7323f;
    color: #f7323f;
  }
`;
const Recommendation = () => {
  const [mode, setMode] = useState(INTRO);
  const schoolNameInput = useInput("");
  const schoolNameInputRef = useRef();
  const [answers, setAnswers] = useState({
    Q1Answer: "",
    univ_lat: "",
    univ_lon: "",
    Q2Answer: "",
    Q3Answer: "",
    Q4Answer: "",
    Q5Answer: "",
    Q3Answer_kr: "",
    Q4Answer_kr: "",
    Q5Answer_kr: "",
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    if (
      answers.Q1Answer !== "" &&
      answers.Q2Answer !== "" &&
      answers.Q3Answer !== "" &&
      answers.Q4Answer !== "" &&
      answers.Q5Answer !== "" &&
      answers.univ_lat !== "" &&
      answers.univ_lon !== "" &&
      mode === FINISH
    ) {
      console.log(answers);
      Api.getResidence(answers).then((res) => {
        if (res.data.success) {
          let parsed = res.data.data.replaceAll("'", '"');
          parsed = JSON.parse(parsed);
          console.log(parsed);
          console.log(typeof parsed);
          setMode(RESULT);
          setData(parsed);
        } else {
          alert(res.data.err_msg);
        }
      });
    }
  }, [mode]);
  return (
    <MainContainer>
      {mode !== RESULT && (
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
      {mode === INTRO && (
        <>
          <MainTitleContainer>
            <MainTitle>유니방시티 이용 안내입니다.</MainTitle>
            <MainSubTitleSpan>
              아래 내용을 숙지해주시고 '다음'버튼을 눌러주세요
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer flexDirection={"column"}>
            <TextArticle width={"35%"} height={"70%"} lineHeight="0.2vw">
              <TextArticleSpan>
                1. 나의 학교 이름을 입력해 주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                2. 원하는 최대 거리를 선택해 주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                3. 가장 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                4. 두 번째로 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>
                5. 세 번째로 많이 고려하는 요소를 1개 골라주세요.
              </TextArticleSpan>
              <TextArticleSpan>6. 조금만 기다리면 끝.</TextArticleSpan>
            </TextArticle>
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q1);
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q1 && (
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
                {universityList.map((item) => {
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
      )}
      {mode === Q2 && (
        <>
          <MainTitleContainer>
            <MainTitle>2. 원하는 거리를 선택해주세요.</MainTitle>
            <MainSubTitleSpan>
              지도를 마우스로 클릭하면 원 그리기가 시작되고 오른쪽 마우스를
              클릭하면 원 그리기가 종료됩니다.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <Q2Map
              answers={answers}
              setAnswers={setAnswers}
              mobile={false}
              univ_lat={answers.univ_lat}
              univ_lon={answers.univ_lon}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q1);
                setAnswers({ ...answers, Q2Answer: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q2Answer !== "") {
                  setMode(Q3);
                } else {
                  alert("거리를 설정해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q3 && (
        <>
          <MainTitleContainer>
            <MainTitle>3. 가장 중요시 여기는 요소를 선택해주세요.</MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q3}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === DISTANCE}
            />
            <ArticleButton
              current={Q3}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === SUBWAY}
            />
            <ArticleButton
              current={Q3}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === COST}
            />
            <ArticleButton
              current={Q3}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === SAFETY}
            />
            <ArticleButton
              current={Q3}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q3Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q2);
                setAnswers({ ...answers, Q3Answer: "", Q3Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q3Answer !== "") {
                  setMode(Q4);
                } else {
                  alert("항목을 선택해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q4 && (
        <>
          <MainTitleContainer>
            <MainTitle>
              4. 두 번째로 중요시 여기는 요소를 선택해주세요.
            </MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q4}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === DISTANCE}
            />
            <ArticleButton
              current={Q4}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === SUBWAY}
            />
            <ArticleButton
              current={Q4}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === COST}
            />
            <ArticleButton
              current={Q4}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === SAFETY}
            />
            <ArticleButton
              current={Q4}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q4Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q3);
                setAnswers({ ...answers, Q4Answer: "", Q4Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q4Answer !== "") {
                  setMode(Q5);
                } else {
                  alert("항목을 선택해주세요.");
                }
              }}
            >
              다음
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === Q5 && (
        <>
          <MainTitleContainer>
            <MainTitle>
              5. 세 번째로 중요시 여기는 요소를 선택해주세요.
            </MainTitle>
            <MainSubTitleSpan>
              아래 항목 중 한 개만 선택해 주세요.
            </MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <ArticleButton
              current={Q5}
              name={DISTANCE}
              kr_name={"거리"}
              black_img={distance_img}
              red_img={distance_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === DISTANCE}
            />
            <ArticleButton
              current={Q5}
              name={SUBWAY}
              kr_name={"역세권"}
              black_img={subway_img}
              red_img={subway_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === SUBWAY}
            />
            <ArticleButton
              current={Q5}
              name={COST}
              kr_name={"가성비"}
              black_img={cost_img}
              red_img={cost_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === COST}
            />
            <ArticleButton
              current={Q5}
              name={SAFETY}
              kr_name={"안전"}
              black_img={safety_img}
              red_img={safety_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === SAFETY}
            />
            <ArticleButton
              current={Q5}
              name={HOUSE}
              kr_name={"주변 매물 수"}
              black_img={house_img}
              red_img={house_red_img}
              answers={answers}
              setAnswers={setAnswers}
              isSelected={answers.Q5Answer === HOUSE}
            />
          </MainArticleContainer>
          <ButtonContainer>
            <ButtonBox
              onClick={() => {
                setMode(Q4);

                setAnswers({ ...answers, Q5Answer: "", Q5Answer_kr: "" });
              }}
            >
              이전
            </ButtonBox>
            <ButtonBox
              onClick={() => {
                if (answers.Q1Answer === "") {
                  alert("1단계가 완료되지 않았습니다.");
                  setMode(Q1);
                } else if (answers.Q2Answer === "") {
                  alert("2단계가 완료되지 않았습니다.");
                  setMode(Q2);
                } else if (answers.Q3Answer === "") {
                  alert("3단계가 완료되지 않았습니다.");
                  setMode(Q3);
                } else if (answers.Q4Answer === "") {
                  alert("4단계가 완료되지 않았습니다.");
                  setMode(Q4);
                } else if (answers.Q5Answer === "") {
                  alert("항목을 선택해주세요.");
                  setMode(Q5);
                } else {
                  setMode(FINISH);
                }
              }}
            >
              완료
            </ButtonBox>
          </ButtonContainer>
        </>
      )}
      {mode === FINISH && (
        <>
          <MainTitleContainer>
            <MainTitle>나만의 자취방을 보러가실 시간입니다.</MainTitle>
            <MainSubTitleSpan>아래 버튼을 눌러주세요.</MainSubTitleSpan>
          </MainTitleContainer>
          <MainArticleContainer>
            <MainArticle
              onClick={() => {
                setMode(RESULT);
              }}
            >
              결과 보기
            </MainArticle>
          </MainArticleContainer>
        </>
      )}
      {mode === RESULT && (
        <>{data && data.map((item) => <h3>{item.rank}</h3>)}</>
      )}
    </MainContainer>
  );
};
export default Recommendation;
