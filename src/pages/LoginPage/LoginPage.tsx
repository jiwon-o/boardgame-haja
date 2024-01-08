import { useState } from 'react';
import logo from '../../../src/assets/icons/icon-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeaderTitle,
  InputLabel,
  LoginButton,
  LoginHeader,
  LoginInput,
  LoginSection,
  LoginWrapper,
  SignupButton,
  StyledText,
} from './LoginPageStyle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const navigate = useNavigate();

  const handleSignInSubmit = (e: any) => {
    e.preventDefault();
    navigate('/');
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.value === '' || e.target.value.includes('@'));
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.value === '' || e.target.value.length >= 8);
  };

  return (
    <LoginWrapper>
      <LoginHeader>
        <HeaderTitle>
          <h1 className='a11y'>BoardGameHaja</h1>
          <Link to='/'>
            <img src={logo} alt='로고' />
          </Link>
        </HeaderTitle>
      </LoginHeader>
      <LoginSection>
        <form onSubmit={handleSignInSubmit}>
          <InputLabel htmlFor='inpEmail'>이메일</InputLabel>
          <LoginInput id='inpEmail' type='email' data-testid='email-input' value={email} onChange={handleEmailChange} />
          {!isValidEmail && email !== '' && (
            <StyledText className='error-message'>유효한 이메일을 입력하세요.</StyledText>
          )}
          <InputLabel htmlFor='inpPw'>비밀번호</InputLabel>
          <LoginInput
            id='inpPw'
            type='password'
            data-testid='password-input'
            value={password}
            onChange={handlePasswordChange}
          />
          {!isValidPassword && password !== '' && (
            <StyledText className='error-message'>비밀번호는 8자 이상 입력하세요.</StyledText>
          )}
          <LoginButton
            type='submit'
            data-testid='signin-button'
            disabled={email === '' || password === '' || !isValidEmail || !isValidPassword}
          >
            로그인
          </LoginButton>
        </form>
        <SignupButton to='/signup'>회원가입</SignupButton>
      </LoginSection>
    </LoginWrapper>
  );
}
