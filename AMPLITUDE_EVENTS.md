# 📊 Amplitude Event Tracking Documentation

This document summarizes the Amplitude Analytics configuration and events tracked within the portfolio landing page.

---

## ⚙️ Configuration & Initialization

- **Amplitude API Key**: `c151e0599ecd2fe49e494a801b61d7b0`
- **SDK Used**: `@amplitude/analytics-browser`
- **Utility File**: [`src/lib/amplitude.ts`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/lib/amplitude.ts)
- **Initialization**: Triggered automatically on app load in [`src/main.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/main.tsx).

---

## 🎯 Tracked Events Schema

The following table summarizes all custom events currently tracked in the application:

| Event Name | Trigger | Properties | Description |
| :--- | :--- | :--- | :--- |
| `page_viewed` | Automatically on initial page load / session start | `page_name`: `string` | Tracks when a user opens a page. Default tracking is also enabled. |
| `click_consultation_button` | When user clicks "무료 MVP 상담 신청하기" | `click_location`: `'hero' \| 'contact' \| 'pricing' \| 'floating'` | Tracks user intent to start a consultation from different parts of the UI. |
| `consultation_modal_opened` | When the consultation form modal is displayed | `opened_from`: `string` | Tracks which section successfully converted the user to open the modal. |
| `consultation_modal_closed` | When the user closes the modal without submitting | *None* | Tracks modal drop-off / abandonment. |
| `consultation_form_submitted` | When the user submits the consultation form | `status`: `'success' \| 'failure'` <br> `error_message`: `string` (optional) | Tracks form submission outcomes, including HTTP or client-side errors. |
| `click_project_card` | When user clicks "라이브 데모" or "GitHub" in a project card | `project_name`: `string` | Tracks engagement with individual portfolio projects. |
| `click_external_link` | When user clicks Phone or GitHub links in the contact footer | `platform`: `'github' \| 'phone' \| 'email'` | Tracks external clicks / alternative communication channels. |

---

## 🛠️ Event Triggers in Code

### 1. Initial Page Load
Automatically handled by `@amplitude/analytics-browser` default configuration, plus a custom event tracker wrapper.

### 2. Consultation Button & Modal Opened
Handled via `handleOpenModal` inside [`src/pages/Home.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/pages/Home.tsx):
```typescript
const handleOpenModal = (source: 'hero' | 'contact') => {
  amplitudeEvents.clickConsultation(source);
  amplitudeEvents.openConsultationModal(source);
  setIsModalOpen(true);
};
```

### 3. Modal Closed
Handled via `handleClose` inside [`src/components/ContactModal.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ContactModal.tsx):
```typescript
const handleClose = () => {
  amplitudeEvents.closeConsultationModal();
  onClose();
};
```

### 4. Consultation Form Submitted
Tracks successful API requests to the Supabase Edge Function inside [`src/components/ContactModal.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ContactModal.tsx):
```typescript
if (response.ok) {
  amplitudeEvents.submitConsultation('success');
  // Success toast/alert...
} else {
  amplitudeEvents.submitConsultation('failure', `HTTP status: ${response.status}`);
}
```

### 5. Project Engagement Clicks
Tracked inside [`src/components/ProjectCard.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/components/ProjectCard.tsx):
```typescript
onClick={() => amplitudeEvents.clickProject(project.name)} // For Live Demo
onClick={() => amplitudeEvents.clickProject(project.name + " (GitHub)")} // For GitHub
```

### 6. Alternative Contacts
Tracked inside [`src/pages/Home.tsx`](file:///Users/kimwoohyuck/Desktop/freelancer_portfolio/src/pages/Home.tsx) (Phone CTA and Footer GitHub link):
```typescript
onClick={() => amplitudeEvents.clickExternalLink('phone')}
onClick={() => amplitudeEvents.clickExternalLink('github')}
```
