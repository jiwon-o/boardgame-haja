import React, { ReactNode } from "react";
import styled from "styled-components";

const CardAsideNav = styled.aside`
  position: sticky;
  overflow-y: auto;
  top: 20px;
  z-index: 2;
  flex: 1;
  max-width: 300px;
  max-height: 300px;
  min-width: 200px;
  border-radius: 6px;
  padding: 12px;
  background-color: #1f1a4cd7;
  box-shadow: 3px 3px 5px #14112e;
`;

interface Props {
  children: ReactNode;
}

export default function AsideNav({ children }: Props) {
  return <CardAsideNav>{children}</CardAsideNav>;
}
