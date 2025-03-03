import { test, expect } from "@playwright/test";

test("logs in", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  const username = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");
  const submit = page.getByRole("button", { name: "Login" });

  await username.fill("test");
  await password.fill("password");
  await submit.click();

  await expect(page.getByText("👁️ Watchlists 📈")).toBeVisible();
});

test.describe("interacts with watchlists and symbols", () => {
  test("adds watchlist", async ({ page }) => {
    const addWatchlist = page.getByRole("button", { name: "Add Watchlist" });
    await addWatchlist.click();

    const watchlistName = page.getByLabel("Name");
    const saveChanges = page.getByRole("button", { name: "Save Changes" });
    await watchlistName.fill("Test Watchlist");
    await saveChanges.click();

    expect(page.url).toContain("?watchlist=Test%20Watchlist");
  });

  test("adds symbol to watchlist", async ({ page }) => {
    const addSymbol = page.getByRole("button", { name: "Add Symbol" });
    await addSymbol.click();

    const symbol = page.getByPlaceholder("Symbol");
    await symbol.fill("AAPL");
    const option = page.getByRole("option", { name: "AAPL" });
    await option.click();

    await expect(page.getByRole("link", { name: "$AAPL" })).toBeVisible();
  });

  test("symbol links to symbol page", async ({ page }) => {
    const symbol = page.getByRole("link", { name: "$AAPL" });
    await symbol.click();

    expect(page.url).toContain("/symbol/AAPL");
    expect(page.getByText("$AAPL")).toBeVisible();

    page.goBack();
  });

  test("removes symbol from watchlist", async ({ page }) => {
    const removeSymbol = page.getByRole("button", { name: "Remove Symbol" });
    await removeSymbol.click();
    await page.getByRole("button", { name: "Delete" }).click();

    expect(page.getByRole("link", { name: "$AAPL" })).toBeFalsy();
  });

  test("removes watchlist", async ({ page }) => {
    const removeWatchlist = page.getByRole("button", {
      name: "Remove Watchlist",
    });
    await removeWatchlist.click();
    await page.getByRole("button", { name: "Delete" }).click();

    expect(page.url).not.toContain("?watchlist=Test%20Watchlist");
  });
});
