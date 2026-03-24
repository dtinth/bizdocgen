import { expect, test } from "@playwright/test";
import { stabilize } from "pw-utilities";
import { GristTester } from "./support/GristTester";
import { storyboard } from "./support/storyboard";

test.use({ deviceScaleFactor: 2, viewport: { width: 1680, height: 945 } });

test("actually works with Grist", async ({ page }) => {
  await page.goto("http://localhost:8484/");
  await page.getByRole("button", { name: "Add new" }).click();

  await page.addLocatorHandler(page.locator(".test-onboarding-popup"), async (locator) => {
    await locator.locator(".test-onboarding-close").click();
  });

  await test.step("Import template and navigate to document", async () => {
    await expect(page.getByText("Import document")).toBeVisible();
    await storyboard.capture("Import document menu", page.getByText("Import document"));
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Import document").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("template.grist");
  });

  const customWidget = page.frameLocator("iframe");

  await test.step("Configure widget URL", async () => {
    await expect(page.getByText("Preview & Print")).toBeVisible();
    await page.getByText("Preview & Print").click();
    const widgetPanel = page.getByRole("tabpanel", { name: "Widget" });
    const urlTextbox = widgetPanel.getByRole("textbox", { name: "Enter Custom URL" });
    await expect(urlTextbox).toBeVisible();
    await urlTextbox.fill(process.env.CI ? "http://localhost:4173" : "http://localhost:5173");
    await storyboard.capture("Enter widget URL", urlTextbox);
    await page.keyboard.press("Enter");
    await page.getByRole("checkbox", { name: "I confirm that I understand" }).check();
    await expect(page.getByRole("button", { name: "Confirm" })).toBeVisible();
    await storyboard.capture("Confirm button", page.getByRole("button", { name: "Confirm" }));
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(customWidget.getByRole("button", { name: "พิมพ์เอกสาร" }).first()).toBeVisible();
  });

  await test.step("View an invoice", async () => {
    const inv = page.getByText("INV-2025-EX1").first();
    await inv.click();
    await expect(customWidget.getByText("ใบแจ้งหนี้").first()).toBeVisible();
    await expect(customWidget.getByText("INV-2025-EX1").first()).toBeVisible();
    await storyboard.capture("Widget showing document", page);
    await page.screenshot({ path: `e2e-results/grist-integration.png` });
  });

  await test.step("Close creator panel", async () => {
    const btn = page.getByRole("button", { name: "Open creator panel" });
    await storyboard.capture("Close creator panel", btn);
    await btn.click();
    await stabilize(btn);
    await storyboard.capture("Creator panel closed", btn);
  });

  const grist = new GristTester(page);
  const widget = grist.widget("Documents");

  await test.step("Add a row", async () => {
    const newCell = widget.newRecord.fieldsLocator.nth(0);
    await newCell.dblclick();
    const docType = page
      .locator(".test-choice-editor-item")
      .filter({ hasText: "Quotation" })
      .first();
    await page.keyboard.type("q");
    await expect(docType).toBeVisible();
    await storyboard.capture("Select document type", docType);
    await page.keyboard.press("Tab");
  });

  const selectedRecord = widget.selectedRecord;
  await test.step("Date column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/\d{4}-\d{2}-\d{2}/);
    await storyboard.capture("Date column auto-filled", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Number column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/\d{3}/);
    await storyboard.capture("Number column auto-filled", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Credit Term column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/^\s*$/);
    await page.keyboard.press("Enter");
    const choiceItem = page
      .locator(".test-choice-editor-item")
      .filter({ hasText: "7 วัน" })
      .first();
    await expect(choiceItem).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await storyboard.capture("Credit Term column", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Provider column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/^\s*$/);
    await page.keyboard.press("Enter");
    const choiceItem = page.locator(".test-ref-editor-item").first();
    await expect(choiceItem).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await storyboard.capture("Provider column", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Client column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/^\s*$/);
    await page.keyboard.press("Enter");
    const choiceItem = page.locator(".test-ref-editor-item").first();
    await expect(choiceItem).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await storyboard.capture("Client column", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Tax column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/0%/);
    await storyboard.capture("Tax column", selectedRecord.selectedFieldLocator);
    await page.keyboard.type("-3%");
    await page.keyboard.press("Tab");
  });
  await test.step("Payment Method column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/^\s*$/);
    await page.keyboard.press("Enter");
    const choiceItem = page.locator(".test-ref-editor-item").first();
    await expect(choiceItem).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await storyboard.capture("Payment Method column", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Reference column", async () => {
    await expect(selectedRecord.selectedFieldLocator).toHaveText(/^\s*$/);
    await page.keyboard.press("Enter");
    const choiceItem = page.locator(".test-ref-editor-item").first();
    await expect(choiceItem).toBeVisible();
    await storyboard.capture("Reference column", selectedRecord.selectedFieldLocator);
    await page.keyboard.press("Tab");
  });
  await test.step("Items", async () => {
    const itemsWidget = grist.widget("Items");
    const newItemCell = itemsWidget.newRecord.fieldsLocator.nth(0);
    await newItemCell.dblclick();
    await page.keyboard.type("ค่าบริการ (ชั่วโมง)");
    await page.keyboard.press("Tab");
    const selectedItemRecord = itemsWidget.selectedRecord;

    // Quantity is autofilled
    await expect(selectedItemRecord.selectedFieldLocator).toHaveText("1");
    await page.keyboard.type("2");
    await page.keyboard.press("Tab");

    // Fill in unit price
    await expect(selectedItemRecord.selectedFieldLocator).toHaveText(/0\.00/);
    await page.keyboard.type("480");
    await page.keyboard.press("Tab");

    // Subtotal is calculated
    await expect(selectedItemRecord.selectedFieldLocator).toHaveText(/960\.00/);
    await storyboard.capture("Add items", page);
  });

  const docNav = page.getByRole("navigation", { name: "Document pages" });
  await docNav.getByRole("link", { name: "Providers" }).click();
  await expect(page.getByText("นาย โปร แก้ได้หมด").first()).toBeVisible();
  await storyboard.capture("Providers table", page);

  await docNav.getByRole("link", { name: "Clients" }).click();
  await expect(page.getByText("คุณป้าข้างซอย").first()).toBeVisible();
  await storyboard.capture("Clients table", page);

  await docNav.getByRole("link", { name: "Payment Methods" }).click();
  await expect(page.getByText("111-1-11111-1").first()).toBeVisible();
  await storyboard.capture("Payment Methods table", page);
});
