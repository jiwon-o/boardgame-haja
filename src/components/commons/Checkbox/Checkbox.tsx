import React from "react";
import { CheckboxContext } from "../../../contexts/CheckboxContext";
import { styled } from "styled-components";

const CheckboxInput = styled.input`
  display: none;

  &[type="checkbox"]:checked + label {
    background: #606efc;
    border: 1px solid #606efc;
    color: white;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 24px;
  padding: 8px 14px;
  border: 1px solid #42389e;
  border-radius: 10px;
  font-size: 1.3rem;
  white-space: nowrap;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  children: React.ReactNode;
  id: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  children,
  id,
  value,
  checked,
  disabled,
  onChange,
}: Props) {
  const context = React.useContext(CheckboxContext);

  // context의 값이 항상 null이 아님을 확인하고 구조 분해 할당을 수행하기 위해
  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        {children}
      </label>
    );
  }

  const { isChecked, toggleValue } = context;

  return (
    <>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={isChecked(value)}
        disabled={disabled}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      <CheckboxLabel htmlFor={id}>{children}</CheckboxLabel>
    </>
  );
}
