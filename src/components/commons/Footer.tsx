import styled from "styled-components";

const FooterWrapper = styled.footer`
  position: relative;
  margin-top: 100px;
  padding: 20px 0 40px;
  font-size: 1.4rem;

  div:first-child {
    margin-bottom: 20px;
  }

  div:nth-child(2) {
    line-height: 2rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -40px;
    width: 100vw;
    height: 1px;
    background-color: white;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <div>
        <a href="#">고객센터 </a>
        <a href="#">이용약관 </a>
        <a href="#">개인정보처리방침 </a>
        <a href="#">법적고지</a>
      </div>
      <div>
        <p>제작 오지원</p>
        <p>인천광역시 남동구</p>
        <p>Copyright © 2023 BOARDGAMEHAJA All right reserves.</p>
      </div>
    </FooterWrapper>
  );
}
