import test, { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';
import { PageAgent } from '../models/pageAgetn';

let loginPage: LoginPage;
let pageAgent: PageAgent;

test.describe.configure({ mode: 'default' });
test.describe('Тесты профиля агента', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pageAgent = new PageAgent(page);
    await loginPage.openLoginPage();
    await loginPage.loginOnSite();
    await pageAgent.followLink();
  });

  test('Проверка элементов в профиле', async ({ page }) => {
    await pageAgent.checkElementsAgentPage();
  });

  test('Заполнение профиля агент', async ({ page }) => {
    await pageAgent.fillingAgentProfile();
  });

  test('Проверка профиля агента', async ({ page }) => {
    await pageAgent.checkProfileAgent();
  });
});
