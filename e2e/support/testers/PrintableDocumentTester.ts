import { expect } from '@playwright/test'
import { PageObject } from '../PageObject'

export class PrintableDocumentTester extends PageObject {
  // Locators - Using semantic locators instead of CSS selectors
  get document() {
    return this.page.getByTestId('document')
  }

  // Actions
  async waitForDocumentNumber(documentNumber: string) {
    await expect(this.document).toHaveAttribute('data-document-number', documentNumber)
  }

  // Assertions
  async expectDocumentNumber(number: string) {
    await expect(this.page.getByText(number)).toBeVisible()
  }

  async expectClientName(name: string) {
    await expect(this.page.getByText(name)).toBeVisible()
  }

  async expectDocumentVisible() {
    await expect(this.document).toBeVisible()
  }
}
