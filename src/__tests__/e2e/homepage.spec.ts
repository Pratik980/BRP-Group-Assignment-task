import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/B.R.P./i);
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("navigation renders", async ({ page }) => {
    await expect(page.getByText(/Home/i).first()).toBeAttached();
    await expect(page.getByText(/About/i).first()).toBeAttached();
  });

  test("Connect button is clickable", async ({ page }) => {
    const connectBtn = page.getByRole("link", { name: "Connect" });
    await expect(connectBtn).toBeVisible();
    await connectBtn.click();
  });

  test("footer renders with contact info", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/info@brpgroup.com.np/i).first()).toBeVisible();
  });

  test("Who We Are section is present", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(page.getByText(/Who We/i).first()).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("mobile viewport renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("tablet viewport renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("no horizontal scroll on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
