import test, { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';

let loginPage: LoginPage;

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

test.describe('Тесты профиля агента', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.loginOnSite();
  });

  test('Проверка элементов в профиле', async ({ page }) => {
    await page.getByRole('link', { name: 'agent1' }).click();
    //Login information

    await expect(page.getByText('Username :')).toBeVisible();
    await expect(
      page.getByRole('gridcell', { name: 'agent1', exact: true }).getByRole('textbox'),
    ).toHaveValue('agent1');
    await expect(page.getByText('Email Address :')).toBeVisible();
    //await expect(page.getByRole('textbox', { name: 'Email Address' })).toHaveValue('agent1@cgames.team',);
    await expect(page.getByRole('button', { name: 'Change Password...' })).toBeVisible();
    // Personal information

    await expect(page.getByText('Personal Information')).toBeVisible();
    await expect(page.getByText('First Name * :')).toBeVisible();
    await expect(page.getByText('Last Name * :')).toBeVisible();

    await expect(page.getByText('Address * :')).toBeVisible();
    await expect(page.getByText('Phone Number * :')).toBeVisible();
    await expect(page.getByText('State/Province * :')).toBeVisible();
    await expect(page.getByText('City * :')).toBeVisible();
    await expect(page.getByText('ZIP/Postal Code * :')).toBeVisible();
    await expect(page.getByText('Country * :')).toBeVisible();
    await expect(page.getByText('Birthday * :')).toBeVisible();
    //Revenue Settings
    await expect(page.getByText('Revenue Settings')).toBeVisible();

    await expect(page.getByText("% from player's first deposit")).toBeVisible();
    await expect(page.getByText('Revenue wallet :')).toBeVisible();
    await expect(page.getByText('% from Chinese Poker Revenue:', { exact: true })).toBeVisible();
    await expect(page.getByText('% from Rummy Revenue:', { exact: true })).toBeVisible();
    await expect(page.getByText('% from Poker Revenue:', { exact: true })).toBeVisible();
    await expect(page.getByText('% from Casino Revenue:', { exact: true })).toBeVisible();
    await expect(page.getByText('Subagent % from Chinese Poker')).toBeVisible();
    await expect(page.getByText('Subagent % from Rummy Revenue')).toBeVisible();
    await expect(page.getByText('Subagent % from Poker Revenue')).toBeVisible();
    await expect(page.getByText('Subagent % from Casino')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  });
});
