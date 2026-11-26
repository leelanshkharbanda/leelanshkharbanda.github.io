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

  await nav.locator('a[href="#project-modulation-studio"]').click();
  await expect(page).toHaveURL(/#project-modulation-studio$/);
  await expect(nav.locator('a[href="#project-modulation-studio"]')).toHaveAttribute(
    'aria-current',
    'true',
  );
});

test('work jump indicator is shaped, keyboard-visible, and motion-safe', async ({ page }) => {
  await page.goto('/work/');
  const nav = page.locator('[data-project-jump]');
  const links = nav.locator('a');
  const indicator = (index: number) =>
    links.nth(index).evaluate((element) => {
      const style = getComputedStyle(element, '::after');
      return {
        opacity: style.opacity,
        width: Number.parseFloat(style.width),
        height: Number.parseFloat(style.height),
        radius: style.borderRadius,
        background: style.backgroundColor,
        durations: style.transitionDuration.split(',').map((value) => Number.parseFloat(value)),
      };
    });

  expect((await indicator(0)).opacity).toBe('0');
  const restingWidth = await links
    .nth(1)
    .evaluate((element) => element.getBoundingClientRect().width);
  await links.nth(1).hover();
  await expect(links.nth(1)).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await links.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'true');
  await expect.poll(async () => (await indicator(1)).opacity).toBe('1');
  expect(
    await links.nth(1).evaluate((element) => element.getBoundingClientRect().width),
  ).toBeCloseTo(restingWidth, 1);
  expect((await indicator(1)).width).toBeGreaterThan(0);
  expect((await indicator(1)).height).toBeCloseTo((await indicator(1)).width, 1);
  expect((await indicator(1)).radius).toBe('50%');
  expect((await indicator(1)).background).toBe('rgb(29, 30, 25)');
  await expect(links.nth(1)).toHaveCSS('background-color', 'rgb(255, 220, 99)');

  await page.keyboard.press('ArrowRight');
  await expect(links.nth(2)).toHaveAttribute('aria-current', 'true');
  await expect.poll(async () => (await indicator(1)).opacity).toBe('0');
  await expect.poll(async () => (await indicator(2)).opacity).toBe('1');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect((await indicator(2)).durations.every((duration) => duration <= 0.001)).toBe(true);
  const linkDurations = await links.nth(2).evaluate((element) =>
    getComputedStyle(element)
      .transitionDuration.split(',')
      .map((value) => Number.parseFloat(value)),
  );
  expect(linkDurations.every((duration) => duration <= 0.001)).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  const bounds = await nav.evaluate((element) => {
    const navRect = element.getBoundingClientRect();
    return {
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      outside: [...element.querySelectorAll('a')].filter((link) => {
        const rect = link.getBoundingClientRect();
        return rect.left < navRect.left - 1 || rect.right > navRect.right + 1;
      }).length,
    };
  });
  expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.clientWidth + 1);
  expect(bounds.outside).toBe(0);
});
