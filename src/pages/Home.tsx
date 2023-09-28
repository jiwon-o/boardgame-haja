import Header from "./../components/Header";
import GameList from "../components/GameList";
import { useState } from "react";

export default function Home() {
  const [searchGame, setSearchGame] = useState("");

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <GameList searchGame={searchGame} />
    </>
  );
}
