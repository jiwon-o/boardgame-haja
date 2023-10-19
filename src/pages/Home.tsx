import Header from "../components/Header/Header";
import Gallery from "../components/Gallery";
import { useState, useEffect } from "react";
import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Banner from "./../components/Banner";
import SubHeader from "../components/Header/SubHeader";
import List from "../components/List";
import Card from "../components/Card";

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
  const [isClickInput, setIsClickInput] = useState(false);

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  const filteredGames = games
    ? [...games]
        .sort((a, b) => parseInt(b.releaseYear) - parseInt(a.releaseYear))
        .slice(0, 10)
    : null;

  const handleClickInput = () => {
    setIsClickInput(true);
  };

  const handleClickBackBtn = () => {
    setIsClickInput(false);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <HomeWrapper>
      <Header
        onClickInput={handleClickInput}
        onClickBackBtn={handleClickBackBtn}
        onSearch={handleSearch}
      />
      {isClickInput ? (
        <>
          <SubHeader
            title="Search"
            isBackBtn={true}
            onClickBackBtn={handleClickBackBtn}
          />
          <Gallery
            loading={loading}
            error={error}
            games={games}
            searchGame={searchGame}
          />
        </>
      ) : (
        <>
          <Banner games={games} />
          <main>
            <SubHeader title="Currently Trending Games" btnTxt="See All" />
            <List games={filteredGames} type="recent" />
            <SubHeader title="All Boardgames" btnTxt="See All" />
            <Card loading={loading} error={error} games={games} />
          </main>
        </>
      )}
    </HomeWrapper>
  );
}
