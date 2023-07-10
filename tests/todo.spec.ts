import { expect, test } from '@playwright/test';
import { createNewTodo, newTodoLabel } from './helpers/AddNewTodo';

test('Add todo', async ({ page }) => {
  await createNewTodo(page);
  await expect(page.getByText(newTodoLabel)).toBeVisible();
});

test('Complete todo', async ({ page }) => {
  await createNewTodo(page);
  await page.locator('.checkboxLabel').click();
  await expect(page.locator('.details')).toHaveCSS('font-style', 'italic');
});

test('Edit todo', async ({ page }) => {
  await createNewTodo(page);
  await page.getByLabel('Edit this todo').click();
  await page.locator('.textInput').fill('Edited the new todo');
  await page.locator('.textInput').press('Enter');
  await expect(page.getByText('Edited the new todo')).toBeVisible();
});

test('Delete todo', async ({ page }) => {
  await createNewTodo(page);
  await page.getByLabel('Delete this todo').click();
  await expect(page.getByText(newTodoLabel)).toBeHidden();
});
