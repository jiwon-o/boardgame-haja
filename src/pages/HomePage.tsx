import Header from "../components/commons/Header/Header";
import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Banner from "../components/commons/Banner";
import useInput from "../hooks/useInput";
import SearchPage from "./SearchPage";
import GameList from "../components/units/sections/GameList";
import GameCard from "../components/units/sections/GameCard";
import Footer from "../components/commons/Footer";
import MainLayout from "../layouts/MainLayout";

const MainContainer = styled.main``;

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
        .slice(0, 20)
    : null;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <MainLayout
      onClickInput={handleClickInput}
      onClickBackBtn={handleClickBackBtn}
      onSearch={handleSearch}
    >
      {!isClickInput ? (
        <>
          <Banner games={games} />
          <MainContainer>
            <GameList type="current" games={filteredGames} />
            <GameCard
              type="rank"
              loading={loading}
              error={error}
              games={games}
            />
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
    </MainLayout>
  );
}
