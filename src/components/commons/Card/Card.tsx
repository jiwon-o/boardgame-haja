import { styled } from "styled-components";
import { Game } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CardWrapper = styled.div`
  width: 180px;

  &:hover {
    cursor: pointer;
  }
`;

const GameTitle = styled.h3`
  font-size: 1.4rem;
  margin-top: 6px;
  padding: 0 16px;
  line-height: 20px;
  text-align: center;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    transition: transform 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover > div.overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  content: "";
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 0 0 3px #3e60f5;
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3ms;
  z-index: 2;
`;

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
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <Overlay className="overlay">{children}</Overlay>
      </ImageBox>
      <GameTitle>{game.name}</GameTitle>
    </CardWrapper>
  );
}
