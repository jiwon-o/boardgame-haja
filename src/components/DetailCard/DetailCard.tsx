import { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../types';
import { IoPeopleSharp } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { BiSolidTimeFive } from 'react-icons/bi';
import { TbRating12Plus } from 'react-icons/tb';

const DetailCardWrapper = styled.div``;

const CardContainer = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  border: 1px solid #14112e;
  box-shadow: 0 0 10px #14112e;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: #1f1a4cd7;
    box-shadow: 3px 3px 5px black;
    border: 1px solid transparent;
  }
`;

const CardThumbnail = styled.div`
  max-width: 220px;
  max-height: 220px;
  width: 100%;
  height: 100%;
  padding: 14px;
  border-right: 1px solid #14112e;

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
  }
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px;
`;

const GameTitleAndTheme = styled.div`
  margin-top: 10px;
`;

const GameTheme = styled.strong`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #24244a;
  color: #ececf1;
  font-size: 1.4rem;
  font-weight: 700;
  box-shadow: 1px 1px 1px #14112e;
`;

const GameTitle = styled.h3`
  font-size: 2rem;
  margin: 24px 0 0 6px;

  span {
    display: inline-block;
    font-size: 1.8rem;
    margin-left: 6px;
  }
`;

const GameSubTitle = styled.h4`
  font-size: 1.6rem;
  color: #7d7b9f;
  margin: 10px 0 0 6px;
`;

const GamePlay = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 8px;
`;

const GamePlayItem = styled.li`
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #382f84;
  color: #ececf1;
  line-height: 20px;
  font-size: 1.4rem;
  box-shadow: 1px 1px 1px #14112e;
  svg {
    font-size: 18px;
    margin-top: -2px;
  }
`;

const GameRank = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  padding: 2px;
  font-size: 1.4rem;
  color: white;
  background-color: #606efc;
  opacity: 0;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

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
    <DetailCardWrapper>
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
    </DetailCardWrapper>
  );
}
