import Input from "./Input";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  padding: 0 1.6rem;
`;

export default function header() {
  return (
    <HeaderWrapper>
      <Input />
    </HeaderWrapper>
  );
}
