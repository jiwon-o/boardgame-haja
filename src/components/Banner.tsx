import styled from "styled-components";
import { Game } from "../types";
import useYouTubeVideo from "../hooks/useYoutubeVideo";

interface BannerWrapperProps {
  backgroundurl?: string;
}

const BannerWrapper = styled.div<BannerWrapperProps>`
  width: 100vw;
  padding-top: 40%;

  position: relative;

  /* 배경 이미지에만 opacity를 적용하기 위한 가상 요소 설정 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) =>
      props.backgroundurl ? `url(${props.backgroundurl})` : ""};
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
  color: white;
  background-image: linear-gradient(
    90deg,
    rgb(20, 17, 46, 1),
    rgb(28, 23, 75, 1),
    rgb(20, 17, 46, 0.5)
  );
  padding: 40px 50px;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: #395bf4;
    font-size: 1.6rem;
    font-weight: 700;
  }

  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    margin-top: 10px;
  }

  button {
    width: 140px;
    padding: 12px 10px 14px 16px;
    border-radius: 10px;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
    background: linear-gradient(90deg, rgb(62, 96, 245), rgb(29, 64, 218));
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 1);
    margin-top: 60px;

    span {
      margin-left: 6px;
    }
  }
`;

const VideoWrapper = styled.div`
  width: 560px;
  height: 315px;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 0 0 2px #14112e;

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
  const gameTitle = topGame ? topGame.name : "";
  useYouTubeVideo(gameTitle);

  return topGame ? (
    <BannerWrapper backgroundurl={topGame.backgroundImage}>
      <BannerContainer>
        <BannerContent>
          <h1>Today's Hot Game #1</h1>
          <h2>{topGame.name}</h2>
          <button>
            Show More <span>&gt;</span>
          </button>
        </BannerContent>
        <VideoWrapper id="video-container"></VideoWrapper>
      </BannerContainer>
    </BannerWrapper>
  ) : (
    <BannerWrapper>
      <div>No game information available.</div>
    </BannerWrapper>
  );
}