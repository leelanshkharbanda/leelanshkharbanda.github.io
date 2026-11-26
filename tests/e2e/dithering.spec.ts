import { expect, test } from '@playwright/test';

test('dither field renders and responds without covering project content', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');

  const canvas = page.locator('[data-dither-field]');
  await expect(canvas).toHaveAttribute('aria-hidden', 'true');
  await expect(canvas).toHaveAttribute('data-ready', 'true');
  await expect(canvas).toHaveAttribute('data-motion', 'animated');
  expect(await canvas.evaluate((element) => getComputedStyle(element).imageRendering)).toBe(
    'pixelated',
  );

  const card = page.locator('#project-chronos-dsp');
  await card.hover({ position: { x: 40, y: 40 } });
  await expect
    .poll(() => card.evaluate((element) => element.style.getPropertyValue('--dither-x')))
    .not.toBe('');
  const visual = card.locator('.project-visual__root');
  await expect
    .poll(() => visual.evaluate((element) => element.style.getPropertyValue('--dither-lens-x')))
    .not.toBe('');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test('reduced motion keeps the dither field static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const canvas = page.locator('[data-dither-field]');
  await expect(canvas).toHaveAttribute('data-ready', 'true');
  await expect(canvas).toHaveAttribute('data-motion', 'static');
  await page.mouse.move(200, 200);
  await page.mouse.move(900, 500);
  await expect(canvas).toHaveAttribute('data-motion', 'static');
});

test('runtime save-data stops the dither loop', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: { saveData: false },
    });
  });
  await page.goto('/');

  const canvas = page.locator('[data-dither-field]');
  await expect(canvas).toHaveAttribute('data-motion', 'animated');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'connection', {
      configurable: true,
      value: { saveData: true },
    });
  });
  await expect(canvas).toHaveAttribute('data-motion', 'static');
});
