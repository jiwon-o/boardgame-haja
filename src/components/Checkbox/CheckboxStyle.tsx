import { styled } from 'styled-components';

export const CheckboxInput = styled.input`
  display: none;

  &[type='checkbox']:checked + label {
    background: ${({ theme }) => theme.colors.mainColor};
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.whiteColor};
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 24px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.bdNavyColor};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  white-space: nowrap;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;
