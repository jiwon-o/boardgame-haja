import { Game } from "../types";
import { styled } from "styled-components";
import { useState, useEffect } from "react";

const ListWrapper = styled.div`
  ul {
    display: flex;
  }
  img {
    width: 250px;
    height: 400px;
  }
`;

interface Props {
  games: Game[] | null;
  type: string;
}
export default function List({ games, type }: Props) {
  return (
    <ListWrapper>
      <h1 className="a11y">최근 게임 목록</h1>
      <ul>
        {games?.map((game, idx) => (
          <li key={idx}>
            <img src={game.image} alt="게임 이미지" />
            <h3>{game.releaseYear}</h3>
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
}
