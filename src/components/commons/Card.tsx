import { useEffect, useState } from "react";
import { Game } from "../../types";
import styled from "styled-components";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { TbRating12Plus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../../styles/pagination.css";
import CheckboxGroup from "./Checkbox/CheckboxGroup";
import Checkbox from "./Checkbox/Checkbox";

const CardWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CardContainer = styled.div`
  flex: 4;
  margin-right: 20px;
`;

const CardItems = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CardItem = styled.li`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  border: 1px solid #14112e;
  box-shadow: 0 0 10px #14112e;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: #1f1a4cd7;
    box-shadow: 3px 3px 5px black;
    border: 1px solid transparent;
  }
`;

const CardThumbnail = styled.div`
  flex: 1;
  max-width: 240px;
  min-height: 240px;
  padding: 14px;
  border-right: 1px solid #14112e;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const CardDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px;
`;

const GameTitleAndTheme = styled.div`
  margin-top: 10px;
`;

const GameTheme = styled.strong`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #24244a;
  color: #ececf1;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 1px 1px 1px #14112e;
`;

const GameTitle = styled.h3`
  font-size: 1.8rem;
  margin: 24px 0 0 6px;

  span {
    display: inline-block;
    font-size: 1.6rem;
    margin-left: 6px;
  }
`;

const GameSubTitle = styled.h4`
  font-size: 1.6rem;
  color: #7d7b9f;
  margin-top: 10px;
`;

const GamePlay = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 8px;
`;

const GamePlayItem = styled.li`
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #382f84;
  color: #ececf1;
  line-height: 20px;
  font-size: 1.4rem;
  box-shadow: 1px 1px 1px #14112e;
  svg {
    font-size: 18px;
    margin-top: -2px;
  }
`;

const GameRank = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  padding: 2px;
  font-size: 1.4rem;
  color: white;
  background-color: #606efc;
  opacity: 0;

  ${CardItem}:hover & {
    opacity: 1;
  }
`;

const AsideContainer = styled.aside`
  position: sticky;
  top: 20px;
  z-index: 2;
  flex: 1;
  max-width: 300px;
  min-width: 200px;
  border-radius: 6px;
  padding: 12px;
  background-color: #1f1a4cd7;
  box-shadow: 3px 3px 5px #14112e;
`;

const AsideLists = styled.div`
  strong {
    display: inline-block;
    margin-bottom: 12px;
  }
`;

const AsideItem = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  input {
    display: none;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    min-height: 24px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 3px;
  }

  label:hover {
    cursor: pointer;
  }

  input[type="radio"]:checked + label {
    background: #ccc;
    color: white;
  } */
`;

const AsideRadio = styled.div``;

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
}

export default function Card({ loading, error, games }: Props) {
  const navigate = useNavigate();

  const [selectedPlayerCounts, setSelectedPlayerCounts] = useState<string[]>(
    []
  );
  const [selectedRating, setSelectedRating] = useState<string[]>([]);

  const [filteredGames, setFilteredGames] = useState(games!);

  const [page, setPage] = useState<number>(1);
  const CardPerPage: number = 6;
  const indexOfLastCard: number = page * CardPerPage;
  const indexOfFirstCard: number = indexOfLastCard - CardPerPage;
  const [currentGames, setCurrentGames] = useState<Game[] | null>(null);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setFilteredGames(
      games!.filter((game) => {
        // 게임 인원 필터
        const minPlayer = parseInt(game.min_player, 10);
        const maxPlayer = parseInt(game.max_player, 10);

        const playerCountMatch =
          selectedPlayerCounts.length === 0 ||
          selectedPlayerCounts.some((value) => {
            if (value === "over10") {
              return minPlayer >= 10 || maxPlayer >= 10;
            } else {
              const selectedCount = parseInt(value, 10);
              return selectedCount >= minPlayer && selectedCount <= maxPlayer;
            }
          });

        // 게임 평점 필터
        const gameRating = parseFloat(game.rate);

        const ratingMatch =
          selectedRating.length === 0 ||
          selectedRating.some((value) => {
            if (value === "under5") {
              return gameRating < 5;
            } else if (value === "10") {
              return gameRating === 10;
            } else {
              const selectedRating = parseInt(value, 10);
              return (
                selectedRating <= gameRating && gameRating < selectedRating + 1
              );
            }
          });

        // 두 필터 모두 만족하는 게임만 반환
        return playerCountMatch && ratingMatch;
      })
    );
    setPage(1);
  }, [selectedPlayerCounts, selectedRating]);

  useEffect(() => {
    setCurrentGames(filteredGames!.slice(indexOfFirstCard, indexOfLastCard));
  }, [filteredGames, page, indexOfFirstCard, indexOfLastCard]);

  const handleCardItemClick = (game: Game) => {
    navigate(`/game/${game.id}`, { state: { game } });
  };

  const handlePlayerCountsChange = (selectedCounts: string[]) => {
    setSelectedPlayerCounts(selectedCounts);
  };

  const handleRatingChange = (selectedRating: string[]) => {
    setSelectedRating(selectedRating);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <CardWrapper>
      <CardContainer>
        {currentGames?.length === 0 ? (
          <div>해당 분류와 일치하는 보드게임이 없습니다.</div>
        ) : (
          currentGames?.map((game) => {
            return (
              <CardItems>
                <CardItem onClick={() => handleCardItemClick(game)}>
                  <CardThumbnail>
                    <img src={game.image} alt="보드게임 이미지" />
                  </CardThumbnail>
                  <CardDetail>
                    <GameTitleAndTheme>
                      <GameTheme>{game.theme}</GameTheme>
                      <GameTitle>
                        {game.name}
                        <span>({game.releaseYear})</span>
                        <GameSubTitle>{game.subTitle}</GameSubTitle>
                      </GameTitle>
                    </GameTitleAndTheme>
                    <GamePlay>
                      <GamePlayItem>
                        <IoPeopleSharp /> {game.min_player} ~ {game.max_player}
                        명
                      </GamePlayItem>
                      <GamePlayItem>
                        <AiFillStar /> {game.rate}점
                      </GamePlayItem>
                      <GamePlayItem>
                        <BiSolidTimeFive /> {game.play_time}
                      </GamePlayItem>
                      <GamePlayItem>
                        <TbRating12Plus /> {game.play_age}
                      </GamePlayItem>
                    </GamePlay>
                    <GameRank>{game.ranking}</GameRank>
                  </CardDetail>
                </CardItem>
              </CardItems>
            );
          })
        )}

        <Pagination
          activePage={page}
          itemsCountPerPage={CardPerPage}
          totalItemsCount={filteredGames.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePageChange}
        />
      </CardContainer>
      <AsideContainer>
        <h2 className="a11y">인원수, 평점, 플레이 시간에 따른 filter table</h2>
        <CheckboxGroup
          label="게임 인원"
          values={selectedPlayerCounts}
          onChange={handlePlayerCountsChange}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((playerCount) => (
            <Checkbox id={`player-${playerCount}`} value={playerCount}>
              {playerCount}명
            </Checkbox>
          ))}
          <Checkbox id={`player-over10`} value="over10">
            10명 이상
          </Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          label="게임 평점"
          values={selectedRating}
          onChange={handleRatingChange}>
          {["10", "9", "8", "7", "6", "5"].map((rating) => (
            <Checkbox id={`rating-${rating}`} value={rating}>
              {parseInt(rating) === 10
                ? `${rating}점`
                : `${rating}-${parseInt(rating) + 1}점`}
            </Checkbox>
          ))}
          <Checkbox id={`player-under5`} value="under5">
            5점 미만
          </Checkbox>
        </CheckboxGroup>
      </AsideContainer>
    </CardWrapper>
  );
}
