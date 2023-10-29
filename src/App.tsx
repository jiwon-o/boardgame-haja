import GlobalStyle from "./styles/GlobalStyle";
import AppRouter from "./pages/Router";
import styled from "styled-components";

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 1260px;
  padding: 0 40px; /* 좌우에 40px의 패딩 */
  box-sizing: border-box;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <AppRouter />
    </AppWrapper>
  );
}

export default App;
