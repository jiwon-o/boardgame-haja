import { useState } from 'react';
import { InputWrapper } from './InputStyle';

interface Props {
  onClickInput?(): void;
  onSearch(term: string): void;
}

export default function Input({ onClickInput, onSearch }: Props) {
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onSearch(newSearch);
  };

  return (
    <InputWrapper>
      <label className='a11y'>검색</label>
      <input value={search} onFocus={onClickInput} onChange={handleChange} autoComplete='off' placeholder='검색' />
    </InputWrapper>
  );
}
