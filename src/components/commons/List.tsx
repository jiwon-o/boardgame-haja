import { useState } from "react";
import { Game, SlidePxProps } from "../../types";
import { styled } from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { GameListWrapper } from "../units/sections/GameList";

const ListWrapper = styled.div`
  position: relative;
`;

const ListItems = styled.ul`
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const ListItem = styled.li`
  img {
    width: 180px;
    height: 250px;
    border-radius: 12px;
  }
`;

const ArrowButtonBox = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  opacity: 0;
  transition: opacity 0.5s, top 0.5s;

  ${GameListWrapper}:hover & {
    top: 40%;
    opacity: 1;
  }
`;

const LeftArrowBtn = styled.button<SlidePxProps>`
  position: absolute;
  left: 0;
  top: 40%;
  transform: translate(-60%, -40%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #24244a;
  box-shadow: 1px 1px 5px black;
  display: ${(props) => (props.slidePx === 0 ? "none" : "")};

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

const RightArrowBtn = styled.button<SlidePxProps>`
  position: absolute;
  right: 0;
  top: 40%;
  transform: translate(60%, -40%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #24244a;
  box-shadow: 1px 1px 5px black;
  display: ${(props) => (props.slidePx === -2400 ? "none" : "")};

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

  const toPrev = () => {
    if (slide < 0) setSlide(slide + 1200);
  };

  const toNext = () => {
    if (slide > -2400) setSlide(slide - 1200);
  };

  return (
    <ListWrapper>
      <h1 className="a11y">최근 게임 목록</h1>
      <ListItems>
        {games?.map((game, idx) => (
          <ListItem
            key={idx}
            style={{
              transform: `translateX(${slide}px)`,
              transition: "0.5s ease",
            }}
          >
            <img src={game.image} alt="게임 이미지" />
            <h3>{game.releaseYear}</h3>
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
