# 📊 Amplitude 이벤트 트래킹 명세서 (Event Tracking Documentation)

이 문서는 포트폴리오 랜딩 페이지에 설정된 Amplitude Analytics의 구성과 수집하고 있는 이벤트 명세에 대해 기술합니다.

---

## ⚙️ 설정 및 초기화 (Configuration & Initialization)

- **Amplitude API Key**: `c151e0599ecd2fe49e494a801b61d7b0`
- **사용 SDK**: `@amplitude/analytics-browser` (브라우저 전용 웹 SDK)
- **트래킹 유틸 파일**: [`src/lib/amplitude.ts`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/lib/amplitude.ts)
- **초기화 시점**: 앱 진입 및 최초 로딩 시 [`src/main.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/main.tsx)에서 실행됩니다.

---

## 🎯 수집 이벤트 스키마 (Event Schema)

포트폴리오의 전환 흐름과 유저 상호작용을 측정하기 위해 정의된 맞춤형 이벤트 목록입니다.

| 이벤트명 (Event Name) | 발생 트리거 (Trigger) | 수집 속성 (Event Properties) | 설명 |
| :--- | :--- | :--- | :--- |
| `page_viewed` | 최초 페이지 진입 및 세션 시작 시 자동 기록 | `page_name`: `string` | 어떤 페이지를 보고 있는지 기록합니다. 기본 세션 및 페이지 트래킹도 내장 지원됩니다. |
| `click_consultation_button` | 사용자가 "무료 MVP 상담 신청하기" 버튼을 클릭할 때 | `click_location`: `'hero' \| 'contact' \| 'pricing' \| 'floating'` | 사용자가 어느 위치의 CTA(상담) 버튼을 통해 전환을 시도했는지 분석합니다. |
| `consultation_modal_opened` | 상담 신청 입력 모달(Modal)이 열릴 때 | `opened_from`: `string` | 모달을 열게 만든 유입 영역(예: 히어로 섹션, 하단 컨택 섹션 등)을 추적합니다. |
| `consultation_modal_closed` | 사용자가 입력창에서 이탈하여 모달을 닫을 때 | *없음* | 모달 유입 후 작성하지 않고 이탈한 비율(Drop-off)을 모니터링합니다. |
| `consultation_form_submitted` | 상담 신청 폼을 최종적으로 API로 제출했을 때 | `status`: `'success' \| 'failure'` <br> `error_message`: `string` (실패 시 에러로그) | Supabase Edge Function을 통한 폼 접수 성공과 실패 로그를 모니터링합니다. |
| `click_project_card` | 프로젝트 카드의 "라이브 데모" 혹은 "GitHub" 버튼을 누를 때 | `project_name`: `string` | 방문자가 어떤 프로젝트 포트폴리오에 더 관심이 높은지 세부 조회 의도를 기록합니다. |
| `click_external_link` | 전화걸기 버튼 또는 푸터의 깃허브 버튼을 누를 때 | `platform`: `'github' \| 'phone' \| 'email'` | 이메일/상담 폼 외 다른 형태의 직접 연락 전환을 집계합니다. |

---

## 🛠️ 코드 상의 실질적인 트리거 위치 (Code Integration Examples)

### 1. 첫 페이지 진입
초기 로딩 시 SDK 기본 세팅과 연동되어 전체적인 접속 상태를 기록합니다.

### 2. 상담 버튼 클릭 및 모달 노출
[`src/pages/Home.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/pages/Home.tsx)의 모달 핸들러에서 실행됩니다:
```typescript
const handleOpenModal = (source: 'hero' | 'contact') => {
  amplitudeEvents.clickConsultation(source);
  amplitudeEvents.openConsultationModal(source);
  setIsModalOpen(true);
};
```

### 3. 모달 이탈 및 닫기
[`src/components/ContactModal.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ContactModal.tsx)의 모달 닫기 이벤트 핸들러에서 실행됩니다:
```typescript
const handleClose = () => {
  amplitudeEvents.closeConsultationModal();
  onClose();
};
```

### 4. 상담 폼 API 제출 성공/실패 여부
[`src/components/ContactModal.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ContactModal.tsx) 내부 Supabase Edge Function POST 호출 완료 시점에 실행됩니다:
```typescript
if (response.ok) {
  amplitudeEvents.submitConsultation('success');
  alert("상담 신청이 완료되었습니다...");
  onClose();
} else {
  amplitudeEvents.submitConsultation('failure', `HTTP status: ${response.status}`);
  alert("신청 중 오류가 발생했습니다...");
}
```

### 5. 개별 프로젝트 링크 클릭 (Live Demo & Github)
[`src/components/ProjectCard.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ProjectCard.tsx) 내부 버튼 이벤트에서 동작합니다:
```typescript
onClick={() => amplitudeEvents.clickProject(project.name)} // 라이브 데모 클릭 시
onClick={() => amplitudeEvents.clickProject(project.name + " (GitHub)")} // 깃허브 클릭 시
```

### 6. 직접적인 외부 연락망 클릭
[`src/pages/Home.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/pages/Home.tsx)의 전화 문의 및 깃허브 방문 버튼에서 동작합니다:
```typescript
onClick={() => amplitudeEvents.clickExternalLink('phone')}
onClick={() => amplitudeEvents.clickExternalLink('github')}
```
