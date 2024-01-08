import useColumns from '../../hooks/useColumns';
import { Game } from '../../types';
import useSearch from '../../hooks/useSearch';
import useScroll from '../../hooks/useScroll';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GameCard,
  GameCardContainer,
  GameImg,
  GameRank,
  GameTitle,
  GamesLayout,
  MasonryContainer,
} from './GalleryStyle';

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
