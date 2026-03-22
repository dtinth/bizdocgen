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

  // 2. Post-action: Documents table loaded
  await page
    .getByRole('navigation', { name: 'Document pages' })
    .getByRole('link', { name: 'Documents' })
    .click()
  await expect(page.getByText('Preview & Print')).toBeVisible()
  await storyboard.capture('Documents table', page)

  // 3. Pre-action: Preview & Print row
  await expect(page.getByText('Preview & Print')).toBeVisible()
  await storyboard.capture('Preview & Print row', page.getByText('Preview & Print'))
  await page.getByText('Preview & Print').click()

  // 4. Post-action + pre-action combined: Widget panel with URL filled in
  const widgetPanel = page.getByRole('tabpanel', { name: 'Widget' })
  await expect(widgetPanel.getByRole('textbox', { name: 'Enter Custom URL' })).toBeVisible()
  await widgetPanel
    .getByRole('textbox', { name: 'Enter Custom URL' })
    .fill(process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173')
  await storyboard.capture('Widget panel with URL', widgetPanel)
  await page.keyboard.press('Enter')

  // 5. Post-action: Access confirmation dialog
  await expect(page.getByRole('checkbox', { name: 'I confirm that I understand' })).toBeVisible()
  await storyboard.capture('Access confirmation dialog', page.getByRole('checkbox', { name: 'I confirm that I understand' }))

  // 6. Pre-action: Confirm button
  await page.getByRole('checkbox', { name: 'I confirm that I understand' }).check()
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible()
  await storyboard.capture('Confirm button', page.getByRole('button', { name: 'Confirm' }))
  await page.getByRole('button', { name: 'Confirm' }).click()

  // 7. Post-action: Widget showing document
  await expect(page.frameLocator('iframe').getByText('ใบเสนอราคา').first()).toBeVisible()
  await storyboard.capture('Widget showing document', page)

  await page.screenshot({ path: `e2e-results/grist-integration.png` })
})
