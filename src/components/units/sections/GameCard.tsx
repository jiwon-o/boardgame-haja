import React from "react";
import SubHeader from "../../commons/Header/SubHeader";
import Card from "../../commons/Card";
import { Game } from "../../../types";

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  type: "all" | "rank" | "current" | "theme" | "search";
}

export default function GameCard({ loading, error, games, type }: Props) {
  return (
    <div>
      <SubHeader type={type} btnTxt="See All" />
      <Card loading={loading} error={error} games={games} />
    </div>
  );
}
