import React, { useState } from "react";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery";
import useAsync from "../hooks/useAsync";
import axios from "axios";
import styled from "styled-components";
import SubHeader from "../components/Header/SubHeader";

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function AllGames() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;

  const [searchGame, setSearchGame] = useState("");

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <SubHeader title="All Games" />
      <Gallery
        loading={loading}
        error={error}
        games={games}
        searchGame={searchGame}
      />
    </>
  );
}
