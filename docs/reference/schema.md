# Schema Reference

เอกสารอ้างอิงโครงสร้างข้อมูลทั้งหมดที่ใช้ใน bizdocgen

## ตารางใน Grist

### Documents

ตารางหลักสำหรับเก็บข้อมูลเอกสาร

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| **Number** | Text | ✓ | เลขที่เอกสาร |
| **Date** | Date | ✓ | วันที่เอกสาร |
| **Document_Type** | Choice List | ✓ | ประเภทเอกสาร (Quotation, Invoice, Receipt) |
| **Client** | Reference | ✓ | อ้างอิงถึงตาราง Clients |
| **Provider** | Reference | ✓ | อ้างอิงถึงตาราง Providers |
| **Items** | Reference List | ✓ | อ้างอิงถึงรายการสินค้า |
| **Tax** | Numeric | ✓ | อัตราภาษี (0.07 = VAT 7%, -0.03 = WHT 3%) |
| **Payment_Method** | Reference | | อ้างอิงถึงตาราง Payment Methods |
| **Credit_Term** | Text | | เงื่อนไขการชำระเงิน |
| **Reference** | Reference | | อ้างอิงถึงเอกสารอื่น |
| **Remarks** | Text | | หมายเหตุ |
| **Signed_Document_URL** | Text | | URL ของเอกสารที่ลงชื่อแล้ว |

### Clients

ตารางเก็บข้อมูลลูกค้า

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| **Name** | Text | ✓ | ชื่อลูกค้า/บริษัท |
| **Address** | Text | ✓ | ที่อยู่ |
| **Tax_ID** | Text | ✓ | เลขประจำตัวผู้เสียภาษี |

### Providers

ตารางเก็บข้อมูลผู้ให้บริการ

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| **Name** | Text | ✓ | ชื่อบริษัท/แบรนด์ |
| **Address** | Text | ✓ | ที่อยู่ |
| **Tax_ID** | Text | ✓ | เลขประจำตัวผู้เสียภาษี |
| **Email** | Text | | อีเมล |
| **Personnel_Name** | Text | | ชื่อผู้มีอำนาจลงนาม |

### Items

ตารางเก็บรายการสินค้า/บริการ

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| **Description** | Text | ✓ | รายละเอียดสินค้า |
| **Quantity** | Numeric | ✓ | จำนวน |
| **Unit_Price** | Numeric | ✓ | ราคาต่อหน่วย |
| **Total** | Numeric | ✓ | ราคารวม (Quantity × Unit_Price) |
| **Manual_Sort** | Numeric | | ลำดับการแสดง |
| **Document** | Reference | ✓ | อ้างอิงถึงเอกสาร |

### Payment Methods

ตารางเก็บวิธีการชำระเงิน

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| **Name** | Text | ✓ | ชื่อวิธีการชำระ |
| **Bank** | Text | | ชื่อธนาคาร |
| **Branch** | Text | | สาขา |
| **Account_Holder** | Text | | ชื่อเจ้าของบัญชี |
| **Account_Number** | Text | | เลขที่บัญชี |
| **PromptPay** | Text | | หมายเลข PromptPay |

## JSON Schema

### GristRecord

```json
{
  "id": 123,
  "Record": {
    "Number": "INV-2024-001",
    "Date": "2024-01-15T00:00:00.000Z",
    "Document_Type": ["Invoice"],
    "Client": {
      "Name": "บริษัท ลูกค้า จำกัด",
      "Address": "123 ถ.ตัวอย่าง กรุงเทพฯ 10110",
      "Tax_ID": "1234567890123"
    },
    "Provider": {
      "Name": "บริษัท ผู้ให้บริการ จำกัด",
      "Address": "456 ถ.สุขุมวิท กรุงเทพฯ 10110",
      "Tax_ID": "9876543210987",
      "Email": "contact@provider.com",
      "Personnel_Name": "นาย สมชาย ใจดี"
    },
    "Items": [
      {
        "id": 1,
        "Description": "บริการออกแบบเว็บไซต์",
        "Quantity": 1,
        "Unit_Price": 50000,
        "Total": 50000,
        "Manual_Sort": 1
      }
    ],
    "Tax": 0.07,
    "Payment_Method": {
      "Name": "ธนาคารกสิกรไทย",
      "Bank": "ธนาคารกสิกรไทย",
      "Branch": "สาขาสุขุมวิท",
      "Account_Holder": "บริษัท ผู้ให้บริการ จำกัด",
      "Account_Number": "123-4-56789-0",
      "PromptPay": "0812345678"
    },
    "Credit_Term": "30 วัน",
    "Reference": {
      "Number": "QT-2024-001"
    },
    "Remarks": "ชำระเงินภายในวันที่กำหนด",
    "Signed_Document_URL": ""
  }
}
```

## Zod Schema Definition

### DocumentTypeSchema

```typescript
export const DocumentTypeSchema = z.enum(['Quotation', 'Invoice', 'Receipt'])
```

### ClientSchema

```typescript
export const ClientSchema = z.object({
  Address: z.string(),
  Name: z.string(),
  Tax_ID: z.string(),
})
```

### ProviderSchema

```typescript
export const ProviderSchema = z.object({
  Address: z.string(),
  Email: z.string().nullish(),
  Name: z.string(),
  Personnel_Name: z.string().nullish(),
  Tax_ID: z.string(),
})
```

### ItemSchema

```typescript
export const ItemSchema = z.object({
  Description: z.string(),
  Manual_Sort: z.number().nullish(),
  Quantity: z.number(),
  Total: z.number(),
  Unit_Price: z.number(),
  id: z.number(),
})
```

### PaymentMethodSchema

```typescript
export const PaymentMethodSchema = z.object({
  Account_Holder: z.string().nullish(),
  Account_Number: z.string().nullish(),
  Bank: z.string().nullish(),
  Branch: z.string().nullish(),
  Name: z.string(),
  PromptPay: z.string().nullish(),
})
```

### RecordDataSchema

```typescript
export const RecordDataSchema = z.object({
  Client: ClientSchema,
  Credit_Term: z.string().nullish(),
  Date: z.string(),
  Document_Type: DocumentTypeListSchema,
  Items: z.array(ItemSchema),
  Number: z.string(),
  Payment_Method: PaymentMethodSchema.nullish(),
  Provider: ProviderSchema,
  Reference: ReferenceSchema,
  Remarks: z.string().nullish(),
  Tax: z.number(),
  Signed_Document_URL: z.union([z.url(), z.literal('')]).nullish(),
})
```

### GristRecordSchema

```typescript
export const GristRecordSchema = z.object({
  id: z.number(),
  Record: RecordDataSchema,
})
```

## Data Types

### TypeScript Types

```typescript
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type Client = z.infer<typeof ClientSchema>
export type Provider = z.infer<typeof ProviderSchema>
export type Item = z.infer<typeof ItemSchema>
export type DocumentType = z.infer<typeof DocumentTypeSchema>
export type Reference = z.infer<typeof ReferenceSchema>
export type RecordData = z.infer<typeof RecordDataSchema>
export type GristRecord = z.infer<typeof GristRecordSchema>
```

## Validation Rules

### Tax Values

- `0` - ไม่มีภาษี
- `0.07` - VAT 7%
- `-0.01` ถึง `-0.05` - ภาษีหัก ณ ที่จ่าย

### Date Format

ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

ตัวอย่าง: `2024-01-15T00:00:00.000Z`

### PromptPay Format

- หมายเลขโทรศัพท์: 10 หลัก (ไม่มีขีด)
- เลขบัตรประชาชน: 13 หลัก

### Document_Type

ต้องเป็น Array ที่มี 1 element เท่านั้น:

```json
["Invoice"]      // ✓ ถูกต้อง
["Quotation"]    // ✓ ถูกต้อง
["Invoice", "Receipt"]  // ✗ ผิด
```

## Migration Guide

### เพิ่ม Field ใหม่

1. **เพิ่มใน Grist Schema**
   - เพิ่ม column ในตารางที่ต้องการ

2. **อัพเดท Zod Schema**
   ```typescript
   export const RecordDataSchema = z.object({
     // ... existing fields
     New_Field: z.string().optional()
   })
   ```

3. **อัพเดท Component**
   - เพิ่มการแสดงผลใน component ที่เหมาะสม

4. **อัพเดท Tests**
   - เพิ่ม test data ที่มี field ใหม่

## Example Records

### Quotation

```json
{
  "id": 1,
  "Record": {
    "Number": "QT-2024-001",
    "Date": "2024-01-15T00:00:00.000Z",
    "Document_Type": ["Quotation"],
    "Client": {
      "Name": "บริษัท ตัวอย่าง จำกัด",
      "Address": "123 ถ.ตัวอย่าง กรุงเทพฯ",
      "Tax_ID": "1234567890123"
    },
    "Provider": {
      "Name": "บริษัท ผู้ให้บริการ จำกัด",
      "Address": "456 ถ.สุขุมวิท กรุงเทพฯ",
      "Tax_ID": "9876543210987"
    },
    "Items": [
      {
        "Description": "บริการออกแบบ",
        "Quantity": 1,
        "Unit_Price": 50000,
        "Total": 50000,
        "id": 1
      }
    ],
    "Tax": 0.07,
    "Credit_Term": "30 วัน"
  }
}
```

### Invoice with PromptPay

```json
{
  "id": 2,
  "Record": {
    "Number": "INV-2024-001",
    "Date": "2024-02-01T00:00:00.000Z",
    "Document_Type": ["Invoice"],
    "Client": { /* ... */ },
    "Provider": { /* ... */ },
    "Items": [ /* ... */ ],
    "Tax": 0.07,
    "Payment_Method": {
      "Name": "บัญชีธนาคารกสิกร",
      "Bank": "ธนาคารกสิกรไทย",
      "Branch": "สุขุมวิท",
      "Account_Holder": "บริษัท ผู้ให้บริการ",
      "Account_Number": "123-4-56789-0",
      "PromptPay": "0812345678"
    }
  }
}
```

### Receipt with WHT

```json
{
  "id": 3,
  "Record": {
    "Number": "RC-2024-001",
    "Date": "2024-02-15T00:00:00.000Z",
    "Document_Type": ["Receipt"],
    "Client": { /* ... */ },
    "Provider": { /* ... */ },
    "Items": [ /* ... */ ],
    "Tax": -0.03,
    "Reference": { "Number": "INV-2024-001" }
  }
}
```
