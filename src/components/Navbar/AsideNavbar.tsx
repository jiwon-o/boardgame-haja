import { useEffect } from 'react';
import { styled } from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const AsideNavbarWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.ttl};
    font-weight: 700;
    margin: 40px 0 56px;
  }
`;

const AsideNavLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-left: 6px;

  li {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 300;
  }
`;

interface Props {
  themes: string[];
  setSelectedTheme: (theme: string | null) => void;
}

export default function AsideNavbar({ themes, setSelectedTheme }: Props) {
  const { theme } = useParams<{ theme?: string }>();

  useEffect(() => {
    theme && handleSelectedTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const handleSelectedTheme = (selectedTheme: string) => {
    if (selectedTheme === '전체') {
      setSelectedTheme(null);
    } else {
      setSelectedTheme(selectedTheme);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AsideNavbarWrapper>
      <h2>{theme === '전체' ? '카테고리' : theme}</h2>
      <AsideNavLists>
        {themes.map((theme, index) => (
          <li key={index}>
            <Link to={`/categories/${encodeURIComponent(theme)}`} onClick={() => handleSelectedTheme(theme)}>
              {theme}
            </Link>
          </li>
        ))}
      </AsideNavLists>
    </AsideNavbarWrapper>
  );
}
