import Input from '../Input';
import styled from 'styled-components';
import logo from '../../assets/icons/icon-logo.svg';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const InputContainer = styled.div`
  width: 580px;
  min-width: 320px;
  margin: 0 20px;
`;

const LogoImage = styled(Link)`
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 4px;
  position: relative;
  margin-right: 4px;

  &::before {
    content: '';
    position: absolute;
    background-color: #666666;
    width: 1px;
    height: 32px;
    top: 50%;
    right: -40%;
    transform: translateY(-50%);
    border-radius: 6px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const LinkWrapper = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  font-size: 1.4rem;

  a {
    padding: 4px 6px;
    white-space: nowrap;
  }
`;

const LoginContent = styled.div`
  display: flex;
  justify-content: right;
  gap: 12px;

  a {
    padding: 10px 16px;
    border-radius: 10px;
    white-space: nowrap;
    background-color: #383d61;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .primary {
    background-color: #1d40da;
  }
`;

interface Props {
  onClickInput?(): void;
  onClickBackBtn?(): void;
  onSearch(term: string): void;
}

export default function Header({ onClickInput, onClickBackBtn, onSearch }: Props) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1 className='a11y'>보드게임</h1>
        <LogoImage to='/' onClick={onClickBackBtn}>
          <img src={logo} alt='로고' />
        </LogoImage>
        <LinkWrapper>
          <Link to='/'>BGH</Link>
          <Link to='/categories/전체'>카테고리</Link>
        </LinkWrapper>
      </HeaderContent>
      <InputContainer>
        <Input onClickInput={onClickInput} onSearch={onSearch} />
      </InputContainer>

      <LoginContent>
        <Link to='/login'>로그인</Link>
        <Link to='/signup' className='primary'>
          회원가입
        </Link>
      </LoginContent>
    </HeaderWrapper>
  );
}
