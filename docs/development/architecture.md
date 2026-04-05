# สถาปัตยกรรมระบบ

เอกสารนี้อธิบายสถาปัตยกรรมและการออกแบบของ bizdocgen

## Overview

bizdocgen เป็น Vue 3 application ที่ทำงานเป็น Grist Custom Widget โดยมีลักษณะเด่นดังนี้:

- **Decoupled Architecture** - แยก concerns ชัดเจน (data, view, styling)
- **Type Safety** - ใช้ TypeScript + Zod สำหรับ runtime validation
- **Testable** - รองรับ unit tests และ E2E tests
- **Customizable** - ผู้ใช้สามารถปรับแต่งด้วย CSS

## Component Architecture

### High-Level Structure

```
┌─────────────────────────────────────────┐
│              App.vue                    │
│  ┌─────────────────────────────────┐    │
│  │         ActionButtons           │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │      PrintableDocument          │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │    DocumentHeader       │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │      ClientInfo         │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │      ItemsTable         │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │      TaxSummary         │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │    RemarksSection       │    │    │
│  │  └─────────────────────────┘    │    │
│  │  ┌──────────┐  ┌──────────┐     │    │
│  │  │PaymentInfo│  │QRCodeSection│  │    │
│  │  └──────────┘  └──────────┘     │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │     SignatureArea       │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **App** | State management, error handling, CSS settings |
| **ActionButtons** | User actions (print, copy JSON, scenario selection) |
| **PrintableDocument** | Layout container, document metadata |
| **DocumentHeader** | Provider info, document title, number, date |
| **ClientInfo** | Customer information display |
| **ItemsTable** | Line items table with calculations |
| **TaxSummary** | Tax calculations and total |
| **PaymentInfo** | Bank account details |
| **QRCodeSection** | PromptPay QR code generation |
| **RemarksSection** | Markdown-rendered notes |
| **SignatureArea** | Signature lines and date |

## Data Flow

### 1. Data Ingestion

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Grist     │────▶│  grist.ts    │────▶│ useAppState  │
│   API       │     │ (Adapter)    │     │  (Validate)  │
└─────────────┘     └──────────────┘     └──────────────┘
```

### 2. Data Validation

ใช้ Zod schema สำหรับ runtime validation:

```typescript
// src/types/document-schema.ts
export const GristRecordSchema = z.object({
  id: z.number(),
  Record: RecordDataSchema,
})

// Validation ใน useAppState
const validatedRecord = GristRecordSchema.parse(recordData)
```

### 3. Data Transformation

แต่ละ component มี computed properties สำหรับ transform data:

```typescript
// ตัวอย่าง: TaxSummary
const taxInfo = computed(() => {
  return getTaxInfo(props.record.Record.Tax, subtotal.value)
})
```

### 4. Data Flow Diagram

```
Grist Data
    │
    ▼
┌─────────────┐
│ grist.ts    │──┐
│ (API Layer) │  │
└─────────────┘  │
    │            │
    ▼            │
┌─────────────┐  │
│useAppState  │  │
│  (Validate) │  │ (Dev mode)
└─────────────┘  │
    │            │
    ▼            │
┌─────────────┐  │
│ Components  │◀─┘
│   (View)    │
└─────────────┘
```

## State Management

### useAppState Composable

เป็น centralized state management ใช้ Vue reactivity:

```typescript
// Reactive State
const record = ref<GristRecord | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(true)
const customCss = ref<string>('')

// Computed
const isCssChanged = computed(() => customCss.value !== savedCustomCss.value)

// Actions
const initializeGrist = async () => { ... }
const saveCustomCss = () => { ... }
```

### Why not Pinia/Vuex?

- **ขนาดเล็ก** - ไม่ต้องการความซับซ้อนของ full state management
- **Simplicity** - Composition API เพียงพอสำหรับ use case
- **Testability** - Function-based ง่ายต่อการ test

## Grist Integration Architecture

### Dual Mode Support

```
┌─────────────────────────────────────┐
│         Environment Check           │
│  window.grist && window.parent !==  │
│       window.self                   │
└─────────────────────────────────────┘
              │
      ┌───────┴───────┐
      ▼               ▼
┌──────────┐    ┌──────────┐
│  Real    │    │   Mock   │
│  Grist   │    │  Grist   │
│   API    │    │   API    │
└──────────┘    └──────────┘
```

### Real Grist API

ใช้ `window.grist` ที่ Grist จัดเตรียม:

```typescript
interface GristAPI {
  ready: (options) => void
  onRecord: (callback) => void
  onOptions: (callback) => void
  setOption: (key, value) => void
  getOption: (key) => unknown
}
```

### Mock Grist API

สำหรับ development mode:

```typescript
class MockGristAPI implements GristAPI {
  // ใช้ sessionStorage เก็บ options
  // ใช้ CustomEvent สำหรับสื่อสาร
  // โหลด scenarios จาก URL params
}
```

## Styling Architecture

### CSS Methodology: BEM

ใช้ BEM (Block Element Modifier) เพื่อ:
- ความชัดเจนในการ naming
- รองรับ user customization
- หลีกเลี่ยง CSS specificity wars

```css
/* Block */
.document { }

/* Element */
.document__header { }

/* Modifier */
.document--quotation { }
```

### CSS Variables

ใช้ CSS custom properties สำหรับ theming:

```css
:root {
  --font-family: 'Sarabun', sans-serif;
  --document-width: 210mm;
  --primary-blue: #3b82f6;
  /* ... */
}
```

### ไม่ใช้ CSS-in-JS/CSS Modules

**เหตุผล:**
- User ต้องการ customize ด้วย CSS
- BEM classes อ่านง่ายใน production
- ไม่มี build step เพิ่มเติม

## Testing Architecture

### Unit Tests (Vitest)

```
src/
├── __tests__/
│   ├── App.spec.ts
│   └── document-schema.spec.ts
```

ทดสอบ:
- Component rendering
- Props/Events
- Utility functions
- Schema validation

### E2E Tests (Playwright)

```
e2e/
├── functional.spec.ts
├── grist.spec.ts
├── visual.spec.ts
└── support/
    ├── AppTester.ts
    ├── GristTester.ts
    └── testers/
        ├── ActionButtonsTester.ts
        └── PrintableDocumentTester.ts
```

ใช้ Page Object Pattern:

```typescript
class AppTester {
  constructor(page) {
    this.page = page
    this.actionButtons = new ActionButtonsTester(page)
    this.document = new PrintableDocumentTester(page)
  }
}
```

## Error Handling

### Validation Errors

```typescript
try {
  const validatedRecord = GristRecordSchema.parse(recordData)
  record.value = validatedRecord
  error.value = null
} catch (err) {
  error.value = 'ข้อมูลไม่ถูกต้อง: ' + err.message
  record.value = null
}
```

### Error Display

```vue
<div v-if="error" class="app__error" role="alert">
  <h2>เกิดข้อผิดพลาด</h2>
  <p>{{ error }}</p>
</div>
```

## Security Considerations

### XSS Prevention

- ไม่ใช้ `v-html` กับ user input
- ใช้ text interpolation `{{ }}`
- Markdown rendering ผ่าน library ที่ sanitize

### Data Privacy

- ไม่มีการส่งข้อมูลไปยัง server ภายนอก
- การคำนวณทั้งหมดทำใน browser
- QR Code สร้างจากข้อมูลในเอกสารเท่านั้น

## Performance Optimizations

### Lazy Loading

```typescript
// Dynamic import สำหรับ scenarios
import('../utils/scenarios').then(({ scenarios }) => {
  // ...
})
```

### Computed Properties

ใช้ `computed` เพื่อ cache calculated values:

```typescript
const subtotal = computed(() => {
  return items.value.reduce((sum, item) => sum + item.Total, 0)
})
```

### CSS Optimization

- ไม่ใช้ deep nesting
- ใช้ CSS variables ลด code duplication
- Print styles แยกไฟล์

## Extension Points

### เพิ่ม Component ใหม่

1. สร้างไฟล์ใน `src/components/`
2. ใช้ BEM naming
3. เพิ่ม `data-testid`
4. Import ใน PrintableDocument.vue

### เพิ่ม Document Type

1. อัพเดท `DocumentTypeSchema`
2. เพิ่ม CSS selector `[data-document-type="newtype"]`
3. อัพเดท documentation

### Custom Validation

เพิ่ม rules ใน Zod schema:

```typescript
export const RecordDataSchema = z.object({
  // ... existing fields
  Custom_Field: z.string().optional()
}).refine((data) => {
  // custom validation logic
})
```
