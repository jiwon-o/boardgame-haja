import GlobalStyle from "./styles/GlobalStyle";
import AppRouter from "./pages/Router";
import styled from "styled-components";

const AppWrapper = styled.div`
  margin: 0 auto;
  padding: 0 40px;
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
