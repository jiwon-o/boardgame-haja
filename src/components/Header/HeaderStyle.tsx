import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const InputContainer = styled.div`
  width: 580px;
  min-width: 320px;
  margin: 0 20px;
`;

export const LogoImage = styled(Link)`
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  padding: 4px;
  position: relative;
  margin-right: 4px;

  &::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 32px;
    top: 50%;
    right: -40%;
    transform: translateY(-50%);
    border-radius: 6px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const LinkWrapper = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  a {
    padding: 4px 6px;
    white-space: nowrap;
  }
`;

export const LoginContent = styled.div`
  display: flex;
  justify-content: right;
  gap: 12px;

  a {
    padding: 10px 16px;
    border-radius: 10px;
    white-space: nowrap;
    background-color: ${({ theme }) => theme.colors.grayColor};
    color: #fff;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 700;
  }

  .primary {
    background-color: ${({ theme }) => theme.colors.blueColor};
  }
`;
