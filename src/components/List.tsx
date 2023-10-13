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
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  useEffect(() => {
    if (type === "recent" && games) {
      const sortedGames = games
        ?.sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear))
        .slice(0, 10);
      setFilteredGames(sortedGames);
    }
  }, [games, type]);

  return (
    <ListWrapper>
      <h1 className="a11y">최근 게임 목록</h1>
      <ul>
        {filteredGames.map((game, idx) => (
          <li key={idx}>
            <img src={game.image} alt="게임 이미지" />
            <h3>{game.releaseYear}</h3>
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
}
