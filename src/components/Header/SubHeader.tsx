import React from 'react';
import { styled } from 'styled-components';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BackBtnProps } from '../../types';

const SubHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 80px 0 40px;
`;

const RightButton = styled.button`
  padding: 10px 16px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

const SubHeaderTitle = styled.h2<BackBtnProps>`
  font-size: ${({ theme }) => theme.fontSize.sub};
  font-weight: 700;

  margin-left: ${(props) => (props.backBtn ? '55px' : 0)};
`;

const BackBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -12px;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.ttl};
  color: ${({ theme }) => theme.colors.whiteColor};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgGradientColor2};
  }
`;

interface Props {
  type: 'all' | 'rank' | 'current' | 'theme' | 'search';
  btnTxt?: string;
  isBackBtn?: boolean;
  onClickBackBtn?(): void;
}

export default function SubHeader({ type, btnTxt, isBackBtn, onClickBackBtn }: Props) {
  const TYPES = {
    all: '모든 게임',
    rank: '인기 게임',
    current: '실시간 베스트 게임',
    theme: '같은 테마 게임',
    search: '게임 검색',
  };

  return (
    <SubHeaderWrapper>
      <SubHeaderTitle backBtn={isBackBtn}>{TYPES[type]}</SubHeaderTitle>
      {btnTxt && <RightButton>{btnTxt}</RightButton>}
      {isBackBtn && (
        <BackBtn onClick={onClickBackBtn}>
          <IoMdArrowRoundBack />
        </BackBtn>
      )}
    </SubHeaderWrapper>
  );
}
