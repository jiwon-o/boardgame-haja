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
  flex: 3;
  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
  }

  img {
    width: 200px;
    height: 200px;
  }
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
                <img
                  src="https://boardlife.co.kr/data/boardgame_strategy/2021/01/29/1611914795-315436.jpg"
                  alt="게임 이미지"
                />
                <div>
                  <strong>전략</strong>
                  <h3>
                    글룸헤이븐<span>2022</span>
                  </h3>
                  <div>
                    <span>
                      인원: <strong>4 ~ 8 명</strong>
                    </span>
                    <span>
                      평점: <strong>9.05</strong>
                    </span>
                    <span>
                      플레이 타임: <strong>15분</strong>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
      </CardContainer>

      <aside>d</aside>
    </CardWrapper>
  );
}
