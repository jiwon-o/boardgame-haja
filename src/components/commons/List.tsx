import { useEffect, useState } from "react";
import { Game, SlidePxProps } from "../../types";
import { styled, css } from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ListWrapper = styled.div`
  position: relative;
`;

const ListItems = styled.ul`
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 6px;
    padding: 0 16px;
    line-height: 20px;
    text-align: center;
  }
`;

const ImageBox = styled.div`
  width: 180px;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    transition: transform 0.3s;
  }

  &::before {
    content: "See Details";
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 700;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: inset 0 0 0 3px #3e60f5;
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3ms;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ArrowButtonBox = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  opacity: 0;
  transition: opacity 0.5s, top 0.5s;

  ${ListWrapper}:hover & {
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
export default function List({ games }: Props) {
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

  const handleListItemClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  return (
    <ListWrapper>
      <h1 className="a11y">최근 게임 목록</h1>
      <ListItems className="list-items">
        {games?.map((game, idx) => (
          <ListItem
            key={idx}
            onClick={() => handleListItemClick(game)}
            style={{
              transform: `translateX(${slide}px)`,
              transition: "0.5s ease",
            }}>
            <ImageBox>
              <img src={game.image} alt="게임 이미지" />
            </ImageBox>
            <h3>{game.name}</h3>
          </ListItem>
        ))}
      </ListItems>
      <ArrowButtonBox>
        <LeftArrowBtn onClick={toPrev} slidePx={slide}>
          <AiOutlineLeft />
        </LeftArrowBtn>
        <RightArrowBtn onClick={toNext} slidePx={slide}>
          <AiOutlineRight />
        </RightArrowBtn>
      </ArrowButtonBox>
    </ListWrapper>
  );
}
