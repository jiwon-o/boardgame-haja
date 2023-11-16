import React from "react";
import MainLayout from "../layouts/MainLayout";
import useInput from "../hooks/useInput";
import SearchPage from "./SearchPage";
import useAsync from "../hooks/useAsync";
import axios from "axios";
import MainCategoryMenu from "../components/commons/CategoryMenu/MainCategoryMenu";
import AsideNavbar from "../components/commons/Navbar/AsideNavbar";
import { styled } from "styled-components";
import { useState } from "react";
import ThemeGamesList from "../components/units/sections/ThemeGamesList";

const CategoriesWrapper = styled.div`
  display: flex;
`;

const AsideNavbarBox = styled.aside`
  width: 280px;
  box-shadow: 0 0 10px red;
`;

// const CategoriesContainer = styled.main`
//   flex: 3;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 0 10px yellow;
// `;

// const CategoryMenuBox = styled.div`
//   height: 200px;
//   box-shadow: 0 0 10px green;
// `;

// const GameCardBox = styled.div`
//   box-shadow: 0 0 10px white;
// `;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function CategoryPage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeClick = (theme: string | null) => {
    setSelectedTheme(theme);
  };

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
        <CategoriesWrapper>
          <AsideNavbarBox>
            <AsideNavbar
              games={games}
              selectedTheme={selectedTheme}
              onThemeClick={handleThemeClick}
            />
          </AsideNavbarBox>
          <ThemeGamesList theme={selectedTheme} games={games} />
        </CategoriesWrapper>
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
