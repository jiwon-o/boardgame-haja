import React from 'react';
import { CheckboxContext } from '../../contexts/CheckboxContext';
import { styled } from 'styled-components';

const CheckboxContainer = styled.div`
  width: 100%;
  overflow: auto;

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
  position: relative;
  margin-bottom: 14px;

  legend {
    font-size: 1.4rem;
    margin-bottom: 8px;
    padding: 4px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
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

  const toggleValue = ({ checked, value }: { checked: boolean; value: string }) => {
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
        <CheckboxContext.Provider value={{ isDisabled, isChecked, toggleValue }}>{children}</CheckboxContext.Provider>
      </CheckboxFieldset>
    </CheckboxContainer>
  );
}
