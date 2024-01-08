import useYouTubeVideo from '../../hooks/useYoutubeVideo';
import { Game } from '../../types';
import { VideoModalBox, VideoModalDim, VideoModalWrapper, VideoWrapper } from './VideoModalStyle';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export default function VideoModal({ isOpen, onClose, game }: Props) {
  useYouTubeVideo(game.name);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <>
          <VideoModalWrapper>
            <VideoModalBox>
              <VideoWrapper id='video-container'></VideoWrapper>
            </VideoModalBox>
            <VideoModalDim onClick={onClose} />
          </VideoModalWrapper>
        </>
      )}
    </>
  );
}
