import { styled } from 'styled-components';

export const CardWrapper = styled.div`
  width: 180px;

  &:hover {
    cursor: pointer;
  }
`;

export const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: 6px;
  padding: 0 16px;
  line-height: 20px;
  text-align: center;
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    transition: transform 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover > div.overlay {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  content: '';
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 0 0 3px ${({ theme }) => theme.colors.bdBlueColor};
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3ms;
  z-index: 2;
`;
