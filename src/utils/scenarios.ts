import type { GristRecord } from '../types/document-schema'

// A collection of fun sample scenarios for a nationwide problem-solving freelancer
// Pricing model (for sample data):
// - Expert rate ≈ €150/hour ≈ 6,000 THB/hour (rounded)
// - Day rate ≈ 8 hours = 48,000 THB
// - Emergency/night surcharge ≈ +50%
// - Small consumables priced locally
export const scenarios: { title: string; slug: string; data: GristRecord }[] = [
  {
    title: 'ใบเสร็จ VAT 7% — ไล่บั๊ก Kubernetes กลางดึก',
    slug: 'receipt-vat-k8s-bug-hunt',
    data: {
      id: 101,
      Record: {
        Client: {
          Address: '88/88 ชั้น 42 ตึกคลาวด์ซุปเปอร์ทาวเวอร์\nแขวงควันไฟ เขตดาต้า กรุงเทพฯ 10330',
          Name: 'บริษัท กลุ่มเมฆมันส์ จำกัด',
          Tax_ID: '9781234567890',
        },
        Date: '2025-07-21T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            id: 301,
            Description:
              '**บริการไล่บั๊กระบบ Kubernetes** (SLA: ตีสามก็มา)\n- ตรวจสอบ Pod CrashLoopBackOff\n- ปรับ HPA และ Liveness Probe ให้เหมาะสม',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 24000, // ~4h
            Total: 24000,
          },
          {
            id: 302,
            Description: 'ติดตั้ง Helm chart เวอร์ชันเสถียร พร้อมทดสอบ roll back',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 12000, // ~2h
            Total: 12000,
          },
          {
            id: 303,
            Description: 'ค่ากาแฟดำดริปพิเศษ (เพิ่มความนิ่งระหว่าง deploy)',
            Manual_Sort: 3,
            Quantity: 3,
            Unit_Price: 120,
            Total: 360,
          },
        ],
        Number: 'RCPT-2025-0001',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: {
          Number: 'INC-42-K8S',
        },
        Remarks:
          '### หมายเหตุ\nขอบคุณที่เรียกใช้บริการรอบดึก — ระบบกลับมานิ่งแล้ว ✅\n\n> Tip: โปรดอย่ากด kubectl delete all อีกนะครับ',
        Tax: 0.07,
      },
    },
  },
  {
    title: 'ใบแจ้งหนี้ หัก ณ ที่จ่าย 3% — กู้คืน Excel และชีวิต',
    slug: 'invoice-wht-excel-rescue',
    data: {
      id: 102,
      Record: {
        Client: {
          Address: '55/9 หมู่บ้านเซลล์ไฟล์ พาร์ค วิลล์\nต.กดเซฟ อ.ไม่เคยบันทึก จ.ไฟล์หาย 12120',
          Name: 'หจก. นอนน้อยแต่รวยมาก',
          Tax_ID: '7772223334445',
        },
        Date: '2025-06-15T00:00:00.000Z',
        Document_Type: ['Invoice'],
        Items: [
          {
            id: 304,
            Description:
              '**กู้คืนรหัสผ่านไฟล์ Excel** ที่ลืมตั้งเอง (ไม่ถามว่าทำไม)\n- สำรองไฟล์\n- ปลดล็อกอย่างถูกวิธี',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 12000, // ~2h
            Total: 12000,
          },
          {
            id: 305,
            Description: 'ปรับแต่ง Excel Macro ให้กดปุ่มเดียวรู้เรื่อง',
            Manual_Sort: 2,
            Quantity: 2,
            Unit_Price: 9000, // ~1.5h each
            Total: 18000,
          },
        ],
        Number: 'INV-2025-0007',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: {
          Number: 'PO-EXC-0009',
        },
        Remarks: '### หมายเหตุ\nกรุณาหักภาษี ณ ที่จ่าย 3% และแนบหนังสือรับรอง',
        Tax: -0.03,
      },
    },
  },
  {
    title: 'ใบเสนอราคา — ที่ปรึกษาสายฮา ระบบคลาวด์ไม่เครียด',
    slug: 'quotation-cloud-consult',
    data: {
      id: 103,
      Record: {
        Client: {
          Address: '999/1 อาคารขำขัน ชั้น 9 แขวงขำดี เขตหัวเราะ กรุงเทพฯ 10110',
          Name: 'บริษัท ขำขัน จำกัด',
          Tax_ID: '9900112233445',
        },
        Date: '2025-05-10T00:00:00.000Z',
        Document_Type: ['Quotation'],
        Items: [
          {
            id: 306,
            Description:
              '**ปรึกษาออกแบบระบบคลาวด์แบบไม่เครียด**\n- เลือกบริการที่คุ้มค่า\n- แผนรองรับการโตของระบบ',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 48000, // ~1 day
            Total: 48000,
          },
          {
            id: 307,
            Description: 'อบรมทีมให้ Deploy แบบเนียน ๆ',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 48000, // ~1 day
            Total: 48000,
          },
        ],
        Number: 'QT-2025-0042',
        Payment_Method: null,
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: null,
        Remarks:
          '### หมายเหตุ\nใบเสนอราคานี้มีอายุ 30 วัน\n\n> หมายเหตุ: ถ้าลูกค้าหัวเราะระหว่างอบรม แปลว่าเข้าใจแล้ว',
        Tax: 0,
      },
    },
  },
  {
    title: 'ใบเสร็จ — เปลี่ยนรหัสไวไฟบ้านป้าข้างซอย (พร้อมเพย์)',
    slug: 'receipt-home-wifi-promptpay',
    data: {
      id: 104,
      Record: {
        Client: {
          Address: 'หน้าปากซอยสบายใจ ถ.สุขใจ ต.อบอุ่น อ.ยิ้มแย้ม จ.บ้านเรา 40000',
          Name: 'คุณป้าข้างซอย',
          Tax_ID: '0000000000000',
        },
        Date: '2025-08-01T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            id: 308,
            Description: 'รีสตาร์ทเราเตอร์จนติด (กด 3 รอบ)',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 6000, // minimum 1h
            Total: 6000,
          },
          {
            id: 309,
            Description: 'เปลี่ยนรหัสไวไฟเป็นแบบ**ยากมาก**',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 3000, // ~0.5h
            Total: 3000,
          },
        ],
        Number: 'RCPT-2025-0100',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: null,
          Bank: null,
          Branch: null,
          Name: 'พร้อมเพย์หลัก',
          PromptPay: '0812345678',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: null,
        Remarks: '### หมายเหตุ\nจดรหัสใหม่ไว้ใต้เราเตอร์แล้วนะครับ',
        Tax: 0,
      },
    },
  },
  {
    title: 'ใบแจ้งหนี้ VAT 7% — จัดระเบียบสายไฟทั้งออฟฟิศ',
    slug: 'invoice-vat-cable-management',
    data: {
      id: 105,
      Record: {
        Client: {
          Address: '21/7 อาคารใจนิ่ง ชั้น 3 ซอยเรียบร้อย\nแขวงโกดัง เขตใจเย็น กรุงเทพฯ 10500',
          Name: 'บริษัท สายไฟสงบ จำกัด',
          Tax_ID: '5566778899001',
        },
        Date: '2025-03-02T00:00:00.000Z',
        Document_Type: ['Invoice'],
        Items: [
          {
            id: 310,
            Description: 'จัดระเบียบสายไฟหลังโต๊ะทำงานทุกจุด',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 36000, // ~6h
            Total: 36000,
          },
          {
            id: 311,
            Description: 'ติดตั้ง UPS พร้อมทดสอบไฟดับ',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 18000, // ~3h
            Total: 18000,
          },
          {
            id: 312,
            Description: 'ทำเอกสารคู่มือปฏิบัติงานฉุกเฉิน',
            Manual_Sort: 3,
            Quantity: 1,
            Unit_Price: 24000, // ~4h
            Total: 24000,
          },
          {
            id: 313,
            Description: 'ตรวจสุขภาพเซิร์ฟเวอร์ (Health Check)',
            Manual_Sort: 4,
            Quantity: 2,
            Unit_Price: 12000, // ~2h each
            Total: 24000,
          },
          {
            id: 314,
            Description: 'ทำความสะอาดพัดลมเคส',
            Manual_Sort: 5,
            Quantity: 3,
            Unit_Price: 6000, // ~1h each
            Total: 18000,
          },
          {
            id: 315,
            Description: 'ประชุมผู้บริหารแบบเข้มข้น (ไม่หลับ)',
            Manual_Sort: 6,
            Quantity: 1,
            Unit_Price: 12000, // ~2h
            Total: 12000,
          },
        ],
        Number: 'INV-2025-0022',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: {
          Number: 'PO-CABLE-2025-01',
        },
        Remarks: undefined,
        Tax: 0.07,
      },
    },
  },
  {
    title: 'ใบเสนอราคา VAT 7% — ติดตั้งปริ้นเตอร์ทั้งออฟฟิศ',
    slug: 'quotation-printer-setup',
    data: {
      id: 106,
      Record: {
        Client: {
          Address: '77/7 อาคารหมึกไม่หมด ซ.ปริ้นท์สบาย เขตลื่นไหล กรุงเทพฯ 10400',
          Name: 'บริษัท หมึกดี จำกัด',
          Tax_ID: '1122334455667',
        },
        Date: '2025-04-18T00:00:00.000Z',
        Document_Type: ['Quotation'],
        Items: [
          {
            id: 316,
            Description: 'ติดตั้งปริ้นเตอร์แบบเนียน ๆ (ไม่งอแง)',
            Manual_Sort: 1,
            Quantity: 2,
            Unit_Price: 12000, // ~2h each
            Total: 24000,
          },
          {
            id: 317,
            Description: 'ลงไดรเวอร์ + แชร์ปริ้นเตอร์ในวง LAN',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 6000, // ~1h
            Total: 6000,
          },
        ],
        Number: 'QT-2025-0088',
        Payment_Method: null,
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: null,
        Remarks: '### หมายเหตุ\nฟรีทดสอบพิมพ์หน้าแรก “สวัสดีออฟฟิศใหม่”',
        Tax: 0.07,
      },
    },
  },
  {
    title: 'ใบเสร็จ VAT 7% — กู้โลกจาก Merge Conflict',
    slug: 'receipt-merge-conflict-fix',
    data: {
      id: 107,
      Record: {
        Client: {
          Address: '12/3 ชั้น 13 อาคารรีวิวโค้ด แขวงรวมพลัง เขตมุ่งมั่น กรุงเทพฯ 10240',
          Name: 'บริษัท โค้ดไม่ร้อง จำกัด',
          Tax_ID: '3141592653589',
        },
        Date: '2025-07-05T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            id: 318,
            Description:
              '**แก้ไข Merge Conflict ระดับวิกฤต**\n- สร้างแผนผสานโค้ด\n- ป้องกัน regression ด้วย test',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 24000, // ~4h
            Total: 24000,
          },
          {
            id: 319,
            Description: 'กู้ branch และทำ cherry-pick อย่างเหนือชั้น',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 12000, // ~2h
            Total: 12000,
          },
        ],
        Number: 'RCPT-2025-0112',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: { Number: 'TKT-GIT-9001' },
        Remarks: '### หมายเหตุ\nหลัง merge แนะนำให้กอด repo เบา ๆ',
        Tax: 0.07,
      },
    },
  },
  {
    title: 'ใบแจ้งหนี้ — ไล่ความชื้นเซิร์ฟเวอร์ด้วยไดร์เป่าผม',
    slug: 'invoice-hairdryer-server',
    data: {
      id: 108,
      Record: {
        Client: {
          Address: 'เลขที่ 1 หมู่บ้านฟ้าหลังฝน ต.โปร่งใส อ.โล่งใจ จ.ชุ่มชื้น 30330',
          Name: 'องค์การจัดงานวุ่นวาย',
          Tax_ID: '2468135791357',
        },
        Date: '2025-01-20T00:00:00.000Z',
        Document_Type: ['Invoice'],
        Items: [
          {
            id: 320,
            Description: 'ไล่ความชื้นเครื่องเซิร์ฟเวอร์ด้วยไดร์เป่าผม (มาตรฐานช่าง)',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 9000, // ~1.5h
            Total: 9000,
          },
          {
            id: 321,
            Description: 'เปลี่ยนพัดลมเคสใหม่ (เสียงเงียบ)',
            Manual_Sort: 2,
            Quantity: 2,
            Unit_Price: 6000, // ~1h each (labor)
            Total: 12000,
          },
          {
            id: 322,
            Description: 'ตรวจสอบระบบไฟและกราวด์',
            Manual_Sort: 3,
            Quantity: 1,
            Unit_Price: 9000, // ~1.5h
            Total: 9000,
          },
        ],
        Number: 'INV-2025-0030',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: { Number: 'PO-DRY-2025-02' },
        Remarks: '### หมายเหตุ\nโปรดอย่าใช้งานเครื่องในขณะกำลังไดร์นะครับ',
        Tax: 0,
      },
    },
  },
  {
    title: 'ใบเสร็จ VAT 7% — ภารกิจด่วนถึงที่ (มีค่าเดินทาง)',
    slug: 'receipt-urgent-onsite',
    data: {
      id: 109,
      Record: {
        Client: {
          Address: '22/22 ถนนริมทะเล ต.ลมเย็น อ.ชิลล์ จ.ระยอง 21000',
          Name: 'รีสอร์ตลมทะเล',
          Tax_ID: '1357924680135',
        },
        Date: '2025-02-14T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            id: 323,
            Description: 'ค่าแรงแก้ปัญหาด่วนถึงที่ (ระบบล่มวันวาเลนไทน์)',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 18000, // ~2h with emergency surcharge
            Total: 18000,
          },
          {
            id: 324,
            Description: 'ค่าเดินทาง กทม -> ระยอง',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 9000, // travel/time & fuel
            Total: 9000,
          },
          {
            id: 325,
            Description: 'ค่าทางด่วน',
            Manual_Sort: 3,
            Quantity: 3,
            Unit_Price: 120,
            Total: 360,
          },
        ],
        Number: 'RCPT-2025-0144',
        Payment_Method: {
          Account_Holder: 'นาย โปร แก้ได้หมด',
          Account_Number: '111-1-11111-1',
          Bank: 'ธนาคารไทยพาณิชย์',
          Branch: 'เซ็นทรัลเวิลด์',
          Name: 'บัญชีหลัก',
          PromptPay: '0891234567',
        },
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: { Number: 'JOB-ONCALL-001' },
        Remarks: '### หมายเหตุ\nทำระบบกลับมาเสิร์ฟปลาเผาได้ทันมื้อเย็น',
        Tax: 0.07,
      },
    },
  },
  {
    title: 'ใบเสนอราคา — สคริปต์อัตโนมัติ + เวิร์กช็อปทีม',
    slug: 'quotation-bash-workshop',
    data: {
      id: 110,
      Record: {
        Client: {
          Address: '4/44 ถนนชำนาญงาน ต.ตั้งใจ อ.มุ่งมั่น จ.มืออาชีพ 56000',
          Name: 'วิสาหกิจชุมชน มือไวใจสู้',
          Tax_ID: '3216549870123',
        },
        Date: '2025-08-08T00:00:00.000Z',
        Document_Type: ['Quotation'],
        Items: [
          {
            id: 326,
            Description:
              'เขียนสคริปต์ `bash` อัตโนมัติ\n```bash\nfor f in *.csv; do\n  node transform.js "$f" > output/"$f"\ndone\n```',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 18000, // ~3h
            Total: 18000,
          },
          {
            id: 327,
            Description: 'จัดเวิร์กช็อป 1 วัน\n- Git workflow\n- Review อย่างสร้างสรรค์',
            Manual_Sort: 2,
            Quantity: 1,
            Unit_Price: 48000, // ~1 day
            Total: 48000,
          },
        ],
        Number: 'QT-2025-0101',
        Payment_Method: null,
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: null,
        Remarks: '### หมายเหตุ\nเน้นลงมือทำ ไม่เน้นสไลด์ยาว ๆ',
        Tax: 0,
      },
    },
  },
  {
    title: 'ตัวอย่าง: เอกสารที่ลงชื่อแล้ว (Signed)',
    slug: 'signed-demo',
    data: {
      id: 999,
      Record: {
        Client: {
          Address: '1/1 ถนนตัวอย่าง แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10000',
          Name: 'บริษัท ทดสอบ จำกัด',
          Tax_ID: '1234567890000',
        },
        Date: '2025-08-09T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            id: 328,
            Description: 'ค่าบริการทดสอบระบบ',
            Manual_Sort: 1,
            Quantity: 1,
            Unit_Price: 1000,
            Total: 1000,
          },
        ],
        Number: 'SIGNED-TEST-001',
        Payment_Method: null,
        Provider: {
          Address: '123 ถนนแก้ปัญหา แขวงช่างกล เขตทุกจังหวัด\nราชอาณาจักรไทย 10000',
          Email: 'hero@fixall.th',
          Name: 'ฟรีแลนซ์แก้ปัญหาทั่วราชอาณาจักร',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '1234567890123',
        },
        Reference: null,
        Remarks: '### หมายเหตุ\nตัวอย่างเอกสารที่มีลิงก์ดาวน์โหลดไฟล์ที่ลงชื่อแล้ว',
        Tax: 0,
        Signed_Document_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    },
  },
]
