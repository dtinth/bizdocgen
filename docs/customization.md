# การปรับแต่ง

## Custom CSS

bizdocgen รองรับการปรับแต่งรูปลักษณ์เอกสารผ่าน Custom CSS ที่สามารถกำหนดได้จากแผงตั้งค่าภายใน Widget

### วิธีใช้งาน

1. เปิดแผงตั้งค่าโดยกดปุ่ม **▶ Custom CSS Settings**
2. พิมพ์ CSS ที่ต้องการในช่องข้อความ
3. กดปุ่ม **Apply CSS** เพื่อใช้งาน

!!! tip "การบันทึกค่า"
    CSS ที่กำหนดจะถูกบันทึกไว้ใน Grist โดยอัตโนมัติ เมื่อโหลดหน้าใหม่ค่าที่ตั้งไว้จะยังคงอยู่

### ตัวอย่าง Custom CSS

#### เปลี่ยนฟอนต์

```css
.document {
  --font-family: 'Comic Sans MS', Itim, sans-serif;
}
```

#### เปลี่ยนสีพื้นหลังหัวตาราง

```css
.items-table__header {
  background-color: #f0f8ff;
}
```

#### เปลี่ยนขนาดตัวอักษร

```css
.document {
  --font-size-base: 10pt;
  --font-size-lg: 12pt;
}
```

#### เพิ่มเส้นขอบหัวเอกสาร

```css
.document__header {
  border-bottom: 2px solid #333;
}
```

## CSS Classes ที่สามารถปรับแต่งได้

bizdocgen ใช้ระบบตั้งชื่อ CSS แบบ [BEM](https://getbem.com/) (Block Element Modifier) เพื่อให้ชื่อ Class คงที่และคาดเดาได้

### โครงสร้าง BEM

- **Block** — ชื่อ Component หลัก เช่น `document`, `items-table`
- **Element** — ส่วนย่อยของ Block เช่น `document__header`, `items-table__row`
- **Modifier** — สถานะหรือรูปแบบที่แตกต่าง เช่น `items-table__header--number`

### Class หลักที่ใช้ปรับแต่งได้

#### เอกสารหลัก

| Class | คำอธิบาย |
|-------|----------|
| `.document` | ตัวเอกสารทั้งหมด |
| `.document__header` | ส่วนหัวเอกสาร (ชื่อผู้ออก ประเภท เลขที่ วันที่) |

#### ตารางรายการ

| Class | คำอธิบาย |
|-------|----------|
| `.items-table` | ตารางรายการทั้งหมด |
| `.items-table__header` | แถวหัวตาราง |
| `.items-table__row` | แถวรายการ |
| `.items-table__cell` | เซลล์ในตาราง |

#### ข้อมูลลูกค้า

| Class | คำอธิบาย |
|-------|----------|
| `.client-info` | ส่วนข้อมูลลูกค้า |

#### สรุปภาษี

| Class | คำอธิบาย |
|-------|----------|
| `.tax-summary` | ส่วนสรุปยอดและภาษี |

#### ข้อมูลการชำระเงิน

| Class | คำอธิบาย |
|-------|----------|
| `.payment-info` | ส่วนข้อมูลการชำระเงิน |

#### QR Code

| Class | คำอธิบาย |
|-------|----------|
| `.qr-code-section` | ส่วน QR Code พร้อมเพย์ |

#### หมายเหตุ

| Class | คำอธิบาย |
|-------|----------|
| `.remarks-section` | ส่วนหมายเหตุ |

#### ช่องลงชื่อ

| Class | คำอธิบาย |
|-------|----------|
| `.signature-area` | ส่วนช่องลงชื่อ |

#### ปุ่มกด

| Class | คำอธิบาย |
|-------|----------|
| `.action-buttons` | แถบปุ่มกด |
| `.action-buttons__button` | ปุ่มแต่ละปุ่ม |
| `.action-buttons__button--primary` | ปุ่มหลัก (พิมพ์) |

## CSS Variables ที่ปรับแต่งได้

สามารถกำหนดค่า CSS Variables ภายใน `.document` เพื่อปรับแต่งทั้งเอกสาร:

### ตัวอักษร

| Variable | ค่าเริ่มต้น | คำอธิบาย |
|----------|------------|----------|
| `--font-family` | `'Sarabun', sans-serif` | ฟอนต์หลัก |
| `--font-family-mono` | `'Share Tech Mono', monospace` | ฟอนต์ Monospace |
| `--font-size-xs` | `7pt` | ขนาดเล็กมาก |
| `--font-size-sm` | `8pt` | ขนาดเล็ก |
| `--font-size-base` | `9pt` | ขนาดปกติ |
| `--font-size-lg` | `11pt` | ขนาดใหญ่ |
| `--font-size-xl` | `12pt` | ขนาดใหญ่มาก |
| `--font-size-2xl` | `14pt` | ขนาดใหญ่พิเศษ |

### สี

| Variable | ค่าเริ่มต้น | คำอธิบาย |
|----------|------------|----------|
| `--text-primary` | `#1f2937` | สีตัวอักษรหลัก |
| `--text-secondary` | `#4b5563` | สีตัวอักษรรอง |
| `--text-muted` | `#6b7280` | สีตัวอักษรจาง |
| `--border-light` | `#e5e7eb` | สีเส้นขอบอ่อน |
| `--border-default` | `#d1d5db` | สีเส้นขอบปกติ |
| `--border-dark` | `#374151` | สีเส้นขอบเข้ม |

### ระยะห่าง

| Variable | ค่าเริ่มต้น | คำอธิบาย |
|----------|------------|----------|
| `--spacing-xs` | `1mm` | ระยะห่างเล็กมาก |
| `--spacing-sm` | `2mm` | ระยะห่างเล็ก |
| `--spacing-md` | `4mm` | ระยะห่างปานกลาง |
| `--spacing-lg` | `6mm` | ระยะห่างใหญ่ |
| `--spacing-xl` | `8mm` | ระยะห่างใหญ่มาก |
