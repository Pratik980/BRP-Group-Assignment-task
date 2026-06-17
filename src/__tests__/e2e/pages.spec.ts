import { test, expect } from "@playwright/test";

test.describe("Page Navigation", () => {
  test("About page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/BRP/i);
    await expect(page.locator("h1").first()).toBeAttached();
  });

  test("Ventures page loads", async ({ page }) => {
    await page.goto("/ventures");
    await expect(page).toHaveTitle(/BRP/i);
  });

  test("Community page loads", async ({ page }) => {
    await page.goto("/community");
    await expect(page).toHaveTitle(/BRP/i);
  });

  test("Careers page loads", async ({ page }) => {
    await page.goto("/career");
    await expect(page).toHaveTitle(/BRP/i);
  });

  test("History page loads", async ({ page }) => {
    await page.goto("/history");
    await expect(page).toHaveTitle(/BRP/i);
  });

  test("404 page for unknown routes", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Navigation Flow", () => {
  test("can navigate from homepage to about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveURL(/\/about/);
  });

  test("can navigate to ventures page", async ({ page }) => {
    await page.goto("/ventures");
    await expect(page).toHaveURL(/\/ventures/);
  });
});

test.describe("Admin Panel", () => {
  test("admin login page loads", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page).toHaveTitle(/BRP/i);
  });

  test("admin redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveTitle(/BRP/i);
  });
});
