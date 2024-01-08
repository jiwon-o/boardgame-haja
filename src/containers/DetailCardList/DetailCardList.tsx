import { useEffect, useState } from 'react';
import { Game } from '../../types';
import Pagination from 'react-js-pagination';
import '../../styles/pagination.css';
import DetailCard from '../../components/DetailCard/DetailCard';
import GameFilter from '../GameFilter/GameFilter';
import { AsideCategoryContainer, CardContainer, CardNotice, CardWrapper } from './DetailCardListStyle';

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function DetailGameList({ loading, error, games, containerRef }: Props) {
  const [filteredGames, setFilteredGames] = useState(games!);

  const [page, setPage] = useState<number>(1);
  const CardPerPage: number = 6;
  const indexOfLastCard: number = page * CardPerPage;
  const indexOfFirstCard: number = indexOfLastCard - CardPerPage;
  const [currentGames, setCurrentGames] = useState<Game[] | null>(null);

  const handlePageChange = (page: number) => {
    setPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    setCurrentGames(filteredGames!.slice(indexOfFirstCard, indexOfLastCard));
  }, [filteredGames, page, indexOfFirstCard, indexOfLastCard]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <CardWrapper>
      <CardContainer>
        {currentGames?.length === 0 ? (
          <CardNotice>해당 분류와 일치하는 보드게임이 없습니다.</CardNotice>
        ) : (
          currentGames?.map((game) => {
            return <DetailCard key={game.id} game={game} />;
          })
        )}
        <Pagination
          activePage={page}
          itemsCountPerPage={CardPerPage}
          totalItemsCount={filteredGames.length}
          pageRangeDisplayed={5}
          prevPageText={'<'}
          nextPageText={'>'}
          onChange={handlePageChange}
        />
      </CardContainer>
      <AsideCategoryContainer>
        <GameFilter
          games={games}
          filteredGames={filteredGames}
          setFilteredGames={setFilteredGames}
          setPage={setPage}
          hasInput={true}
        />
      </AsideCategoryContainer>
    </CardWrapper>
  );
}
