# การปรับแต่งเอกสาร

bizdocgen รองรับการปรับแต่งหน้าตาเอกสารด้วย Custom CSS ตามต้องการ

## การเข้าถึง Custom CSS Settings

1. เลื่อนลงมาด้านล่างของ widget
2. คลิก **▶ Custom CSS Settings**
3. กรอก CSS ในช่อง textarea
4. คลิก **Apply CSS**

## โครงสร้าง CSS

bizdocgen ใช้ BEM (Block Element Modifier) naming convention ซึ่งช่วยให้ง่ายต่อการ customize:

```css
/* Block */
.document { }

/* Element */
.document__header { }
.document__title { }

/* Modifier */
.document--quotation { }
```

## CSS Variables

bizdocgen มี CSS Variables ที่สามารถ override ได้:

```css
.document {
  /* ฟอนต์ */
  --font-family: 'Sarabun', sans-serif;
  --font-family-mono: 'Share Tech Mono', monospace;
  
  /* สี */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --primary-blue: #3b82f6;
  
  /* ขนาดเอกสาร */
  --document-width: 210mm;
  --document-height: 297mm;
  
  /* ระยะห่าง */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

## ตัวอย่างการปรับแต่ง

### เปลี่ยนฟอนต์

```css
.document {
  --font-family: 'Prompt', 'Sarabun', sans-serif;
}
```

### เปลี่ยนสีหัวเอกสาร

```css
.document__header {
  background-color: #f0f8ff;
  border-bottom: 3px solid #3b82f6;
  padding: 1.5rem;
}
```

### ปรับแต่งตารางสินค้า

```css
.items-table__header {
  background-color: #1f2937;
  color: white;
}

.items-table__row:nth-child(even) {
  background-color: #f9fafb;
}
```

### ซ่อนส่วนที่ไม่ต้องการ

```css
/* ซ่อน QR Code */
.qr-code-section {
  display: none;
}

/* ซ่อนส่วนลงชื่อ */
.signature-area {
  display: none;
}
```

### ปรับแต่งตามประเภทเอกสาร

```css
/* ใบเสนอราคา - สีฟ้า */
[data-document-type="quotation"] .document__header {
  border-bottom-color: #3b82f6;
}

/* ใบแจ้งหนี้ - สีส้ม */
[data-document-type="invoice"] .document__header {
  border-bottom-color: #f97316;
}

/* ใบเสร็จ - สีเขียว */
[data-document-type="receipt"] .document__header {
  border-bottom-color: #22c55e;
}
```

## การบันทึก CSS

CSS ที่ตั้งค่าจะถูกบันทึกไว้ใน:

- **Hosted Grist** - บันทึกใน options ของ widget
- **Self-hosted** - ขึ้นอยู่กับการตั้งค่า

> [!TIP]
> CSS จะถูกนำไปใช้ทันทีเมื่อคลิก Apply แต่จะบันทึกถาวรเมื่อคลิก Apply CSS

## ข้อควรระวัง

- CSS มีผลกับการแสดงผลบนหน้าจอและการพิมพ์
- ตรวจสอบการแสดงผลก่อนพิมพ์จริง
- บาง properties อาจไม่ทำงานในการพิมพ์

## ขั้นตอนถัดไป

- ดู [คู่มือ CSS เชิงลึก](css-guide.md)
- ดู [ตัวอย่างการปรับแต่ง](examples.md)
