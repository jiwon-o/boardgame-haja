import styled from "styled-components";
import SearchIcon from "../assets/icons/icon-search.svg";
import { useState } from "react";

const InputWrapper = styled.form`
  padding: 1rem 0 1rem 4rem;
  border-radius: 16px;
  width: 580px;
  min-width: 320px;
  background: url(${SearchIcon}) no-repeat left 1.3em center / 1.7em;
  background-color: #24244a;
  margin: 0 20px;

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
  onClickInput?(): void;
  onBlurInput?(): void;
  onSearch(term: string): void;
}

export default function Input(props: Props) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    props.onSearch(newSearch);
  };

  return (
    <InputWrapper>
      <label className="a11y">검색</label>
      <input
        value={search}
        onFocus={props.onClickInput}
        onChange={handleChange}
        autoComplete="off"
        placeholder="검색"
      />
    </InputWrapper>
  );
}
