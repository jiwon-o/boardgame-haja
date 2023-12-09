import { useState } from "react";
import { styled } from "styled-components";
import Card from "../../commons/Card/Card";
import { HiMiniTrophy } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import useAsync from "../../../hooks/useAsync";
import axios from "axios";
import { useEffect } from "react";
import { Game } from "../../../types";
import Pagination from "react-js-pagination";
import GameFilter from "../../commons/CategoryMenu/GameFilter";

const GameListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  place-items: center;
  align-items: start;
  margin-top: 24px;
  padding-bottom: 24px;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  margin-top: 20px;
`;

const GameTitle = styled.h3`
  max-width: 100%;
  text-align: center;
  font-size: 1.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.8rem;
  margin-bottom: 6px;
`;

const GameReleaseYear = styled.span`
  display: block;
  font-size: 1.4rem;
  margin-bottom: 16px;
`;

const GameRankAndRate = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 1.6rem;
  margin-bottom: 16px;
`;

const GamePlay = styled.ul`
  display: flex;
  font-size: 1.2rem;
  white-space: nowrap;

  li {
    margin-right: 4px;

    &:not(:last-child) {
      &::after {
        content: "|";
        margin-left: 4px;
      }
    }
  }
`;

const GameTheme = styled.strong`
  position: absolute;
  top: 8px;
  right: 8px;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #24244a;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
`;

const CardNotice = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`;

interface Props {
  selectedTheme: string | null;
}

async function getGames(theme?: string | null) {
  const url = theme
    ? `http://localhost:3001/game?theme=${encodeURIComponent(theme)}`
    : "http://localhost:3001/game";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <GameFilter
        games={games}
        filteredGames={filteredGames}
        setFilteredGames={setFilteredGames}
        setPage={setPage}
      />
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
                        <HiMiniTrophy color="#008000" /> {game.ranking}위
                      </span>
                      <span>
                        <AiFillStar color="#ffff00" /> {game.rate}점
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
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
