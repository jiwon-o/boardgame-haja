import React from 'react';
import { CheckboxContext } from '../../contexts/CheckboxContext';
import { CheckboxContainer, CheckboxFieldset } from './CheckboxGroupStyle';

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
