import React from "react";
import { Game } from "../../../types";
import { styled } from "styled-components";

const AsideNavbarWrapper = styled.div`
  width: 100%;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin: 40px 0;
  }
`;

const AsideNavLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;

  li {
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

interface Props {
  games: Game[] | null;
  selectedTheme: string | null;
  onThemeClick: (theme: string | null) => void;
}

export default function AsideNavbar({
  games,
  selectedTheme,
  onThemeClick,
}: Props) {
  const themes = [
    "전체",
    ...new Set(games?.map((game) => game.theme)),
  ] as string[];

  return (
    <AsideNavbarWrapper>
      <h2>{selectedTheme || "전체"}</h2>
      <AsideNavLists>
        {themes?.map((theme, index) => (
          <li
            key={index}
            onClick={() => onThemeClick(theme === "전체" ? null : theme)}>
            {theme}
          </li>
        ))}
      </AsideNavLists>
    </AsideNavbarWrapper>
  );
}
