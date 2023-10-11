import Header from "./../components/Header";
import GameList from "../components/GameList";
import { useState } from "react";
import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Banner from "./../components/Banner";
import SubHeader from "../components/Header/SubHeader";

const HomeWrapper = styled.div`
  margin: 0 auto;
  padding: 0 40px;
`;

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
    <HomeWrapper>
      <Header onSearch={handleSearch} />
      <Banner games={games} />
      <GameList
      <SubHeader title="Currently Trending Games" btnTxt="See All" />
        loading={loading}
        error={error}
        games={games}
        searchGame={searchGame}
      />
    </HomeWrapper>
  );
}
