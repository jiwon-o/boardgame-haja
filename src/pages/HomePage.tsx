import axios from 'axios';
import useAsync from '../hooks/useAsync';
import styled from 'styled-components';
import Banner from '../components/commons/Banner';
import useInput from '../hooks/useInput';
import SearchPage from './SearchPage';
import MainLayout from '../layouts/MainLayout';
import GameSlide from '../components/commons/GameSlide';
import DetailGameList from '../components/commons/DetailGameList';
import { useRef } from 'react';

const MainContainer = styled.main`
  h2 {
    margin: 80px 0 40px;
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

async function getGames() {
  const response = await axios.get('http://localhost:3001/game');
  return response.data;
}

export default function HomePage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const { searchGame, isClickInput, handleSearch, handleClickInput, handleClickBackBtn } =
    useInput();

  const filteredGames = games
    ? [...games].sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear)).slice(0, 20)
    : null;

  const containerRef = useRef<HTMLDivElement>(null);

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
            <h2>실시간 베스트 게임</h2>
            <GameSlide games={filteredGames} />
            <h2 ref={containerRef}>인기 게임</h2>
            <DetailGameList
              loading={loading}
              error={error}
              games={games}
              containerRef={containerRef}
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
