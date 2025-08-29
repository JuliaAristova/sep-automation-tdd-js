import { test, expect } from "../../utilities/sep-ui-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

// create an empty test group.
test.describe("Verify step circles color during checkout", () => {

  /**
   * @type {StartApplicationPage}
   */
  let startAppPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
  });

  test("Verify he system displays steps as '1-Start Application', '2-Payment Plan', and '3-Review'", async ({ page }) => {
    const STEP1_TEXT = await startAppPage.startApplicationText.innerText();
    const STEP2_TEXT = await startAppPage.paymentPlanText.innerText();
    const STEP3_TEXT = await startAppPage.reviewText.innerText();

    expect(STEP1_TEXT).toBe("Start Application");
    expect(STEP2_TEXT).toBe("Payment plan");
    expect(STEP3_TEXT).toBe("Review");
  });

  test("Verify  color of 'Start Application' is blue", async ({ page }) => {
    await expect(startAppPage.startApplicationStepCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
  });


  test("Verify  color of 'Payment Plan' and 'Review' is grey", async ({ page }) => {
    await expect(startAppPage.paymentPlanStepCircle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(startAppPage.reviewStepCircle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

  });


});