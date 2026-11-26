import { expect, test } from '@playwright/test';

test('work index tracks the current project and supports arrow keys', async ({ page }) => {
  await page.goto('/work/');
  const nav = page.locator('[data-project-jump]');
  const links = nav.locator('a');
  await expect(links).toHaveCount(8);

  await links.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(links.nth(1)).toBeFocused();
  await page.keyboard.press('End');
  await expect(links.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(links.first()).toBeFocused();

  await links.nth(1).click();
  await expect(page).toHaveURL(/#project-life-os$/);
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'true');

  await page.locator('#project-hpc-boost').evaluate((element) => {
    element.scrollIntoView({ block: 'center' });
  });
  await expect(nav.locator('a[href="#project-hpc-boost"]')).toHaveAttribute('aria-current', 'true');

  await page.locator('#project-modulation-studio').evaluate((element) => {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2,
      behavior: 'instant',
    });
  });
  await expect(nav.locator('a[href="#project-modulation-studio"]')).toHaveAttribute(
    'aria-current',
    'true',
  );
});
