# 고뮤니티 (Gommunity) - Product Requirements Document

## 🎯 Product Overview

**고뮤니티**는 같은 고민을 가진 사람들 사이의 상호작용을 통해 사람들의 고민을 해결하는 제품을 빠르게 찾을 수 있는 커머스입니다.

### Core Value Proposition
사람들의 상호작용을 기반으로 한 커머스 - 고민을 해결한 사람들과 연결되어, 검증된 경험을 바탕으로 더 빠르고 쉽게 자신에게 맞는 제품을 발견하고 선택할 수 있는 탐색 중심의 소셜 커머스

### Problem We Solve
기존 커머스는 제품 중심의 탐색 경험을 제공하며, 특정 제품군은 많은 학습이 필요해 고객의 탐색 과정에서 허들이 됩니다. 고뮤니티는 이 문제를 해결합니다.

## 👥 Target Users

### 1. Taker (고민 해결자)
- 해결하지 않으면 일상적인 어려움이 예측되는 고민을 가진 고객
- 하나의 방법만으로는 해결되지 않는 복잡한 고민 보유
- 검증된 경험을 바탕으로 빠른 솔루션을 원함

### 2. Giver (경험 공유자)
- Taker보다 선제적으로 고민 해결을 시도한 경험 보유
- 이미 고민 제품을 경험하여 비교 가능
- 자신의 경험을 공유하여 다른 사람을 돕고자 함

## 📦 Product Category: 고민 제품

**정의**: 고민을 해결하기 위한 다양한 방법이 존재하며, 특정 지식을 학습해야 해결 방법을 찾을 수 있는 시장의 제품

**특징**:
- 높은 학습 곡선
- 다양한 솔루션 존재
- 경험 기반 선택이 중요
- 개인별 맞춤이 필요

## 🚀 Core Features (MVP)

### 1. 고민 포스팅
- Taker가 자신의 고민을 상세히 작성
- 카테고리 및 태그 시스템
- 고민의 심각도/긴급도 표시

### 2. 경험 공유
- Giver가 해결 경험과 사용 제품 공유
- 제품 비교 및 추천
- Before/After 스토리텔링

### 3. 제품 연결
- 공유된 경험에서 제품으로 직접 연결
- 제품 정보 및 구매 링크
- 유사 고민 해결 제품 추천

### 4. 상호작용
- 질문/답변 시스템
- 경험 평가 및 신뢰도
- 1:1 상담 요청

## 🏗 Technical Architecture

```
/app
  /api          # Backend API routes
  /(auth)       # Authentication pages
  /(main)       # Main application pages
    /posts      # 고민 포스팅
    /products   # 제품 탐색
    /profile    # 사용자 프로필

/components
  /ui           # Reusable UI components
  /features     # Feature-specific components
    /post       # 포스팅 관련
    /product    # 제품 관련
    /user       # 사용자 관련

/lib
  /api          # API client functions
  /hooks        # Custom React hooks
  /utils        # Utility functions
  /types        # TypeScript type definitions
```

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel

## 📏 Development Guidelines

### Code Standards
- **명명 규칙**: camelCase for 변수/함수, PascalCase for 컴포넌트
- **파일 구조**: feature-based organization
- **컴포넌트**: 작고 재사용 가능한 단위로 분리
- **타입 정의**: 모든 props와 API response에 TypeScript 타입 정의

### Best Practices
- Server Components 우선 사용
- Client Components는 상호작용이 필요한 경우만
- 이미지 최적화 (next/image 사용)
- SEO 최적화 (metadata 설정)
- 에러 바운더리 구현
- Loading/Error states 처리

### IMPORTANT CONSTRAINTS
- ❌ NEVER add features not in current sprint
- ❌ NO console.log in production code
- ❌ NO hardcoded values - use environment variables
- ✅ ALWAYS use existing components first
- ✅ ALWAYS handle loading and error states
- ✅ ALWAYS use TypeScript strict mode

## 📊 Success Metrics (PMF Validation)

1. **User Engagement**
   - DAU/MAU ratio > 40%
   - 평균 세션 시간 > 5분
   - 재방문율 > 30%

2. **Conversion**
   - 고민 포스팅 → 제품 구매 전환율 > 10%
   - Giver 추천 → 구매 전환율 > 20%

3. **Community Health**
   - Giver/Taker 비율 1:3
   - 고민 해결 응답 시간 < 24시간
   - 경험 공유 품질 점수 > 4.0/5.0

## 🎯 Current Sprint Focus

### Phase 1: Core MVP (Current)
- [x] Project setup and configuration
- [ ] Authentication system (Supabase)
- [ ] 고민 포스팅 CRUD
- [ ] 기본 UI/UX 구현
- [ ] Giver 경험 공유 기능

### Phase 2: Product Integration
- [ ] 제품 DB 구축
- [ ] 제품 추천 알고리즘
- [ ] 구매 연결 시스템

### Phase 3: Community Features
- [ ] 평판 시스템
- [ ] 1:1 상담
- [ ] 알림 시스템

## 🔗 External Resources

- Design System: [Figma Link - TBD]
- API Documentation: [/docs/api]
- Database Schema: [/docs/schema.sql]

## 📝 Notes for Claude

이 프로젝트는 PMF 검증 단계입니다. 핵심 기능에 집중하고, 과도한 기능 추가를 피해주세요. 사용자 경험과 빠른 이터레이션이 중요합니다.

고뮤니티는 '고민'과 '커뮤니티'의 합성어로, 고민을 함께 해결하는 공간을 의미합니다. 제품 탐색의 허들을 낮추고, 경험 기반의 신뢰할 수 있는 커머스 경험을 제공하는 것이 핵심입니다.