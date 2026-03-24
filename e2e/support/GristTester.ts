import { Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";

export class GristTester extends PageObject {
  constructor(page: Page) {
    super({ page });
  }

  widget(title: string) {
    const { page } = this;
    const widgetLocator = this.page.locator(".view_leaf").filter({
      has: this.page.locator(".viewsection_title").filter({ hasText: title }),
    });
    const record = (recordLocator: Locator) => {
      const fieldsLocator = recordLocator.locator(".field");
      const selectedFieldLocator = fieldsLocator.filter({ has: page.locator(".active_cursor") });
      return {
        locator: recordLocator,
        fieldsLocator: fieldsLocator,
        selectedFieldLocator: selectedFieldLocator,
      };
    };
    return {
      locator: widgetLocator,
      get newRecord() {
        return record(widgetLocator.locator(".record-add"));
      },
      get selectedRecord() {
        return record(page.locator(".record").filter({ has: page.locator(".active_cursor") }));
      },
    };
  }
}
