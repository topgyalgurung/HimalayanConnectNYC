import { test, expect } from '@playwright/test';

test("should navigate to home page", async({page})=>{
  await page.goto("/")

  await page.click("text=About")
  await expect(page).toHaveURL("http://localhost:3000/about")
})

