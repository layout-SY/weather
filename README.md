# **날씨 앱**

<br>

### 🍏 배포 주소

#### [날씨 앱]- https://weather-ngfh.vercel.app/

<br>

#### 📍 실행 환경

- `.env 파일`에 아래의 항목들이 있어야 합니다.

  - `VITE_SHORT_WEATHER_API_KEY` : 기상청 API key
  - `VITE_KAKAO_GEO_API_KEY` : 카카오 geo API key

#### 📍 프로젝트 실행

- 프로젝트 클론

```bash
$ git clone https://github.com/layout-SY/weather.git
```

- 의존성 설치

```bash
$ npm install
```

- 실행

```bash
$ npm run dev
```

</div>
</details>

<br>

### ⌨️ 기술 스택

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/tanstackquery-%23181717.svg?style=for-the-badge&logo=tanstack-query&logoColor=white)
![axios](https://img.shields.io/badge/axios-%23181717.svg?style=for-the-badge&logo=axios&logoColor=white)

<br>

### ⭐️ 주요 기능

- 메인 페이지

  - 현재 위치 기반 해당 주소의 현재 기온과 당일 최저/최고 기온, 당일 시간별 타임라인 기온과 기본적인 날씨 정보를 제공합니다.
  - 타임라인은 화살표나 좌우 스크롤로 확인할 수 있습니다.
  - 돋보기 버튼으로 주소를 검색할 수 있는 모달을 표시합니다.
  - 북마크 버튼으로 사용자가 지정한 주소를 즐겨찾기 할 수 있고, 별칭을 설정할 수 있습니다.
  - 반응형 웹으로 즐겨찾기 리스트가 다른 방식으로 표시됩니다.
    - 모바일 환경에선 좌우 폭이 작은 화면을 고려하여 즐겨찾기 리스트를 북마크 왼쪽 버튼을 통해 별도 페이지로 이동하여 표시합니다.
    - 웹 환경에 경우 사이드바 형식으로 즐겨찾기 리스트가 북마크 왼쪽 버튼 없이 표시됩니다.

- 주소 모달 컴포넌트

  - 주소 모달에서 특정 주소를 제공된 한국 주소 리스트를 통해 검색할 수 있습니다.
  - 주소 리스트는 입력 폼 입력 시 자동으로 입력값에 따라 리스트를 실시간으로 제공합니다.
  - 사용자는 원하는 주소를 선택하여 해당 주소의 상세 날씨 정보를 확인할 수 있습니다.

- 즐겨찾기 리스트

  - 사용자가 지정한 별칭과 주소 정보, 당일 최저/최고 기온이 카드 형식으로 나열됩니다.
  - 카드를 클릭하면 해당 주소의 현재 기온과 당일 최저/최고 기온, 당일 시간별 타임라인 기온과 기본적인 날씨 정보를 제공합니다.

### ⭐️ 구현 기능 설명

- 카카오 API 사용

  - 주소 -> 좌표 가져오기 API
    - 기상청 API의 요청 인자는 해당 위치의 주소가 아닌 lat/lng 좌표였습니다.
    - 따라서 주소에 대한 lat/lng 좌표를 가져올 수 있는 카카오 geo의 주소 -> 좌표 가져오기 API를 적용했습니다.
    - 이를 통해 사용자가 주소를 선택했을 때 그 주소에 대한 좌표값을 기상청 API 요청 인자에 활용할 수 있었습니다.
  - 좌표 -> 주소 가져오기 API
    - GPS 기반 위치 정보를 가져오는 `navigator`는 lat/lng 좌표 정보만 가져오기 떄문에 해당 좌표의 주소를 알 수 없었습니다.
    - 따라서 lat/lng 좌표에 대한 주소를 가져올 수 있는 카카오 geo의 좌표 -> 주소 가져오기 API를 적용했습니다.
    - 이를 통해 GPS 기반 위치 정보에 대한 주소 정보를 사용자에게 표시할 수 있었습니다.

- 좌표 정보 파싱

  - 기상청 API에 사용되는 요청 인자 x/y 좌표는 카카오 API나 GPS 기반 위치 정보에서 받아오는 lat/lng 좌표가 아닌<br>
    격자형 x/y 좌표를 사용하기 때문에 파싱이 필요했습니다.
  - 깃허브를 통해 해당 파싱 로직을 받아 lat/lng 좌표 -> 격자형 x/y 좌표로 변경하는 로직을 적용했습니다.
  - 이를 통해 기상청 API의 주소에 대한 날씨 정보를 받아올 수 있었습니다.

- 주소 검색 입력 폼 성능 개선

  - 모달에서 주소 검색 시 실시간으로 검색 결과를 제공했기 때문에 입력 폼의 onChange 특성 상 불필요한 재검색이 많아졌습니다.
  - 따라서 `useDebounce`을 활용해 입력 반영을 0.15초 지연했고, `useThrottle`로 재검색을 0.2초 간격(최대 초당 5회)으로 제한했습니다.
  - 이로 인해 입력 시 검색 호출 빈도를 키 입력마다에서 최대 5회/초로 제한해 불필요한 리렌더링을 줄였습니다.

- resize 이벤트로 반응형 구현

  - `useWindowSize`로 resize 이벤트를 감지해 화면 너비를 추적합니다.
  - `Detail`에서 화면 폭이 1024px 이상일 때만 `FavoriteSidebar`를 렌더링해 반응형으로 구성했습니다.
  - 모바일 환경에서는 사이드바가 렌더링되지 않도록 처리해 화면 복잡도를 낮췄습니다.

- 즐겨찾기 자동 업데이트

  - `notifyFavoritesChanged`에서 `dispatchEvent`로 `favorites:changed` 커스텀 이벤트를 발행합니다.
  - 북마크 저장/삭제 시 이벤트를 트리거해 구독 중인 컴포넌트가 즉시 목록을 갱신하도록 구성했습니다.

- 모바일 환경 브라우저의 입력 폼 확대 해결

  - 모바일 환경에서 모달에 있는 입력 폼을 입력하려 하면 화면이 확대 되어 UX를 오히려 해쳤습니다.
  - 따라서 브라우저에서 입력 폼 입력 시 확대되는 기준이 입력 폰트가 16px 미만인 것을 알게 되어 16px로 설정해 해결했습니다.

- 검색 엔진 구현

  - 사용자의 입력이 불완전 하기 때문에(시/군/구 모든 입력으로 주소 조회가 가능해야 함) 정규화/부분일치 로직이 필요했습니다.
  - 정규화 : 공백/하이픈 제거 후 소문자로 변환해 `normalizeAddress`로 비교 기준을 통일합니다.
  - 주소 분해 : `formatAddress`로 주소를 표준화한 뒤 공백 기준으로 쪼개 검색 후보를 구성합니다.
  - 점수 계산(getMatchScore)
    - 후보가 쿼리로 시작하면 높은 점수(100 + 길이 보너스)
    - 후보가 쿼리를 포함하면 중간 점수(80 + 길이 보너스)
    - 그 외에는 쿼리 토큰(공백/하이픈 분리)이 후보 파트에 포함되는 개수만큼 가중치(토큰당 10)
  - 매치율 계산: `normalizedQuery.length` / `normalizedCandidate.length` 기반 매치 비율 계산
  - 후처리: 점수 0 제외 → 점수 내림차순 정렬 → 최대 limit개만 반환
  - 이를 통해서 사용자 타이핑 중 제공된 한국 주소 json 파일을 활용한 주소 검색 결과를 효과적으로 제공할 수 있었습니다.

- TanStack-Query

  - TanStack-Query의 캐싱 기능을 활용하여 불필요한 리패치를 최소화 했습니다.
  - 쿼리키에는 nx, ny 좌표인 격자형 x/y 좌표를 추가했습니다.
    - 기상청 API에서 격자형 x/y 좌표 하나가 가라키는 주소 범위가 예상 외로 넓었습니다.
    - 따라서 이를 효율적으로 관리하기 위해 쿼리키에 격자형 x/y 좌표를 추가하여 서로 다른 주소라도<br>
      같은 날씨 정보를 가져올 수 있게끔 구현했습니다.

- Axios

  - API의 응답 오류 처리를 하나의 싱글톤으로 효율적으로 관리 했습니다.

<br>

### 📂 폴더 구조

<details>
<summary><strong>구조 보기</strong></summary>
<div markdown='1'>

```
weather/
├── public/              # 정적 파일
│   ├── korea_districts.json
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── app/             # 앱 엔트리/설정
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── setupTests.ts
│   │   └── styles/
│   ├── entities/        # 도메인 로직/데이터
│   │   ├── address/
│   │   └── weather/
│   ├── features/        # 기능 단위 UI/로직
│   │   ├── addressModal/
│   │   └── favorite/
│   ├── pages/           # 라우트 페이지
│   │   ├── favoriteWeathers/
│   │   ├── main/
│   │   ├── routes/
│   │   └── weatherDetail/
│   ├── shared/          # 공통 컴포넌트/훅/유틸
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── model/
│   │   └── utils/
│   ├── widgets/         # 복합 UI 위젯
│   │   ├── detail/
│   │   └── favoriteWeathers/
│   └── vite-env.d.ts
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

</div>
</details>
