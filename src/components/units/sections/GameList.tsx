import styled from "styled-components";
import { Game } from "../../../types";
import SubHeader from "../../commons/Header/SubHeader";
import List from "../../commons/List";

export const GameListWrapper = styled.div``;

interface Props {
  games: Game[] | null;
  type: "all" | "rank" | "current" | "theme" | "search";
}

export default function GameList({ games, type }: Props) {
  return (
    <GameListWrapper>
      <SubHeader type={type} btnTxt="See All" />
      <List games={games} />
    </GameListWrapper>
  );
}
