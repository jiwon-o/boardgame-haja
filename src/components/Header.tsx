import Input from "./Input";
import styled from "styled-components";
import logo from "../assets/icons/icon-logo.svg";

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
  padding: 0 1.8rem;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const LogoImage = styled.div`
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
  }
`;

const LoginContent = styled.div`
  display: flex;
  justify-content: right;
  gap: 12px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 16px 12px;
  border-radius: 10px;
  background-color: ${(props) => (props.primary ? "#1D40DA" : "#383D61")};
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
`;

interface Props {
  onSearch(term: string): void;
}

export default function header(props: Props) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoImage>
          <img src={logo} alt="로고" />
        </LogoImage>
        <LinkWrapper>
          <a href="/">View All</a>
          <a href="/">Categories</a>
        </LinkWrapper>
      </HeaderContent>
      <Input onSearch={props.onSearch} />
      <LoginContent>
        <Button>Log In</Button>
        <Button primary>Sign Up</Button>
      </LoginContent>
    </HeaderWrapper>
  );
}
