import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import AppRouter from './pages/Router';
import styled from 'styled-components';

const AppWrapper = styled.div`
  padding: 0 40px;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
