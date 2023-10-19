import { useState } from "react";

function useInput() {
  const [searchGame, setSearchGame] = useState("");
  const [isClickInput, setIsClickInput] = useState(false);

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
    searchGame,
    isClickInput,
    handleSearch,
    handleClickInput,
    handleClickBackBtn,
  };
}

export default useInput;
