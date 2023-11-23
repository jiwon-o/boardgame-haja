import { useState, useEffect } from "react";
import styled from "styled-components";
import { Game } from "../../../types";
import Input from "../Input";
import useInput from "../../../hooks/useInput";
import useSearch from "../../../hooks/useSearch";
import CheckboxGroup from "../Checkbox/CheckboxGroup";
import Checkbox from "../Checkbox/Checkbox";
import { BiX, BiRevision } from "react-icons/bi";
import GameFilters from "../GameFilters";

const AsideContainer = styled.aside`
  position: sticky;
  top: 20px;
  z-index: 2;
  flex: 1;
  min-width: 260px;
  max-width: 300px;
  border-radius: 12px;
  background: linear-gradient(-45deg, #1a1646, #1a1646);
  border: 1px solid #14112e;
  box-shadow: 0 0 10px #14112e;

  header {
    width: 100%;
    padding: 14px;
    background-color: #382f84;
    border-radius: 12px 12px 0 0;
  }

  h3 {
    text-align: center;
    font-size: 1.4rem;
  }
`;

const AsideInputBox = styled.div`
  margin-bottom: 24px;
`;

const ChackboxContainer = styled.div`
  position: relative;
  margin-bottom: 14px;
  padding: 14px 14px 0;

  p {
    text-align: end;
    font-size: 1.2rem;
    margin-bottom: 12px;

    span {
      color: #606efc;
      font-weight: 600;
    }
  }
`;

const CheckboxResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px 14px;
`;

const CheckboxResultBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  li {
    padding: 4px 2px 2px 8px;
    background-color: #382f84c1;
    border-radius: 6px;
    font-size: 1.2rem;

    span {
      white-space: nowrap;
      color: white;
      font-weight: 300;
    }

    svg {
      margin-left: 2px;
      color: #ff4545;
      font-size: 2rem;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const CheckboxResetButton = styled.button`
  svg {
    font-size: 2.4rem;
    color: white;
  }
`;

interface Props {
  games: Game[] | null;
  filteredGames: Game[] | null;
  setFilteredGames?: any;
  setPage?: any;
}

export default function AsideCategoryMenu({
  games,
  filteredGames,
  setFilteredGames,
  setPage,
}: Props) {
  const [selectedPlayerCounts, setSelectedPlayerCounts] = useState<string[]>(
    []
  );
  const [selectedRating, setSelectedRating] = useState<string[]>([]);
  const [selectedPlayTime, setSelectedPlayTime] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { searchGame, handleSearch } = useInput();
  const searchGames = useSearch();

  useEffect(() => {
    const filtered = games!.filter((game) => {
      const minPlayer = parseInt(game.min_player, 10);
      const maxPlayer = parseInt(game.max_player, 10);
      const gameRating = parseFloat(game.rate);

      // 검색 필터
      const searchFilter =
        searchGames(searchGame, game.name) ||
        searchGames(searchGame, game.subTitle);

      // 게임 인원 필터
      const playerCountMatch =
        selectedPlayerCounts.length === 0 ||
        selectedPlayerCounts.some((playerRange) => {
          if (playerRange === "more10") {
            return minPlayer >= 10 || maxPlayer >= 10;
          } else {
            const selectedCount = parseInt(playerRange, 10);
            return selectedCount >= minPlayer && selectedCount <= maxPlayer;
          }
        });

      // 게임 평점 필터
      const ratingMatch =
        selectedRating.length === 0 ||
        selectedRating.some((ratingRange) => {
          if (ratingRange === "less5") {
            return gameRating < 5;
          } else if (ratingRange === "10") {
            return gameRating === 10;
          } else {
            const selectedRate = parseInt(ratingRange, 10);
            return selectedRate <= gameRating && gameRating < selectedRate + 1;
          }
        });

      // 게임 시간 필터
      const gamePlayTime = game.play_time.split("-").map(Number);
      const minTime = gamePlayTime[0];
      const maxTime = gamePlayTime[1] || minTime;

      const playTimeMatch =
        selectedPlayTime.length === 0 ||
        selectedPlayTime.some((timeRange) => {
          const selectedTime = parseInt(timeRange, 10);
          if (timeRange === "less30") {
            return minTime < 30 || maxTime < 30;
          } else if (timeRange === "more180") {
            return minTime >= 180 || maxTime >= 180;
          } else {
            return (
              (selectedTime >= minTime && selectedTime < maxTime) ||
              (selectedTime <= minTime && selectedTime + 30 > maxTime)
            );
          }
        });

      // 두 필터 모두 만족하는 게임만 반환
      return playerCountMatch && ratingMatch && playTimeMatch && searchFilter;
    });

    setFilteredGames(filtered);
    setPage(1);
  }, [selectedPlayerCounts, selectedRating, selectedPlayTime, searchGame]);

  useEffect(() => {
    const updatedFilters: string[] = [];

    // 게임 인원 필터
    selectedPlayerCounts.forEach((playerCount) => {
      if (playerCount === "more10") {
        updatedFilters.push("10인 이상");
      } else {
        updatedFilters.push(`${parseInt(playerCount)}인`);
      }
    });

    // 게임 평점 필터
    selectedRating.forEach((ratingRange) => {
      if (ratingRange === "less5") {
        updatedFilters.push("5점 미만");
      } else {
        ratingRange === "10"
          ? updatedFilters.push(`${ratingRange}점`)
          : updatedFilters.push(
              `${ratingRange}-${parseInt(ratingRange) + 1}점`
            );
      }
    });

    // 게임 시간 필터
    selectedPlayTime.forEach((timeRange) => {
      if (timeRange === "less30") {
        updatedFilters.push("30분 미만");
      } else if (timeRange === "more180") {
        updatedFilters.push("180분 이상");
      } else {
        updatedFilters.push(`${timeRange}-${parseInt(timeRange) + 30}분`);
      }
    });

    setSelectedFilters(updatedFilters);
  }, [selectedPlayerCounts, selectedRating, selectedPlayTime]);

  const handlePlayerCountsChange = (selectedCounts: string[]) => {
    setSelectedPlayerCounts(selectedCounts);
  };

  const handleRatingChange = (selectedRating: string[]) => {
    setSelectedRating(selectedRating);
  };

  const handlePlayTimeChange = (selectedPlayTime: string[]) => {
    setSelectedPlayTime(selectedPlayTime);
  };

  const handleDeleteFilter = (filter: string) => {
    const updatedFilters = selectedFilters.filter((item) => item !== filter);
    setSelectedPlayerCounts(
      selectedPlayerCounts.filter((count: string) =>
        filter === "10인 이상"
          ? count !== "more10"
          : count !== parseInt(filter) + ""
      )
    );
    setSelectedRating(
      selectedRating.filter((rate: string) =>
        filter === "5점 미만"
          ? rate !== "less5"
          : rate !== parseInt(filter) + ""
      )
    );
    setSelectedPlayTime(
      selectedPlayTime.filter((time: string) => {
        if (filter === "30분 미만") {
          return time !== "less30";
        } else if (filter === "180분 이상") {
          return time !== "more180";
        } else {
          return time !== parseInt(filter) + "";
        }
      })
    );
    setSelectedFilters(updatedFilters);
  };

  const handleReset = () => {
    setSelectedPlayerCounts([]);
    setSelectedRating([]);
    setSelectedPlayTime([]);
    setSelectedFilters([]);
    setFilteredGames(games!);
    setPage(1);
  };

  const playerCountOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "more10",
  ];
  const ratingOptions = ["10", "9", "8", "7", "6", "5", "less5"];
  const playTimeOptions = ["less30", "30", "60", "90", "120", "150", "more180"];

  return (
    <AsideContainer>
      <header>
        <h3>보드게임 검색</h3>
      </header>
      <ChackboxContainer>
        <p>
          총 <span>{filteredGames?.length}</span>개의 게임
        </p>
        <AsideInputBox>
          <Input onSearch={handleSearch} />
        </AsideInputBox>
        <GameFilters
          selectedPlayerCounts={selectedPlayerCounts}
          selectedRating={selectedRating}
          selectedPlayTime={selectedPlayTime}
          handlePlayerCountsChange={handlePlayerCountsChange}
          handleRatingChange={handleRatingChange}
          handlePlayTimeChange={handlePlayTimeChange}
        />
      </ChackboxContainer>
      <CheckboxResultContainer>
        <CheckboxResultBox>
          {selectedFilters.map((item, index) => (
            <li key={index} onClick={() => handleDeleteFilter(item)}>
              <span>{item}</span>
              <BiX />
            </li>
          ))}
        </CheckboxResultBox>
        {selectedFilters.length !== 0 && (
          <CheckboxResetButton onClick={handleReset}>
            <BiRevision />
          </CheckboxResetButton>
        )}
      </CheckboxResultContainer>
    </AsideContainer>
  );
}
