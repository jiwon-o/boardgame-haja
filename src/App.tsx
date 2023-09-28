import Boardgames from "./components/Boardgames";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Boardgames />
    </div>
  );
}

export default App;
