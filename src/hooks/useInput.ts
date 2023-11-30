import { useState } from "react";
import useDebounce from "./useDebounce";

function useInput() {
  const [searchGame, setSearchGame] = useState("");
  const [isClickInput, setIsClickInput] = useState(false);

  const debouncedSearchGame = useDebounce(searchGame, 300);

  const handleSearch = (item: string) => {
    setSearchGame(item);
  };

  const handleClickInput = () => {
    setIsClickInput(true);
  };

  const handleClickBackBtn = () => {
    setIsClickInput(false);
  };

  return {
    searchGame: debouncedSearchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  };
}

export default useInput;
