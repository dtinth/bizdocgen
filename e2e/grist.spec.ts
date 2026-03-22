import { expect, test } from '@playwright/test'
import { storyboard } from './support/storyboard'

test('actually works with Grist', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('http://localhost:8484/')
  await page.getByRole('button', { name: 'Add new' }).click()

  await page.addLocatorHandler(page.locator('.test-onboarding-popup'), async (locator) => {
    await locator.locator('.test-onboarding-close').click()
  })

  // 1. Pre-action: Import document menu is open
  await expect(page.getByText('Import document')).toBeVisible()
  await storyboard.capture('Import document menu', page.getByText('Import document'))
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByText('Import document').click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('template.grist')

  // 2. Post-action: Providers table (already on this page after import)
  const docNav = page.getByRole('navigation', { name: 'Document pages' })
  // Click the main grid area to dismiss the page rename textbox that Grist
  // activates on the first page after import
  await page.locator('.gridview_data_scroll').first().click()
  await storyboard.capture('Providers table', page)

  // 3. Post-action: Clients table
  await docNav.getByRole('link', { name: 'Clients' }).click()
  await expect(page.locator('.gridview_data_scroll')).toBeVisible()
  await storyboard.capture('Clients table', page)

  // 4. Post-action: Payment Methods table
  await docNav.getByRole('link', { name: 'Payment Methods' }).click()
  await expect(page.locator('.gridview_data_scroll')).toBeVisible()
  await storyboard.capture('Payment Methods table', page)

  // 5. Post-action: Documents table loaded
  await docNav.getByRole('link', { name: 'Documents' }).click()
  await expect(page.getByText('Preview & Print')).toBeVisible()
  await storyboard.capture('Documents table', page)

  await page.getByText('Preview & Print').click()

  // Widget panel: fill custom URL and capture the textbox
  const widgetPanel = page.getByRole('tabpanel', { name: 'Widget' })
  const urlTextbox = widgetPanel.getByRole('textbox', { name: 'Enter Custom URL' })
  await expect(urlTextbox).toBeVisible()
  await urlTextbox.fill(process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173')
  await storyboard.capture('Widget panel with URL', urlTextbox)
  await page.keyboard.press('Enter')

  // Pre-action: Confirm button
  await page.getByRole('checkbox', { name: 'I confirm that I understand' }).check()
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible()
  await storyboard.capture('Confirm button', page.getByRole('button', { name: 'Confirm' }))
  await page.getByRole('button', { name: 'Confirm' }).click()

  // 7. Post-action: Widget showing document
  await expect(page.frameLocator('iframe').getByText('ใบเสนอราคา').first()).toBeVisible()
  await storyboard.capture('Widget showing document', page)

  await page.screenshot({ path: `e2e-results/grist-integration.png` })
})
