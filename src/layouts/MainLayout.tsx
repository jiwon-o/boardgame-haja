import React, { ReactNode } from "react";
import Header from "../components/commons/Header/Header";
import Footer from "../components/commons/Footer";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 1180px;
`;

interface MainLayoutProps {
  children: ReactNode;
  onClickInput: () => void;
  onClickBackBtn: () => void;
  onSearch: (item: string) => void;
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
