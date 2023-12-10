import styled from "styled-components";
import SearchIcon from "../../assets/icons/icon-search.svg";
import { useState } from "react";

const InputWrapper = styled.form`
  padding: 6px 0 6px 40px;
  border-radius: 16px;
  width: 100%;
  background: url(${SearchIcon}) no-repeat left 12px center / 16px;
  background-color: #24244a;
  border: 1px solid transparent;

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
    border: 1px solid #528bff;
  }
`;

interface Props {
  onClickInput?(): void;
  onSearch(term: string): void;
}

export default function Input({ onClickInput, onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onSearch(newSearch);
  };

  return (
    <InputWrapper>
      <label className="a11y">검색</label>
      <input
        value={search}
        onFocus={onClickInput}
        onChange={handleChange}
        autoComplete="off"
        placeholder="검색"
      />
    </InputWrapper>
  );
}
