import styled from "styled-components";
import SearchIcon from "../assets/icons/icon-search.svg";
import { useState } from "react";

const InputWrapper = styled.form`
  padding: 1rem 0 1rem 4rem;
  border: 1px solid #57606a;
  border-radius: 32px;
  width: calc(100% - 480px);
  background: url(${SearchIcon}) no-repeat left 1.3em center / 1.7em;
  background-color: #282f46;

  input {
    width: calc(100% - 2.2rem);
    font-size: 1.6rem;
    color: #ececf1;
    line-height: 160%;
    outline: none;

    &::placeholder {
      font-weight: 700;
      color: #7a7e8c;
    }
  }

  &:focus-within {
    background-color: #1b1d23;
    border: 1.8px solid #528bff;
  }
`;

interface Props {
  onSearch(term: string): void;
}

export default function Input(props: Props) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    props.onSearch(newSearch);
  };
  console.log(search);
  return (
    <InputWrapper>
      <label className="a11y">검색</label>
      <input
        value={search}
        onChange={handleChange}
        autoComplete="off"
        placeholder="검색"
      />
    </InputWrapper>
  );
}
