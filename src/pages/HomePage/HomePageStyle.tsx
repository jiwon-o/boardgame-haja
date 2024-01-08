import styled from 'styled-components';

export const MainContainer = styled.main`
  h2 {
    margin: 80px 0 40px;
    font-size: ${({ theme }) => theme.fontSize.sub};
    font-weight: 700;
  }
`;
