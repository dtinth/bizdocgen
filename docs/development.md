# คู่มือนักพัฒนา

หน้านี้สรุปภาพรวมเชิงเทคนิคของโปรเจกต์สำหรับผู้ที่ต้องการพัฒนา ปรับปรุง หรือทดสอบระบบต่อ

## สแต็กหลัก

- Vue 3 + Composition API + `<script setup lang="ts">`
- TypeScript
- Vite+
- pnpm
- Vitest สำหรับ unit tests
- Playwright สำหรับ E2E tests
- Zod สำหรับตรวจสอบ schema ของข้อมูล

## โครงสร้างสำคัญของโปรเจกต์

- `src/App.vue` — จุดเริ่มต้นของ UI และแผงตั้งค่า Custom CSS
- `src/composables/useAppState.ts` — state หลัก การเชื่อมกับ Grist และการโหลด/บันทึก custom CSS
- `src/utils/grist.ts` — wrapper ของ Grist API และ mock implementation สำหรับ standalone mode
- `src/types/document-schema.ts` — schema ของข้อมูลเอกสารด้วย Zod
- `src/components/` — ชุด component ที่ประกอบกันเป็นเอกสารพร้อมพิมพ์
- `src/utils/scenarios.ts` — ชุดข้อมูลตัวอย่างสำหรับการทดสอบและสาธิต

## วงจรการทำงาน

1. `App.vue` เรียก `initializeGrist()` เมื่อ mount
2. `grist.ready()` ลงทะเบียน callback เช่น `onEditOptions`
3. `grist.onRecord()` รับข้อมูลจาก Grist หรือ mock API
4. `GristRecordSchema` ตรวจสอบข้อมูลก่อนเก็บใน state
5. component ย่อยแสดงผลเอกสารตามข้อมูลที่ผ่านการตรวจสอบแล้ว

## การทำงานในโหมด standalone

ถ้าแอปไม่ได้รันอยู่ใน iframe ของ Grist ระบบจะสลับไปใช้ mock API อัตโนมัติ

ความสามารถในโหมดนี้:

- โหลดข้อมูลตัวอย่างเริ่มต้นให้อัตโนมัติ
- เลือก scenario ผ่าน query string เช่น `?scenario=quotation-cloud-consult`
- รับข้อมูลจำลองผ่าน DOM events เช่น `mockgristrecord`, `mockgristoptions`, `mockgristeditoptions`
- เก็บ options ชั่วคราวไว้ใน `sessionStorage`

## คำสั่งที่ใช้บ่อย

```bash
vp install
vp run lint
vp run build
vp run test:unit
vp run test:e2e
```

!!! note
    ถ้าคุณต้องการเรียกผ่าน `npm run ...` ก็ทำได้เช่นกัน แต่ scripts ภายในโปรเจกต์จะเรียก `vp` อยู่เบื้องหลัง จึงควรติดตั้ง dependencies ให้พร้อมก่อน

## การทดสอบ

### Unit tests

- ใช้ Vitest และ jsdom
- ทดสอบ schema validation และการแสดงผลหลักของแอป

### E2E tests

- ใช้ Playwright
- ใช้ Page Object Pattern ผ่าน `AppTester` และ tester ย่อย
- นิยมใช้ semantic locators เช่น `getByTestId()`, `getByRole()`, `getByText()`

!!! warning
    ไฟล์ `e2e/grist.spec.ts` เป็น integration test ที่ต้องมี Grist instance อยู่ที่ `http://localhost:8484/` และต้องมี widget dev server พร้อมใช้งานที่ `http://localhost:5173` (หรือ `http://localhost:4173` ใน CI) ก่อนจึงจะรันผ่านได้

สำหรับการพัฒนาแบบ local ถ้ายังไม่ได้เตรียม Grist instance คุณสามารถโฟกัสกับ unit tests และชุด E2E ที่ไม่พึ่งบริการภายนอกก่อนได้ แล้วค่อยรัน `grist.spec.ts` เมื่อ environment พร้อม

## แนวทางการขยายระบบ

- ถ้าจะเพิ่มประเภทเอกสารใหม่ ให้เริ่มจาก schema และ utility ที่แปลงชื่อเอกสารก่อน
- ถ้าจะเพิ่มฟิลด์ใหม่จาก Grist ให้ปรับ schema ของ Zod และตรวจสอบผลกระทบต่อ view model
- ถ้าจะปรับสไตล์ ให้พยายามรักษา naming แบบ BEM เพื่อให้ผู้ใช้ยังเขียน Custom CSS ต่อได้ง่าย
