import React from "react";
import { styled } from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BackBtnProps } from "../../../types";

const SubHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const RightButton = styled.button`
  padding: 10px 16px 12px;
  border-radius: 10px;
  background-color: #383d61;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
`;

const SubHeaderTitle = styled.h2<BackBtnProps>`
  font-size: 2.4rem;
  font-weight: 700;

  margin-left: ${(props) => (props.backBtn ? "55px" : 0)};
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
  font-size: 3rem;
  color: #ececf1;

  &:hover {
    background-color: #1c174b;
  }
`;

interface Props {
  title?: string;
  btnTxt?: string;
  isBackBtn?: boolean;
  onClickBackBtn?(): void;
}

export default function SubHeader({
  title,
  btnTxt,
  isBackBtn,
  onClickBackBtn,
}: Props) {
  return (
    <SubHeaderWrapper>
      <SubHeaderTitle backBtn={isBackBtn}>{title}</SubHeaderTitle>
      {btnTxt && <RightButton>{btnTxt}</RightButton>}
      {isBackBtn && (
        <BackBtn onClick={onClickBackBtn}>
          <IoMdArrowRoundBack />
        </BackBtn>
      )}
    </SubHeaderWrapper>
  );
}
