

# ![tastebean_logo](https://github.com/user-attachments/assets/da1358ad-6dfc-41f7-b84f-5f08d32e065a)
![Cover](https://github.com/user-attachments/assets/105486f9-95e0-443e-b57e-19fdab241653)
<center>취향에 맞는 원두를 정기 구독하거나 개별 구매할 수 있는 
<center>커머스 플랫폼
  
  <br/><br/>
  
## ⚙️기술 스택
**Language & Framework**

<img  src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

**Design System & Style**

<img  src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img  src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">

**State Management**

<img  src="https://img.shields.io/badge/zustand-E34F26?style=for-the-badge&logo=zustand&logoColor=white"> <img  src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

**Database**

<img  src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">

**Build Tools**

<img  src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

**Code Style**

<img  src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"> <img  src="https://img.shields.io/badge/esLint-4B32C3?style=for-the-badge&logo=esLint&logoColor=white">
    
<br/><br/>
     
## 💡기술적 의사결정
- ### **TypeScript**
	#### 도입 배경
	JavaScript로 개발을 시작했으나 컴포넌트와 API가 많아지면서 데이터가 undefined로 나오는 문제가 빈번하게 발생
	
	#### 도입 결과
	타입 추론을 코드 작성 단계에서 하기 때문에 런타임에 발생할 수 있는 에러를 사전 차단. API 응답 타입을 정의함으로써 데이터 구조를 명확히 파악. 타입을 명시적으로 정의함으로써 코드의 가독성과 유지보수성이 크게 향상. 

<hr/>

- ### **React Query**
	#### 도입 배경
	Supabase API를 직접 호출하여 데이터를 처리했으나, 컴포넌트와 페이지가 많아지면서 비동기 데이터 관리가 복잡해지고  중복된 데이터를 요청하는 문제가 발생. 이를 해결하기 위해  서버 상태 관리에 특화된 솔루션이 필요했음.

	<details>
	<summary><b>기술 선정 과정</b></summary>

	- **Redux-Toolkit**: 상태를 전역으로 관리할 수 있지만 서버 데이터 관리에는 적합하지 않고 비동기 코드를 작성할 때  보일러 플레이트 코드가 많아 상대적으로 복잡하기 때문에  제외
	- **React Query**:
	  1. **서버 상태 관리에 최적화**: 서버와 클라이언트 상태를 분리하여 효율적으로 관리
	  2. **비동기 처리 간소화**: 로딩, 에러 상태를 내장된 기능으로 쉽게 관리
	  3. **캐싱 기능**: 데이터 요청을 최소화하여 서버 부하 감소
	  4. **자동 리페치 및 데이터 동기화**: 새로고침 없이 최신 데이터를 유지

	</details>

	#### 도입 결과
	`useQuery`와 `useMutation`으로 데이터 관리 간소화, 중복 요청 제거, 캐싱을 통한 성능 최적화를 달성.

<hr/>

- ### **Zustand**
	#### 도입 배경
	상태 관리를 위해 Redux와 Context API를 검토했으나 코드 복잡성과 성능 문제가 있어 경량화된 상태 관리 솔루션이 필요했음

	<details>
	<summary><b>기술 선정 과정</b></summary>

	- **Redux**: 전역 상태 관리는 가능하지만 보일러 플레이트가 많고 코드 복잡도가 높아 제외
	- **Zustand**:
	  1. **간단한 API**: 보일러플레이트 없이 상태 관리 가능
	  2. **React Context 독립**: 성능 문제가 적음
	  3. **비동기 로직 처리**: 간편하게 비동기 상태를 관리

	</details>

	#### 도입 결과
	Redux 대비 간단하고 효율적인 상태 관리 구현.

<hr/>

- ### **Supabase**
	#### 도입 배경
	프로젝트 초기부터 안정적이고 사용하기 쉬운 백엔드 서비스가 필요했음. 실시간 데이터베이스, 인증, 파일 스토리지 등의 다양한 서비스를 제공하는 BaaS 서비스 고려.

	<details>
	<summary><b>기술 선정 과정</b></summary>

	- **Firebase**: 실시간 데이터 동기화는 강점이지만 SQL 쿼리의 유연성이 부족해 제외
	- **Supabase**:
	  1. **PostgreSQL 기반**: SQL 쿼리로 데이터 조회 및 조작이 자유로움
	  2. **인증 및 스토리지 통합**: 사용자 인증과 파일 업로드를 쉽게 구현
	  3. **실시간 데이터 동기화**: 웹소켓 기반으로 데이터 변경 사항을 실시간 반영
	  4. **간단한 REST 및 GraphQL API**: 클라이언트와 서버 간 통신이 직관적

	</details>

	#### 도입 결과
	SQL 쿼리를 활용해 유연한 데이터 관리가 가능해졌으며 인증 및 실시간 데이터 동기화를 통해 사용자 경험을 향상

<hr/>

- ### **Tailwind CSS**
	#### 도입 배경
	CSS 관리와 디자인 일관성을 유지하기 위해 유틸리티 기반 CSS 프레임워크 도입 필요.

	<details>
	<summary><b>기술 선정 과정</b></summary>

	- **순수 CSS/SCSS**: 커스텀 스타일 작성은 유연하지만, 재사용성과 일관성이 부족하여 제외
	- **Tailwind CSS**:
	  1. **유틸리티 클래스 기반**: 빠른 스타일링과 코드 중복 제거
	  2. **디자인 시스템 구축 용이**: 프로젝트 전반에 일관된 스타일 적용 가능
	  3. **반응형 디자인 지원**: 모바일, 태블릿, 데스크톱 환경을 손쉽게 지원

	</details>

	#### 도입 결과
	**디자인 일관성 확보**, **빠른 스타일링**으로 개발 속도와 유지보수 효율성 개선

<hr/>

- ### **shadcn/ui**
	#### 도입 배경
	재사용 가능한 UI 컴포넌트와 Tailwind CSS의 유연성을 결합한 솔루션 필요

	<details>
	<summary><b>기술 선정 과정</b></summary>

	- **Material-UI/Chakra UI**:  스타일 커스터마이징이 제한적이어서 제외
	- **shadcn/ui**:
	  1. **Tailwind CSS 기반**: 프로젝트와 완벽히 통합
	  2. **선택적 설치**: 필요한 컴포넌트만 설치 가능
	  3. **높은 유연성**: 스타일 오버헤드 없이 커스터마이징 가능

	</details>

	#### 도입 결과
	Tailwind CSS와의 호환성으로 유연하고 간결한 UI 컴포넌트 구현
  
  <br/><br/>
  
## 💡주요 기능 
 **☑️유저 관리**
-   **Google 로그인**: Google 계정을 통한 간편 로그인
<img src="https://github.com/user-attachments/assets/3b1a5728-3424-4b93-b559-a63bf2f81f62" width="400" height="480"/>


<br/><br/>


**☑️상품 정보 공유 및 리뷰**
- **상품 정보 및 통계 제공**: 상품 정보, 좋아요 개수, 리뷰 개수 등을 표시
- **장바구니 추가** : 관심 있는 상품을 장바구니에 저장 가능
- **바로 구매**: 원하는 상품을 즉시 결제하여 빠르게 구매 가능
- **좋아요 기능**: 상품 정보에 좋아요를 눌러 선호도를 표시
- **리뷰 기능**: 상품에 대한 다른 사용자들의 리뷰 확인 가능 
<figure class="half">
<figuration>
<img src="https://github.com/user-attachments/assets/9de1943f-05b7-4d03-bf3e-8c5d1de6887a" width="400" height="480"/>
<img src="https://github.com/user-attachments/assets/eeaa4350-eb1e-43a0-9bc2-150e46bcefd8" width="400" height="480"/>
<img src="https://github.com/user-attachments/assets/8d715760-4dcb-4e2f-826d-50b3d256c422" width="400" height="480" />
<img src="https://github.com/user-attachments/assets/5381cfff-3aa4-4bcd-a6cd-897d4168f9ef" width="400" height="480"/>
</figuration>
</figure>


<br/><br/>


**☑️원두 구독**
- **맞춤형 원두 정기 구독**: 사용자가 원하는 원두, 용량, 기간, 배송 간격을 선택하여 구독 가능 
- **자동 가격 계산 및 간편 결제**: 선택한 옵션에 따라 총 결제 금액이 자동 계산되며, 간편하게 결제 가능
<img src="https://github.com/user-attachments/assets/622af0db-cdf5-474a-8754-c6221d2ec10d" width="400" height="480"/>


<br/>



**☑️주문 및 결제 기능**
- **배송 정보 관리** : 마이페이지에서 저장된 배송지 및 연락처를 선택하거나, 주문 단계에서 직접 입력 및 수정 가능
- **안정적인 결제 처리**: 토스페이먼츠(Toss Payments) API를 활용한 안전한 결제 시스템 구축 
- **결제 내역 확인**: 결제 성공 후 주문 상세 페이지에서 즉시 확인 가능
<img src="https://github.com/user-attachments/assets/570ccd09-0f5b-4673-aac0-3a51e003405d" width="400" height="480"/>
<img src="https://github.com/user-attachments/assets/f4a6fa97-c42c-4b4a-a022-cc97e9a1bbb8" width="400" height="480"/>



<br/>


 **☑️마이페이지**
-   **사용자 정보 수정**:  Daum 우편번호 API를 사용하여 배송지 저장
-  **주문내역**: 이전 주문내역 및 주문 상세 정보 열람
- **리뷰작성**: 주문한 상품들 리뷰 작성
<figure class="half">
<figuration>
<img src="https://github.com/user-attachments/assets/5d5c0c4e-4ae7-40ea-8e70-54f144eac441" width="400" height="480"/>
<img src="https://github.com/user-attachments/assets/e47fe378-8dd8-41ad-b477-501a25d2f181" width="400" height="480"/>
</figuration>
</figure>
  
  <br/><br/>







## 📈성능 최적화

### **무한 스크롤 구현**
#### 문제 상황
- 초기에는 모든 데이터를 한 번에 가져오는 방식으로 구현되어 데이터가 많아질수록 **초기 렌더링 시간이 길어짐**.
- 서버 요청이 많아지고 브라우저 메모리 사용량도 증가.

#### 원인 분석
- 페이지네이션 없이 모든 데이터를 불러와 사용했기 때문에 성능과 사용자 경험에 문제가 발생.

#### 해결 방법
1. **TanStack Query의 `useInfiniteQuery`**:
   - 데이터를 페이지 단위로 나눠 가져오는 페이지네이션 방식 구현.
   - React Query의 `getNextPageParam`으로 다음 페이지를 동적으로 로드.

2. **Intersection Observer 활용**:
   - `react-intersection-observer` 라이브러리를 사용하여 사용자가 스크롤을 내릴 때만 추가 데이터를 요청.

#### 최종 코드
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 1 }) => fetchProduct(pageParam),
  getNextPageParam: (lastPage) => {
    if (lastPage.hasNextPage) return lastPage.nextPage;
    return undefined;
  },
});

const { ref } = useInView({
  onChange: (inView) => {
    if (inView && hasNextPage) fetchNextPage();
  },
});
```
  
  <br/><br/>
    
## 🎯트러블 슈팅

### **1. 좋아요 상태 반영 문제**
#### 문제 상황
- 좋아요 버튼을 눌렀을 때 상태가 변경되었지만 **UI에 즉시 반영되지 않고 새로고침이 필요**한 문제가 발생.
- React Query의 캐시가 제대로 업데이트되지 않아 리스트 페이지와 상세 페이지의 데이터가 동기화되지 않음.

#### 원인 분석
- 좋아요 상태를 관리하는 React Query의 캐시 키가 **리스트 페이지**(`['products']`)와 **상세 페이지**(`['product', productId]`), **isLiked 상태**(`['isLiked', productId, userId]`)로 분리되어 있음.
- 좋아요 상태 변경 후, 필요한 캐시를 모두 업데이트하지 않아 UI 동기화 실패.

#### 해결 방법
- `useLike` 훅에서 다음 세 가지 캐시를 모두 업데이트하도록 수정:
  1. 리스트 페이지 캐시 (`['products']`)
  2. 상세 페이지 캐시 (`['product', productId]`)
  3. 좋아요 상태 캐시 (`['isLiked', productId, userId]`)

### 최종 코드
```typescript
queryClient.setQueryData(['products'], (oldData: any) => {
  if (!oldData) return oldData;
  return {
    ...oldData,
    pages: oldData.pages.map((page: any) => ({
      ...page,
      data: page.data.map((product: any) =>
        product.id === productId
          ? {
              ...product,
              isLiked: !isLiked,
              likeCount: product.likeCount + (isLiked ? -1 : 1),
            }
          : product
      ),
    })),
  };
});

queryClient.setQueryData(['product', productId], (oldData: any) => {
  if (!oldData) return oldData;
  return {
    ...oldData,
    isLiked: !isLiked,
    likeCount: oldData.likeCount + (isLiked ? -1 : 1),
  };
});

queryClient.setQueryData(['isLiked', productId, userId], !isLiked);
```
  
  <br/><br/>

## 📁폴더구조

    📁  src
	┣ 📁 api (서버와 통신하는 함수들을 관리)
	┣ 📁 assets (이미지, 아이콘, 동영상 등의 정적 자원을 관리)
	┣ 📁 components (재사용 가능한 React 컴포넌트를 관리)
	┃	  ┗📁 ui
	┣ 📁 hooks (React 커스텀 훅을 관리)
	┃ 	  ┣ 📁 auth
	┃    ┣ 📁 cart
	┃    	   ... 
	┣ 📁 lib (외부 라이브러리와 관련된 초기화 및 설정 로직 관리)
	┣ 📁 pages (각 라우트에 대응하는 페이지 컴포넌트 관리)
	┃    ┣ 📁 carts
	┃    ┣ 📁 common
	┃    	   ... 
	┣ 📁 stores (전역 상태 관리 관련 코드)
	┃    ┣ 📁 auth
	┃    ┣ 📁 cart
	┣ 📁 types (TypeScript 타입 정의 파일을 관리)
	┃    ┣ 📁 dto
	┗ 📁 utils (공통 함수와 유틸리티)



