import { useEffect, useState } from 'react';
import { Game } from '../../types';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import {
  ArrowButtonBox,
  GameSlideItem,
  GameSlideItems,
  GameSlideWrapper,
  LeftArrowBtn,
  RightArrowBtn,
} from './CardSlideStyle';

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

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
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
      <GameSlideItems className='list-items'>
        {games?.map((game, idx) => (
          <GameSlideItem
            key={idx}
            onClick={() => handleGameSlideItemClick(game)}
            style={{
              transform: `translateX(${slide}px)`,
              transition: '0.5s ease',
            }}
          >
            <Card game={game}>
              <span>See Details</span>
            </Card>
          </GameSlideItem>
        ))}
      </GameSlideItems>
      <ArrowButtonBox>
        <LeftArrowBtn onClick={toPrev} slidepx={slide}>
          <AiOutlineLeft />
        </LeftArrowBtn>
        <RightArrowBtn onClick={toNext} slidepx={slide}>
          <AiOutlineRight />
        </RightArrowBtn>
      </ArrowButtonBox>
    </GameSlideWrapper>
  );
}
