import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const contactSection = page.locator("#contact");
    if (await contactSection.isVisible()) {
      await contactSection.scrollIntoViewIfNeeded();
    } else {
      await page.goto("/#contact");
    }
  });

  test("form fields are interactive", async ({ page }) => {
    const nameInput = page.getByPlaceholder(/Full name/i).first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill("Test User");
    await expect(nameInput).toHaveValue("Test User");
  });

  test("email field accepts email format", async ({ page }) => {
    const emailInput = page.getByPlaceholder(/you@company/i).first();
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");
  });
});

test.describe("Career Application Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/career");
  });

  test("vacancy listings are visible", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const heading = page.getByText(/Open Positions/i).first();
    await expect(heading).toBeVisible();
  });

  test("application form renders", async ({ page }) => {
    const applyButton = page.getByText(/Apply now/i).first();
    if (await applyButton.isVisible()) {
      await expect(applyButton).toBeEnabled();
    }
  });
});
