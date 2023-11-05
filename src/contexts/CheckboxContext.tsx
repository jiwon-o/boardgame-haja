import { createContext } from "react";

type CheckboxContextType = {
  isDisabled: (disabled: boolean) => boolean | undefined;
  isChecked: (value: string) => boolean;
  toggleValue: (args: { checked: boolean; value: string }) => void;
};

export const CheckboxContext = createContext<CheckboxContextType | null>(null);
