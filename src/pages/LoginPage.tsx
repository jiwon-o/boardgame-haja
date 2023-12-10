import { useState } from "react";
import { styled } from "styled-components";
import logo from "../../src/assets/icons/icon-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const LoginWrapper = styled.article`
  width: 480px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

const LoginHeader = styled.header`
  text-align: center;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderTitle = styled.h2`
  padding: 20px 0;

  a {
    display: inline-block;
    width: 42px;
    height: 42px;
    margin-bottom: 20px;
  }
`;

const LoginSection = styled.section`
  padding: 26px 24px;
  text-align: center;

  h3 {
    margin-bottom: 20px;
  }

  form {
    text-align: left;
  }
`;

const InputLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  vertical-align: -2px;
  margin-bottom: 8px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;

  &:focus {
    outline: 2px solid #2f80ed;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2f80ed;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  margin-bottom: 40px;

  &:disabled {
    background-color: #666666;
    cursor: default;
  }
`;

const SignupButton = styled(Link)`
  font-size: 14px;
  color: #767676;
`;

const StyledText = styled.p`
  display: block;
  color: red;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 20px;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const navigate = useNavigate();

  const handleSignInSubmit = async (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.value === "" || e.target.value.includes("@"));
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.value === "" || e.target.value.length >= 8);
  };

  return (
    <LoginWrapper>
      <LoginHeader>
        <HeaderTitle>
          <h1 className="a11y">BoardGameHaja</h1>
          <Link to="/">
            <img src={logo} alt="로고" />
          </Link>
        </HeaderTitle>
      </LoginHeader>
      <LoginSection>
        <form onSubmit={handleSignInSubmit}>
          <InputLabel htmlFor="inpEmail">이메일</InputLabel>
          <LoginInput
            id="inpEmail"
            type="email"
            data-testid="email-input"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && email !== "" && (
            <StyledText className="error-message">
              유효한 이메일을 입력하세요.
            </StyledText>
          )}
          <InputLabel htmlFor="inpPw">비밀번호</InputLabel>
          <LoginInput
            id="inpPw"
            type="password"
            data-testid="password-input"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isValidPassword && password !== "" && (
            <StyledText className="error-message">
              비밀번호는 8자 이상 입력하세요.
            </StyledText>
          )}
          <LoginButton
            type="submit"
            data-testid="signin-button"
            disabled={
              email === "" ||
              password === "" ||
              !isValidEmail ||
              !isValidPassword
            }>
            로그인
          </LoginButton>
        </form>
        <SignupButton to="/signup">회원가입</SignupButton>
      </LoginSection>
    </LoginWrapper>
  );
}
