import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Your list of tasks' })).toBeVisible();
});

test('add todo', async({ page}) => {
  await page.goto('/');
  await page.getByLabel('Add a new task').fill('Add new todo');
  await page.getByRole('button').click();
  await expect(page.getByText('Add new todo')).toBeVisible();
});

test('complete todo', async({ page}) => {
  await page.goto('/');
  await page.getByLabel('Add a new task').fill('Add new todo');
  await page.getByRole('button').click();
  await page.locator('.checkboxLabel').click();
  await expect(page.locator('.details')).toHaveCSS('font-style', 'italic');
});
