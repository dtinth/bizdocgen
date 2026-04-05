# การพัฒนา

คู่มือสำหรับนักพัฒนาที่ต้องการ custom หรือ contribute กลับมายังโปรเจกต์

## ความต้องการ

- **Node.js**: 24.x หรือสูงกว่า
- **Package Manager**: pnpm (จัดการผ่าน Vite+)
- **IDE**: VSCode (แนะนำ) พร้อม extensions:
  - Vue.volar (Volar)
  - TypeScript and JavaScript Language Features

## โครงสร้างโปรเจกต์

```
bizdocgen/
├── src/
│   ├── components/          # Vue components
│   │   ├── ActionButtons.vue
│   │   ├── PrintableDocument.vue
│   │   ├── DocumentHeader.vue
│   │   ├── ClientInfo.vue
│   │   ├── ItemsTable.vue
│   │   ├── TaxSummary.vue
│   │   ├── PaymentInfo.vue
│   │   ├── QRCodeSection.vue
│   │   ├── RemarksSection.vue
│   │   └── SignatureArea.vue
│   ├── composables/         # Vue composables
│   │   └── useAppState.ts   # State management
│   ├── types/               # TypeScript types
│   │   ├── document-schema.ts
│   │   └── view-model.ts
│   ├── utils/               # Utility functions
│   │   ├── grist.ts         # Grist API integration
│   │   ├── promptpay.ts     # PromptPay QR generation
│   │   ├── tax.ts           # Tax calculations
│   │   ├── currency.ts      # Currency formatting
│   │   ├── document.ts      # Document helpers
│   │   ├── markdown.ts      # Markdown processing
│   │   └── scenarios.ts     # Test scenarios
│   ├── styles/              # Global styles
│   │   ├── global.css
│   │   ├── print.css
│   │   └── variables.css
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── e2e/                     # E2E tests
├── docs/                    # Documentation
└── vite.config.ts           # Vite configuration
```

## การตั้งค่าสภาพแวดล้อม

```bash
# Clone repository
git clone https://github.com/dtinth/bizdocgen.git
cd bizdocgen

# ติดตั้ง dependencies (Vite+ จะจัดการ pnpm ให้)
vp install

# เริ่ม development server
vp dev
```

## Scripts ที่ใช้งาน

```bash
# Development
vp dev                    # เริ่ม dev server
vp run build              # Build สำหรับ production
vp preview                # Preview production build

# Testing
vp run test:unit          # รัน unit tests
vp run test:e2e           # รัน E2E tests (Playwright)

# Code Quality
vp run lint               # ตรวจสอบและแก้ไข code style
vp run format             # จัดรูปแบบ code
vp run type-check         # ตรวจสอบ TypeScript types

# Template
vp run sync-template      # ดาวน์โหลดเทมเพลตล่าสุด
```

## สถาปัตยกรรม

### Component Structure

```
App.vue
├── ActionButtons
│   ├── Print button
│   ├── Copy JSON button
│   └── Scenario selector (dev mode)
└── PrintableDocument
    ├── DocumentHeader
    ├── ClientInfo
    ├── ItemsTable
    ├── TaxSummary
    ├── RemarksSection
    ├── PaymentInfo (conditional)
    ├── QRCodeSection (conditional)
    └── SignatureArea
```

### Data Flow

```
Grist API
    ↓
grist.ts (Mock or Real API)
    ↓
useAppState.ts (Validation + State)
    ↓
Components (View)
```

### State Management

ใช้ Vue Composition API ผ่าน `useAppState` composable:

```typescript
const {
  record,           // ข้อมูลเอกสารที่ validate แล้ว
  rawGristData,     // ข้อมูลดิบจาก Grist
  error,            // ข้อผิดพลาด (ถ้ามี)
  isLoading,        // สถานะการโหลด
  customCss,        // CSS ที่ผู้ใช้ตั้งค่า
  showSettings,     // แสดง/ซ่อน settings panel
  // ... actions
} = useAppState()
```

## การพัฒนา Components

### Pattern ที่ใช้

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { GristRecord } from '../types/document-schema'

interface Props {
  record: GristRecord
}

const props = defineProps<Props>()

// Computed properties สำหรับ transform data
const displayData = computed(() => {
  return {
    // ... transform logic
  }
})
</script>

<template>
  <div class="component" data-testid="component">
    <!-- BEM class naming -->
    <div class="component__element">
      {{ displayData.value }}
    </div>
  </div>
</template>

<style>
/* BEM methodology */
.component {
  /* block styles */
}

.component__element {
  /* element styles */
}

.component__element--modifier {
  /* modifier styles */
}
</style>
```

### Test IDs

ทุก component ต้องมี `data-testid` สำหรับ testing:

```vue
<div class="document" data-testid="document">
  <button data-testid="print-button">Print</button>
</div>
```

## การเพิ่มประเภทเอกสารใหม่

1. **อัพเดท schema** (`src/types/document-schema.ts`):

```typescript
export const DocumentTypeSchema = z.enum([
  'Quotation', 
  'Invoice', 
  'Receipt',
  'CreditNote'  // เพิ่มใหม่
])
```

2. **อัพเดท components** ที่มีการตรวจสอบประเภทเอกสาร

3. **เพิ่ม translations** (ถ้าจำเป็น)

4. **เพิ่ม test scenarios** (`src/utils/scenarios.ts`)

5. **อัพเดท documentation**

## การทดสอบ

### Unit Tests

```typescript
// src/__tests__/Component.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../components/Component.vue'

describe('Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component, {
      props: { record: mockRecord }
    })
    expect(wrapper.find('[data-testid="component"]').exists()).toBe(true)
  })
})
```

### E2E Tests

```typescript
// e2e/functional.spec.ts
import { test, expect } from '@playwright/test'

test('generates document', async ({ page }) => {
  await page.goto('/')
  await page.selectOption('[data-testid="scenario-selector"]', 'quotation')
  await expect(page.locator('[data-testid="document"]')).toBeVisible()
})
```

## Grist Integration

### Mock API

เมื่อรันนอก Grist (development mode), ระบบจะใช้ `MockGristAPI`:

```typescript
// ส่งข้อมูลผ่าน DOM event
document.dispatchEvent(
  new CustomEvent('mockgristrecord', { detail: recordData })
)
```

### Real API

เมื่อรันใน Grist, ระบบจะใช้ `window.grist` ที่ Grist จัดเตรียมไว้

## การ Build และ Deploy

### Production Build

```bash
vp run build
```

ผลลัพธ์อยู่ใน `dist/`:
- `index.html`
- `assets/` (CSS, JS, fonts)

### Deployment

```bash
# ตัวอย่าง: Deploy ไป GitHub Pages
npm run build
npm run deploy
```

หรือ copy ไฟล์ `dist/` ไปยัง web server ใดก็ได้

## การ Contribute

1. **Fork** repository
2. **สร้าง branch** สำหรับ feature/bugfix
3. **เขียน tests** สำหรับการเปลี่ยนแปลง
4. **รัน tests** ให้ผ่านทั้งหมด
5. **สร้าง Pull Request**

### Code Style

- ใช้ single quotes
- ไม่มี semicolon (ยกเว้นจำเป็น)
- 2 spaces indent
- PascalCase สำหรับ components
- camelCase สำหรับ variables/functions

## ขั้นตอนถัดไป

- ศึกษา [สถาปัตยกรรม](architecture.md) เชิงลึก
- อ่าน [API Reference](api-reference.md)
- ดูโค้ดใน `src/` ประกอบ
