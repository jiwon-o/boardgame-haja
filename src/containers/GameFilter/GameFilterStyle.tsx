import { styled } from 'styled-components';

export const GameFilterWrapper = styled.div`
  width: 100%;
  background: linear-gradient(-45deg, #1a1646, #1a1646);
  border: 1px solid ${({ theme }) => theme.colors.lightBlackColor};
  border-radius: 12px;

  header {
    width: 100%;
    padding: 14px;
    background-color: ${({ theme }) => theme.colors.navyColor};
    border-radius: 12px 12px 0 0;
  }

  h3 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  p {
    text-align: end;
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: 12px;

    span {
      color: ${({ theme }) => theme.colors.mainColor};
      font-weight: 700;
    }
  }
`;

export const AsideInputBox = styled.div`
  margin-bottom: 24px;
`;

export const GameFilterBox = styled.div`
  padding: 14px;

  & > div:not(:first-child) {
    margin-top: 12px;
  }
`;

export const CheckboxResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 12px;
`;

export const CheckboxResultBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  li {
    padding: 4px 2px 2px 8px;
    background-color: ${({ theme }) => theme.colors.navyColor};
    border-radius: 6px;
    font-size: ${({ theme }) => theme.fontSize.xs};

    span {
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.whiteColor};
      font-weight: 300;
    }

    svg {
      margin-left: 2px;
      color: ${({ theme }) => theme.colors.redColor};
      font-size: ${({ theme }) => theme.fontSize.xl};
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const CheckboxResetButton = styled.button`
  svg {
    font-size: ${({ theme }) => theme.fontSize.sub};
    color: ${({ theme }) => theme.colors.whiteColor};
  }
`;
