import { Game } from '../../types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useInput from '../../hooks/useInput';
import useAsync from '../../hooks/useAsync';
import axios from 'axios';
import { HiMiniTrophy } from 'react-icons/hi2';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineYoutube } from 'react-icons/ai';
import { SlGameController } from 'react-icons/sl';
import VideoModal from '../../components/Modal/VideoModal';
import SearchPage from '../SearchPage/SearchPage';
import MainLayout from '../../layouts/MainLayout';
import List from '../../containers/CardSlide/CardSlide';
import {
  ButtonBox,
  DetailContainer,
  DetailWrapper,
  GameAttributes,
  GameBox,
  GameDetails,
  GameListSection,
  GameStats,
  GameSubTitle,
  GameTheme,
  GameThumbnail,
  GameTitle,
} from './DetailPageStyle';

async function getGames() {
  const response = await axios.get('http://localhost:3001/game');
  return response.data;
}

export default function DetailPage() {
  const state = useAsync(getGames, []);
  const { loading, data: games, error } = state;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const location = useLocation();
  const { game } = location.state;

  const { searchGame, isClickInput, handleSearch, handleClickInput, handleClickBackBtn } = useInput();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [game.id]);

  const handleClickPlayButton = () => {
    const url = 'https://boardgamearena.com/gamelist';
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
    ? [...games].filter((filteredGame) => game.theme === filteredGame.theme && game.id !== filteredGame.id).slice(0, 20)
    : null;

  return (
    <MainLayout onClickInput={handleClickInput} onClickBackBtn={handleClickBackBtn} onSearch={handleSearch}>
      {!isClickInput ? (
        <DetailWrapper>
          <DetailContainer backgroundurl={game.backgroundImage}>
            <GameBox>
              <GameThumbnail>
                <img src={game.image} alt='게임 이미지' />
              </GameThumbnail>
              <GameDetails>
                <GameTheme>{game.theme}</GameTheme>
                <GameTitle>
                  {game.name} <span>({game.releaseYear})</span>
                </GameTitle>
                <GameSubTitle>{game.subTitle}</GameSubTitle>
                <GameStats>
                  <li>
                    <HiMiniTrophy color='#008000' /> {game.ranking}
                  </li>
                  <li>
                    <AiFillStar color='#ffff00' /> {game.rate}
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
                  {game.description
                    ? game.description
                    : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate ad quam qui consequatur doloremque corrupti unde cum quod, maxime at eveniet magnam, et fuga nesciunt quis temporibus quisquam odit iusto!'}
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
            <h2>같은 테마 게임</h2>
            <List games={filteredGames} />
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
      {isModalOpen && <VideoModal isOpen={isModalOpen} onClose={closeModal} game={game} />}
    </MainLayout>
  );
}
