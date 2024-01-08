import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpWrapper = styled.article`
  width: 480px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

export const SignUpHeader = styled.header`
  text-align: center;
  border-bottom: 1px solid var(--color-border);
`;

export const HeaderTitle = styled.h2`
  padding: 20px 0;

  a {
    display: inline-block;
    width: 42px;
    height: 42px;
    margin-bottom: 20px;
  }
`;

export const SignUpSection = styled.section`
  padding: 26px 24px;
  text-align: center;

  h3 {
    margin-bottom: 20px;
  }

  form {
    text-align: left;
  }
`;

export const InputLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  vertical-align: -2px;
  margin-bottom: 8px;
`;

export const SignUpInput = styled.input`
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;

  &:focus {
    outline: 2px solid #2f80ed;
  }
`;

export const SignUpButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2f80ed;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 18px;
  margin-bottom: 40px;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGrayColor};
    cursor: default;
  }
`;

export const SignupButton = styled(Link)`
  font-size: 14px;
  color: #767676;
`;

export const StyledText = styled.p`
  display: block;
  color: red;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 20px;
`;
