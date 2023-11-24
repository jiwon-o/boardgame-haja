import MainLayout from "../layouts/MainLayout";
import useInput from "../hooks/useInput";
import SearchPage from "./SearchPage";
import useAsync from "../hooks/useAsync";
import axios from "axios";
import AsideNavbar from "../components/commons/Navbar/AsideNavbar";
import { styled } from "styled-components";
import { useState } from "react";
import GameList from "../components/units/sections/GameList";

const CategoryWrapper = styled.div`
  display: flex;
`;

const AsideNavbarBox = styled.aside`
  max-width: 240px;
  min-width: 200px;
  box-shadow: 0 0 10px red;
`;

const MainContainer = styled.main`
  width: 100%;

  box-shadow: 0 0 10px green;
`;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function CategoryPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;

  const themes = games
    ? ["전체", ...new Set(games.map((game) => game.theme))]
    : [];

  const {
    searchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  } = useInput();

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <MainLayout
      onClickInput={handleClickInput}
      onClickBackBtn={handleClickBackBtn}
      onSearch={handleSearch}>
      {!isClickInput ? (
        <CategoryWrapper>
          <AsideNavbarBox>
            <AsideNavbar themes={themes} setSelectedTheme={setSelectedTheme} />
          </AsideNavbarBox>
          <MainContainer>
            <GameList selectedTheme={selectedTheme} />
          </MainContainer>
        </CategoryWrapper>
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
