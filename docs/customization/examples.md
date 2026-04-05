# ตัวอย่างการปรับแต่ง

รวบรวมตัวอย่าง CSS สำหรับปรับแต่งเอกสารตามสไตล์ต่างๆ

## ธีมสีมินิมอล

ธีมเรียบง่าย เน้นความสะอาดตา:

```css
.document {
  --primary-color: #2c3e50;
  --accent-color: #3498db;
  --bg-subtle: #ecf0f1;
  
  --font-family: 'Sarabun', sans-serif;
}

.document__header {
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 1rem;
}

.document-header__title {
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.items-table__header {
  background-color: var(--primary-color);
  color: white;
}

.tax-summary__row--total {
  color: var(--primary-color);
  font-size: 1.1em;
}
```

## ธีมธุรกิจสมัยใหม่

เหมาะสำหรับบริษัทสตาร์ทอัพและธุรกิจดิจิทัล:

```css
.document {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --font-family: 'Prompt', sans-serif;
}

.document__header {
  background: var(--primary-gradient);
  color: white;
  padding: 2rem;
  margin: -20mm -20mm 2rem -20mm;
}

.document-header__title {
  color: white;
  font-weight: 300;
}

.items-table__header {
  background: transparent;
  border-bottom: 2px solid #667eea;
  color: #667eea;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.items-table__row {
  border-bottom: 1px solid #e0e0e0;
}

.tax-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}
```

## ธีมคลาสสิก

สไตล์ดั้งเดิม เหมาะสำหรับธุรกิจรุ่นเก่า:

```css
.document {
  --font-family: 'TH Sarabun New', 'Sarabun', serif;
  --border-color: #8b4513;
  --paper-bg: #fffef0;
}

.document {
  background-color: var(--paper-bg);
  border: 1px solid var(--border-color);
}

.document__header {
  border-bottom: 3px double var(--border-color);
  padding-bottom: 1.5rem;
}

.document-header__provider-name {
  font-family: Georgia, serif;
  font-style: italic;
}

.items-table {
  border: 1px solid var(--border-color);
}

.items-table__header {
  background-color: #f5f5dc;
  border-bottom: 2px solid var(--border-color);
}

.items-table__cell,
.items-table__header th {
  border-right: 1px solid #ddd;
}

.signature-area__section {
  border: 1px solid var(--border-color);
  padding: 2rem;
  background-color: white;
}
```

## ธีมสีตามประเภทเอกสาร

แต่ละประเภทเอกสารมีสีแตกต่างกัน:

```css
/* ใบเสนอราคา - สีฟ้า */
[data-document-type="quotation"] {
  --brand-color: #3b82f6;
}

[data-document-type="quotation"] .document__header {
  border-left: 5px solid var(--brand-color);
  padding-left: 1rem;
}

[data-document-type="quotation"] .document-header__title {
  color: var(--brand-color);
}

/* ใบแจ้งหนี้ - สีส้ม */
[data-document-type="invoice"] {
  --brand-color: #f97316;
}

[data-document-type="invoice"] .document__header {
  border-left: 5px solid var(--brand-color);
  padding-left: 1rem;
}

[data-document-type="invoice"] .document-header__title {
  color: var(--brand-color);
}

/* ใบเสร็จ - สีเขียว */
[data-document-type="receipt"] {
  --brand-color: #22c55e;
}

[data-document-type="receipt"] .document__header {
  border-left: 5px solid var(--brand-color);
  padding-left: 1rem;
}

[data-document-type="receipt"] .document-header__title {
  color: var(--brand-color);
}
```

## ซ่อนส่วนประกอบที่ไม่ต้องการ

### ซ่อน QR Code

```css
.qr-code-section {
  display: none !important;
}
```

### ซ่อนส่วนลงชื่อ (สำหรับใบเสนอราคา)

```css
[data-document-type="quotation"] .signature-area {
  display: none;
}
```

### ซ่อนข้อมูลบัญชีธนาคาร

```css
.payment-info {
  display: none;
}
```

### ซ่อนหมายเหตุ

```css
.remarks-section {
  display: none;
}
```

## ปรับแต่งตาราง

### ตารางแบบมินิมอล

```css
.items-table {
  border-collapse: collapse;
}

.items-table__header {
  background: transparent;
  border-bottom: 2px solid #333;
}

.items-table__header th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  padding: 0.75rem 0.5rem;
}

.items-table__row {
  border-bottom: 1px solid #eee;
}

.items-table__cell {
  padding: 1rem 0.5rem;
}
```

### ตารางแบบมีสีสลับ (Zebra Striping)

```css
.items-table__row:nth-child(even) {
  background-color: #f8f9fa;
}

.items-table__row:hover {
  background-color: #e9ecef;
}
```

## ปรับแต่งส่วนสรุปราคา

### แสดงยอดเป็นตัวอักษร

```css
.tax-summary__row--total::after {
  content: '(' attr(data-amount-thai) ')';
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}
```

### กรอบพิเศษสำหรับยอดรวม

```css
.tax-summary__row--total {
  background: #f0f8ff;
  padding: 1rem;
  border: 2px solid #3b82f6;
  border-radius: 4px;
}

.tax-summary__row--total .tax-summary__amount {
  font-size: 1.25rem;
  color: #3b82f6;
}
```

## ปรับแต่งฟอนต์

### ใช้ฟอนต์ Prompt (Google Fonts)

```css
/* เพิ่มใน Custom CSS */
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap');

.document {
  --font-family: 'Prompt', sans-serif;
}
```

### ฟอนต์ Monospace สำหรับตัวเลข

```css
.tax-summary__amount,
.items-table__cell--price,
.items-table__cell--total {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-variant-numeric: tabular-nums;
}
```

## ปรับแต่งการพิมพ์

### ซ่อน background สีเมื่อพิมพ์

```css
@media print {
  .document__header,
  .items-table__header,
  .tax-summary__row--total {
    background: transparent !important;
    color: black !important;
  }
  
  .items-table__header {
    border-bottom: 2px solid black;
  }
}
```

### บังคับขึ้นหน้าใหม่

```css
@media print {
  .signature-area {
    page-break-inside: avoid;
    margin-top: 100px;
  }
}
```

## ธีมพร้อมใช้

### ธีมดาร์กโหมด (สำหรับหน้าจอ)

```css
@media screen {
  .document {
    background-color: #1a1a1a;
    color: #e0e0e0;
  }
  
  .document__header {
    border-bottom-color: #444;
  }
  
  .items-table__header {
    background-color: #2d2d2d;
    color: #fff;
  }
  
  .items-table__row {
    border-bottom-color: #333;
  }
  
  .tax-summary {
    background-color: #2d2d2d;
  }
}
```

> [!WARNING]
> ธีมดาร์กโหมดอาจไม่เหมาะกับการพิมพ์ ควรใช้ `@media screen` เพื่อจำกัดเฉพาะหน้าจอ
