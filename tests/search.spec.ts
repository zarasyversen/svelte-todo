import { expect, test } from '@playwright/test';
import { createNewTodo } from './helpers/AddNewTodo';

test('Search todo, no results', async ({ page }) => {
  await createNewTodo(page);
  await page.locator('.topContainer button').click();
  await page.locator('.todoSearchInput').fill('not in list');
  await expect(page.getByText('Sorry, no results. Maybe add a new item?')).toBeVisible();
});

test('Search todo, 1 result', async ({ page }) => {
  const label = 'My custom todo';
  await createNewTodo(page, label);
  await page.locator('.topContainer button').click();
  await page.locator('.todoSearchInput').fill('custom');
  await expect(page.getByText(label)).toBeVisible();
});
