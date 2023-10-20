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
import { HiMiniTrophy } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface DetailWrapperProps {
  backgroundurl?: string;
}

const DetailWrapper = styled.div`
  margin: 0 -40px;
  position: relative;
`;

const DetailContainer = styled.div<DetailWrapperProps>`
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-image: linear-gradient(
      90deg,
      rgb(20, 17, 46, 1),
      rgb(28, 23, 75, 1),
      rgb(20, 17, 46, 0.7)
    ),
    ${(props) => (props.backgroundurl ? `url(${props.backgroundurl})` : "")};
  background-size: cover;
  background-position: center;
  padding: 40px 50px;
`;

const GameThumbnail = styled.div`
  padding: 20px 40px;

  img {
    width: 360px;
  }
`;

const GameDetails = styled.div`
  padding: 20px 40px;

  p {
    margin-top: 16px;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #c5c3ec;
  }
`;

const GameTheme = styled.div`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #382f84;
  color: #ececf1;
  font-size: 1.2rem;
  font-weight: 700;
`;

const GameTitle = styled.h2`
  font-size: 3rem;
  margin-top: 16px;
  span {
    font-size: 2.2rem;
  }
`;

const GameSubTitle = styled.h3`
  font-size: 1.8rem;
  color: #7d7b9f;
  font-weight: 700;
  margin-top: 8px;
  margin-left: 4px;
`;

const GameAttributes = styled.ul`
  display: flex;
  margin-top: 16px;
  margin-left: 4px;
  color: #c5c3ec;
  font-size: 1.6rem;
  font-weight: 700;

  li::before {
    content: "|";
    margin: 0 10px;
    vertical-align: text-top;
  }

  li:first-child::before {
    content: "";
    margin: 0;
  }
`;

const GameStats = styled.ul`
  display: flex;
  margin-top: 16px;
  font-size: 2.4rem;
  gap: 20px;

  svg {
    margin-top: -4px;
  }
`;

const ButtonBox = styled.div`
  margin-top: 40px;

  button {
    width: 180px;
    height: 44px;
    border-radius: 20px;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
  }

  button:first-child {
    margin-right: 20px;
    background: linear-gradient(90deg, rgb(245, 62, 62), rgb(218, 29, 29));

    &:hover {
      box-shadow: 0 0 5px rgb(245, 62, 62);
    }
  }

  button:nth-child(2) {
    background: linear-gradient(90deg, rgb(62, 96, 245), rgb(29, 64, 218));

    &:hover {
      box-shadow: 0 0 5px rgb(62, 96, 245);
    }
  }

  svg {
    margin-left: 6px;
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
      {!isClickInput ? (
        <DetailWrapper>
          <DetailContainer backgroundurl={game.backgroundImage}>
            <GameThumbnail>
              <img src={game.image} alt="게임 이미지" />
            </GameThumbnail>
            <GameDetails>
              <GameTheme>{game.theme}</GameTheme>
              <GameTitle>
                {game.name} <span>({game.releaseYear})</span>
                <GameSubTitle>{game.subTitle}</GameSubTitle>
              </GameTitle>
              <GameAttributes>
                <li>
                  {game.min_player} - {game.max_player}명
                </li>
                <li>{game.play_time}</li>
                <li>{game.play_age}</li>
              </GameAttributes>
              <GameStats>
                <li>
                  <AiFillStar color="#ffff00" /> {game.rate}
                </li>
                <li>
                  <HiMiniTrophy color="#008000" /> {game.ranking}
                </li>
              </GameStats>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tenetur incidunt temporibus repudiandae explicabo qui nostrum
                obcaecati dolorum quos veritatis nam inventore alias ullam sed
                fuga, odio iure et, voluptates magni!
              </p>
              <ButtonBox>
                <button>
                  HOW TO PLAY
                  <AiOutlineYoutube size={30} />
                </button>
                <button>
                  BUY NOW <AiOutlineShoppingCart size={24} />
                </button>
              </ButtonBox>
            </GameDetails>
          </DetailContainer>
        </DetailWrapper>
      ) : (
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
      )}
    </>
  );
}
