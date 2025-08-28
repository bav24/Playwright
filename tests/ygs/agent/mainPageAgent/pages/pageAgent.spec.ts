import test, { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../models/loginPageAgent';

let loginPage: LoginPage;

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  value?: string;
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'agent1' }),
    name: 'link profile',
  },
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
    value: 'Test test test',
  },
  {
    locator: (page: Page): Locator => page.getByText('Phone Number * :'),
    name: 'text Phone Number',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Phone Number' }),
    name: 'Phone Number input',
    value: '123456789',
  },
  {
    locator: (page: Page): Locator => page.getByText('State/Province * :'),
    name: 'text State/Province',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'State/Province' }),
    name: 'State/Province input',
    value: 'Test',
  },
  {
    locator: (page: Page): Locator => page.getByText('City * :'),
    name: 'text City',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'City' }),
    name: 'City input',
    value: 'Test',
  },
  {
    locator: (page: Page): Locator => page.getByText('ZIP/Postal Code * :'),
    name: 'text ZIP/Postal Code',
  },
  {
    locator: (page: Page): Locator => page.getByRole('textbox', { name: 'ZIP/Postal Code' }),
    name: 'ZIP/Postal Code input',
    value: '987654',
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
    value: '05.05.05',
  },
  //Revenue Settings
  {
    locator: (page: Page): Locator => page.getByText('Revenue Settings'),
    name: 'text Revenue Settings',
  },
  {
    locator: (page: Page): Locator => page.getByText("% from player's first deposit"),
    name: "text % from player's first deposit",
  },
  {
    locator: (page: Page): Locator => page.getByText('Revenue wallet :'),
    name: 'text Revenue wallet',
  },
  {
    locator: (page: Page): Locator =>
      page.getByText('% from Chinese Poker Revenue:', { exact: true }),
    name: 'text % from Chinese Poker Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('% from Rummy Revenue:', { exact: true }),
    name: 'text % from Rummy Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('% from Poker Revenue:', { exact: true }),
    name: 'text % from Poker Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('% from Casino Revenue:', { exact: true }),
    name: 'text % from Casino Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('Subagent % from Chinese Poker'),
    name: 'text Subagent % from Chinese Poker',
  },
  {
    locator: (page: Page): Locator => page.getByText('Subagent % from Rummy Revenue'),
    name: 'text Subagent % from Rummy Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('Subagent % from Poker Revenue'),
    name: 'text Subagent % from Poker Revenue',
  },
  {
    locator: (page: Page): Locator => page.getByText('Subagent % from Casino'),
    name: 'text Subagent % from Casino',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Save' }),
    name: 'Save button',
  },
];

test.describe('Тесты профиля агента', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.loginOnSite();
    await page.getByRole('link', { name: 'agent1' }).click();
  });

  test('Проверка элементов в профиле', async ({ page }) => {
    for (const { locator, name, value } of elements) {
      await test.step(`Проверка отображения элементов страницы профиля ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
        if (value && value != 'agent1') {
          await expect.soft(locator(page)).toBeEmpty({ timeout: 1_000 });
        }
      });
    }
  });

  test('Заполнение профиля агент', async ({ page }) => {
    for (const { locator, name, value } of elements) {
      if (value && value != 'agent1') {
        await test.step(`Заполнение поля ${name}`, async () => {
          await locator(page).click();
          await locator(page).fill(value);
        });
      }
    }
    await page.getByRole('button', { name: 'Save' }).click();
  });
  test('Проверка профиля агента', async ({ page }) => {});
});
