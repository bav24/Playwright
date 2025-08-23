import { test, expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('тeсты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названий элементов навигации хедера', async ({ page }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    await mainPage.checkElementshrefAttributet();
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    await test.step('Нажатие на иконку переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка смены значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей со светлой темой`, async ({ page }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async ({ page }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной темной темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
