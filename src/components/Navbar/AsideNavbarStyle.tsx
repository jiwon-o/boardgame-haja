import { styled } from 'styled-components';

export const AsideNavbarWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.ttl};
    font-weight: 700;
    margin: 40px 0 56px;
  }
`;

export const AsideNavLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 6px;

  li {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 300;
  }
`;
