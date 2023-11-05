import React from "react";
import { CheckboxContext } from "../../../contexts/CheckboxContext";
import { styled } from "styled-components";

const CheckboxContainer = styled.div`
  width: 100%;
  overflow: auto;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: #14112e;
  }

  &::-webkit-scrollbar-thumb {
    background: #606efc;
    border-radius: 6px;
    margin: 2px;
  }
`;

const CheckboxFieldset = styled.fieldset`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  position: relative;

  legend {
    font-size: 1.4rem;
    margin-bottom: 16px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: #18133f; /* 배경색을 적절히 설정 */
    z-index: 1;
    max-width: 200px; /* 필요에 따라 너비 설정 */
  }
`;

interface CheckboxGroupProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxGroup({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange,
}: CheckboxGroupProps) {
  const isDisabled = (disabled: boolean) => disabled || groupDisabled;

  const isChecked = (value: string) => values.includes(value);

  const toggleValue = ({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <CheckboxContainer>
      <CheckboxFieldset>
        <legend>{label}</legend>
        <CheckboxContext.Provider
          value={{ isDisabled, isChecked, toggleValue }}>
          {children}
        </CheckboxContext.Provider>
      </CheckboxFieldset>
    </CheckboxContainer>
  );
}
