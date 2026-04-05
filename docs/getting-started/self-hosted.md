# ติดตั้งบน Self-Hosted Grist

สำหรับองค์กรหรือผู้ที่ต้องการควบคุมข้อมูลของตนเอง สามารถติดตั้ง bizdocgen บน Self-Hosted Grist ได้

## ข้อดีของ Self-Hosted

- **Data Sovereignty** - ควบคุมข้อมูลของตนเอง 100%
- **ไม่จำกัดจำนวนแถว** - ขึ้นกับขนาดฐานข้อมูล
- **ไม่มี API Rate Limits** - ใช้งานได้เต็มประสิทธิภาพ
- **Custom Domain** - ใช้โดเมนขององค์กร

## ความต้องการของระบบ

### สำหรับ Grist Server

- Docker และ Docker Compose
- หรือ Kubernetes cluster
- พื้นที่จัดเก็บอย่างน้อย 10GB

### สำหรับ bizdocgen Widget

- Node.js 24.x หรือสูงกว่า
- pnpm (ผ่าน Vite+)
- Web server (Nginx, Apache, หรือ CDN)

## วิธีการติดตั้ง

### ขั้นตอนที่ 1: ติดตั้ง Grist

อ้างอิงจาก [Grist Self-Managed Documentation](https://support.getgrist.com/self-managed/):

```bash
# ใช้ Docker Compose
docker run -p 8484:8484 \
  -v $PWD/grist-data:/persist \
  gristlabs/grist
```

หรือใช้ Docker Compose:

```yaml
version: '3'
services:
  grist:
    image: gristlabs/grist
    ports:
      - "8484:8484"
    volumes:
      - ./grist-data:/persist
    environment:
      - GRIST_SINGLE_ORG=my-org
      - GRIST_DEFAULT_EMAIL=admin@example.com
```

### ขั้นตอนที่ 2: ดาวน์โหลดเทมเพลต

ดาวน์โหลดไฟล์เทมเพลตจาก repository:

```bash
wget https://github.com/dtinth/bizdocgen/raw/main/template.grist
```

หรือใช้คำสั่งใน package.json:

```bash
npm run sync-template
```

### ขั้นตอนที่ 3: นำเข้าเทมเพลต

1. เปิด Grist instance ของคุณ (`http://localhost:8484`)
2. ลงชื่อเข้าใช้ด้วยบัญชีผู้ดูแลระบบ
3. คลิก **Create Empty Document** หรือ **Import Document**
4. เลือกไฟล์ `template.grist` ที่ดาวน์โหลดมา

### ขั้นตอนที่ 4: Build bizdocgen Widget

```bash
# Clone repository
git clone https://github.com/dtinth/bizdocgen.git
cd bizdocgen

# ติดตั้ง dependencies (Vite+ จะจัดการ pnpm ให้)
vp install

# Build สำหรับ production
vp run build
```

ไฟล์ที่ build จะอยู่ในโฟลเดอร์ `dist/`

### ขั้นตอนที่ 5: Deploy Widget

#### วิธีที่ 1: ใช้ Static Web Server

```bash
# Copy ไฟล์ dist/ ไปยัง web server
cp -r dist/ /var/www/bizdocgen/

# ตั้งค่า Nginx
server {
    listen 80;
    server_name bizdocgen.example.com;
    root /var/www/bizdocgen;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### วิธีที่ 2: ใช้ GitHub Pages

```bash
# ตั้งค่า GitHub Actions สำหรับ auto-deploy
# ไฟล์ .github/workflows/deploy.yml
```

#### วิธีที่ 3: ใช้ CDN (Cloudflare, AWS S3)

```bash
# Upload ไฟล์ dist/ ไปยัง S3 bucket
aws s3 sync dist/ s3://bizdocgen-widget/

# หรือใช้ Cloudflare Pages
npx wrangler pages deploy dist/
```

### ขั้นตอนที่ 6: ตั้งค่า Widget URL

1. เปิดเอกสารใน Grist
2. เพิ่ม Custom Widget
3. ตั้งค่า URL เป็นที่อยู่ของ widget ที่ deploy

```
https://bizdocgen.example.com/
```

## การตั้งค่า HTTPS

หากใช้ HTTPS (แนะนำ) ต้องตั้งค่า:

### Grist

```yaml
environment:
  - GRIST_SERVE_SAME_ORIGIN=true
  - APP_HOME_URL=https://grist.example.com
```

### Widget

ตรวจสอบว่า widget ถูก serve ผ่าน HTTPS และมี CORS headers:

```nginx
add_header Access-Control-Allow-Origin "https://grist.example.com";
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
```

## การอัพเดท

### อัพเดทเทมเพลต

```bash
# ดาวน์โหลดเทมเพลตใหม่
wget -O template.grist 'https://bizdocgen.getgrist.com/api/docs/cq6sb6WHRMreH2SCAzhcmC/download?nohistory=true'

# นำเข้าทับเอกสารเดิมใน Grist
```

### อัพเดท Widget

```bash
# Pull โค้ดใหม่
git pull origin main

# Build ใหม่
vp install
vp run build

# Deploy ใหม่
cp -r dist/ /var/www/bizdocgen/
```

## การแก้ไขปัญหา

### Widget ไม่โหลด

ตรวจสอบ:
- URL ถูกต้อง
- CORS headers ถูกตั้งค่า
- HTTPS/Mixed content issues

### ข้อมูลไม่แสดง

ตรวจสอบ:
- Widget มีสิทธิ์ Full document access
- ชื่อตารางและคอลัมน์ตรงกับ schema

### Build ไม่ผ่าน

```bash
# ล้าง cache
rm -rf node_modules dist
vp install
vp run build
```

## ขั้นตอนถัดไป

- [ตั้งค่า PromptPay สำหรับรับชำระเงิน](../features/promptpay.md)
- [ปรับแต่งหน้าตาเอกสาร](../customization/index.md)
- [อ่านคู่มือการพัฒนา](../development/index.md)
