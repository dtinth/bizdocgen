import { computed, nextTick, ref, watch } from 'vue'
import type { GristRecord, Action } from '../types/document-schema'
import { GristRecordSchema } from '../types/document-schema'
import { grist } from '../utils/grist'

// App state
const record = ref<GristRecord | null>(null)
const rawGristData = ref<unknown>(null)
const error = ref<string | null>(null)
const isLoading = ref(true)

// Action state
const isExecutingAction = ref(false)

// Settings state
const customCss = ref<string>('')
const savedCustomCss = ref<string>('')
const showSettings = ref(false)
const settingsRef = ref<HTMLElement | null>(null)

// Dynamic style element for custom CSS
let customStyleElement: HTMLStyleElement | null = null

export function useAppState() {
  // Initialize dynamic style element
  if (!customStyleElement && typeof document !== 'undefined') {
    customStyleElement = document.createElement('style')
    customStyleElement.id = 'grist-custom-css'
    document.head.appendChild(customStyleElement)
  }

  // Derive actions data from the record
  const actionsData = computed(() => {
    return record.value?.Record?.Actions_Data ?? null
  })

  // Execute an action (create records from Actions_Data)
  async function executeAction(action: Action): Promise<void> {
    if (isExecutingAction.value) return
    isExecutingAction.value = true
    try {
      const tbl = grist.getTable(action.table)
      const result = await tbl.create({ fields: action.record })
      const newId = result.id

      if (action.items?.records.length) {
        const itemTbl = grist.getTable(action.items.table)
        for (const item of action.items.records) {
          await itemTbl.create({ fields: { ...item, Document: newId } })
        }
      }

      const created = await grist.fetchSelectedRecord(newId)
      const docNumber = (created as Record<string, unknown>).Number ?? `#${newId}`
      alert(`✅ "${action.title}" completed: ${docNumber}`)
    } catch (err) {
      console.error('Failed to execute action:', err)
      alert(`❌ ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      isExecutingAction.value = false
    }
  }

  // Check if CSS has been modified
  const isCssChanged = computed(() => {
    return customCss.value !== savedCustomCss.value
  })

  // Apply custom CSS to the page
  const applyCustomCss = (css: string) => {
    if (customStyleElement) {
      customStyleElement.textContent = css
    }
  }

  // Save custom CSS to Grist options
  const saveCustomCss = () => {
    if (grist && grist.setOption) {
      grist.setOption('customCss', customCss.value)
    }
    applyCustomCss(customCss.value)
    savedCustomCss.value = customCss.value
  }

  // Load custom CSS from Grist options
  const loadCustomCss = async () => {
    if (grist && grist.getOption) {
      try {
        const savedCss = await Promise.resolve(grist.getOption('customCss'))
        if (savedCss) {
          const cssString = String(savedCss)
          customCss.value = cssString
          savedCustomCss.value = cssString
          applyCustomCss(cssString)
        }
      } catch (error) {
        console.error('Failed to load custom CSS:', error)
      }
    }
  }

  // Scroll to settings area
  const scrollToSettings = async () => {
    showSettings.value = true
    await nextTick()
    if (settingsRef.value) {
      settingsRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Module-scoped flag to prevent duplicate initialization
  let gristInitialized = false

  // Initialize Grist integration (idempotent)
  const initializeGrist = async () => {
    if (gristInitialized) return
    gristInitialized = true

    grist.ready({
      onEditOptions: scrollToSettings,
      requiredAccess: 'full',
    })

    // Handle record data
    grist.onRecord(function (recordData: unknown) {
      try {
        rawGristData.value = recordData
        const validatedRecord = GristRecordSchema.parse(recordData)
        record.value = validatedRecord
        error.value = null
      } catch (err) {
        console.error('Invalid record data:', err)
        error.value = 'ข้อมูลไม่ถูกต้อง: ' + (err instanceof Error ? err.message : String(err))
        record.value = null
        rawGristData.value = null
      } finally {
        isLoading.value = false
      }
    })

    // Handle options changes
    if (grist.onOptions) {
      grist.onOptions((options: { [key: string]: unknown }) => {
        if (options && options.customCss !== undefined) {
          const cssString = String(options.customCss || '')
          customCss.value = cssString
          savedCustomCss.value = cssString
          applyCustomCss(cssString)
        }
      })
    }

    // Load initial custom CSS
    await loadCustomCss()
  }

  // Watch for record changes to update document title
  watch(record, (r) => {
    if (r?.Record?.Number) {
      document.title = r.Record.Number
    }
  })

  return {
    // State
    record,
    rawGristData,
    error,
    isLoading,
    customCss,
    showSettings,
    settingsRef,

    // Action state
    isExecutingAction,
    actionsData,

    // Computed
    isCssChanged,

    // Actions
    saveCustomCss,
    loadCustomCss,
    scrollToSettings,
    initializeGrist,
    applyCustomCss,
    executeAction,
  }
}
