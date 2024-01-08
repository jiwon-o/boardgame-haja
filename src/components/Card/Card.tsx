import { Game } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CardWrapper, GameTitle, ImageBox, Overlay } from './CardStyle';

interface Props {
  game: Game;
  children: React.ReactNode;
}

export default function Card({ game, children }: Props) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleGameItemClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <CardWrapper onClick={() => handleGameItemClick(game)}>
      <ImageBox>
        <img
          src={game.image}
          alt={`${game.name} 이미지`}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <Overlay className='overlay'>{children}</Overlay>
      </ImageBox>
      <GameTitle>{game.name}</GameTitle>
    </CardWrapper>
  );
}
