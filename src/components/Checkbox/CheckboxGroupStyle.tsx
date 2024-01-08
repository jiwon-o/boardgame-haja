import { styled } from 'styled-components';

export const CheckboxContainer = styled.div`
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.lightBlackColor};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mainColor};
    border-radius: 6px;
    margin: 2px;
  }
`;

export const CheckboxFieldset = styled.fieldset`
  display: flex;
  gap: 8px;
  position: relative;
  margin-bottom: 14px;

  legend {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: 8px;
    padding: 4px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;
