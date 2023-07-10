import type { Page } from '@playwright/test/types/test';

export const newTodoLabel = 'My new todo';

export async function createNewTodo(page: Page, label = newTodoLabel) {
  await page.goto('/');
  await page.getByLabel('Add a new task').fill(label);
  await page.getByRole('button').click();
}
