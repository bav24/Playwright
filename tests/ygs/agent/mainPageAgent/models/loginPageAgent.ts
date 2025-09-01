import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  option?: string;
  value?: string;
}

export class LoginPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator => page.getByRole('combobox'),
        option: 'English',
        name: 'combobox',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Your Gaming System' }),
        name: 'Your Gaming System',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Overview' }),
        name: 'Overview',
      },
      {
        locator: (page: Page): Locator => page.locator('a').filter({ hasText: 'Login' }),
        name: 'Login',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Register' }),
        name: 'Register',
      },
      {
        locator: (page: Page): Locator =>
          page.getByText(
            'Please enter your login name and password below. If you do not have an account with Your Gaming System click here',
          ),
        name: 'Login block',
      },
      {
        locator: (page: Page): Locator => page.getByText('Username:'),
        name: 'Text Username',
      },
      {
        locator: (page: Page): Locator => page.getByText('Password:'),
        name: 'Text Password',
      },
      {
        locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Username' }),
        name: 'Input Username',
        value: 'agent1',
      },
      {
        locator: (page: Page): Locator => page.getByRole('textbox', { name: 'Password' }),
        name: 'Input Password',
        value: 'test',
      },
      {
        locator: (page: Page): Locator => page.getByRole('checkbox', { name: 'Remember username' }),
        name: 'Checkbox Remember username',
      },
      {
        locator: (page: Page): Locator => page.getByText('Remember username'),
        name: 'Text Remember username',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Forgot password?' }),
        name: 'Forgot password?',
      },
      {
        locator: (page: Page): Locator =>
          page
            .getByRole('cell', { name: 'Forgot password? Login', exact: true })
            .getByRole('button'),
        name: 'Login button',
      },
    ];
  }

  async openLoginPage() {
    await this.page.goto('https://ygs-66-test.t2.cgames.dev/agent/#LOGIN');
    await this.page.getByRole('combobox').selectOption('English');
  }

  async checkElementsLoginPage() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async loginOnSite() {
    for (const { locator, name, value } of this.elements) {
      if (value) {
        await test.step(`Заполнение поля ${name}`, async () => {
          await locator(this.page).click();
          await locator(this.page).fill(value);
        });
      }
      if (name == 'Text Remember username') {
        await test.step(`Выставление чекбокса Remember username`, async () => {
          await locator(this.page).click();
        });
      }
      if (name == 'Login button') {
        await test.step(`Нажатие кнопки логин`, async () => {
          await locator(this.page).click();
        });
      }
    }
    await expect.soft(this.page.getByRole('button', { name: 'Logout' })).toBeVisible();
  }

  async logoutSite() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async checkUsernameField() {
    await expect.soft(this.page.getByRole('textbox', { name: 'Username' })).toHaveValue('agent1');
  }
}
