# คู่มือ CSS เชิงลึก

คู่มือนี้อธิบายโครงสร้าง CSS classes และวิธีการปรับแต่งเอกสารอย่างละเอียด

## CSS Variables ทั้งหมด

### Typography

```css
.document {
  --font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
  --font-family-system: system-ui, -apple-system, sans-serif;
  --font-family-mono: 'Share Tech Mono', 'Fira Code', monospace;
  
  --font-size-base: 14px;
  --font-size-sm: 12px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-base: 1.5;
}
```

### Colors

```css
.document {
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --text-error: #dc2626;
  
  --primary-blue: #3b82f6;
  --primary-blue-dark: #2563eb;
  --secondary-gray: #6b7280;
  --secondary-gray-dark: #4b5563;
  
  --bg-white: #ffffff;
  --bg-gray: #f9fafb;
}
```

### Layout

```css
.document {
  --document-width: 210mm;
  --document-height: 297mm;
  --document-padding-top: 20mm;
  --document-padding-right: 20mm;
  --document-padding-bottom: 20mm;
  --document-padding-left: 20mm;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

### Components

```css
.document {
  --border-light: #e5e7eb;
  --border-medium: #d1d5db;
  --border-radius: 0.375rem;
  
  --button-padding: 0.5rem 1rem;
  
  --document-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --document-scale: 1;
}
```

## โครงสร้าง HTML และ CSS Classes

### Document Container

```html
<article class="document" data-document-type="quotation">
  <!-- ส่วนต่างๆ -->
</article>
```

```css
/* เอกสารทั้งหมด */
.document {
  /* base styles */
}

/* เอกสารแต่ละประเภท */
[data-document-type="quotation"] { }
[data-document-type="invoice"] { }
[data-document-type="receipt"] { }
```

### Document Header

```html
<header class="document-header">
  <div class="document-header__left">
    <div class="document-header__provider">
      <h1 class="document-header__provider-name"></h1>
      <p class="document-header__provider-address"></p>
    </div>
  </div>
  <div class="document-header__right">
    <h2 class="document-header__title"></h2>
    <div class="document-header__meta">
      <span class="document-header__number"></span>
      <span class="document-header__date"></span>
    </div>
  </div>
</header>
```

```css
.document-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
}

.document-header__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}
```

### Client Info

```html
<section class="client-info">
  <div class="client-info__label">ลูกค้า / Customer</div>
  <div class="client-info__name"></div>
  <div class="client-info__address"></div>
  <div class="client-info__tax-id"></div>
</section>
```

```css
.client-info {
  margin-bottom: var(--spacing-lg);
}

.client-info__label {
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
}
```

### Items Table

```html
<table class="items-table">
  <thead class="items-table__header">
    <tr>
      <th class="items-table__col--no">ลำดับ</th>
      <th class="items-table__col--desc">รายการ</th>
      <th class="items-table__col--qty">จำนวน</th>
      <th class="items-table__col--price">ราคาต่อหน่วย</th>
      <th class="items-table__col--total">จำนวนเงิน</th>
    </tr>
  </thead>
  <tbody class="items-table__body">
    <tr class="items-table__row">
      <td class="items-table__cell--no"></td>
      <!-- ... -->
    </tr>
  </tbody>
</table>
```

```css
.items-table {
  width: 100%;
  border-collapse: collapse;
}

.items-table__header {
  background-color: var(--bg-gray);
}

.items-table__header th {
  padding: var(--spacing-sm);
  text-align: left;
  font-weight: var(--font-weight-semibold);
}

.items-table__row {
  border-bottom: 1px solid var(--border-light);
}

.items-table__row:hover {
  background-color: var(--bg-gray);
}
```

### Tax Summary

```html
<div class="tax-summary">
  <div class="tax-summary__row">
    <span class="tax-summary__label">รวมเงิน</span>
    <span class="tax-summary__amount"></span>
  </div>
  <div class="tax-summary__row">
    <span class="tax-summary__label">VAT 7%</span>
    <span class="tax-summary__amount"></span>
  </div>
  <div class="tax-summary__row tax-summary__row--total">
    <span class="tax-summary__label">รวมสุทธิ</span>
    <span class="tax-summary__amount"></span>
  </div>
</div>
```

```css
.tax-summary {
  margin-left: auto;
  width: 50%;
}

.tax-summary__row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.tax-summary__row--total {
  font-weight: var(--font-weight-bold);
  border-top: 2px solid var(--border-medium);
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
}
```

### Signature Area

```html
<div class="signature-area">
  <div class="signature-area__section">
    <p class="signature-area__label">ลงชื่อ .................................... ผู้รับเงิน</p>
    <p class="signature-area__name"></p>
    <p class="signature-area__date">วันที่ ........../........../............</p>
  </div>
</div>
```

```css
.signature-area {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: flex-end;
}

.signature-area__section {
  text-align: center;
}

.signature-area__label {
  margin-bottom: var(--spacing-sm);
}
```

## Media Queries

### การพิมพ์

```css
@media print {
  .document {
    box-shadow: none;
    width: 100% !important;
  }
  
  .action-buttons,
  .app__settings {
    display: none !important;
  }
}
```

### หน้าจอขนาดเล็ก

```css
@media screen and (max-width: 768px) {
  .document {
    width: 100%;
    zoom: 0.8;
  }
  
  .document-header {
    flex-direction: column;
  }
}
```

## Best Practices

1. **ใช้ CSS Variables** - ง่ายต่อการ maintain
2. **ทดสอบการพิมพ์** - ตรวจสอบก่อนใช้งานจริง
3. **ใช้ Specificity ที่เหมาะสม** - หลีกเลี่ยง `!important`
4. **ทดสอบทุกประเภทเอกสาร** - แต่ละประเภทอาจแสดงผลต่างกัน
