---
# Claude Context Profile (CLAUD.md)
# Project: 고뮤니티 — 고민 커뮤니티 앱
# Owner: you@nayeon
# Last updated: 2025-09-11
# Purpose: Keep Claude Code + Figma MCP grounded with the same source of truth.
# Load policy:
#  - Keep under ~2–4k tokens; link out for details; rotate sections per task.
#  - Use "ACTIVE" flags to trim context when asking.
#
# Automation hints (readable by humans & scripts):
claude:
  active_sections:
    - product.brief
    - design.tokens
    - eng.conventions
    - mcp.figmake
    - tasks.todo
  style:
    language: ko
    tone: 친근하지만 프로페셔널
    code: typescript-first
  repos:
    web: ./apps/web
    design_system: ./packages/ui
  mcp:
    figma: true
    playwright: true
    sequential_thinking: true
    magic: true
    context7: true
  file_includes:
    - ./CLAUD.prompts.md
    - ./docs/api.contracts.md
# --- end front‑matter
---

## 0) TL;DR (ACTIVE)
고뮤니티는 **사람들의 ‘고민’(수면·육아·탈모 등) 선택 의사결정을 돕는 커뮤니티/큐레이션 앱**이다. 목표는 **빠른 탐색 → 근거 기반 선택 → 경험 공유의 루프**를 만든다.

**이번 스프린트 목표**
- MVP: 주제(Topic) 1개(예: 수면)로 좁혀서 **질문 작성 → 큐레이션 카드 소비 → 선택 기록(Decision Log)** 흐름 완성.
- Figma MCP로 토큰→컴포넌트 코드 스캐폴딩, Claude Code로 페이지/상태 로직 생성.

## 1) Product Brief (ACTIVE)
- **주요 페르소나**:
  1) 빠르게 구매/선택 결정을 내리고 싶은 실용형 사용자
  2) 근거와 데이터(후기, 전문가 코멘트)를 중시하는 탐구형 사용자
- **핵심 여정 (Happy Path)**: 주제 선택 → 질문 작성 → 유사 질문/답 큐레이션 보기 → 후보 비교표 → 최종 선택 → 사후 후기/수정
- **가치 지표(가설)**: 첫 방문 7분 내 ‘후보 3개 비교 완료’ 비율, 첫 72시간 내 ‘선택 기록’ 비율, 주간 재방문율

## 2) Information Model (ACTIVE)
- **Entities**: Topic, Post(Question/Guide), Answer, CurationCard, Product, Decision, User, Vote, Tag
- **Key Relations**: Topic 1—N Post, Post 1—N Answer, Decision 1—N Product(choices)
- **Minimal Fields**
  - `Decision`: { id, userId, topicId, selectedProductIds[], notes, createdAt }
  - `CurationCard`: { id, title, summary, source[], score, badges[] }

## 3) Design System Tokens (ACTIVE)
```json
{
  "color": {
    "bg": {"base": "#FFFFFF", "soft": "#F7F8FA"},
    "text": {"primary": "#111827", "secondary": "#4B5563", "brand": "#332018"},
    "accent": {"blue": "#2563EB", "green": "#10B981", "red": "#EF4444"}
  },
  "radius": {"sm": 8, "md": 12, "lg": 16, "xl": 20},
  "space": {"xs": 4, "sm": 8, "md": 12, "lg": 16, "xl": 24},
  "font": {"title": 20, "body": 14}
}
```
- Tailwind breakpoint: `xs: ~359px`, `s: 360px+` (팀 규칙 반영)
- Motion: 페이지 전환 120–180ms ease-out, 요소 hover 80–120ms

## 4) Figma MCP Profile (ACTIVE)
- **파일 기준**: `Figma: /Gomunity/DS + MVP` (페이지: Tokens, Primitives, Components, Screens)
- **Auto-mapping 룰**:
  - `ComponentName` ↔ `packages/ui/src/components/{component-name}/index.tsx`
  - Figma Variant → React prop (e.g., `size=sm|md|lg`, `tone=neutral|brand|danger`)
  - Text styles → `@/packages/ui/tokens/typography.ts`
- **MCP 요청 포맷 예시**
  - "get_code: DS/Button (variants: size[sm,md], tone[brand,neutral]) → React + Tailwind + story + tests"
  - "sync_tokens: export tokens to packages/ui/tokens/*.ts (preserve names, kebab-case)"
  - "diff: figma DS/Button ↔ code — show drift and patch"

## 5) Engineering Conventions (ACTIVE)
- **Stack**: Next.js(App Router), TypeScript, React Query, Tailwind, Radix(headless) + shadcn(ui), Prisma(Postgres)
- **Folder**
```
apps/web
  app/(routes)/
  entities/(topic|post|decision)/
  components/
packages/ui (design-system)
  src/components/{button,card,tabs,...}
  tokens/
packages/core (domain)
  src/{entities, usecases, ports}
```
- **Patterns**
  - UI = `packages/ui`, 도메인 로직 = `packages/core`, 페이지 결합 = `apps/web`
  - Query Keys: `['topic', id]`, `['post', id]`, `['decision', userId]`
  - i18n: `next-intl` (ko, en) — 문자열은 `apps/web/messages/{ko,en}.json`
- **Testing**: Playwright(E2E), Vitest(unit), Storybook(visual)
- **Telemetry**: Datadog RUM + browser-logs; Amplitude 이벤트 키 이름은 스네이크케이스

## 6) UX Rules of Thumb
- 온보딩: 첫 3분 안에 **질문 생성** 또는 **큐레이션 카드 저장** 완료를 유도
- 리스트는 **비교**에 최적화: 세로 카드 + 고정된 비교 슬롯(최대 3)
- 결정 기록은 **타임라인**과 **근거 링크**를 동시 보존

## 7) Prompts & Recipes (ACTIVE)
- **코드 생성**
  - "MCP figma.get_code로 `DS/Button`과 `DS/Card`를 가져와 `packages/ui`에 스캐폴딩. story & tests 포함."
  - "`apps/web/app/(routes)/decision/new/page.tsx` 생성: 폼 + 후보 비교 + 제출 핸들러. core/usecases 사용."
- **리팩토링**
  - "`packages/core/src/usecases/createDecision.ts`를 입력 검증+트랜잭션으로 강화하고 테스트 3개 추가."
- **테스트 작성**
  - "Playwright로 ‘질문 작성→큐레이션 3개 선택→결정 저장’ happy path 시나리오 테스트 생성."

## 8) API Contracts (link-out)
- `docs/api.contracts.md` 에 REST/GraphQL 스키마 최신본 유지
- 예시: `POST /api/decisions` → body { topicId, selectedProductIds[], notes }

## 9) Work Modes & Context Hygiene (ACTIVE)
- **길이 제한**: 본문 2–4k tokens 유지. 길어지면 아래 섹션을 비활성화.
- **스프린트 단축팩**: 이번 목표와 관련없는 섹션 `INACTIVE` 처리 후 링크만 유지.
- **대화 프롬프트 규칙**: 항상 `이번 스프린트 목표`와 `active_sections`를 상단에 붙여서 요청.

## 10) Decision Log Template
```
# Decision: <title>
- Date: YYYY-MM-DD
- Context: <why>
- Options: [A,B,C]
- Chosen: <option>
- Rationale: <bullets>
- Consequences: <short/long term>
- Revisit: <date/metric trigger>
```

## 11) Definition of Done (ACTIVE)
- [ ] Figma tokens ↔ code 동기화(자동)
- [ ] Storybook 스냅샷 pass
- [ ] Playwright happy path pass
- [ ] a11y: 버튼 type 지정, label, focus ring
- [ ] Perf: LCP < 2.5s (p75), 번들 분석 리포트 첨부

## 12) Tasks (ACTIVE)
- [ ] Figma MCP: Tokens export 파이프라인 연결
- [ ] DS: Button, Card, Tabs, SegmentedControl 1차 생성
- [ ] Page: /topic/[id], /decision/new 라우트 스캐폴딩
- [ ] Prisma schema: Topic/Post/Answer/Decision 초안
- [ ] Playwright: Happy path 1개

## 13) Links (INACTIVE)
- Figma: …
- Notion Spec: …
- Datadog Dash: …

## 14) Glossary (INACTIVE)
- **Curation Card**: 요약된 근거 카드 (출처, 점수, 배지 포함)
- **Decision Log**: 사용자가 선택 과정을 기록/공유하는 문서
