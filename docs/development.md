# สำหรับนักพัฒนา

## เทคโนโลยีที่ใช้

| เทคโนโลยี | หน้าที่ |
|-----------|---------|
| [Vue 3](https://vuejs.org/) + TypeScript | Frontend Framework |
| [Vite+](https://viteplus.dev/) | Build, Dev, Lint, Format, Test |
| [pnpm](https://pnpm.io/) | Package Manager (จัดการผ่าน Vite+) |
| [Zod](https://zod.dev/) | Runtime Schema Validation |
| [Vitest](https://vitest.dev/) | Unit Testing |
| [Playwright](https://playwright.dev/) | E2E Testing |
| [Sarabun](https://fonts.google.com/specimen/Sarabun) | ฟอนต์ภาษาไทย |

## การพัฒนา

### ติดตั้ง Dependencies

```bash
vp install
```

### เริ่มเซิร์ฟเวอร์พัฒนา

```bash
vp dev
```

เปิดเบราว์เซอร์ไปที่ URL ที่แสดง ระบบจะโหลดข้อมูลตัวอย่างอัตโนมัติเมื่อไม่ได้อยู่ภายใน Grist

!!! tip "เลือก Scenario"
    ในโหมดพัฒนาจะมี Dropdown สำหรับเลือกข้อมูลตัวอย่าง (Scenario) หรือระบุผ่าน URL เช่น `?scenario=invoice-wht-excel-rescue`

### คำสั่งที่ใช้บ่อย

```bash
# ตรวจสอบ Type
vp run type-check

# Lint
vp run lint

# Format
vp run format

# ทดสอบ Unit Test
vp run test:unit

# Build สำหรับ Production
vp run build

# ทดสอบ E2E
vp run test:e2e

# Preview Production Build
vp preview
```

## โครงสร้างโปรเจกต์

```
src/
├── App.vue                         # Component หลัก
├── main.ts                         # จุดเริ่มต้นของแอป
├── components/
│   ├── PrintableDocument.vue       # ตัวเอกสาร (wrapper)
│   ├── DocumentHeader.vue          # หัวเอกสาร
│   ├── ClientInfo.vue              # ข้อมูลลูกค้า
│   ├── ItemsTable.vue              # ตารางรายการ
│   ├── TaxSummary.vue              # สรุปภาษี
│   ├── PaymentInfo.vue             # ข้อมูลการชำระเงิน
│   ├── QRCodeSection.vue           # QR Code พร้อมเพย์
│   ├── RemarksSection.vue          # หมายเหตุ
│   ├── SignatureArea.vue           # ช่องลงชื่อ
│   └── ActionButtons.vue           # ปุ่มกด (พิมพ์ คัดลอก JSON)
├── composables/
│   └── useAppState.ts              # State Management หลัก
├── utils/
│   ├── grist.ts                    # Grist API wrapper + Mock
│   ├── view-model.ts              # แปลงข้อมูลเป็น View Model
│   ├── tax.ts                      # คำนวณภาษี
│   ├── currency.ts                 # จัดรูปแบบสกุลเงิน
│   ├── promptpay.ts               # สร้าง QR Code พร้อมเพย์
│   ├── markdown.ts                # แปลง Markdown + Sanitize
│   ├── document.ts                # Utility สำหรับเอกสาร
│   └── scenarios.ts               # ข้อมูลตัวอย่าง
├── types/
│   ├── document-schema.ts         # Zod Schema + TypeScript Types
│   └── view-model.ts             # Types สำหรับ View Model
└── styles/
    ├── variables.css              # CSS Variables
    ├── global.css                 # สไตล์พื้นฐาน
    └── print.css                  # สไตล์สำหรับพิมพ์
```

## สถาปัตยกรรม

### การไหลของข้อมูล

```
Grist Spreadsheet
  │
  │  grist.onRecord()
  ▼
useAppState.ts
  │  ตรวจสอบด้วย Zod Schema
  ▼
GristRecord (validated)
  │
  │  getViewModel()
  ▼
DocumentViewModel (cached ด้วย WeakMap)
  │
  │  Props
  ▼
Vue Components → แสดงผลเอกสาร
```

### การเชื่อมต่อกับ Grist

Widget ตรวจสอบว่าอยู่ภายใน Grist iframe หรือไม่:

- **อยู่ใน Grist** — ใช้ `window.grist` API จริง
- **อยู่นอก Grist** — ใช้ Mock API ที่โหลดข้อมูลตัวอย่าง

API หลักที่ใช้:

| Method | หน้าที่ |
|--------|---------|
| `grist.ready()` | แจ้ง Grist ว่า Widget พร้อมใช้งาน |
| `grist.onRecord()` | รับข้อมูลเมื่อผู้ใช้เลือกแถว |
| `grist.onOptions()` | รับค่าตั้งค่า (Custom CSS) |
| `grist.setOption()` | บันทึกค่าตั้งค่า |

### State Management

ใช้ Composable (`useAppState`) เป็นศูนย์กลางการจัดการ State:

| State | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `record` | `GristRecord \| null` | ข้อมูลที่ผ่าน Validation |
| `rawGristData` | `unknown` | ข้อมูลดิบจาก Grist |
| `error` | `string \| null` | ข้อความข้อผิดพลาด |
| `isLoading` | `boolean` | สถานะกำลังโหลด |
| `customCss` | `string` | CSS ที่ผู้ใช้กำหนด |
| `showSettings` | `boolean` | สถานะแสดง/ซ่อนแผงตั้งค่า |

### Component Design

ทุก Component ใช้รูปแบบเดียวกัน:

- ใช้ `<script setup lang="ts">` syntax
- รับข้อมูลผ่าน Props (ไม่มีการแก้ไข State โดยตรง)
- ใช้ `computed()` สำหรับข้อมูลที่แสดงผล
- ใช้ BEM สำหรับ CSS class names

## การทดสอบ

### Unit Tests

ตั้งอยู่ใน `src/__tests__/`:

- **Schema Validation** — ทดสอบการตรวจสอบข้อมูลด้วย Zod
- **Component Mounting** — ทดสอบการ Render ของ Vue Component

```bash
vp run test:unit
```

### E2E Tests

ตั้งอยู่ใน `e2e/`:

- **functional.spec.ts** — ทดสอบฟีเจอร์หลัก
- **visual.spec.ts** — ทดสอบการแสดงผล (Visual Regression)
- **grist.spec.ts** — ทดสอบการทำงานร่วมกับ Grist จริง (ต้องมี Docker)

ใช้รูปแบบ Page Object Pattern:

```typescript
// ตัวอย่าง
await app.actionButtons.selectScenario('receipt-vat-k8s-bug-hunt')
await app.printableDocument.expectDocumentNumber('RCPT-2025-0001')
```

```bash
# ทดสอบ E2E (ต้อง Build ก่อน)
vp run build
vp run test:e2e
```

!!! note "Grist Integration Test"
    การทดสอบ `grist.spec.ts` ต้องมี Grist instance ที่ `http://localhost:8484/` สามารถเริ่มด้วย:
    ```bash
    docker compose -f e2e/docker-compose.yml up -d
    ```

## CI/CD

โปรเจกต์ใช้ GitHub Actions สำหรับ CI/CD:

### Test Job

1. Type check (`vue-tsc` + `tsc`)
2. Lint
3. Unit tests
4. Build

### E2E Job

1. Build
2. เริ่ม Grist ผ่าน Docker
3. ติดตั้ง Playwright
4. ทดสอบ E2E
5. อัปโหลด Artifacts เมื่อมีข้อผิดพลาด

### Triggers

- Push ไปยัง `main`, `develop`, `e2e`
- Pull Request ไปยัง `main`
