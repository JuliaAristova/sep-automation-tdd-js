import { test, expect } from "../../utilities/sep-ui-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

// create an empty test group.
test.describe("Verify user can enter personal details", () => {

  /**
   * @type {StartApplicationPage}
   */
  let startAppPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
  });

  test("Verify input types and values", async ({ page }) => {
    const firstName = await (startAppPage.firstNameInputBox).evaluate(el => el.tagName.toLowerCase());
    const lastName = await (startAppPage.lastNameInputBox).evaluate(el => el.tagName.toLowerCase());
    const phone = await (startAppPage.phoneNumberInputBox).evaluate(el => el.tagName.toLowerCase());

    expect(firstName).toBe('input');
    expect(lastName).toBe('input');
    expect(phone).toBe('input')

    await expect(startAppPage.emailInputBox).toBeVisible();
    await expect(startAppPage.emailInputBox).toHaveAttribute('type', 'email');

    await (startAppPage.firstNameInputBox).fill("John");
    await (startAppPage.lastNameInputBox).fill("Doe");
    await (startAppPage.emailInputBox).fill("johndoe@gmail.com");
    await (startAppPage.phoneNumberInputBox).fill("1234567890");

    expect(await (startAppPage.firstNameInputBox).inputValue()).toBe("John");
    expect(await (startAppPage.lastNameInputBox).inputValue()).toBe("Doe");
    expect(await (startAppPage.emailInputBox).inputValue()).toBe("johndoe@gmail.com");
    expect(await (startAppPage.phoneNumberInputBox).inputValue()).toBe("1234567890");
  });

  test("Verify 'How did you hear about us? dropdown list is present", async ({ page }) => {
    await expect(startAppPage.howDidYouHearAboutUsDropDown).toBeVisible();
    await startAppPage.howDidYouHearAboutUsDropDown.click();
    const optionsCount = await startAppPage.dropdownOptions.count();
    expect(optionsCount).toBe(9);
  });

  test("Verify 'Next' button should be disabled if any required data is missing or invalid", async ({ page }) => {
    await startAppPage.enterFirstName("John");
    await startAppPage.enterLastName("Doe");
    await startAppPage.enterEmail("johndoe@example.com");
    await startAppPage.enterPhoneNumber("1234567abc");
    await startAppPage.clickNextButton();
    await expect(startAppPage.paymentPlanStepCircle).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

  });


});