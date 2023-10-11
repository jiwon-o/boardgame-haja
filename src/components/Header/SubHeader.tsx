import React from "react";
import { styled } from "styled-components";

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
  }

  button {
    padding: 10px 16px 12px;
    border-radius: 10px;
    background-color: #383d61;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

interface Props {
  title: string;
  btnTxt: string;
}

export default function SubHeader({ title, btnTxt }: Props) {
  return (
    <SubHeaderWrapper>
      <h2>{title}</h2>
      <button>{btnTxt}</button>
    </SubHeaderWrapper>
  );
}
