# ปรับแต่ง CSS

bizdocgen รองรับการปรับแต่งหน้าตาเอกสารผ่าน CSS ซึ่งสามารถใส่ได้จากแผง Settings ใน Widget

## วิธีใส่ Custom CSS

1. ไปที่กล่อง **Preview & Print**
2. คลิกปุ่ม **Settings** (หรือไอคอนฟันเฟือง)
3. วาง CSS ของคุณลงในช่อง **Custom CSS**

การเปลี่ยนแปลงจะแสดงผลทันทีในหน้าตัวอย่าง

## ตัวอย่าง: ใส่โลโก้ที่ส่วนหัวเอกสาร

```css
.document-header__provider {
  padding-left: 3.25cm;
  background: url(https://im.dt.in.th/ipfs/bafybeig2tl774aishvpngxdchfottijqjybrzlzhphybtez6lppbrrfzem/image.webp) top left no-repeat;
  background-size: contain;
}
```

CSS ชุดนี้ทำให้ส่วนที่แสดงชื่อผู้ให้บริการมีโลโก้แสดงอยู่ทางซ้ายมือ โดยใช้ `background-image` กับ URL ของรูปโลโก้ และเพิ่ม `padding-left` ให้ข้อความไม่ทับกับโลโก้
