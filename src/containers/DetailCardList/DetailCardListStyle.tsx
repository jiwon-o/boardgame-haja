import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const CardContainer = styled.div`
  flex: 3;
  margin-right: 20px;
`;

export const AsideCategoryContainer = styled.aside`
  position: sticky;
  top: 20px;
  z-index: 2;
  flex: 1;
  min-width: 260px;
  max-width: 300px;
  border-radius: 12px;
  background: linear-gradient(-45deg, #1a1646, #1a1646);
  border: 1px solid ${({ theme }) => theme.colors.lightBlackColor};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.lightBlackColor};
`;

export const CardNotice = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
