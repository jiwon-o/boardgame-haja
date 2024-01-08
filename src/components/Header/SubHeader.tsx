import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BackBtn, RightButton, SubHeaderTitle, SubHeaderWrapper } from './SubHeaderStyle';

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
