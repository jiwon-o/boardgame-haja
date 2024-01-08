import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../types';
import { IoPeopleSharp } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { BiSolidTimeFive } from 'react-icons/bi';
import { TbRating12Plus } from 'react-icons/tb';
import {
  CardContainer,
  CardDetail,
  CardThumbnail,
  GamePlay,
  GamePlayItem,
  GameRank,
  GameSubTitle,
  GameTheme,
  GameTitle,
  GameTitleAndTheme,
} from './DetailCardStyle';

interface Props {
  game: any;
}

export default function DetailCard({ game }: Props) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardItemClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      <CardContainer onClick={() => handleCardItemClick(game)}>
        <CardThumbnail>
          <img
            src={game.image}
            alt='보드게임 이미지'
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </CardThumbnail>
        <CardDetail>
          <GameTitleAndTheme>
            <GameTheme>{game.theme}</GameTheme>
            <GameTitle>
              {game.name}
              <span>({game.releaseYear})</span>
            </GameTitle>
            <GameSubTitle>{game.subTitle}</GameSubTitle>
          </GameTitleAndTheme>
          <GamePlay>
            <GamePlayItem>
              <IoPeopleSharp /> {game.min_player} ~ {game.max_player}명
            </GamePlayItem>
            <GamePlayItem>
              <AiFillStar /> {game.rate}점
            </GamePlayItem>
            <GamePlayItem>
              <BiSolidTimeFive /> {game.play_time}분
            </GamePlayItem>
            <GamePlayItem>
              <TbRating12Plus /> {game.play_age}
            </GamePlayItem>
          </GamePlay>
          <GameRank>{game.ranking}</GameRank>
        </CardDetail>
      </CardContainer>
    </div>
  );
}
