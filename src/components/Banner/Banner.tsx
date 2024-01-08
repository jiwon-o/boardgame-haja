import { Game } from '../../types';
import useYouTubeVideo from '../../hooks/useYoutubeVideo';
import { useNavigate } from 'react-router-dom';
import { BannerContainer, BannerContent, BannerWrapper, VideoWrapper } from './BannerStyle';

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
