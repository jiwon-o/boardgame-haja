import styled from 'styled-components';
import SearchIcon from '../../assets/icons/icon-search.svg';

export const InputWrapper = styled.form`
  padding: 6px 0 6px 40px;
  border-radius: 16px;
  width: 100%;
  background: url(${SearchIcon}) no-repeat left 12px center / 16px;
  background-color: ${({ theme }) => theme.colors.darkGrayColor};
  border: 1px solid transparent;

  input {
    width: calc(100% - 2.2rem);
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.whiteColor};
    line-height: 160%;

    outline: none;

    &::placeholder {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.txtSubColor};
    }
  }

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.blackColor};
    border: 1px solid ${({ theme }) => theme.colors.bdBlueColor};
  }
`;
