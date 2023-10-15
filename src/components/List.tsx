import { Game } from "../types";
import { styled } from "styled-components";

const ListWrapper = styled.div``;

const ListItems = styled.ul`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ListItem = styled.li`
  img {
    width: 180px;
    height: 250px;
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
      <ListItems>
        {games?.map((game, idx) => (
          <ListItem key={idx}>
            <img src={game.image} alt="게임 이미지" />
            <h3>{game.releaseYear}</h3>
          </ListItem>
        ))}
      </ListItems>
    </ListWrapper>
  );
}
