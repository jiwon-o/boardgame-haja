import Input from "../Input";
import styled from "styled-components";
import logo from "../../../assets/icons/icon-logo.svg";
import { Link } from "react-router-dom";

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

const LogoImage = styled(Link)`
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 4px;
  position: relative;
  margin-right: 4px;

  &::before {
    content: "";
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
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 16px;
  border-radius: 10px;
  white-space: nowrap;
  background-color: ${(props) => (props.primary ? "#1D40DA" : "#383D61")};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
`;

interface Props {
  onClickInput?(): void;
  onClickBackBtn?(): void;
  onSearch(term: string): void;
}

export default function Header(props: Props) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoImage to="/" onClick={props.onClickBackBtn}>
          <img src={logo} alt="로고" />
        </LogoImage>
        <LinkWrapper>
          <Link to="/boardgames">모든 게임</Link>
          <a href="/">카테고리</a>
        </LinkWrapper>
      </HeaderContent>
      <Input onClickInput={props.onClickInput} onSearch={props.onSearch} />
      <LoginContent>
        <Button>로그인</Button>
        <Button primary>회원가입</Button>
      </LoginContent>
    </HeaderWrapper>
  );
}
