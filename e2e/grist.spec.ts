import { expect, test } from '@playwright/test'
import { storyboard } from './support/storyboard'

test('actually works with Grist', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('http://localhost:8484/')
  await storyboard.capture('Grist home', page)

  await page.getByRole('button', { name: 'Add new' }).click()

  await page.addLocatorHandler(page.locator('.test-onboarding-popup'), async (locator) => {
    await locator.locator('.test-onboarding-close').click()
  })

  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByText('Import document').click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('template.grist')

  await page
    .getByRole('navigation', { name: 'Document pages' })
    .getByRole('link', { name: 'Documents' })
    .click()
  await storyboard.capture('Documents table', page)

  await page.getByText('Preview & Print').click()
  await storyboard.capture('Preview & Print row selected', page)

  await page
    .getByRole('tabpanel', { name: 'Widget' })
    .getByRole('textbox', { name: 'Enter Custom URL' })
    .fill(process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173')
  await page.keyboard.press('Enter')
  await storyboard.capture('Custom URL entered', page.getByRole('tabpanel', { name: 'Widget' }))

  await page.getByRole('checkbox', { name: 'I confirm that I understand' }).check()
  await page.getByRole('button', { name: 'Confirm' }).click()

  await expect(page.frameLocator('iframe').getByText('ใบเสนอราคา').first()).toBeVisible()
  await storyboard.capture('Widget showing document', page)

  await page.screenshot({ path: `e2e-results/grist-integration.png` })
})
