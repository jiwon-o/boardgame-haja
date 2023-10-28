import "./Modal.css";
import useYouTubeVideo from "../../../hooks/useYoutubeVideo";
import { Game } from "../../../types";
import styled from "styled-components";

const VideoWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 450px;
  border-radius: 10px;
  border: 2px solid rgb(62, 96, 245);

  iframe {
    z-index: 1;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export default function Modal({ isOpen, onClose, game }: Props) {
  useYouTubeVideo(game.name);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <VideoWrapper id="video-container"></VideoWrapper>
      </div>
    </div>
  );
}
