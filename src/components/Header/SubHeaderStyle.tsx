import styled from 'styled-components';
import { BackBtnProps } from '../../types';

export const SubHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 80px 0 40px;
`;

export const RightButton = styled.button`
  padding: 10px 16px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const SubHeaderTitle = styled.h2<BackBtnProps>`
  font-size: ${({ theme }) => theme.fontSize.sub};
  font-weight: 700;

  margin-left: ${(props) => (props.backBtn ? '55px' : 0)};
`;

export const BackBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -12px;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.ttl};
  color: ${({ theme }) => theme.colors.whiteColor};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgGradientColor2};
  }
`;
