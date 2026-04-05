# API Reference

เอกสารอ้างอิงสำหรับ APIs และ utilities ในโปรเจกต์

## Grist API Integration

### grist.ts

Main API layer สำหรับติดต่อกับ Grist

#### การใช้งาน

```typescript
import { grist, isGristMocked } from '../utils/grist'

// ตรวจสอบ mode
if (isGristMocked) {
  console.log('Running in development mode')
}

// เรียกใช้ API
grist.ready({ onEditOptions: () => { } })
grist.onRecord((record) => { })
grist.setOption('key', value)
```

#### Methods

##### `ready(options?)`

สัญญาณว่า widget พร้อมทำงาน

```typescript
grist.ready({
  onEditOptions: () => {
    // เรียกเมื่อผู้ใช้คลิก "Edit Options" ใน Grist
    showSettings.value = true
  }
})
```

##### `onRecord(callback)`

รับข้อมูล record จาก Grist

```typescript
grist.onRecord((recordData: unknown) => {
  // recordData เป็น object ตาม GristRecordSchema
  const validated = GristRecordSchema.parse(recordData)
})
```

##### `setOption(key, value)`

บันทึก options ลง Grist

```typescript
grist.setOption('customCss', '.document { color: red; }')
```

##### `getOption(key)`

อ่าน options จาก Grist

```typescript
const css = await grist.getOption('customCss')
```

## Document Schema

### document-schema.ts

Zod schemas สำหรับ validate ข้อมูลจาก Grist

#### GristRecord

```typescript
interface GristRecord {
  id: number
  Record: RecordData
}
```

#### RecordData

```typescript
interface RecordData {
  Client: Client
  Credit_Term?: string
  Date: string  // ISO date
  Document_Type: DocumentType[]
  Items: Item[]
  Number: string
  Payment_Method?: PaymentMethod
  Provider: Provider
  Reference?: Reference
  Remarks?: string
  Tax: number
  Signed_Document_URL?: string
}
```

#### Client

```typescript
interface Client {
  Name: string
  Address: string
  Tax_ID: string
}
```

#### Provider

```typescript
interface Provider {
  Name: string          // ชื่อบริษัท/แบรนด์
  Address: string
  Tax_ID: string
  Email?: string
  Personnel_Name?: string  // สำหรับลงชื่อ
}
```

#### Item

```typescript
interface Item {
  id: number
  Description: string
  Quantity: number
  Unit_Price: number
  Total: number
  Manual_Sort?: number
}
```

#### PaymentMethod

```typescript
interface PaymentMethod {
  Name: string
  Bank?: string
  Branch?: string
  Account_Holder?: string
  Account_Number?: string
  PromptPay?: string
}
```

#### DocumentType

```typescript
type DocumentType = 'Quotation' | 'Invoice' | 'Receipt'
```

## Tax Utilities

### tax.ts

ฟังก์ชันคำนวณภาษี

#### getTaxInfo(taxPercentage, subtotal)

```typescript
import { getTaxInfo } from '../utils/tax'

const taxInfo = getTaxInfo(0.07, 1000)
// Returns:
// {
//   label: 'VAT 7%',
//   percentage: 0.07,
//   amount: 70,
//   displayAmount: '70.00'
// }

const whtInfo = getTaxInfo(-0.03, 1000)
// Returns:
// {
//   label: 'ภาษีหัก ณ ที่จ่าย 3%',
//   percentage: -0.03,
//   amount: -30,
//   displayAmount: '30.00'
// }
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `taxPercentage` | `number` | อัตราภาษี (0.07 = 7%, -0.03 = WHT 3%) |
| `subtotal` | `number` | ยอดรวมก่อนภาษี |

### Returns

```typescript
interface TaxInfo {
  label: string | null      // ชื่อภาษีที่แสดง
  percentage: number        // อัตราภาษี
  amount: number            // จำนวนเงินภาษี
  displayAmount: string     // จำนวนเงินแบบทศนิยม 2 ตำแหน่ง
}
```

## PromptPay Utilities

### promptpay.ts

สร้าง QR Code สำหรับ PromptPay

#### generatePromptPayQR(promptPayId, amount)

```typescript
import { generatePromptPayQR } from '../utils/promptpay'

const qrDataUrl = await generatePromptPayQR('0812345678', 1500.50)
// Returns: data:image/png;base64,...
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `promptPayId` | `string` | หมายเลข PromptPay (10 หรือ 13 หลัก) |
| `amount` | `number` | จำนวนเงิน |

### Returns

`Promise<string>` - Data URL ของรูปภาพ PNG

## Currency Utilities

### currency.ts

จัดการการแสดงผลจำนวนเงิน

#### formatCurrency(amount)

```typescript
import { formatCurrency } from '../utils/currency'

formatCurrency(1234.50)
// Returns: '1,234.50'
```

#### formatThaiBaht(amount)

```typescript
import { formatThaiBaht } from '../utils/currency'

formatThaiBaht(1234)
// Returns: 'หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน'
```

## Markdown Utilities

### markdown.ts

แปลง Markdown เป็น HTML

#### renderMarkdown(markdown)

```typescript
import { renderMarkdown } from '../utils/markdown'

const html = await renderMarkdown('# Hello\n\n**Bold** text')
// Returns: '<h1>Hello</h1><p><strong>Bold</strong> text</p>'
```

## useAppState Composable

### useAppState.ts

Composable หลักสำหรับจัดการ state

### Returns

```typescript
{
  // State
  record: Ref<GristRecord | null>
  rawGristData: Ref<unknown>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  customCss: Ref<string>
  showSettings: Ref<boolean>
  settingsRef: Ref<HTMLElement | null>
  
  // Computed
  isCssChanged: ComputedRef<boolean>
  
  // Actions
  saveCustomCss: () => void
  loadCustomCss: () => Promise<void>
  scrollToSettings: () => Promise<void>
  initializeGrist: () => Promise<void>
  applyCustomCss: (css: string) => void
}
```

### การใช้งาน

```typescript
import { useAppState } from '../composables/useAppState'

const {
  record,
  error,
  isLoading,
  initializeGrist
} = useAppState()

onMounted(async () => {
  await initializeGrist()
})
```

## CSS Variables

### ตัวแปรที่ใช้ได้

```css
/* Typography */
--font-family: 'Sarabun', sans-serif;
--font-family-mono: 'Share Tech Mono', monospace;
--font-size-base: 14px;
--font-size-sm: 12px;
--font-size-lg: 16px;
--font-size-xl: 20px;

/* Colors */
--text-primary: #1f2937;
--text-secondary: #6b7280;
--primary-blue: #3b82f6;
--primary-blue-dark: #2563eb;

/* Layout */
--document-width: 210mm;
--document-height: 297mm;
--document-padding-top: 20mm;
--document-padding-right: 20mm;
--document-padding-bottom: 20mm;
--document-padding-left: 20mm;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

## TypeScript Types

### การ Extend Types

```typescript
// เพิ่ม field ใหม่ใน schema
export const ExtendedRecordDataSchema = RecordDataSchema.extend({
  Custom_Field: z.string().optional()
})

export type ExtendedRecordData = z.infer<typeof ExtendedRecordDataSchema>
```

## Error Handling

### Schema Validation Error

```typescript
try {
  const record = GristRecordSchema.parse(data)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Validation errors:', error.errors)
  }
}
```

### Grist API Error

```typescript
try {
  await grist.setOption('key', value)
} catch (error) {
  console.error('Failed to save option:', error)
}
```
