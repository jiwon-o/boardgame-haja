import Header from "../components/Header/Header";
import Gallery from "../components/Gallery";
import { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Banner from "./../components/Banner";
import SubHeader from "../components/Header/SubHeader";
import List from "../components/List";
import { Game } from "../types";

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
  const [filteredGames, setFilteredGames] = useState<Game[] | null>(null);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  return (
    <HomeWrapper>
      <Header onSearch={handleSearch} />
      <Banner games={games} />
      <SubHeader title="Currently Trending Games" btnTxt="See All" />
      <List games={games} type="recent" />
      <Gallery
        loading={loading}
        error={error}
        games={games}
        searchGame={searchGame}
      />
    </HomeWrapper>
  );
}
