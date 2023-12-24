# BoardgameHaja - 보드게임 사이트

## 소개 및 개요

- 프로젝트 기간: 2023.10 ~ 2023.11
- 리팩토링 기간: 2023.11 ~ 2023.12
- 배포 URL: [🔗BoardgameHaja](https://boardgame-haja-a5fa098bd176.herokuapp.com/)

## 프로젝트 설명

- BoardgameHaja(BGH)는 보드게임의 규칙 및 설명을 영상으로 손쉽게 찾아볼 수 있는 반응형 웹 사이트입니다.
- 원하는 보드게임을 검색하거나 인원, 평점, 게임 시간에 따른 보드게임을 카테고리 탭에서 찾을 수 있습니다.
- 보드게임의 하는법을 바로 영상으로 볼 수 있고 원한다면 온라인으로 플레이할 수 있습니다.

## 목차

1. [기술 및 개발 환경](#기술-및-개발-환경)
2. [프로젝트 구조](#프로젝트-구조)

## 기술 및 개발 환경

- 사용한 언어: React, TypeScript
- 사용한 라이브러리/프레임워크: Styled Components
- 배포: Heroku

## 프로젝트 구조

```
🚀 boardgame-haja
├─ public
│  ├─ favicon.ico
│  └─ index.html
└─ 📂 src
  ├─ 📂 assets
  ├─ 📂 components
  │  └─ 📂 commons   ──────────────── 공통 컴포넌트
  ├─ 📂 contexts   ────────────────── 전역적인 데이터 관리
  ├─ 📂 hooks   ───────────────────── 커스텀 훅 폴더
  │  ├─ useAsync.ts
  │  ├─ useColumns.ts
  │  ├─ useDebounce.ts
  │  ├─ useInput.ts
  │  ├─ useScroll.ts
  │  ├─ useSearch.ts
  │  └─ useVideo.ts
  ├─ 📂 layouts   ─────────────────── 공통 레이아웃
  ├─ 📂 pages   ───────────────────── 페이지 폴더
  ├─ 📂 styles   ──────────────────── 전역으로 적용할 css 파일들이 포함된 폴더
  │  ├─ fonts.css
  │  ├─ GlobalStyle.js
  │  └─ pagination.css
  ├─ App.tsx
  ├─ index.tsx
  └─ types.ts
```
