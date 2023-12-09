import { useEffect, useState } from "react";
import { Game, SlidePxProps } from "../../types";
import { styled, css } from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Card from "./Card/Card";

const GameSlideWrapper = styled.div`
  position: relative;
`;

const GameSlideItems = styled.ul`
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const GameSlideItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArrowButtonBox = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  opacity: 0;
  transition: opacity 0.5s, top 0.5s;

  ${GameSlideWrapper}:hover & {
    top: 40%;
    opacity: 1;
  }
`;

const commonArrowBtnStyles = css`
  position: absolute;
  top: 40%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #24244a;
  box-shadow: 1px 1px 5px black;

  svg {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }

  &:hover {
    width: 45px;
    height: 45px;
  }
`;

const LeftArrowBtn = styled.button<SlidePxProps>`
  ${commonArrowBtnStyles}
  left: 0;
  transform: translate(-60%, -40%);
  display: ${(props) => (props.slidePx === 0 ? "none" : "")};
`;

const RightArrowBtn = styled.button<SlidePxProps>`
  ${commonArrowBtnStyles}
  right: 0;
  transform: translate(60%, -40%);
  display: ${(props) => (props.slidePx <= -3600 ? "none" : "")};

  svg {
    color: white;
    font-size: 20px;
    font-weight: 700;
  }

  &:hover {
    width: 45px;
    height: 45px;
  }
`;

interface Props {
  games: Game[] | null;
}

export default function GameSlide({ games }: Props) {
  const [slide, setSlide] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setInnerWidth(windowWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateSlideAmount = (width: number): number => {
    if (width > 1260) {
      return 1200;
    } else if (width > 1060) {
      return 1000;
    } else if (width > 860) {
      return 800;
    } else if (width > 660) {
      return 600;
    } else if (width > 460) {
      return 400;
    } else {
      return 200;
    }
  };

  const toPrev = () => {
    const slideAmount = calculateSlideAmount(innerWidth);

    if (slide < 0) {
      setSlide(slide + slideAmount < 0 ? slide + slideAmount : 0);
    }
  };

  const toNext = () => {
    const slideAmount = calculateSlideAmount(innerWidth);

    setSlide(slide - slideAmount);
  };

  const handleGameSlideItemClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  return (
    <GameSlideWrapper>
      <GameSlideItems className="list-items">
        {games?.map((game, idx) => (
          <GameSlideItem
            key={idx}
            onClick={() => handleGameSlideItemClick(game)}
            style={{
              transform: `translateX(${slide}px)`,
              transition: "0.5s ease",
            }}>
            <Card game={game}>
              <span>See Details</span>
            </Card>
          </GameSlideItem>
        ))}
      </GameSlideItems>
      <ArrowButtonBox>
        <LeftArrowBtn onClick={toPrev} slidePx={slide}>
          <AiOutlineLeft />
        </LeftArrowBtn>
        <RightArrowBtn onClick={toNext} slidePx={slide}>
          <AiOutlineRight />
        </RightArrowBtn>
      </ArrowButtonBox>
    </GameSlideWrapper>
  );
}
