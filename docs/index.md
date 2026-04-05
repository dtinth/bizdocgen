# bizdocgen

**bizdocgen** เป็น Grist Custom Widget สำหรับสร้างเอกสารทางธุรกิจในรูปแบบมาตรฐานไทย รองรับการสร้างเอกสาร 3 ประเภทหลัก:

- **ใบเสนอราคา (Quotation)**
- **ใบแจ้งหนี้ (Invoice)**
- **ใบเสร็จรับเงิน (Receipt)**

## ภาพรวม

bizdocgen ออกแบบมาสำหรับฟรีแลนซ์และธุรกิจขนาดเล็กในประเทศไทย ที่ต้องการระบบออกเอกสารทางธุรกิจที่:

- ใช้งานง่าย ไม่ต้องติดตั้งซอฟต์แวร์
- รองรับภาษาไทยและมาตรฐานเอกสารไทย
- รองรับภาษีหัก ณ ที่จ่าย (Withholding Tax)
- รองรับการชำระเงินผ่าน PromptPay พร้อม QR Code
- ปรับแต่งหน้าตาเอกสารได้ด้วย CSS

## คุณสมบัติเด่น

<div class="grid cards" markdown>

-   :material-file-document:{ .lg .middle } __เอกสารครบวงจร__

    ---

    รองรับใบเสนอราคา ใบแจ้งหนี้ และใบเสร็จรับเงิน ในรูปแบบมาตรฐานไทย

-   :material-calculator:{ .lg .middle } __คำนวณภาษีอัตโนมัติ__

    ---

    รองรับ VAT 7% และภาษีหัก ณ ที่จ่าย คำนวณยอดรวมอัตโนมัติ

-   :material-qrcode:{ .lg .middle } __PromptPay QR__

    ---

    สร้าง QR Code สำหรับรับชำระเงินผ่าน PromptPay อัตโนมัติ

-   :material-palette:{ .lg .middle } __ปรับแต่งได้__

    ---

    ปรับแต่งหน้าตาเอกสารด้วย Custom CSS ตามต้องการ

</div>

## เริ่มต้นใช้งานอย่างรวดเร็ว

### ใช้งานบน Hosted Grist (แนะนำ)

วิธีที่ง่ายและรวดเร็วที่สุดในการเริ่มต้นใช้งาน:

1. [คลิกที่นี่เพื่อเปิดเทมเพลต](https://bizdocgen.getgrist.com/cq6sb6WHRMre/bizdocgen-template) (ไม่ต้องลงชื่อเข้าใช้)
2. ทดลองแก้ไขข้อมูลตัวอย่างได้ทันที
3. คลิก **Use This Template** เพื่อบันทึกลงบัญชีของคุณ

> [!TIP]
> Grist มี [Free Tier ที่ใจดี](https://www.getgrist.com/pricing/) รองรับ 5,000 แถวต่อเอกสาร — เพียงพอสำหรับการใช้งานทั่วไป

### ติดตั้งบน Self-Hosted Grist

สำหรับผู้ที่ต้องการควบคุมข้อมูลเอง:

1. ดาวน์โหลดไฟล์ [template.grist](template.grist)
2. นำเข้าเทมเพลตลง Grist instance ของคุณ

> [!TIP]
> คุณสามารถ [Self-host](https://support.getgrist.com/self-managed/) Grist ของตนเองเพื่อควบคุมข้อมูลและไม่มีข้อจำกัดเรื่องจำนวนแถว

## ตัวอย่างเอกสาร

![ตัวอย่างเอกสาร](example.png)

## สถาปัตยกรรม

bizdocgen ถูกพัฒนาด้วยเทคโนโลยีสมัยใหม่:

- **Frontend Framework**: Vue 3 with Composition API + TypeScript
- **Build Tool**: Vite+
- **Package Manager**: pnpm
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Integration**: Grist Custom Widget API

## การสนับสนุน

หากพบปัญหาหรือมีข้อเสนอแนะ สามารถเปิด Issue ได้ที่ [GitHub Repository](https://github.com/dtinth/bizdocgen)

## License

MIT License
