import { expect, test } from '@playwright/test';

test('Visit about page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.nav__link:not(.is-active)').click();
  await expect(page.getByRole('heading', { name: 'Learning new things' })).toBeVisible();
});
