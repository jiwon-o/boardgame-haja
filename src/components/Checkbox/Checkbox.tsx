import React from 'react';
import { CheckboxContext } from '../../contexts/CheckboxContext';
import { CheckboxInput, CheckboxLabel } from './CheckboxStyle';

interface Props {
  children: React.ReactNode;
  id: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ children, id, value, checked, disabled, onChange }: Props) {
  const context = React.useContext(CheckboxContext);

  // context의 값이 항상 null이 아님을 확인하고 구조 분해 할당을 수행하기 위해
  if (!context) {
    return (
      <label>
        <input type='checkbox' id={id} checked={checked} disabled={disabled} onChange={onChange} />
        {children}
      </label>
    );
  }

  const { isChecked, toggleValue } = context;

  return (
    <>
      <CheckboxInput
        type='checkbox'
        id={id}
        checked={isChecked(value)}
        disabled={disabled}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      <CheckboxLabel htmlFor={id}>{children}</CheckboxLabel>
    </>
  );
}
