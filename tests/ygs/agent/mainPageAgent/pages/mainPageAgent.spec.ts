import { test, expect, Locator } from '@playwright/test';

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ygs-66-d2.demoenv.dev/agent/#LOGIN');
  });

  test('Проверка отображения элементов главной страницы', async ({ page }) => {
    await expect.soft(page.getByRole('combobox')).toBeVisible();
    await page.getByRole('combobox').selectOption('English');

    await expect.soft(page.getByRole('link', { name: 'Your Gaming System' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Overview' })).toBeVisible();
    await expect.soft(page.locator('a').filter({ hasText: 'Login' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Register' })).toBeVisible();
    await expect
      .soft(
        page.getByText(
          'Please enter your login name and password below. If you do not have an account with Your Gaming System click here',
        ),
      )
      .toBeVisible();
  });
});
