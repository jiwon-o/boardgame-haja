import styled from 'styled-components';

interface DetailWrapperProps {
  backgroundurl?: string;
}

export const DetailWrapper = styled.div``;

export const DetailContainer = styled.main<DetailWrapperProps>`
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);

  background-image: linear-gradient(90deg, rgb(20, 17, 46, 1), rgb(28, 23, 75, 1), rgb(20, 17, 46, 0.7)),
    ${(props) => (props.backgroundurl ? `url(${props.backgroundurl})` : '')};
  background-size: cover;
  background-position: center;
  padding: 40px 0;
`;

export const GameBox = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const GameThumbnail = styled.div`
  padding: 20px 40px;
  border-radius: 6px;

  img {
    width: 360px;
    border-radius: 6px;
  }
`;

export const GameDetails = styled.div`
  padding: 20px 40px;

  p {
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colors.txtParaColor};
  }
`;

export const GameTheme = styled.div`
  width: fit-content;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.navyColor};
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

export const GameTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.ttl};
  margin-top: 16px;
  line-height: 3.3rem;

  span {
    font-size: ${({ theme }) => theme.fontSize.sub};
  }
`;

export const GameSubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.txtSubColor};
  font-weight: 700;
  margin-top: 8px;
  margin-left: 4px;
`;

export const GameAttributes = styled.ul`
  display: flex;
  margin-top: 20px;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.txtParaColor};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;

  li::before {
    content: '|';
    margin: 0 20px;
    vertical-align: text-top;
  }

  li:first-child::before {
    content: '';
    margin: 0;
  }
`;

export const GameStats = styled.ul`
  display: flex;
  margin-top: 16px;
  font-size: ${({ theme }) => theme.fontSize.sub};
  gap: 20px;

  svg {
    margin-top: -4px;
  }
`;

export const ButtonBox = styled.div`
  margin-top: 40px;

  button {
    width: 180px;
    height: 44px;
    border-radius: 20px;
    color: #fff;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 600;
  }

  button:first-child {
    margin-right: 20px;
    background: linear-gradient(90deg, rgb(245, 62, 62), rgb(218, 29, 29));
    background-size: 100% 100%;
    transition: background-size 0.3s;

    &:hover {
      background-size: 300% 100%;
    }
  }

  button:nth-child(2) {
    background: linear-gradient(90deg, rgb(62, 96, 245), rgb(29, 64, 218));
    background-size: 100% 100%;
    transition: background-size 0.3s;
    margin-top: 14px;

    &:hover {
      background-size: 300% 100%;
    }
  }

  svg {
    margin-left: 6px;
  }
`;

export const GameListSection = styled.section`
  margin: 0 auto;

  h2 {
    margin: 80px 0 40px;
    font-size: ${({ theme }) => theme.fontSize.sub};
    font-weight: 700;
  }
`;
