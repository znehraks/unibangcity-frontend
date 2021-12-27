import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../../api";
import homeEx from "../../components/Styles/images/homeEx.jpg";
import homeEx2 from "../../components/Styles/images/homeEx2.jpg";
import useInput from "../../Hooks/useInput";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 45vw;
  margin-top: 6vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  @media (max-width: 500px) {
    height: 80vh;
  }
`;

const Article = styled.div`
  width: 100%;
  height: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: 100%;
  }
`;
const TitleSpan = styled.span`
  font-size: 3vw;
  margin-bottom: 3vw;
  @media (max-width: 500px) {
    font-size: 8vw;
  }
`;
const InputContainer = styled.div`
  width: 50vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  @media (max-width: 500px) {
    width: 90vw;
    height: 80vw;
  }
`;
const InputItemContainer = styled.div`
  width: 60%;
  height: 3vw;
  margin-bottom: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    width: 85%;
    height: 15vw;
  }
`;
const InputDesc = styled.span`
  width: 40%;
  font-size: 1.5vw;
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 3vw;
  background: transparent;
  border: none;
  border-bottom: 2px solid black;
  font-size: 2vw;
  text-decoration: none;
  :focus {
    border-bottom: 3px solid ${(props) => props.theme.headerBgColor};
    transition-duration: 0.5s;
  }
  @media (max-width: 500px) {
    font-size: 4vw;
    height: 8vw;
    border-bottom: 1px solid black;
  }
`;
const Button = styled(Link)`
  font-size: 1.2vw;
  border: 2px solid black;
  padding: 0.6vw 1vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
  :hover {
    color: white;
    background: black;
  }
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 5.5vw;
  }
`;

const SmallSpan = styled.span`
  font-size: 1.2vw;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 2.5vw;
  }
`;

const Auth = () => {
  const [mode, setMode] = useState("login");

  const id = useInput("");
  const pwd = useInput("");
  const email = useInput("");
  const authInput = useInput("");
  //로그인 성공 시 LocalStorage에 isLoggedIn 이랑
  //webtoken 저장.
  const Login = (user_id, user_pwd) => {
    Api.Login(user_id, user_pwd).then((response) => {
      if (response.data.loginSuccess) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("user_no", response.data.user_no);
        window.location.href = "/";
        return;
      }
      alert(response.data.message);
    });
  };

  const Signup = (user_id, user_pwd, user_email) => {
    let authNum = Math.random().toString().substr(2, 6);
    Api.Signup(user_id, user_pwd, user_email, authNum).then((response) => {
      if (response.data.signupSuccess) {
        setMode("complete");
        console.log(response);
        Api.SendEmail(user_email, authNum).then((response) => {
          console.log("sendEmail");
        });
        return;
      }
      alert("중복된 아이디 입니다.");
    });
  };

  const Validate = (authNum) => {
    Api.Validate(authNum).then((response) => {
      if (response.data.validateSuccess) {
        alert("가입을 축하드립니다");
        window.location.href = "/";
        return;
      }
      alert(response.data.message);
    });
  };
  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>
      <Wrapper>
        {mode === "login" && (
          <Article>
            <InputContainer>
              <TitleSpan>로그인</TitleSpan>
              <InputItemContainer>
                <InputDesc>아이디: </InputDesc>
                <InputBox placeholder={"exampleId"} {...id}></InputBox>
              </InputItemContainer>
              <InputItemContainer>
                <InputDesc>비밀번호:</InputDesc>
                <InputBox
                  placeholder={"●●●●●●●●"}
                  type={"password"}
                  {...pwd}
                ></InputBox>
              </InputItemContainer>
              <Button
                onClick={() => {
                  Login(id.value, pwd.value);
                }}
              >
                확인
              </Button>
              <SmallSpan
                onClick={() => {
                  setMode("registration");
                }}
              >
                아직 회원이 아니신가요?
              </SmallSpan>
            </InputContainer>
          </Article>
        )}
        {mode === "registration" && (
          <Article>
            <InputContainer>
              <TitleSpan>회원가입</TitleSpan>
              <InputItemContainer>
                <InputDesc>아이디: </InputDesc>
                <InputBox placeholder={"exampleId"} {...id}></InputBox>
              </InputItemContainer>
              <InputItemContainer>
                <InputDesc>비밀번호:</InputDesc>
                <InputBox
                  placeholder={"●●●●●●●●"}
                  type={"password"}
                  {...pwd}
                ></InputBox>
              </InputItemContainer>
              <InputItemContainer>
                <InputDesc>이메일:</InputDesc>
                <InputBox
                  placeholder={"example@mju.ac.kr"}
                  type={"email"}
                  {...email}
                ></InputBox>
              </InputItemContainer>
              <Button
                onClick={() => {
                  if (id.value.length < 6) {
                    alert("아이디는 6자 이상이여야 합니다");
                    return;
                  } else if (pwd.value.length < 8) {
                    alert("비밀번호는 8자 이상이여야 합니다.");
                    return;
                  } else if (
                    !pwd.value.includes(
                      "!",
                      "@",
                      "#",
                      "$",
                      "%",
                      "^",
                      "*",
                      "(",
                      ")"
                    )
                  ) {
                    alert(
                      "비밀번호는 !@#$%^*()등의 특수문자가 반드시 포함되어야 합니다."
                    );
                    return;
                  } else if (email.value.split(".ac.")[1] !== "kr") {
                    alert("회원가입은 재학중인 학교 이메일이여야 합니다.");
                    return;
                  }
                  Signup(id.value, pwd.value, email.value);
                }}
              >
                가입하기
              </Button>
              <SmallSpan
                onClick={() => {
                  setMode("login");
                }}
              >
                이미 회원이신가요?
              </SmallSpan>
            </InputContainer>
          </Article>
        )}
        {mode === "complete" && (
          <Article>
            <InputContainer>
              <TitleSpan>인증을 완료해주세요.</TitleSpan>
              <SmallSpan>
                등록하신 메일({email.value})에서 인증번호(6자리)를 확인 후
              </SmallSpan>
              <SmallSpan>이곳에 기입해 주시면 회원가입이 완료됩니다.</SmallSpan>
              <InputItemContainer>
                <InputBox
                  {...authInput}
                  type={"password"}
                  placeholder={"●●●●●●"}
                ></InputBox>
              </InputItemContainer>
              <Button
                onClick={() => {
                  Validate(authInput.value);
                }}
              >
                인증완료
              </Button>
              <SmallSpan onClick={() => {}}>인증번호 다시 전송하기</SmallSpan>
            </InputContainer>
          </Article>
        )}
      </Wrapper>
    </>
  );
};

export default Auth;
