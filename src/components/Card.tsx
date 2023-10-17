import React from "react";
import { Game } from "../types";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;

  aside {
    flex: 1;
    background-color: red;
    width: 300px;
    height: 300px;
  }
`;

const CardContainer = styled.div`
  flex: 4;
  box-shadow: 0 0 10px red;

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    box-shadow: 0 0 10px green;
  }
`;

const CardThumbnail = styled.div`
  flex: 1;
  max-width: 250px;
  padding: 14px;
  box-shadow: 0 0 10px blue;

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
  margin: 14px;asdfasdfasdasdasdasdasdfasdfaasdfasdfasdfasdfasdfasdasdfasdfasdf
`;

const GameTheme = styled.strong`
  width: fit-content;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: #24244a;
  color: #ececf1;
  font-size: 1.2rem;
  font-weight: 700;
`;

const GameTitle = styled.h3`
  font-size: 2rem;

  span {
    display: inline-block;
    font-size: 1.6rem;
    margin-left: 6px;
  }
`;

const GameSubTitle = styled.h4`
  font-size: 1.6rem;
  color: #7d7b9f;
`;

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
}

export default function Card({ loading, error, games }: Props) {
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <CardWrapper>
      <CardContainer>
        {games?.map((game) => {
          return (
            <ul>
              <li>
                <CardThumbnail>
                  <img src={game.image} alt="보드게임 이미지" />
                </CardThumbnail>
                <CardDetail>
                  <GameTheme>{game.theme}</GameTheme>
                  <GameTitle>
                    {game.name}
                    <span>({game.releaseYear})</span>
                  </GameTitle>
                  <GameSubTitle>{game.subTitle}</GameSubTitle>
                  <div>
                    <span>
                      인원:{" "}
                      <strong>
                        {game.min_player} ~ {game.max_player}명
                      </strong>
                    </span>
                    <span>
                      평점: <strong>{game.rate}점</strong>
                    </span>
                    <span>
                      플레이 타임: <strong>{game.play_time}</strong>
                    </span>
                  </div>
                </CardDetail>
              </li>
            </ul>
          );
        })}
      </CardContainer>

      <aside>d</aside>
    </CardWrapper>
  );
}
