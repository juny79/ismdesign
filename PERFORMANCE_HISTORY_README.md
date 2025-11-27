# 연도별 사업실적 페이지 구현 문서

## 📋 구현 개요

About Us 페이지의 "연도별 사업실적" 탭에 아코디언 기능을 갖춘 프로젝트 히스토리 섹션을 구현했습니다.

## 🎯 주요 기능

### 1. 연도별 아코디언 (Year-based Accordion)
- **기능**: 연도를 클릭하면 해당 연도의 프로젝트 리스트가 펼쳐지고 접힘
- **애니메이션**: GSAP ScrollTrigger를 활용한 스크롤 기반 fade-in 효과
- **UI**: 연도별 프로젝트 수 표시 (예: "2024 - 8 projects")

### 2. 포트폴리오 연결
- **View 버튼**: 포트폴리오가 있는 프로젝트에만 "View" 버튼 표시
- **자동 매핑**: `data/projectHistory.json`의 `portfolioFolder` 값으로 자동 연결
- **연결된 프로젝트**:
  - 2024: 광주 봉산공원 (24_gjbs_113)
  - 2023: 평택 가재지구 (23_ptgj_113)
  - 2022: 하남 감일지구 (22_hngi_84)
  - 2021: 고덕 강일지구 (21_kdgi_101)
  - 2020: 위례 일상 (20_wris_77)

### 3. 포트폴리오 상세 페이지
- **동적 라우팅**: `/portfolio/[id]` 형태로 각 프로젝트 폴더에 접근
- **이미지 갤러리**: 그리드 레이아웃으로 모든 이미지 표시
- **라이트박스**: 이미지 클릭 시 전체 화면 모달로 확대
- **반응형**: 모바일, 태블릿, 데스크탑에 최적화

## 📁 파일 구조

```
ismdesign/
├── pages/
│   ├── about.js (업데이트됨)
│   └── portfolio/
│       └── [id].js (새로 생성)
├── styles/
│   ├── About.module.css (업데이트됨)
│   └── PortfolioDetail.module.css (새로 생성)
├── data/
│   └── projectHistory.json (새로 생성)
└── public/
    └── portfolio/
        ├── 24_gjbs_113/ (g1-g10.jpg)
        ├── 23_ptgj_113/ (p1_new-p10_new.jpg)
        ├── 22_hngi_84/ (h1-h10.jpg)
        ├── 21_kdgi_101/ (k1-k10.jpg)
        └── 20_wris_77/ (w1-w10.jpg)
```

## 🔧 기술 스택

### 1. 프론트엔드 프레임워크
- **Next.js**: 동적 라우팅 (`/portfolio/[id]`)
- **React Hooks**: useState, useEffect, useRef

### 2. 애니메이션
- **GSAP**: 스크롤 트리거 애니메이션
- **ScrollTrigger**: 연도 블록 등장 효과
- **CSS Transitions**: 아코디언 열기/닫기, 호버 효과

### 3. 데이터 관리
- **JSON 파일**: `data/projectHistory.json`으로 중앙 관리
- **자동 매핑**: 폴더명과 프로젝트 데이터 연결

## 🎨 디자인 특징

### 1. 아코디언 UI
```css
- 연도 헤더: 32px 폰트, #ff8c5a 색상
- 프로젝트 수: 회색 작은 텍스트
- 토글 아이콘: + (닫힘) / − (열림)
- 호버 효과: 오렌지 그라데이션 배경
```

### 2. 프로젝트 리스트
```css
- 발주처: 14px, 연한 회색
- 사업명: 16px, 흰색
- View 버튼: 오렌지 그라데이션, 그림자 효과
- 호버: 왼쪽으로 8px 이동
```

### 3. 포트폴리오 상세 페이지
```css
- 그리드: repeat(auto-fill, minmax(400px, 1fr))
- 이미지 비율: 4:3 (padding-bottom: 75%)
- 호버: scale(1.1) + translateY(-8px)
- 라이트박스: rgba(0, 0, 0, 0.95) 배경
```

## 📊 데이터 구조 (projectHistory.json)

```json
{
  "2024": [
    {
      "client": "봉산공원개발㈜ 주식회사",
      "title": "광주 봉산공원 첨단 제일풍경채 단지내테 인테리어 설계용역",
      "hasPortfolio": true,
      "portfolioFolder": "24_gjbs_113"
    }
  ]
}
```

### 필드 설명
- **client**: 발주처 이름
- **title**: 사업명
- **hasPortfolio**: 포트폴리오 존재 여부 (boolean)
- **portfolioFolder**: 포트폴리오 폴더명 (public/portfolio/ 하위)

## 🔄 작동 원리

### 1. 아코디언 열기/닫기
```javascript
const [openYears, setOpenYears] = useState({});

const toggleYear = (year) => {
  setOpenYears(prev => ({
    ...prev,
    [year]: !prev[year]
  }));
};
```

### 2. 포트폴리오 링크 생성
```javascript
const getPortfolioLink = (project) => {
  if (project.hasPortfolio && project.portfolioFolder) {
    return `/portfolio/${project.portfolioFolder}`;
  }
  return null;
};
```

### 3. GSAP 스크롤 애니메이션
```javascript
gsap.fromTo(
  yearBlocks,
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      once: true
    }
  }
);
```

## 📱 반응형 디자인

### 모바일 (< 768px)
- 1열 그리드
- 프로젝트 정보 세로 정렬
- 작은 폰트 크기
- View 버튼 왼쪽 정렬

### 태블릿 (769px - 1024px)
- 2열 그리드
- 중간 크기 폰트

### 데스크탑 (> 1024px)
- 3열 그리드
- 최대 폭 1400px
- 호버 효과 강화

## 🚀 사용 방법

### 1. 새 프로젝트 추가
```json
// data/projectHistory.json에 추가
{
  "2025": [
    {
      "client": "새로운 발주처",
      "title": "새로운 프로젝트",
      "hasPortfolio": false
    }
  ]
}
```

### 2. 포트폴리오 이미지 추가
```
1. public/portfolio/새폴더명/ 디렉토리 생성
2. 이미지 파일 추가 (예: image1.jpg, image2.jpg)
3. projectHistory.json에서 hasPortfolio: true 설정
4. portfolioFolder: "새폴더명" 추가
5. pages/portfolio/[id].js의 portfolioData 객체에 정보 추가
```

### 3. 이미지 파일명 패턴 수정
```javascript
// pages/portfolio/[id].js
"새폴더명": {
  title: "프로젝트명",
  year: "2025",
  client: "발주처",
  category: "카테고리",
  images: Array.from({ length: 10 }, (_, i) => `image${i + 1}.jpg`),
}
```

## ✅ 구현 완료 항목

- [x] 연도별 아코디언 UI/UX
- [x] GSAP ScrollTrigger 애니메이션
- [x] 포트폴리오 자동 링크 연결
- [x] 동적 라우팅 (/portfolio/[id])
- [x] 이미지 갤러리 그리드
- [x] 라이트박스 모달
- [x] 반응형 디자인
- [x] 마우스 커서 글로우 효과
- [x] View 버튼 호버 애니메이션
- [x] 프로젝트 데이터 JSON 관리

## 🎯 참고 사이트

- **디자인 참조**: http://anudg.com/m11.php (HISTORY 탭)
- **특징**: 연도별 아코디언, 깔끔한 리스트, 호버 효과

## 📝 추가 개선 가능 사항

1. **필터 기능**: 카테고리별, 발주처별 필터링
2. **검색 기능**: 프로젝트명, 발주처 검색
3. **페이지네이션**: 프로젝트가 많아질 경우
4. **상세 정보**: 프로젝트 설명, 면적, 공사기간 등
5. **이미지 슬라이더**: 갤러리에 Swiper 추가
6. **DB 연동**: MySQL/PostgreSQL로 데이터 관리
7. **관리자 페이지**: 프로젝트 CRUD 기능

## 🐛 문제 해결

### GSAP 설치 에러
```bash
npm install gsap --save
```

### 이미지 경로 에러
- `public/portfolio/` 폴더 구조 확인
- 이미지 파일명이 코드와 일치하는지 확인

### 아코디언 작동 안 함
- `openYears` state 확인
- CSS `.projectList.open` 클래스 확인

## 📞 문의

추가 기능이나 수정이 필요하면 언제든지 요청하세요!
