import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { PageObject } from './PageObject'
import { ActionButtonsTester } from './testers/ActionButtonsTester'
import { PrintableDocumentTester } from './testers/PrintableDocumentTester'
import { SettingsTester } from './testers/SettingsTester'

export class AppTester extends PageObject {
  constructor(page: Page) {
    super({ page })
  }

  // Component testers
  get actionButtons() {
    return new ActionButtonsTester(this.context)
  }

  get printableDocument() {
    return new PrintableDocumentTester(this.context)
  }

  get settings() {
    return new SettingsTester(this.context)
  }

  // App-wide locators - Using semantic locators instead of CSS selectors
  get app() {
    return this.page.getByTestId('app')
  }

  get loading() {
    return this.page.getByTestId('app-loading')
  }

  get error() {
    return this.page.getByTestId('app-error')
  }

  get content() {
    return this.page.getByTestId('app-content')
  }

  get noData() {
    return this.page.getByTestId('app-no-data')
  }

  get signedDocument() {
    return this.page.getByTestId('signed-document')
  }

  // Core app actions
  async goto() {
    await this.page.goto('/')
    // Wait for the default TEST-001 document to load
    await this.printableDocument.waitForDocumentNumber('TEST-001')
  }

  async reload() {
    await this.page.reload()
  }

  async waitForAppLoad() {
    await expect(this.app).toBeVisible()
  }

  async waitForContent() {
    await expect(this.content).toBeVisible()
  }

  // Generic helpers
  async expectTextVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible()
  }

  async waitFor(selector: string) {
    await this.page.locator(selector).waitFor()
  }

  // Viewport helpers
  async setViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height })
  }

  // Screenshot helpers
  async hideUIElementsForScreenshot() {
    await this.page.addStyleTag({
      content: `
        .action-buttons { display: none !important; }
        .app__settings { display: none !important; }
      `,
    })
  }

  async takeScreenshot(filename: string) {
    await this.page.screenshot({
      path: `e2e-results/${filename}`,
      fullPage: true,
    })
  }

  async takeDocumentScreenshot(filename: string) {
    // Screenshot either the document or signed document element using test IDs
    const documentElement = await this.page
      .getByTestId('document')
      .first()
      .isVisible()
      .catch(() => false)

    if (documentElement) {
      await this.page.getByTestId('document').screenshot({
        path: `e2e-results/${filename}`,
      })
    } else {
      // Fall back to signed document
      await this.page.getByTestId('signed-document').screenshot({
        path: `e2e-results/${filename}`,
      })
    }
  }

  // Scenario helpers
  async getAllScenarios() {
    await this.waitForContent()

    // Get all scenario options from the select element
    return await this.actionButtons.scenarioSelector.locator('option').evaluateAll((options) =>
      options
        .filter((opt) => (opt as HTMLOptionElement).value) // Skip empty option
        .map((opt) => ({
          slug: (opt as HTMLOptionElement).value,
          title: opt.textContent || (opt as HTMLOptionElement).value,
        })),
    )
  }

  // Mock data helpers
  async dispatchMockRecord(data: unknown) {
    await this.page.evaluate((recordData) => {
      document.dispatchEvent(
        new CustomEvent('mockgristrecord', {
          detail: recordData,
        }),
      )
    }, data)

    // Wait for the document to fully load with the correct data
    if (data && typeof data === 'object' && 'Record' in data) {
      const record = (data as { Record?: { Number?: string } }).Record
      if (record?.Number) {
        await this.printableDocument.waitForDocumentNumber(record.Number)
      }
    }
  }

  async dispatchInvalidData() {
    await this.page.evaluate(() => {
      document.dispatchEvent(
        new CustomEvent('mockgristrecord', {
          detail: { invalid: 'data' },
        }),
      )
    })
  }

  // State assertions
  async expectErrorState() {
    await expect(this.error).toBeVisible()
    await expect(this.page.locator('text=เกิดข้อผิดพลาด')).toBeVisible()
    await expect(this.page.locator('text=ข้อมูลไม่ถูกต้อง')).toBeVisible()
  }

  async expectSignedDocumentState() {
    await expect(this.signedDocument).toBeVisible()
    await expect(this.page.locator('text=เอกสารนี้ได้ถูกลงชื่อเรียบร้อยแล้ว')).toBeVisible()
  }

  // Session storage helpers
  async getSessionStorageItem(key: string) {
    return await this.page.evaluate((storageKey) => {
      return sessionStorage.getItem(storageKey)
    }, key)
  }
}
