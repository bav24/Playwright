import test, { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  step?: number;
  option?: string;
  value?: string;
}

let loginPage: LoginPage;

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Add Wallet' }),
    name: 'button Add wallet',
    step: 1,
  },
  {
    locator: (page: Page): Locator => page.getByText('EUR (Euro)'),
    name: 'EUR (Euro)',
    step: 1,
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('columnheader', { name: 'U.S. Dollars' }).locator('div').first(),
    name: 'table column U.S. Dollars',
    step: 1.1,
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('columnheader', { name: 'Euro' }).locator('div').first(),
    name: 'table column EUR',
    step: 1.1,
  },
  {
    locator: (page: Page): Locator => page.getByRole('grid').getByText('$1,000'),
    name: 'balance USD',
    step: 1.1,
  },
  {
    locator: (page: Page): Locator => page.getByText('Currency Exchange'),
    name: 'link Currency Exchange',
  },
];

test.describe.configure({ mode: 'default' });
test.describe('Обмен валюты', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.loginOnSite();
  });

  test('Добавление новой валюты - EUR', async ({ page }) => {
    for (const { locator, name, step } of elements) {
      if (step === 1) {
        await test.step(`Нажатие ${name}`, async () => {
          await expect.soft(locator(page)).toBeVisible();
          await locator(page).click();
        });
      }
    }
  });

  test('Проверка добавления валюты', async ({ page }) => {
    for (const { locator, name, step } of elements) {
      if (step === 1.1) {
        await test.step(`Проверка элементов после добавления валюты ${name}`, async () => {
          await expect.soft(locator(page)).toBeVisible();
        });
      }
    }
  });
  test('Обмен валюты', async ({ page }) => {
    for (const { locator, name, step } of elements) {
      //if (step === 2) {
      await page.getByRole('cell', { name: 'Currency Exchange' }).locator('div').click();
      await page
        .getByRole('cell', { name: 'USD (U.S. Dollars)', exact: true })
        .getByRole('combobox')
        .selectOption('EUR (Euro)');
      // }
    }
  });
});
