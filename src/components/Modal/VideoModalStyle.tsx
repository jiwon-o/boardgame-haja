import styled from 'styled-components';

export const VideoModalDim = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const VideoModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const VideoModalBox = styled.div`
  background-color: ${({ theme }) => theme.colors.blackColor};
  position: absolute;
  top: 45%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: clamp(600px, 80%, 1200px);
  aspect-ratio: 16/9;
  border-radius: 10px;
  border: 2px solid rgb(62, 96, 245);
`;

export const VideoWrapper = styled.div`
  iframe {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 1;
  }
`;
