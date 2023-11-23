import CheckboxGroup from "./Checkbox/CheckboxGroup";
import Checkbox from "./Checkbox/Checkbox";

interface Props {
  selectedPlayerCounts: string[];
  selectedRating: string[];
  selectedPlayTime: string[];
  handlePlayerCountsChange: (selectedCounts: string[]) => void;
  handleRatingChange: (selectedRating: string[]) => void;
  handlePlayTimeChange: (selectedPlayTime: string[]) => void;
}

export default function GameFilters({
  selectedPlayerCounts,
  selectedRating,
  selectedPlayTime,
  handlePlayerCountsChange,
  handleRatingChange,
  handlePlayTimeChange,
}: Props) {
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
    </>
  );
}
