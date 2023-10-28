import Header from "../components/commons/Header/Header";
import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Banner from "../components/commons/Banner";
import SubHeader from "../components/commons/Header/SubHeader";
import List from "../components/commons/List";
import Card from "../components/commons/Card";
import useInput from "../hooks/useInput";
import SearchPage from "./SearchPage";

const MainContainer = styled.main`
  margin: 0 auto;
  width: clamp(480px, 80%, 1000px);
`;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function HomePage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const {
    searchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  } = useInput();

  const filteredGames = games
    ? [...games]
        .sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear))
        .slice(0, 10)
    : null;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <>
      <Header
        onClickInput={handleClickInput}
        onClickBackBtn={handleClickBackBtn}
        onSearch={handleSearch}
      />
      {!isClickInput ? (
        <>
          <Banner games={games} />
          <MainContainer>
            <SubHeader title="Currently Trending Games" btnTxt="See All" />
            <List games={filteredGames} type="recent" />
            <SubHeader title="All Boardgames" btnTxt="See All" />
            <Card loading={loading} error={error} games={games} />
          </MainContainer>
        </>
      ) : (
        <SearchPage
          loading={loading}
          error={error}
          games={games}
          onClickBackBtn={handleClickBackBtn}
          searchGame={searchGame}
        />
      )}
    </>
  );
}
