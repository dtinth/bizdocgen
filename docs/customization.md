# การปรับแต่งหน้าตาเอกสาร

bizdocgen ออกแบบให้ผู้ใช้ปรับ CSS ได้เอง โดยไม่ต้องแก้โค้ดของแอป

## วิธีใช้งาน Custom CSS

1. เปิดเอกสารในวิดเจ็ต
2. กดปุ่ม **Custom CSS Settings**
3. ใส่ CSS ที่ต้องการในกล่องข้อความ
4. กด **Apply CSS**

ระบบจะบันทึกค่า CSS ไว้ในตัวเลือกของวิดเจ็ต (`customCss`) และนำกลับมาใช้ครั้งถัดไปโดยอัตโนมัติ

## แนวคิดการตั้งชื่อคลาส

โปรเจกต์นี้ใช้รูปแบบ **BEM (Block Element Modifier)** เพื่อให้ผู้ใช้เดาชื่อคลาสได้ง่ายและเขียน CSS override เองได้

ตัวอย่างคลาสที่พบได้บ่อย:

- `.document`
- `.document__payment-section`
- `.action-buttons`
- `.action-buttons__button`
- `.items-table__row`
- `.app__settings`

## ตัวอย่างการปรับแต่ง

```css
.document {
  --font-family: 'Sarabun', sans-serif;
  --document-width: 210mm;
}

.document__header {
  border-bottom: 2px solid #222;
}

.action-buttons__button--primary {
  background-color: #0d47a1;
}
```

## CSS Variables ที่ควรรู้

แอปใช้ CSS variables สำหรับค่าหลักหลายส่วน เช่น

- `--font-family`
- `--document-width`
- `--document-height`
- `--document-scale`
- `--spacing-*`
- `--font-size-*`
- `--text-*`
- `--primary-blue`

## คำแนะนำในการปรับแต่ง

!!! tip
    เริ่มจากปรับตัวแปร CSS ก่อน เพราะปลอดภัยและมีผลต่อทั้งเอกสารได้ง่ายกว่าการเขียน selector ที่ซับซ้อน

!!! note
    ในการเขียนชุดทดสอบ E2E โปรเจกต์นี้ไม่ใช้คลาส CSS เป็นตัวจับ element แต่ใช้ `data-testid`, role และข้อความแทน ดังนั้นการปรับแต่ง CSS จะไม่กระทบชุดทดสอบหลักโดยตรง

## การพิมพ์

สไตล์สำหรับปุ่มและแผงตั้งค่าจะถูกซ่อนอัตโนมัติเมื่อพิมพ์เอกสาร ทำให้ผลลัพธ์ออกมาเป็นหน้าเอกสารล้วน
