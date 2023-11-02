import SubHeader from "../components/commons/Header/SubHeader";
import Gallery from "../components/commons/Gallery";
import useInput from "../hooks/useInput";
import { Game } from "../types";

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  searchGame: string;
  onClickBackBtn?(): void;
}

export default function SearchPage({
  loading,
  error,
  games,
  onClickBackBtn,
  searchGame,
}: Props) {
  return (
    <>
      <SubHeader
        type="search"
        isBackBtn={true}
        onClickBackBtn={onClickBackBtn}
      />
      <Gallery
        loading={loading}
        error={error}
        games={games}
        searchGame={searchGame}
      />
    </>
  );
}
