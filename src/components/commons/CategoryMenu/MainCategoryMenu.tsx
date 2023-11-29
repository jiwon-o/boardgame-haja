import { useState, useEffect } from "react";
import { Game } from "../../../types";
import GameFilters from "../GameFilters";
import useInput from "../../../hooks/useInput";
import useSearch from "../../../hooks/useSearch";
import { styled } from "styled-components";

const MainCategoryMenuWrapper = styled.div`
  background: linear-gradient(-45deg, #1a1646, #1a1646);
  border: 1px solid #14112e;
  padding: 24px 24px 12px;
  border-radius: 12px;

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

  p {
    text-align: end;
    font-size: 1.6rem;
    margin-bottom: 12px;

    span {
      color: #606efc;
      font-weight: 600;
    }
  }
`;

interface Props {
  games: Game[] | null;
  filteredGames: Game[] | null;
  setFilteredGames?: any;
  setPage?: any;
}

export default function MainCategoryMenu({
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

  return (
    <MainCategoryMenuWrapper>
      <header>
        <h3>보드게임 검색</h3>
      </header>
      <p>
        총 <span>{filteredGames?.length}</span>개의 게임
      </p>
      <GameFilters
        selectedPlayerCounts={selectedPlayerCounts}
        selectedRating={selectedRating}
        selectedPlayTime={selectedPlayTime}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setSelectedPlayerCounts={setSelectedPlayerCounts}
        setSelectedRating={setSelectedRating}
        setSelectedPlayTime={setSelectedPlayTime}
        setFilteredGames={setFilteredGames}
        setPage={setPage}
        games={games}
      />
    </MainCategoryMenuWrapper>
  );
}
