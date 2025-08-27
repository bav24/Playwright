import { test, expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';

let loginPage: LoginPage;

test.describe('Тесты страницы логина', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
  });

  test('Проверка отображения элементов страницы логина', async ({ page }) => {
    await loginPage.checkElementsLoginPage();
  });

  test('Логин на агентский сайт', async ({ page }) => {
    await loginPage.loginOnSite();
  });

  test('Проверка работы чекбокса "Remember username"', async ({ page }) => {
    await loginPage.loginOnSite();
    await test.step('Логаут со страницы', async () => {
      await loginPage.logoutSite();
    });
    await test.step('Проверка сохранения Username в поле', async () => {
      await loginPage.checkUsernameField();
    });
  });
});
