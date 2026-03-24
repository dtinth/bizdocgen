import { test, expect } from '@playwright/test'
import { AppTester } from './support/AppTester'

test.describe('Grist Widget Functionality', () => {
  test('displays scenario selector in mock mode', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.waitForAppLoad()
    await app.actionButtons.expectScenarioSelectorVisible()
  })

  test('loads data via DOM event dispatch', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.waitForAppLoad()

    // Dispatch a mock record event
    const sampleData = {
      id: 999,
      Record: {
        Client: {
          Address: 'Test Address\\nTest City 12345',
          Name: 'Test Company Ltd',
          Tax_ID: '1234567890123',
          id: 1,
        },
        Date: '2025-08-09T00:00:00.000Z',
        Document_Type: ['Receipt'],
        Items: [
          {
            Description: 'Test Item',
            Document: { tableId: 'Documents', rowId: 1 },
            Manual_Sort: 1,
            Quantity: 1,
            Total: 100,
            Unit_Price: 100,
            id: 1,
          },
        ],
        Number: 'TEST-001',
        Payment_Method: {
          Account_Holder: 'Test Holder',
          Account_Number: '123-4-56789-0',
          Bank: 'Test Bank',
          Branch: 'Test Branch',
          Name: 'Test Payment',
          PromptPay: '0123456789',
          id: 1,
        },
        Provider: {
          Address: 'Provider Address\\nProvider City 54321',
          Email: 'test@provider.com',
          Name: 'Test Provider Ltd',
          Personnel_Name: 'Test Person',
          Tax_ID: '9876543210987',
          id: 1,
        },
        Reference: { Number: 'REF-001', id: 1 },
        Remarks: 'Test remarks',
        Tax: 0.07,
        id: 999,
      },
    }

    await app.dispatchMockRecord(sampleData)

    // Should show document content
    await app.waitForContent()
    await app.actionButtons.expectVisible()

    // Should display document data
    await app.printableDocument.expectDocumentNumber('TEST-001')
    await app.printableDocument.expectClientName('Test Company Ltd')
  })

  test('scenario selector changes data via DOM events', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.waitForContent()

    // Change scenario using dropdown
    await app.actionButtons.selectScenario('receipt-vat-k8s-bug-hunt')

    // Should show updated document data
    await app.printableDocument.expectDocumentNumber('RCPT-2025-0001')
    await app.expectTextVisible('บริการไล่บั๊กระบบ Kubernetes')
  })

  test('custom CSS settings work with sessionStorage', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.waitForContent()

    // Open settings and add custom CSS
    await app.settings.open()
    const customCSS = '.document { background-color: red; }'
    await app.settings.setCustomCSS(customCSS)
    await app.settings.apply()

    // Check that CSS was saved to sessionStorage
    const savedCSS = await app.getSessionStorageItem('grist_option_customCss')
    expect(JSON.parse(savedCSS!)).toBe(customCSS)

    // Reload page and check if CSS persists
    await app.reload()
    await app.waitForContent()
    await app.settings.open()

    // CSS should be loaded from sessionStorage
    await app.settings.expectCustomCSSValue(customCSS)
  })

  test('handles invalid record data gracefully', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.dispatchInvalidData()
    await app.expectErrorState()
  })

  test('print button is disabled when document is signed', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.actionButtons.selectScenario('signed-demo')

    await app.expectSignedDocumentState()
    await app.actionButtons.expectPrintButtonDisabled()
  })

  test('copy JSON functionality works', async ({ page }) => {
    const app = new AppTester(page)

    await app.goto()
    await app.waitForContent()

    // Mock clipboard API and click copy button
    await app.actionButtons.mockClipboardAPI()
    await app.actionButtons.clickCopyJson()

    // Check that JSON was copied
    const clipboardText = await app.actionButtons.getClipboardText()
    expect(JSON.parse(clipboardText!)).toMatchObject({
      id: expect.any(Number),
      Record: expect.any(Object),
    })
  })
})
