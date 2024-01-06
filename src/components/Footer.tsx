import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';

const FooterWrapper = styled.footer`
  position: relative;
  margin-top: 100px;
  padding: 40px 0;
  font-size: 1.4rem;

  div:first-child {
    margin-bottom: 32px;
  }

  div:nth-child(2) {
    line-height: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 100vw;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.whiteColor};
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <div>
        <Link to='#'>고객센터 </Link>
        <Link to='#'>이용약관 </Link>
        <Link to='#'>개인정보처리방침 </Link>
        <Link to='#'>법적고지</Link>
      </div>
      <div>
        <p>제작 오지원</p>
        <p>인천광역시 남동구</p>
        <p>Copyright © 2023 BOARDGAMEHAJA All right reserves.</p>
      </div>
    </FooterWrapper>
  );
}
