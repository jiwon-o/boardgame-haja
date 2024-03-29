import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import Banner from '../../components/Banner/Banner';
import useInput from '../../hooks/useInput';
import SearchPage from '../SearchPage/SearchPage';
import MainLayout from '../../layouts/MainLayout';
import GameSlide from '../../containers/CardSlide/CardSlide';
import DetailGameList from '../../containers/DetailCardList/DetailCardList';
import { useRef } from 'react';
import { MainContainer } from './HomePageStyle';

async function getGames() {
  const response = await axios.get('http://localhost:3001/game');
  return response.data;
}

export default function HomePage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const { searchGame, isClickInput, handleSearch, handleClickInput, handleClickBackBtn } = useInput();

  const filteredGames = games
    ? [...games].sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear)).slice(0, 20)
    : null;

  const containerRef = useRef<HTMLDivElement>(null);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <MainLayout onClickInput={handleClickInput} onClickBackBtn={handleClickBackBtn} onSearch={handleSearch}>
      {!isClickInput ? (
        <>
          <Banner games={games} />
          <MainContainer>
            <h2>실시간 베스트 게임</h2>
            <GameSlide games={filteredGames} />
            <h2 ref={containerRef}>인기 게임</h2>
            <DetailGameList loading={loading} error={error} games={games} containerRef={containerRef} />
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
