import SubHeader from '../../components/Header/SubHeader';
import Gallery from '../../containers/Gallery/Gallery';
import { Game } from '../../types';

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  searchGame: string;
  onClickBackBtn?(): void;
}

export default function SearchPage({ loading, error, games, onClickBackBtn, searchGame }: Props) {
  return (
    <>
      <SubHeader type='search' isBackBtn={true} onClickBackBtn={onClickBackBtn} />
      <Gallery loading={loading} error={error} games={games} searchGame={searchGame} />
    </>
  );
}
