import { expect, test } from "@playwright/test";
import { storyboard } from "./support/storyboard";

test("actually works with Grist", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
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

  const widget = page.frameLocator("iframe");

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
    await expect(widget.getByRole("button", { name: "พิมพ์เอกสาร" }).first()).toBeVisible();
  });

  await test.step("View an invoice", async () => {
    const inv = page.getByText("INV-2025-EX1").first();
    await inv.click();
    await expect(widget.getByText("ใบแจ้งหนี้").first()).toBeVisible();
    await expect(widget.getByText("INV-2025-EX1").first()).toBeVisible();
    await storyboard.capture("Widget showing document", page);
    await page.screenshot({ path: `e2e-results/grist-integration.png` });
  });

  await test.step("Add a row", async () => {
    const newCell = page
      .locator('.view_leaf:has(.viewsection_title:has-text("Documents")) .record-add .field')
      .first();
    await newCell.dblclick();
    const docType = page.locator('.test-choice-editor-item:has-text("Quotation")');
    await expect(docType).toBeVisible();
    await page.keyboard.type("q");
    await storyboard.capture("Select document type", docType);
    await page.keyboard.press("Tab");
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
