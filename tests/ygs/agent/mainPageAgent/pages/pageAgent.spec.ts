import test, { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';

let loginPage: LoginPage;

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  value?: string;
  attribute?: {
    type: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByText('Username :'),
    name: 'Text Username',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('gridcell', { name: 'agent1', exact: true }).getByRole('textbox'),
    name: 'Username Input',
    value: 'agent1',
  },
  {
    locator: (page: Page): Locator => page.getByText('Email Address :'),
    name: 'Text Email',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Email' }),
    name: 'Email Input',
    value: 'test@test.fake1',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Change Password...' }),
    name: 'Change Password',
  },
  //Personal Information
  {
    locator: (page: Page): Locator => page.getByText('Personal Information'),
    name: 'Text Personal Information',
  },
  {
    locator: (page: Page): Locator => page.getByText('First Name * :'),
    name: 'Text First Name',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'First Name' }),
    name: 'First Name input',
    value: 'Test',
  },
  {
    locator: (page: Page): Locator => page.getByText('Last Name * :'),
    name: 'Text Last Name',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Last Name' }),
    name: 'Last Name input',
    value: 'Tester',
  },
  {
    locator: (page: Page): Locator => page.getByText('Address * :'),
    name: 'text Address',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Address', exact: true }),
    name: 'Address input',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('Phone Number * :'),
    name: 'text Phone Number',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Phone Number' }),
    name: 'Phone Number input',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('State/Province * :'),
    name: 'text State/Province',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'State/Province' }),
    name: 'State/Province input',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('City * :'),
    name: 'text City',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'City' }),
    name: 'City input',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('ZIP/Postal Code * :'),
    name: 'text ZIP/Postal Code',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'ZIP/Postal Code' }),
    name: 'ZIP/Postal Code input',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('Country * :'),
    name: 'text Country',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('gridcell', { name: '[N/A]' }).getByRole('combobox'),
    name: 'Country combobox',
    value: '',
  },
  {
    locator: (page: Page): Locator => page.getByText('Birthday * :'),
    name: 'text Birthday',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Birthday' }),
    name: 'Birthday input',
    value: '',
  },
];

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
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
    await expect(page.getByRole('button', { name: 'Change Password...' })).toBeVisible();
    // Personal information

    await expect(page.getByText('Personal Information')).toBeVisible();
    await expect(page.getByText('First Name * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeEmpty();

    await expect(page.getByText('Last Name * :')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeEmpty();

    await expect(page.getByText('Address * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Address', exact: true })).toBeEmpty();
    await expect(page.getByText('Phone Number * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Phone Number' })).toBeEmpty();
    await expect(page.getByText('State/Province * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'State/Province' })).toBeEmpty();
    await expect(page.getByText('City * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'City' })).toBeEmpty();
    await expect(page.getByText('ZIP/Postal Code * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'ZIP/Postal Code' })).toBeEmpty();
    await expect(page.getByText('Country * :')).toBeVisible();

    await expect(page.getByRole('gridcell', { name: '[N/A]' }).getByRole('combobox')).toHaveValue(
      '[N/A]',
    );
    await expect(page.getByText('Birthday * :')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Birthday' })).toBeEmpty();
    //Revenue Settings
    await expect(page.getByText('Revenue Settings')).toBeVisible();

    await expect(page.getByText("% from player's first deposit")).toBeVisible();

    await expect(
      page.getByRole('gridcell', { name: '0.00', exact: true }).getByRole('textbox'),
    ).toHaveValue('0.00');
    await expect(page.getByText('Revenue wallet :')).toBeVisible();

    await expect(
      page.getByRole('gridcell', { name: 'USD (U.S. Dollars)' }).getByRole('textbox'),
    ).toHaveValue('USD (U.S. Dollars)');
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
