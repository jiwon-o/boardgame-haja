import React from "react";
import { Game, GameRankProps } from "../../types";
import styled from "styled-components";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { TbRating12Plus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;

  aside {
    flex: 1;
    background-color: red;
    max-width: 300px;
    max-height: 300px;
    min-width: 200px;
  }
`;

const CardContainer = styled.div`
  max-width: 720px;
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
  max-width: 220px;
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
  justify-content: space-between;
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

const GameRank = styled.span<GameRankProps>`
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
  background-color: #382f84;
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

  const handleCardItemClick = (game: Game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <CardWrapper>
      <CardContainer>
        {games?.map((game) => {
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
                  <GameRank ranking={game.ranking}>{game.ranking}</GameRank>
                </CardDetail>
              </CardItem>
            </CardItems>
          );
        })}
      </CardContainer>

      <aside>d</aside>
    </CardWrapper>
  );
}
