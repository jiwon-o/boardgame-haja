import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { GameRankProps } from '../../types';

export const rankColors: { [key: number]: string } = {
  1: '#d83f31',
  2: '#ee9322',
  3: '#ee9322',
};

export const GamesLayout = styled.div`
  min-width: 390px;
  padding: 32px 16px;
`;

export const MasonryContainer = styled(Masonry)`
  display: flex;
  justify-content: center;

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 28px;
    padding: 0 10px;
  }
`;

export const GameCardContainer = styled.div`
  max-width: 224px;
  position: relative;
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  & + & {
    margin-top: 20px;
  }
`;

export const GameCard = styled.div`
  position: relative;
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.navyColor};
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
  }

  &:hover {
    &::before {
      opacity: 0.4;
    }
  }
`;

export const GameRank = styled.span<GameRankProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 28px;
  min-height: 28px;
  border-radius: 50%;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.whiteColor};
  opacity: 0;
  background-color: ${(props) => rankColors[props.ranking] || '#e9b824'};

  ${GameCardContainer}:hover & {
    opacity: 1;
  }
`;

export const GameImg = styled.img`
  width: 100%;
  border-radius: 6px;
  min-height: 178px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

export const GameTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding: 16px 20px;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  line-height: 1.2em;
`;
