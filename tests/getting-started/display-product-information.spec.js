import { test, expect } from "../../utilities/sep-ui-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { LeftMainPage } from "../../pages/LeftMainPage";

// create an empty test group
test.describe("Display product information", () => {

  /**
   * @type {StartApplicationPage}
   * @type {LeftMainPage}
   */
  let startAppPage;
  let leftMainPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
    leftMainPage = new LeftMainPage(page);
  });

  test("Verify the displayed program name is correct", async ({ page }) => {
    const EXPECTED_PRODUCT_NAME = productInfo.productName;
    const ACTUAL_PRODUCT_NAME = await startAppPage.programNameOnInfoCard.innerText();
    const ACTUAL_PRODUCT_NAME_LEFT = await leftMainPage.programName.innerText();
    expect(ACTUAL_PRODUCT_NAME).toBe(EXPECTED_PRODUCT_NAME);
    expect(ACTUAL_PRODUCT_NAME_LEFT).toBe(ACTUAL_PRODUCT_NAME);
  });

  test("Verify price and payment pland info", async ({ page }) => {
    await expect(startAppPage.programPrice).toBeVisible();

    const ACTUAL_TEXT = await startAppPage.flexiblePaymentsPlanAvailableText.innerText();
    await expect(startAppPage.flexiblePaymentsPlanAvailableText).toBeVisible();
    await expect(ACTUAL_TEXT).toContain('Flexible payments plan available');
  });

  test("Verify start date and refund date and policy info", async ({ page }) => {
    await expect(startAppPage.programPrice).toBeVisible();

    await expect(startAppPage.refundEndDate).toBeVisible();
    const EXPECTED_REFUND_END_DATE = productInfo.refundDate;
    const ACTUAL_REFUND_END_DATE = await startAppPage.refundEndDate.innerText();
    expect(ACTUAL_REFUND_END_DATE).toBe(EXPECTED_REFUND_END_DATE);
  });
});