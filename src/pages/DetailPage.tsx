import styled from "styled-components";
import { Game } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/useInput";
import useAsync from "../hooks/useAsync";
import axios from "axios";
import { HiMiniTrophy } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlGameController } from "react-icons/sl";
import VideoModal from "../components/commons/Modal/VideoModal";
import SearchPage from "./SearchPage";
import GameList from "../components/units/sections/GameList";
import MainLayout from "../layouts/MainLayout";

interface DetailWrapperProps {
  backgroundurl?: string;
}

const DetailWrapper = styled.div``;

const DetailContainer = styled.div<DetailWrapperProps>`
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);

  background-image: linear-gradient(
      90deg,
      rgb(20, 17, 46, 1),
      rgb(28, 23, 75, 1),
      rgb(20, 17, 46, 0.7)
    ),
    ${(props) => (props.backgroundurl ? `url(${props.backgroundurl})` : "")};
  background-size: cover;
  background-position: center;
  padding: 40px 0;
`;

const GameBox = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
`;

const GameThumbnail = styled.div`
  padding: 20px 40px;
  border-radius: 6px;

  img {
    width: 360px;
    border-radius: 6px;
  }
`;

const GameDetails = styled.div`
  padding: 20px 40px;

  p {
    margin-top: 20px;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: #c5c3ec;
  }
`;

const GameTheme = styled.div`
  width: fit-content;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: #382f84;
  color: #ececf1;
  font-size: 1.4rem;
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
  margin-top: 20px;
  margin-left: 4px;
  color: #c5c3ec;
  font-size: 1.6rem;
  font-weight: 700;

  li::before {
    content: "|";
    margin: 0 20px;
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
    background-size: 100% 100%;
    transition: background-size 0.3s;

    &:hover {
      background-size: 300% 100%;
    }
  }

  button:nth-child(2) {
    background: linear-gradient(90deg, rgb(62, 96, 245), rgb(29, 64, 218));
    background-size: 100% 100%;
    transition: background-size 0.3s;
    margin-top: 14px;

    &:hover {
      background-size: 300% 100%;
    }
  }

  svg {
    margin-left: 6px;
  }
`;

const GameListSection = styled.section`
  margin: 0 auto;
`;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function DetailPage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { game } = location.state;

  const {
    searchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  } = useInput();

  const handleClickPlayButton = () => {
    const url = "https://boardgamearena.com/gamelist";
    window.open(url);
  };

  const openModal = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredGames = games
    ? [...games]
        .filter(
          (filteredGame) =>
            game.theme === filteredGame.theme && game.id !== filteredGame.id
        )
        .slice(0, 20)
    : null;

  return (
    <MainLayout
      onClickInput={handleClickInput}
      onClickBackBtn={handleClickBackBtn}
      onSearch={handleSearch}>
      {!isClickInput ? (
        <DetailWrapper>
          <DetailContainer backgroundurl={game.backgroundImage}>
            <GameBox>
              <GameThumbnail>
                <img src={game.image} alt="게임 이미지" />
              </GameThumbnail>
              <GameDetails>
                <GameTheme>{game.theme}</GameTheme>
                <GameTitle>
                  {game.name} <span>({game.releaseYear})</span>
                  <GameSubTitle>{game.subTitle}</GameSubTitle>
                </GameTitle>
                <GameStats>
                  <li>
                    <HiMiniTrophy color="#008000" /> {game.ranking}
                  </li>
                  <li>
                    <AiFillStar color="#ffff00" /> {game.rate}
                  </li>
                </GameStats>
                <GameAttributes>
                  <li>
                    {game.min_player} - {game.max_player}명
                  </li>
                  <li>{game.play_time}</li>
                  <li>{game.play_age}</li>
                </GameAttributes>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tenetur incidunt temporibus repudiandae explicabo qui nostrum
                  obcaecati dolorum quos veritatis nam inventore alias ullam sed
                  fuga, odio iure et, voluptates magni!
                </p>
                <ButtonBox>
                  <button onClick={() => openModal(game)}>
                    HOW TO PLAY
                    <AiOutlineYoutube size={30} />
                  </button>
                  <button onClick={handleClickPlayButton}>
                    PLAY NOW <SlGameController size={24} />
                  </button>
                </ButtonBox>
              </GameDetails>
            </GameBox>
          </DetailContainer>
          <GameListSection>
            <GameList type="theme" games={filteredGames} />
          </GameListSection>
        </DetailWrapper>
      ) : (
        <SearchPage
          loading={loading}
          error={error}
          games={games}
          onClickBackBtn={handleClickBackBtn}
          searchGame={searchGame}
        />
      )}
      {isModalOpen && (
        <VideoModal isOpen={isModalOpen} onClose={closeModal} game={game} />
      )}
    </MainLayout>
  );
}
