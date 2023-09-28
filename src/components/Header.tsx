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

interface Props {
  onSearch(term: string): void;
}

export default function header(props: Props) {
  return (
    <HeaderWrapper>
      <Input onSearch={props.onSearch} />
    </HeaderWrapper>
  );
}
