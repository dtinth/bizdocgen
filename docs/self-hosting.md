# โฮสต์ Widget เอง

หากคุณต้องการปรับแต่งหน้าตาเอกสาร แก้ไขโค้ด หรือต้องการความเสถียรสูงสุดในการใช้งาน คุณสามารถนำ Custom Widget นี้ไปโฮสต์เองได้

## ขั้นตอน

### 1. Fork โค้ดต้นฉบับ

เข้าไปที่ Repository [dtinth/bizdocgen](https://github.com/dtinth/bizdocgen) แล้วทำการ Fork ไปยังบัญชี GitHub ของคุณ

### 2. Deploy

นำโค้ดที่ Fork ไว้ไป Deploy บนบริการ Static Site Hosting ที่คุณถนัด เช่น [Cloudflare Pages](https://pages.cloudflare.com/), [Vercel](https://vercel.com/) หรือ [Netlify](https://www.netlify.com/) เมื่อ Deploy สำเร็จจะได้ URL ใหม่มา

### 3. อัปเดต Custom URL ใน Grist

เมื่อได้ URL ใหม่แล้ว ให้กลับมาที่ Grist Document ของคุณ:

1. ไปที่หน้า **Documents**
2. คลิกเลือกกล่อง **Preview & Print**
3. เปิด Creator Panel ที่มุมขวาบนของหน้าจอ เลือกแท็บ **Custom** แล้วไปที่แท็บย่อย **Widget**
4. ตรง **Custom URL** นำ URL ใหม่ของคุณไปวางแทนที่ URL เดิม ระบบก็จะเปลี่ยนไปใช้ Widget เวอร์ชันของคุณทันที

![Creator Panel แสดงช่อง Custom URL](https://im.dt.in.th/ipfs/bafybeiavryy5fc6ok4pl6ng25og4bbheqeqftfcom44scgdapguybqfq2a/image.webp)
