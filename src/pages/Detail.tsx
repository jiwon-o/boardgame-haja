import styled from "styled-components";
import { Game } from "../types";
import useYouTubeVideo from "../hooks/useYoutubeVideo";

interface DetailContainerProps {
  backgroundurl?: string;
}

const DetailWrapper = styled.div<DetailContainerProps>`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.backgroundurl ? `url(${props.backgroundurl})` : ""};
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 4px #332986;
`;

const DetailContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: rgb(28, 23, 75);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.9) 75%,
    rgba(0, 0, 0, 0.8)
  );
  border-radius: 5px;
  padding: 40px 50px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 50%;
  box-shadow: 0 0 0 5px red;

  iframe {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  game: Game;
}

export default function Detail({ game }: Props) {
  useYouTubeVideo(game.name);

  if (!game) return <div>게임 정보가 없습니다.</div>;

  return (
    <DetailWrapper backgroundurl={game.backgroundImage}>
      <DetailContainer>
        <VideoWrapper id="video-container"></VideoWrapper>
        <div>
          <h2>{game.rate}</h2>
          <h2>{game.name}</h2>
          <p>{game.ranking}</p>
        </div>
      </DetailContainer>
    </DetailWrapper>
  );
}
