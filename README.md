# Multi Stock Management

주식 포트폴리오 관리를 위한 웹 애플리케이션입니다.

## 주요 기능

### 1. 주식 관리
- 주식 매수/매도 기록 등록
- 국내/해외 주식 통합 관리
- 실시간 환율 정보 제공
- 미국 주식 시장 정보 제공

### 2. 포트폴리오 통계
- 증권사별 자산 분포
- 국가별 자산 분포
- 종목별 자산 분포
- 차트 및 테이블 형태의 데이터 시각화

### 3. 설정 관리
- 국가, 증권사, 종목 데이터 관리
- 데이터 백업/복원 (JSON, Excel)
- 비밀번호 보안 설정

## 기술 스택

- React + TypeScript
- React Router DOM
- TanStack Query
- Recharts
- Tailwind CSS
- shadcn/ui

## 시작하기

```bash
# 저장소 클론
git clone https://github.com/username/multi-stock.git

# 디렉토리 이동
cd multi-stock

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
multi-stock/
├── src/
│   ├── components/
│   │   ├── layout/      # 레이아웃 컴포넌트
│   │   ├── settings/    # 설정 관련 컴포넌트
│   │   ├── statistics/  # 통계 관련 컴포넌트
│   │   ├── stock/       # 주식 관련 컴포넌트
│   │   └── ui/          # 기본 UI 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   ├── pages/           # 페이지 컴포넌트
│   └── types/           # TypeScript 타입 정의
```

## 보안

- 비밀번호 기반의 접근 제어
- 모든 데이터는 로컬 스토리지에 저장
- 민감한 데이터 암호화 처리

## 라이선스

MIT License

## 제작자

나종춘
