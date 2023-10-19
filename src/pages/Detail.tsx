import styled from "styled-components";
import { Game } from "../types";
import useYouTubeVideo from "../hooks/useYoutubeVideo";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { useState } from "react";
import useInput from "../hooks/useInput";
import SubHeader from "../components/Header/SubHeader";
import Gallery from "../components/Gallery";
import useAsync from "../hooks/useAsync";
import axios from "axios";

interface DetailContainerProps {
  backgroundurl?: string;
}

const DetailWrapper = styled.div<DetailContainerProps>`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.backgroundurl ? `url(${props.backgroundurl})` : ""};
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 4px #332986;
`;

const DetailContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: rgb(28, 23, 75);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.9) 75%,
    rgba(0, 0, 0, 0.8)
  );
  border-radius: 5px;
  padding: 40px 50px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 50%;
  box-shadow: 0 0 0 5px red;

  iframe {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function Detail() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;

  const location = useLocation();
  const { game } = location.state;
  const {
    searchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  } = useInput();

  return (
    <>
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
        <div>{game.name}</div>
      )}
    </>
  );
}
