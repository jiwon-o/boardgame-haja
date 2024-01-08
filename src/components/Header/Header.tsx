import Input from '../Input/Input';
import logo from '../../assets/icons/icon-logo.svg';
import { Link } from 'react-router-dom';
import { HeaderContent, HeaderWrapper, InputContainer, LinkWrapper, LoginContent, LogoImage } from './HeaderStyle';

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
