# TOYOKO Client — Agent Guide

> Talk Openly: Your Own Kind Outlet
> 다크 멘탈 케어 커뮤니티 프론트엔드

---

## 프로젝트 개요

- **레포**: `toyoko-client` (프론트엔드 전용)
- **백엔드**: 별도 NestJS 서버 (Socket.io)
- **패키지 매니저**: pnpm

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js App Router | 16.1.6 |
| UI Runtime | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS v4 + shadcn/ui | 4.2.0 |
| 서버 상태 | TanStack Query | v5 |
| 클라이언트 상태 | Zustand | v5 |
| 실시간 | socket.io-client | v4 |
| 이미지 Export | html-to-image | 1.11.13 |

## 디렉토리 구조

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout (dark mode, Providers)
│   ├── page.tsx           # 홈 플레이스홀더
│   └── globals.css        # Tailwind v4 + shadcn CSS 변수
│
├── lib/
│   ├── providers.tsx      # QueryClient Provider (client component)
│   ├── socket.ts          # socket.io 싱글턴 유틸
│   └── utils.ts           # shadcn cn() 유틸
│
└── store/
    └── auth.ts            # Zustand auth 스토어 (persist)
```

## 핵심 패턴

### 다크 모드
항상 강제 다크. `<html className="dark">` 고정. 라이트 모드 없음.

### 데이터 페칭
- REST API → TanStack Query (`useQuery`, `useMutation`)
- 실시간 이벤트 → socket.io-client

### socket.io 사용법
```ts
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";

// 로그인 후
connectSocket(token);

// 이벤트 수신
const socket = getSocket();
socket.on("new-post", handler);

// 정리
disconnectSocket();
```

### Auth 스토어
```ts
import { useAuthStore } from "@/store/auth";

const { user, token, setAuth, clearAuth } = useAuthStore();
```

### 환경 변수
- `NEXT_PUBLIC_API_URL` — 백엔드 URL (기본: `http://localhost:3001`)

## PRD 핵심 기능

| 기능 | 설명 |
|------|------|
| 블라인드 온보딩 | 익명 랜덤 닉네임 자동 부여 → 첫 감정 입력 → 메인 진입 |
| 재판장 (Arena) | 실시간 피드, [내가 졌다] / [내 인생 승리] 리액션 |
| The Abyss (랭킹) | [내가 졌다] 누적순 실시간/주간 랭킹보드 |
| 이미지 Export | 터미널/영수증 스타일 PNG — html-to-image 사용 |
| 블라인드 투표 | [선 넘음] 5개 누적 시 텍스트 모자이크 |

## 개발 명령어

```bash
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드
pnpm tsc --noEmit # 타입 체크
```

## 코드 컨벤션

- **컴포넌트**: named export, PascalCase
- **훅**: `use` 접두어, camelCase
- **파일**: kebab-case
- **import alias**: `@/` → `src/`
- **서버 컴포넌트 기본**, 상호작용 필요 시만 `"use client"`
