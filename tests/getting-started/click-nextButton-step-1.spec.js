import { test, expect, CommonUI } from "../../utilities/sep-ui-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

// create an empty test group.
test.describe("Verify Next button on step 1", () => {

  /**
   * @type {StartApplicationPage}
   */
  let startAppPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
  });

  test("Verify that customer is on step 2 when he provides all required fields and option from dropdown", async ({ page }) => {
    CommonUI.completeStartApplicationForm(page);
    await expect(startAppPage.paymentPlanStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");

  });

  test("Verify that customer is on step 2 when he provides all required fields", async ({ page }) => {
    await startAppPage.enterFirstName("John");
    await startAppPage.enterLastName("Doe");
    await startAppPage.enterEmail("johndoe@example.com");
    await startAppPage.enterPhoneNumber("1234567abc");
    await startAppPage.clickNextButton();
    await expect(startAppPage.paymentPlanText).toBeVisible();
  });
});