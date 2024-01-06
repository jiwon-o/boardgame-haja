import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { GameRankProps } from '../types';
import useColumns from '../hooks/useColumns';
import { Game } from '../types';
import useSearch from '../hooks/useSearch';
import useScroll from '../hooks/useScroll';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const rankColors: { [key: number]: string } = {
  1: '#d83f31',
  2: '#ee9322',
  3: '#ee9322',
};

const GamesLayout = styled.div`
  min-width: 390px;
  padding: 32px 16px;
`;

const MasonryContainer = styled(Masonry)`
  display: flex;
  justify-content: center;

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 28px;
    padding: 0 10px;
  }
`;

const GameCardContainer = styled.div`
  max-width: 224px;
  position: relative;
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  & + & {
    margin-top: 20px;
  }
`;

const GameCard = styled.div`
  position: relative;
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.navyColor};
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
  }

  &:hover {
    &::before {
      opacity: 0.4;
    }
  }
`;

const GameRank = styled.span<GameRankProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 28px;
  min-height: 28px;
  border-radius: 50%;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.whiteColor};
  opacity: 0;
  background-color: ${(props) => rankColors[props.ranking] || '#e9b824'};

  ${GameCardContainer}:hover & {
    opacity: 1;
  }
`;

const GameImg = styled.img`
  width: 100%;
  border-radius: 6px;
  min-height: 178px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

const GameTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 16px 20px;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 1.2em;
`;

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  searchGame: string;
}

export default function Gallery({ loading, error, games, searchGame }: Props) {
  const columns = useColumns();
  const searchGames = useSearch();
  const dataCount = useScroll(50);
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const filteredGames = games?.filter((game) => {
    return searchGames(searchGame, game.name) || searchGames(searchGame, game.subTitle);
  });

  const handleCardClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  const pagedGames = filteredGames?.slice(0, dataCount);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <GamesLayout>
      {pagedGames && pagedGames.length > 0 ? (
        <MasonryContainer breakpointCols={columns} className='list' columnClassName='column'>
          {pagedGames.map((game: Game) => {
            return (
              <GameCardContainer key={game.id}>
                <GameCard onClick={() => handleCardClick(game)}>
                  <GameRank ranking={game.ranking}>{game.ranking}</GameRank>
                  <GameImg
                    src={game.image}
                    alt={game.name}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                  />
                </GameCard>
                <GameTitle>{game.name}</GameTitle>
                <h4 className='a11y'>{game.subTitle}</h4>
              </GameCardContainer>
            );
          })}
        </MasonryContainer>
      ) : (
        <p>보드게임을 찾지 못했습니다.</p>
      )}
    </GamesLayout>
  );
}
