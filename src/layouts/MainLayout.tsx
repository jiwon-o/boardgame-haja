import React, { ReactNode } from "react";
import Header from "../components/commons/Header/Header";
import Footer from "../components/commons/Footer";
import styled from "styled-components";

const MainContainer = styled.main`
  margin: 0 auto;
  max-width: 1180px;
`;

interface MainLayoutProps {
  children: ReactNode;
  onClickInput: () => void; // onClickInput을 추가
  onClickBackBtn: () => void; // onClickBackBtn을 추가
  onSearch: (item: string) => void; // onSearch를 추가
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onClickInput,
  onClickBackBtn,
  onSearch,
}) => {
  return (
    <div>
      <Header
        onClickInput={onClickInput}
        onClickBackBtn={onClickBackBtn}
        onSearch={onSearch}
      />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </div>
  );
};

export default MainLayout;
