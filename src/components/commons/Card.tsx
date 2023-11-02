import React, { useEffect, useState } from "react";
import { Game } from "../../types";
import styled from "styled-components";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { TbRating12Plus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import AsideNav from "./Aside/AsideNav";
import Pagination from "react-js-pagination";
import "../../styles/pagination.css";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  flex: 4;
  margin-right: 20px;
`;

const CardItems = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardItem = styled.li`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  border: 1px solid #14112e;
  box-shadow: 0 0 10px #14112e;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: #1f1a4cd7;
    box-shadow: 3px 3px 5px black;
    border: 1px solid transparent;
  }
`;

const CardThumbnail = styled.div`
  flex: 1;
  max-width: 240px;
  padding: 14px;
  border-right: 1px solid #14112e;

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
  }
`;

const CardDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px;
`;

const GameTitleAndTheme = styled.div`
  margin-top: 10px;
`;

const GameTheme = styled.strong`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #24244a;
  color: #ececf1;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 1px 1px 1px #14112e;
`;

const GameTitle = styled.h3`
  font-size: 1.8rem;
  margin: 24px 0 0 6px;

  span {
    display: inline-block;
    font-size: 1.6rem;
    margin-left: 6px;
  }
`;

const GameSubTitle = styled.h4`
  font-size: 1.6rem;
  color: #7d7b9f;
  margin-top: 10px;
`;

const GamePlay = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 8px;
`;

const GamePlayItem = styled.li`
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #382f84;
  color: #ececf1;
  line-height: 20px;
  font-size: 1.4rem;
  box-shadow: 1px 1px 1px #14112e;
  svg {
    font-size: 18px;
    margin-top: -2px;
  }
`;

const GameRank = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  padding: 2px;
  font-size: 1.4rem;
  color: white;
  background-color: #606efc;
  opacity: 0;

  ${CardItem}:hover & {
    opacity: 1;
  }
`;

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
}

export default function Card({ loading, error, games }: Props) {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState<string | number>("all");
  const [selectedRating, setSelectedRating] = useState<string | number>("all");
  const themes = [...new Set(games?.map((game) => game.theme))];
  const [page, setPage] = useState<number>(1);

  const CardPerPage: number = 6;
  const indexOfLastCard: number = page * CardPerPage;
  const indexOfFirstCard: number = indexOfLastCard - CardPerPage;
  const [currentGames, setCurrentGames] = useState<Game[] | null>(null);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const filteredGames = games!.filter((game) => {
    const filterByPlayer = () => {
      const minPlayer = parseInt(game.min_player, 10);
      const maxPlayer = parseInt(game.max_player, 10);

      if (selectedPlayer === "all") {
        return true; // 모든 게임 표시
      } else if (typeof selectedPlayer === "number") {
        return selectedPlayer >= minPlayer && selectedPlayer <= maxPlayer;
      } else if (selectedPlayer === "7+") {
        return minPlayer >= 7 || maxPlayer >= 7;
      }
    };

    const filterByRating = () => {
      if (selectedRating === "all") {
        return true;
      } else if (typeof selectedRating === "number") {
        return selectedRating <= game.rate && selectedRating + 1 > game.rate;
      } else if (selectedRating === "6-") {
        return game.rate < 6;
      }
    };
    return filterByPlayer() && filterByRating();
  });

  useEffect(() => {
    setCurrentGames(filteredGames.slice(indexOfFirstCard, indexOfLastCard));
  }, [filteredGames, page]);

  const handleCardItemClick = (game: Game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  const handleSelectedPlayer = (selected: string | number) => {
    setSelectedPlayer(selected);
  };

  const handleSelectedRating = (selected: string | number) => {
    setSelectedRating(selected);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <CardWrapper>
      <CardContainer>
        {currentGames?.map((game) => {
          return (
            <CardItems>
              <CardItem onClick={() => handleCardItemClick(game)}>
                <CardThumbnail>
                  <img src={game.image} alt="보드게임 이미지" />
                </CardThumbnail>
                <CardDetail>
                  <GameTitleAndTheme>
                    <GameTheme>{game.theme}</GameTheme>
                    <GameTitle>
                      {game.name}
                      <span>({game.releaseYear})</span>
                      <GameSubTitle>{game.subTitle}</GameSubTitle>
                    </GameTitle>
                  </GameTitleAndTheme>
                  <GamePlay>
                    <GamePlayItem>
                      <IoPeopleSharp /> {game.min_player} ~ {game.max_player}명
                    </GamePlayItem>
                    <GamePlayItem>
                      <AiFillStar /> {game.rate}점
                    </GamePlayItem>
                    <GamePlayItem>
                      <BiSolidTimeFive /> {game.play_time}
                    </GamePlayItem>
                    <GamePlayItem>
                      <TbRating12Plus /> {game.play_age}
                    </GamePlayItem>
                  </GamePlay>
                  <GameRank>{game.ranking}</GameRank>
                </CardDetail>
              </CardItem>
            </CardItems>
          );
        })}
        <Pagination
          hideDisabled
          activePage={page}
          itemsCountPerPage={CardPerPage}
          totalItemsCount={filteredGames.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePageChange}
        />
      </CardContainer>
      <AsideNav>
        <h2 className="a11y">카테고리 별 버튼</h2>
        <form>
          <div>
            <strong>인원</strong>
            <div>
              <input
                type="radio"
                id="all"
                name="playerCount"
                value="all"
                onChange={() => handleSelectedPlayer("all")}
              />
              <label htmlFor="all">전체</label>
            </div>
            {[1, 2, 3, 4, 5, 6].map((playerCount) => (
              <div key={playerCount}>
                <input
                  type="radio"
                  id={`player-${playerCount}`}
                  name="playerCount"
                  value={playerCount}
                  onChange={() => handleSelectedPlayer(playerCount)}
                />
                <label htmlFor={`player-${playerCount}`}>{playerCount}인</label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                id="player-7plus"
                name="playerCount"
                value="7+"
                onChange={() => handleSelectedPlayer("7+")}
              />
              <label htmlFor="player-7+">7인 이상</label>
            </div>
          </div>
          <div>
            <strong>평점</strong>
            <div>
              <input
                type="radio"
                id="all"
                name="rating"
                value="all"
                onChange={() => handleSelectedRating("all")}
              />
              <label htmlFor="all">전체</label>
            </div>
            {[10, 9, 8, 7, 6].map((gameRate) => (
              <div key={gameRate}>
                <input
                  type="radio"
                  id={`${gameRate}`}
                  name="rating"
                  value={gameRate}
                  onChange={() => handleSelectedRating(gameRate)}
                />
                <label htmlFor={`${gameRate}`}>{gameRate}+</label>
              </div>
            ))}
            <div>
              <input
                type="radio"
                id="rate-6minus"
                name="rating"
                value="6-"
                onChange={() => handleSelectedRating("6-")}
              />
              <label htmlFor="rate-6minus">6점 미만</label>
            </div>
          </div>

          {/* {themes.map((theme) => (
            <div key={theme}>
              <input
                type="radio"
                id={theme}
                name="theme"
                value={theme}
                onChange={() => handleThemeChange(theme)}
              />
              <label htmlFor={theme}>{theme}</label>
            </div>
          ))} */}
        </form>
      </AsideNav>
    </CardWrapper>
  );
}
