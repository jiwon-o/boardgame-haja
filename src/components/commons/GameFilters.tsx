import CheckboxGroup from "./Checkbox/CheckboxGroup";
import Checkbox from "./Checkbox/Checkbox";
import { styled } from "styled-components";
import { BiX, BiRevision } from "react-icons/bi";
import { Game } from "../../types";

const GameFilteresWrapper = styled.div`
  & > div:not(:first-child) {
    margin-top: 12px;
  }
`;

const CheckboxResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 12px;
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

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: T) => void;
type SelectedCounts = string[];
type SelectedRating = string[];
type SelectedPlayTime = string[];

interface Props {
  selectedPlayerCounts: SelectedCounts;
  selectedRating: SelectedRating;
  selectedPlayTime: SelectedPlayTime;
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  setSelectedPlayerCounts: Dispatch<SetStateAction<SelectedCounts>>;
  setSelectedRating: Dispatch<SetStateAction<SelectedRating>>;
  setSelectedPlayTime: Dispatch<SetStateAction<SelectedPlayTime>>;
  setFilteredGames: Dispatch<SetStateAction<Game[]>>;
  setPage: Dispatch<SetStateAction<number>>;
  games: Game[] | null;
}

export default function GameFilters({
  selectedPlayerCounts,
  selectedRating,
  selectedPlayTime,
  selectedFilters,
  setSelectedFilters,
  setSelectedPlayerCounts,
  setSelectedRating,
  setSelectedPlayTime,
  setFilteredGames,
  setPage,
  games,
}: Props) {
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
    <>
      <GameFilteresWrapper>
        <CheckboxGroup
          label="게임 인원"
          values={selectedPlayerCounts}
          onChange={handlePlayerCountsChange}>
          {playerCountOptions.map((playerCount) => (
            <Checkbox
              key={`player-${playerCount}`}
              id={`player-${playerCount}`}
              value={playerCount}>
              {playerCount === "more10" ? "10인 이상" : `${playerCount}인`}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <CheckboxGroup
          label="게임 평점"
          values={selectedRating}
          onChange={handleRatingChange}>
          {ratingOptions.map((rating) => (
            <Checkbox
              key={`rating-${rating}`}
              id={`rating-${rating}`}
              value={rating}>
              {rating === "less5"
                ? "5점 미만"
                : parseInt(rating) === 10
                ? `${rating}점`
                : `${rating}-${parseInt(rating) + 1}점`}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <CheckboxGroup
          label="게임 시간"
          values={selectedPlayTime}
          onChange={handlePlayTimeChange}>
          {playTimeOptions.map((playTime) => (
            <Checkbox id={`rating-${playTime}`} value={playTime}>
              {playTime === "less30"
                ? "30분 미만"
                : playTime === "more180"
                ? "180분 이상"
                : `${playTime}-${parseInt(playTime) + 30}분`}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </GameFilteresWrapper>

      {selectedFilters.length !== 0 && (
        <CheckboxResultContainer>
          <CheckboxResultBox>
            {selectedFilters.map((item, index) => (
              <li key={index} onClick={() => handleDeleteFilter(item)}>
                <span>{item}</span>
                <BiX />
              </li>
            ))}
          </CheckboxResultBox>
          <CheckboxResetButton onClick={handleReset}>
            <BiRevision />
          </CheckboxResetButton>
        </CheckboxResultContainer>
      )}
    </>
  );
}
