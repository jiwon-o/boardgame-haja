import { styled, css } from 'styled-components';
import { SlidepxProps } from '../../types';

export const GameSlideWrapper = styled.div`
  position: relative;
`;

export const GameSlideItems = styled.ul`
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

export const GameSlideItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ArrowButtonBox = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  opacity: 0;
  transition: opacity 0.5s, top 0.5s;

  ${GameSlideWrapper}:hover & {
    top: 40%;
    opacity: 1;
  }
`;

export const commonArrowBtnStyles = css`
  position: absolute;
  top: 40%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.darkGrayColor};
  box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.blackColor};

  svg {
    color: ${({ theme }) => theme.colors.whiteColor};
    font-size: 20px;
    font-weight: 700;
  }

  &:hover {
    width: 45px;
    height: 45px;
  }
`;

export const LeftArrowBtn = styled.button<SlidepxProps>`
  ${commonArrowBtnStyles}
  left: 0;
  transform: translate(-60%, -40%);
  display: ${(props) => (props.slidepx === 0 ? 'none' : '')};
`;

export const RightArrowBtn = styled.button<SlidepxProps>`
  ${commonArrowBtnStyles}
  right: 0;
  transform: translate(60%, -40%);
  display: ${(props) => (props.slidepx <= -3600 ? 'none' : '')};

  svg {
    color: ${({ theme }) => theme.colors.whiteColor};
    font-size: 20px;
    font-weight: 700;
  }

  &:hover {
    width: 45px;
    height: 45px;
  }
`;
