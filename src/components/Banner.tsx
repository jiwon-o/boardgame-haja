import styled from 'styled-components';
import { Game } from '../types';
import useYouTubeVideo from '../hooks/useYoutubeVideo';
import { useNavigate } from 'react-router-dom';

interface BannerWrapperProps {
  backgroundurl?: string;
}

const BannerWrapper = styled.div<BannerWrapperProps>`
  width: 100vw;
  height: 60vh;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  /* 배경 이미지에만 opacity를 적용하기 위한 가상 요소 설정 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => (props.backgroundurl ? `url(${props.backgroundurl})` : '')};
    background-size: cover;
    background-position: center;
    opacity: 0.5;
  }
`;

const BannerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: rgb(20, 17, 46);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.whiteColor};
  background-image: linear-gradient(90deg, rgb(20, 17, 46, 1), rgb(28, 23, 75, 0.7), rgb(20, 17, 46, 0.5));

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: #395bf4;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 700;
  }

  h3 {
    font-size: 3.6rem;
    font-weight: 700;
    margin-top: 10px;
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.txtSubColor};
  }

  button {
    width: 140px;
    padding: 12px 10px 14px 16px;
    border-radius: 10px;
    color: #fff;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 700;
    margin-top: 60px;
    background: linear-gradient(90deg, rgb(62, 96, 245), rgb(29, 64, 218));
    background-size: 100% 100%;
    transition: background-size 0.3s;

    &:hover {
      background-size: 300% 100%;
    }

    span {
      margin-left: 6px;
    }
  }

  @media screen and (max-width: 900px) {
    min-width: 560px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      margin-top: 0;
      height: fit-content;
    }
  }
`;

const VideoWrapper = styled.div`
  width: 560px;
  height: 315px;
  position: relative;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.colors.mainColor};

  iframe {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;

interface Props {
  games: Game[] | null;
}

export default function Banner({ games }: Props) {
  const topGame = games?.find((game) => game.ranking === 1);
  const gameTitle = topGame ? topGame.name : '';
  const navigate = useNavigate();
  useYouTubeVideo(gameTitle);

  const handleButtonClick = (game: Game) => {
    navigate(`/boardgame/${game.id}`, { state: { game } });
  };

  return topGame ? (
    <BannerWrapper backgroundurl={topGame.backgroundImage}>
      <BannerContainer>
        <BannerContent>
          <div>
            <h2>Today's Hot Game #1</h2>
            <h3>{topGame.name}</h3>
            <h4>{topGame.subTitle}</h4>
          </div>
          <button onClick={() => handleButtonClick(topGame)}>
            Show More <span>&gt;</span>
          </button>
        </BannerContent>
        <VideoWrapper id='video-container'></VideoWrapper>
      </BannerContainer>
    </BannerWrapper>
  ) : (
    <BannerWrapper>
      <div>No game information available.</div>
    </BannerWrapper>
  );
}
