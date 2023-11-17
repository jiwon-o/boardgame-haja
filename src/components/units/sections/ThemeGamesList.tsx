import React from "react";
import { Game } from "../../../types";
import { styled } from "styled-components";
import Card from "../../commons/Card/Card";
import { IoPeopleSharp } from "react-icons/io5";
import { HiMiniTrophy } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { TbRating12Plus } from "react-icons/tb";

const ThemeGamesListWrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  box-shadow: 0 0 10px white;
`;

const CardDetail = styled.div`
  width: 100%;
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

interface Props {
  theme: string | null;
  games: Game[] | null;
}

export default function ThemeGamesList({ theme, games }: Props) {
  const filteredGames = theme
    ? games?.filter((game) => game.theme === theme)
    : games;

  return (
    <ThemeGamesListWrapper>
      {(filteredGames || games)?.map((game) => (
        <li key={game.id}>
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
        </li>
      ))}
    </ThemeGamesListWrapper>
  );
}
