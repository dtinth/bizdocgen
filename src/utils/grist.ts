interface GristRecord {
  [key: string]: unknown
}

interface GristOptions {
  [key: string]: unknown
}

interface GristReadyOptions {
  onEditOptions?: () => void
  requiredAccess?: 'none' | 'read table' | 'full'
}

interface NewRecord {
  fields?: Record<string, unknown>
}

interface MinimalRecord {
  id: number
}

interface TableOperations {
  create: (record: NewRecord, options?: unknown) => Promise<MinimalRecord>
}

interface GristAPI {
  ready: (options?: GristReadyOptions) => void
  onRecord: (callback: (record: GristRecord) => void) => void
  onOptions: (callback: (options: GristOptions) => void) => void
  setOption: (key: string, value: unknown) => void
  getOption: (key: string) => unknown
  getTable: (tableId?: string) => TableOperations
  fetchSelectedRecord: (rowId: number) => Promise<Record<string, unknown>>
}

declare global {
  interface Window {
    grist?: GristAPI
  }
}

// Check if we're running inside Grist
const isInsideGrist = !!window.grist && window.parent !== window.self

// Export flag for components to check if we're using mock
export const isGristMocked = !isInsideGrist

// In-memory store for mock created records
const mockStore: Record<string, Record<string, unknown>[]> = {}

// Mock Grist API implementation
class MockGristAPI implements GristAPI {
  private recordCallback?: (record: GristRecord) => void
  private optionsCallback?: (options: GristOptions) => void
  private onEditOptionsCallback?: () => void

  constructor() {
    // Listen for DOM events to simulate Grist communication
    document.addEventListener('mockgristrecord', (event: Event) => {
      const customEvent = event as CustomEvent
      if (this.recordCallback && customEvent.detail) {
        this.recordCallback(customEvent.detail)
      }
    })

    document.addEventListener('mockgristoptions', (event: Event) => {
      const customEvent = event as CustomEvent
      if (this.optionsCallback && customEvent.detail) {
        this.optionsCallback(customEvent.detail)
        // Also save to sessionStorage
        Object.entries(customEvent.detail).forEach(([key, value]) => {
          sessionStorage.setItem(`grist_option_${key}`, JSON.stringify(value))
        })
      }
    })

    document.addEventListener('mockgristeditoptions', () => {
      if (this.onEditOptionsCallback) {
        this.onEditOptionsCallback()
      }
    })
  }

  ready(options?: GristReadyOptions): void {
    if (options?.onEditOptions) {
      this.onEditOptionsCallback = options.onEditOptions
    }
    // Simulate Grist ready by loading initial scenario from URL or default
    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const scenarioSlug = urlParams.get('scenario')

      // Load scenario data if specified, otherwise load default sample
      if (scenarioSlug) {
        this.loadScenarioBySlug(scenarioSlug)
      } else {
        // Load a default sample scenario
        this.loadDefaultSample()
      }
    }, 100)
  }

  onRecord(callback: (record: GristRecord) => void): void {
    this.recordCallback = callback
  }

  onOptions(callback: (options: GristOptions) => void): void {
    this.optionsCallback = callback
    // Load existing options from sessionStorage on initialization
    setTimeout(() => {
      const options: GristOptions = {}
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key?.startsWith('grist_option_')) {
          const optionKey = key.replace('grist_option_', '')
          try {
            const value = JSON.parse(sessionStorage.getItem(key) || 'null')
            if (value !== null) {
              options[optionKey] = value
            }
          } catch {
            // Ignore invalid JSON
          }
        }
      }
      if (Object.keys(options).length > 0) {
        callback(options)
      }
    }, 50)
  }

  setOption(key: string, value: unknown): void {
    sessionStorage.setItem(`grist_option_${key}`, JSON.stringify(value))
    // Trigger options callback if registered
    if (this.optionsCallback) {
      const options = { [key]: value }
      this.optionsCallback(options)
    }
  }

  getOption(key: string): unknown {
    try {
      const stored = sessionStorage.getItem(`grist_option_${key}`)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  getTable(_tableId?: string): TableOperations {
    return {
      create: async (record: NewRecord) => {
        const id = Math.floor(Math.random() * 90000) + 10000
        console.log(`[MockGrist] Created record in "${_tableId ?? 'Documents'}":`, record, `→ id=${id}`)
        // Store the created record so fetchSelectedRecord can return it
        if (_tableId && record.fields) {
          mockStore[_tableId] ??= []
          mockStore[_tableId]!.push({ id, ...record.fields })
        }
        return { id }
      },
    }
  }

  fetchSelectedRecord(rowId: number): Promise<Record<string, unknown>> {
    const allRecords = [...(mockStore['Documents'] ?? [])]
    const found = allRecords.find((r: Record<string, unknown>) => r.id === rowId)
    if (found) {
      return Promise.resolve(found)
    }
    return Promise.resolve({ id: rowId, Number: `DOC-${rowId}` })
  }

  private loadScenarioBySlug(slug: string): void {
    // Dynamic import to avoid circular dependencies
    import('../utils/scenarios').then(({ scenarios }) => {
      const scenario = scenarios.find((s) => s.slug === slug)
      if (scenario && this.recordCallback) {
        this.recordCallback(scenario.data)
      } else {
        // Fall back to default if scenario not found
        this.loadDefaultSample()
      }
    })
  }

  private loadDefaultSample(): void {
    // Simple sample data to get started
    const defaultSample = {
      id: 1,
      Record: {
        Client: {
          Address: '123/45 หมู่ 6 ถ.ตัวอย่าง แขวงบ้านใหม่\nอ.ปากเกร็ด จ.นนทบุรี 11120',
          Name: 'บริษัท ลูกค้า จำกัด',
          Tax_ID: '9999999999999',
          id: 3,
        },
        Credit_Term: '30 วัน',
        Date: '2025-08-09T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            Description: '**ไอเทมทดสอบ** - รายการสำคัญ\n- คุณภาพสูง\n- รหัสสินค้า: `TEST001`',
            Document: { tableId: 'Documents', rowId: 5 },
            Manual_Sort: 1,
            Quantity: 2,
            Total: 198,
            Unit_Price: 99,
            id: 5,
          },
        ],
        Number: 'TEST-001',
        Payment_Method: {
          Account_Holder: 'นาย ทด สอบ',
          Account_Number: '012-1-23456-7',
          Bank: 'ธนาคารกรุงศรี',
          Branch: 'เอสพละนาด รัชดาภิเษก',
          Name: 'TEST payment',
          PromptPay: '0123456789',
          id: 2,
        },
        Provider: {
          Address: '99/9 ซอยตัวอย่าง ถ.สุขุมวิท แขวงบางจาก\nเขตพระโขนง กรุงเทพฯ 10260',
          Email: 'provider@example.com',
          Name: 'บริษัท ผู้ให้บริการ จำกัด',
          Personnel_Name: 'นาย โปร แก้ได้หมด',
          Tax_ID: '8888888888888',
          id: 2,
        },
        Reference: { Number: 'REF-001', id: 1 },
        Remarks:
          '### หมายเหตุสำคัญ\n\nเอกสารนี้เป็น **ตัวอย่าง** สำหรับการทดสอบระบบ\n\n- กรุณาตรวจสอบข้อมูลก่อนชำระเงิน\n- `TEST001` คือรหัสสินค้าทดสอบ\n- สินค้าจะจัดส่งภายใน 7 วัน',
        Tax: 0.07,
        id: 5,
      },
    }

    if (this.recordCallback) {
      this.recordCallback(defaultSample)
    }
  }
}

// Export the appropriate API
export const grist: GristAPI = isInsideGrist ? window.grist! : new MockGristAPI()
