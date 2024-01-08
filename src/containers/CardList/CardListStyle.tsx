import { styled } from 'styled-components';

export const GameListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  place-items: center;
  align-items: start;
  margin-top: 24px;
  padding-bottom: 24px;
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  margin-top: 20px;
`;

export const GameTitle = styled.h3`
  max-width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.8rem;
  margin-bottom: 6px;
`;

export const GameReleaseYear = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 16px;
`;

export const GameRankAndRate = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: 16px;
`;

export const GamePlay = styled.ul`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.xs};
  white-space: nowrap;

  li {
    margin-right: 4px;

    &:not(:last-child) {
      &::after {
        content: '|';
        margin-left: 4px;
      }
    }
  }
`;

export const GameTheme = styled.strong`
  position: absolute;
  top: 8px;
  right: 8px;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.darkGrayColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
`;

export const CardNotice = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
