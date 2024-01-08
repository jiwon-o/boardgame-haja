import { styled } from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.lightBlackColor};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.lightBlackColor};
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.bgHoverColor};
    box-shadow: 3px 3px 5px ${({ theme }) => theme.colors.blackColor};
    border: 1px solid transparent;
  }
`;

export const CardThumbnail = styled.div`
  max-width: 220px;
  max-height: 220px;
  width: 100%;
  height: 100%;
  padding: 14px;
  border-right: 1px solid ${({ theme }) => theme.colors.lightBlackColor};
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
  }
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px;
`;

export const GameTitleAndTheme = styled.div`
  margin-top: 10px;
`;

export const GameTheme = styled.strong`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.darkGrayColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  box-shadow: 1px 1px 1px ${({ theme }) => theme.colors.lightBlackColor};
`;

export const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 24px 0 0 6px;

  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin-left: 6px;
  }
`;

export const GameSubTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.txtSubColor};
  margin: 10px 0 0 6px;
`;

export const GamePlay = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 8px;
`;

export const GamePlayItem = styled.li`
  padding: 8px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.navyColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  line-height: 20px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  box-shadow: 1px 1px 1px ${({ theme }) => theme.colors.lightBlackColor};
  svg {
    font-size: 18px;
    margin-top: -2px;
  }
`;

export const GameRank = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  padding: 2px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.whiteColor};
  background-color: ${({ theme }) => theme.colors.mainColor};
  opacity: 0;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;
