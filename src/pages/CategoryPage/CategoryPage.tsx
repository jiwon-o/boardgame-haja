import MainLayout from '../../layouts/MainLayout';
import useInput from '../../hooks/useInput';
import SearchPage from '../SearchPage/SearchPage';
import useAsync from '../../hooks/useAsync';
import axios from 'axios';
import AsideNavbar from '../../components/Navbar/AsideNavbar';
import { useState } from 'react';
import GameList from '../../containers/CardList/CardList';
import { AsideNavbarBox, CategoryWrapper, MainContainer } from './CategoryPageStyle';

async function getGames() {
  const response = await axios.get('http://localhost:3001/game');
  return response.data;
}

export default function CategoryPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;

  const themes = games ? ['전체', ...new Set(games.map((game) => game.theme))] : [];

  const { searchGame, isClickInput, handleSearch, handleClickInput, handleClickBackBtn } = useInput();

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <MainLayout onClickInput={handleClickInput} onClickBackBtn={handleClickBackBtn} onSearch={handleSearch}>
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
