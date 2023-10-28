import { Game } from "../../../types";
import SubHeader from "../../commons/Header/SubHeader";
import List from "../../commons/List";

interface Props {
  games: Game[] | null;
  type: "all" | "rank" | "current" | "theme" | "search";
}

export default function GameList({ games, type }: Props) {
  return (
    <div>
      <SubHeader type={type} btnTxt="See All" />
      <List games={games} />
    </div>
  );
}
