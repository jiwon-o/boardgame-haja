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
  border-radius: 10px;
  display: flex;
  box-shadow: 0 0 10px #14112e;

  &:hover {
    cursor: pointer;
    background-color: #1f1a4cd7;
    box-shadow: 3px 3px 5px black;
  }
`;

const CardThumbnail = styled.div`
  flex: 1;
  max-width: 240px;
  padding: 14px;
  border: 1px solid #14112e;

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
  display: inline-block;
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  padding: 0 6px 1px 5px;
  border-radius: 50%;
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
  const [selectedTheme, setSelectedTheme] = useState("all");
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
    if (selectedTheme === "all") {
      return true; // 모든 게임 표시
    } else {
      return game.theme === selectedTheme; // 선택한 카테고리와 일치하는 게임만 표시
    }
  });

  useEffect(() => {
    setCurrentGames(filteredGames.slice(indexOfFirstCard, indexOfLastCard));
  }, [filteredGames, page]);

  const handleCardItemClick = (game: Game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
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
        <h2>카테고리 별 버튼</h2>
        <form>
          {themes.map((theme) => (
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
          ))}
        </form>
      </AsideNav>
    </CardWrapper>
  );
}
