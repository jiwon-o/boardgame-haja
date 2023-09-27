import axios from "axios";
import useAsync from "../hooks/useAsync";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import { GameRankProps } from "../types";

const rankColors: { [key: number]: string } = {
  1: "#d83f31",
  2: "#ee9322",
  3: "#ee9322",
};

const GamesLayout = styled.div`
  min-width: 390px;
`;

const MasonryContainer = styled(Masonry)`
  display: flex;
  padding: 40px 80px;

  .column {
    padding: 0 10px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  background-color: #353a75;
  border-radius: 6px;
  cursor: pointer;

  & + & {
    margin-top: 20px;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  font-size: 40px;
  font-weight: 700;
  color: #ececf1;
  border-radius: 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    background-color: #353a75;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  ${CardContainer}:hover &::before {
    opacity: 0.4;
  }
`;

const GameRank = styled.span<GameRankProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
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
  border-radius: 6px 6px 0 0;
  min-height: 178px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const GameTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 16px 8px;
  font-size: 1.4rem;
  line-height: 1.2em;
`;

const GameRate = styled.span`
  display: inline-block;
  font-weight: 400;
`;

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function Boardgames() {
  const state = useAsync(getGames, []);

  const { loading, data: games, error } = state;

  const [columns, setColumns] = useState<number>(() => {
    const width = window.innerWidth;
    if (width >= 1400) {
      return 6;
    } else if (width >= 1200) {
      return 5;
    } else if (width >= 992) {
      return 4;
    } else if (width >= 768) {
      return 3;
    } else if (width >= 480) {
      return 2;
    } else {
      return 1;
    }
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1400) {
        setColumns(6);
      } else if (width >= 1200) {
        setColumns(5);
      } else if (width >= 992) {
        setColumns(4);
      } else if (width >= 768) {
        setColumns(3);
      } else if (width >= 480) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <GamesLayout>
      {games && games.length > 0 ? (
        <MasonryContainer
          breakpointCols={columns}
          className="list"
          columnClassName="column"
        >
          {games.map((game) => (
            <CardContainer key={game.id}>
              <Card>
                <GameRank ranking={game.ranking}>{game.ranking}</GameRank>
                <GameImg src={game.image} alt={game.name} />
                <GameTitle>
                  {game.name}
                  <GameRate>{Number(game.rate).toFixed(1)}</GameRate>
                </GameTitle>
              </Card>
            </CardContainer>
          ))}
        </MasonryContainer>
      ) : (
        <p>보드게임이 아직 없습니다.</p>
      )}
    </GamesLayout>
  );
}
