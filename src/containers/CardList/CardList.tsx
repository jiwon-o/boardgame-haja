import { useState } from 'react';
import Card from '../../components/Card/Card';
import { HiMiniTrophy } from 'react-icons/hi2';
import { AiFillStar } from 'react-icons/ai';
import useAsync from '../../hooks/useAsync';
import axios from 'axios';
import { useEffect } from 'react';
import { Game } from '../../types';
import Pagination from 'react-js-pagination';
import GameFilter from '../GameFilter/GameFilter';
import {
  CardDetail,
  CardNotice,
  GameListWrapper,
  GamePlay,
  GameRankAndRate,
  GameReleaseYear,
  GameTheme,
  GameTitle,
} from './CardListStyle';

interface Props {
  selectedTheme: string | null;
}

async function getGames(theme?: string | null) {
  const url = theme ? `http://localhost:3001/game?theme=${encodeURIComponent(theme)}` : 'http://localhost:3001/game';

  const response = await axios.get(url);
  return response.data;
}

export default function GamesList({ selectedTheme }: Props) {
  const state = useAsync(() => getGames(selectedTheme), [selectedTheme]);
  const { loading, data: games, error } = state;

  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);
  const CardPerPage: number = 24;
  const indexOfLastCard: number = page * CardPerPage;
  const indexOfFirstCard: number = indexOfLastCard - CardPerPage;
  const [currentGames, setCurrentGames] = useState<Game[] | null>(null);

  const handlePageChange = async (selectedPage: number) => {
    setCurrentGames(null);
    const newGames = await getGames(selectedTheme);
    setCurrentGames(newGames.slice(indexOfFirstCard, indexOfLastCard));
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (games) {
      setFilteredGames(games);
    }
  }, [games]);

  useEffect(() => {
    if (filteredGames) {
      setCurrentGames(filteredGames.slice(indexOfFirstCard, indexOfLastCard));
    }
  }, [filteredGames, page, indexOfFirstCard, indexOfLastCard]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <>
      <GameFilter games={games} filteredGames={filteredGames} setFilteredGames={setFilteredGames} setPage={setPage} />
      {currentGames?.length === 0 ? (
        <CardNotice>해당 분류와 일치하는 보드게임이 없습니다.</CardNotice>
      ) : (
        <>
          <GameListWrapper>
            {currentGames?.map((game) => {
              return (
                <Card game={game}>
                  <CardDetail>
                    <GameTitle>{game.name}</GameTitle>
                    <GameReleaseYear>({game.releaseYear})</GameReleaseYear>
                    <GameRankAndRate>
                      <span>
                        <HiMiniTrophy color='#008000' /> {game.ranking}위
                      </span>
                      <span>
                        <AiFillStar color='#ffff00' /> {game.rate}점
                      </span>
                    </GameRankAndRate>
                    <GamePlay>
                      <li>
                        {game.min_player} ~ {game.max_player}명
                      </li>
                      <li>{game.play_time}분</li>
                      <li>{game.play_age}</li>
                    </GamePlay>
                    <GameTheme>{game.theme}</GameTheme>
                  </CardDetail>
                </Card>
              );
            })}
          </GameListWrapper>
          <Pagination
            activePage={page}
            itemsCountPerPage={CardPerPage}
            totalItemsCount={filteredGames.length}
            pageRangeDisplayed={5}
            prevPageText={'<'}
            nextPageText={'>'}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
