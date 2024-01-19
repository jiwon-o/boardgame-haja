# BoardgameHaja - 보드게임 사이트

<br />

## **소개 및 개요**

- 프로젝트 기간: 2023.10 ~ 2023.11
- 리팩토링 기간: 2023.12 ~ 2024.01
- 배포 URL: [🔗BoardgameHaja](https://boardgame-haja-a5fa098bd176.herokuapp.com/)

<br />

## **프로젝트 설명**

- BoardgameHaja(BGH)는 보드게임의 규칙 및 설명을 영상으로 손쉽게 찾아볼 수 있는 반응형 웹 사이트입니다.
- 원하는 보드게임을 검색하거나 인원, 평점, 게임 시간에 따른 보드게임을 카테고리 탭에서 찾을 수 있습니다.
- 보드게임의 하는법을 바로 영상으로 볼 수 있고 원한다면 온라인으로 플레이할 수 있습니다.

<br />

## **목차**

1. [기술 및 개발 환경](#기술-및-개발-환경)
2. [프로젝트 구조](#프로젝트-구조)

<br />

## **개발 환경 및 기술 스택**

- 개발 환경: React, TypeScript, Axios, styled-components
- 버전 및 이슈 관리: Git, Github
- 컨벤션: eslint, prettier
- 배포: Heroku

<br />

### **컨벤션**

#### **eslint**

```json
{
  "extends": ["react-app", "prettier"],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }], // 들여쓰기 2칸만 허용
    "no-var": "error", // // var 키워드 사용 금지
    "require-await": "error", // async 함수 내부에 await 키워드가 없으면 오류 발생
    "eqeqeq": "warn", // ==, != 대신에 ===, !== 사용
    "react/prop-types": 0, // 프롭스 타입 무시
    "no-unused-vars": "off" // 호출되지 않은 변수도 사용 가능하게 설정
  }
}
```

#### **prettier**

```json
{
  "bracketSpacing": true, // 객체 리터럴에서 괄호에 공백 삽입
  "jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  "jsxSingleQuote": true, // JSX에 홑따옴표 사용 여부
  "singleQuote": true, // 홑따옴표 사용 여부
  "proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  "semi": true, // 세미콜론 사용 여부
  "printWidth": 100, // 줄 바꿈 할 폭 길이
  "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름
  "useTabs": false, // 탭 사용 여부
  "tabWidth": 2, // 탭 너비
  "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "arrowParens": "always" // 화살표 함수 괄호 사용 여부
}
```

<br />

#### **커밋 컨벤션**

```
✨ feat: 기능 추가, 삭제, 변경
🐛 fix: 버그, 오류 수정
📝 docs: readme.md, json 파일 등 수정, 라이브러리 설치 (문서 관련, 코드 수정 없음)
🎨 style: CSS 등 사용자 UI 디자인 변경 (제품 코드 수정 발생, 코드 형식, 정렬 등의 변경)
♻️ refactor: 코드 리팩토링
🧪 test: 테스트 코드 추가, 삭제, 변경 등 (코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
⚙️ config: npm 모듈 설치 등
🌱 chore: 패키지 매니저 설정할 경우, etc 등 (ex. gitignore)
💬 comment:	필요한 주석 추가 및 변경
🚚 rename:	파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
🚚 remove:	파일을 삭제하는 작업만 수행한 경우
```

<br/>

#### **Styled Components 컨벤션**

```
wrapper: ~Wrapper
ex) HeaderWrapper, NavbarWrapper

wrapper가 필요없는 이름과 스타일드 컴포넌트 이름이 같을 경우: Styled~
ex) StyledInput, StyledButton

div태그: ~Box
ex) InfoBox, ContentBox

4. section태그: ~Section
ex) InfoSection, ContentSection

5. ul태그: ~List
ex) InfoList, ContentList

6. li태그: ~Item
ex) InfoItem, ContentItem

중첩은 최대 2단계까지만
ex - list { li{ a{} } }까지

li내에 스타일할 요소가 3개이상이면 li를 Item으로 빼기
```

<br />

## **프로젝트 구조**

```
🚀 boardgame-haja
├─ public
│  ├─ favicon.ico
│  └─ index.html
└─ 📂 src
  ├─ 📂 assets   ──────────────────── 폰트, 이미지 등 정적 리소스
  ├─ 📂 components   ──────────────── 공통 컴포넌트
  ├─ 📂 containers   ──────────────── 여러 컴포넌트의 상태 로직을 연결하는 컴포넌트
  │  ├─ CardList
  │  ├─ CardSlide
  │  ├─ DetailCardList
  │  ├─ Gallery
  │  └─ GameFilter
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
  │  ├─ pagination.css
  │  └─ theme.ts
  ├─ App.tsx
  ├─ custom.d.ts
  ├─ index.tsx
  └─ types.ts
```
