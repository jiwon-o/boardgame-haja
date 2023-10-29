import { useEffect, useState } from "react";
import { Game, SlidePxProps } from "../../types";
import { styled } from "styled-components";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

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

  img {
    width: 180px;
    height: 250px;
    border-radius: 12px;
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 6px;
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

  return (
    <ListWrapper>
      <h1 className="a11y">최근 게임 목록</h1>
      <ListItems className="list-items">
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
