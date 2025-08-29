import { test, expect } from "../../utilities/sep-ui-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { LeftMainPage } from "../../pages/LeftMainPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("View project landing page", () => {

  /**
   * @type {LeftMainPage}
   * @type {StartApplicationPage}
   */
  let startAppPage;
  let leftMainPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
    leftMainPage = new LeftMainPage(page);
  });

  test("Verify the system displays the text Cydeo Secure Checkout", async ({ page }) => {
    await expect(leftMainPage.secureCheckout).toBeVisible();
  });

  test("Verify the system displays the program name", async ({ page }) => {
    const ACTUAL_PROGRAM_NAME = await leftMainPage.programName.innerText();
    const EXPECTED_PROGRAM_NAME = productInfo.productName;

    expect(ACTUAL_PROGRAM_NAME).toBe(EXPECTED_PROGRAM_NAME);
  });

  test("Verify the system displays the program namerify the system displays footer that contains logo, Terms and Conditions, Privacy Policy, Disclaimer, Cookie Policy", async ({ page }) => {
    const optionsCount = await leftMainPage.footerLinks.count();
    console.log(optionsCount);
    expect(optionsCount).toBe(5);
    let links = ["Terms and conditions", "Privacy Policy", "Disclaimer", "Cookie Policy"];
    for (let i = 1; i < optionsCount; i++) {
      await expect(leftMainPage.footerLinks.nth(i)).toHaveText(links[i - 1]);
    }
  });

  test("Verify the system display the text Need help? Contact us at enrollment@cydeo.com in the right footer", async ({ page }) => {

    await expect(startAppPage.footer).toBeVisible();
    console.log(await startAppPage.footer.innerText());
    const ACTUAL_FOOTER_TEXT = await startAppPage.footer.innerText();
    const EXPECTED_FOOTER_TEXT = "Need help? Contact us at enrollment@cydeo.com";

    expect(ACTUAL_FOOTER_TEXT).toBe(EXPECTED_FOOTER_TEXT);
  });

})