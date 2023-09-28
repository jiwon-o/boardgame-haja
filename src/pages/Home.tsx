import Header from "./../components/Header";
import GameList from "../components/GameList";
import { useState } from "react";
import axios from "axios";
import useAsync from "../hooks/useAsync";

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function Home() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const [searchGame, setSearchGame] = useState("");

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <GameList
        loading={loading}
        error={error}
        games={games}
        searchGame={searchGame}
      />
    </>
  );
}
