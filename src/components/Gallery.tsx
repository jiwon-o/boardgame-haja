import styled from "styled-components";
import Masonry from "react-masonry-css";
import { GameRankProps } from "../types";
import useColumns from "../hooks/useColumns";
import { Game } from "../types";
import useSearch from "../hooks/useSearch";
import useScroll from "../hooks/useScroll";
import { useState } from "react";
import Modal from "./Modal";
import Detail from "../pages/Detail";

const rankColors: { [key: number]: string } = {
  1: "#d83f31",
  2: "#ee9322",
  3: "#ee9322",
};

const GamesLayout = styled.div`
  min-width: 390px;
  padding: 32px 16px;
`;

const MasonryContainer = styled(Masonry)`
  display: flex;
  justify-content: center;

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 28px;
    padding: 0 10px;
  }
`;

const CardContainer = styled.div`
  max-width: 224px;
  position: relative;
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ececf1;
  cursor: pointer;
  & + & {
    margin-top: 20px;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    background-color: #353a75;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
  }

  &:hover {
    &::before {
      opacity: 0.4;
    }
  }
`;

const GameRank = styled.span<GameRankProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  padding: 0 6px 0 5px;
  border-radius: 50%;
  font-size: 1.8rem;
  color: white;
  opacity: 0;
  background-color: ${(props) => rankColors[props.ranking] || "#e9b824"};

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const GameImg = styled.img`
  width: 100%;
  border-radius: 6px;
  min-height: 178px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

const GameTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 16px 20px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2em;
`;

interface Props {
  loading: boolean;
  error: Error | null;
  games: Game[] | null;
  searchGame: string;
}

export default function Gallery({ loading, error, games, searchGame }: Props) {
  const columns = useColumns();
  const searchGames = useSearch();
  const dataCount = useScroll(50);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const openModal = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredGames = games?.filter((game) => {
    return (
      searchGames(searchGame, game.name) ||
      searchGames(searchGame, game.subTitle)
    );
  });

  const pagedGames = filteredGames?.slice(0, dataCount);

  const generateImageUrl = (imageUrl: string, size: number) => {
    if (imageUrl.endsWith(".jpg")) {
      return imageUrl.replace(".jpg", `_N_${size}x${size}_100_5_.jpg`);
    } else if (imageUrl.endsWith(".png")) {
      return imageUrl.replace(".png", `_N_${size}x${size}_100_5_.png`);
    }
    return imageUrl;
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <GamesLayout>
      {pagedGames && pagedGames.length > 0 ? (
        <MasonryContainer
          breakpointCols={columns}
          className="list"
          columnClassName="column"
        >
          {pagedGames.map((game: Game) => {
            // const imageUrl = generateImageUrl(game.image, 200);

            return (
              <CardContainer key={game.id} onClick={() => openModal(game)}>
                <Card>
                  <GameRank ranking={game.ranking}>{game.ranking}</GameRank>
                  <GameImg
                    src={
                      // game.image.includes("boardlife.co.kr")
                      //   ? imageUrl
                      //   : game.image
                      game.image
                    }
                    alt={game.name}
                  />
                </Card>
                <GameTitle>{game.name}</GameTitle>
                <h5 className="a11y">{game.subTitle}</h5>
              </CardContainer>
            );
          })}
        </MasonryContainer>
      ) : (
        <p>보드게임을 찾지 못했습니다.</p>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedGame && <Detail />}
        </Modal>
      )}
    </GamesLayout>
  );
}
