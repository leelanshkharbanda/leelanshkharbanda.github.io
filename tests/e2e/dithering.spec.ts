import { expect, test } from '@playwright/test';
import sharp from 'sharp';

const meanChannelDifference = async (first: Buffer, second: Buffer) => {
  const [firstPixels, secondPixels] = await Promise.all([
    sharp(first).removeAlpha().raw().toBuffer(),
    sharp(second).removeAlpha().raw().toBuffer(),
  ]);
  if (firstPixels.length !== secondPixels.length) return 0;

  let difference = 0;
  for (let index = 0; index < firstPixels.length; index += 1) {
    difference += Math.abs(firstPixels[index] - secondPixels[index]);
  }
  return difference / firstPixels.length;
};

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

test('dither lens tracks pointer coordinates on project visuals', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.addStyleTag({
    content:
      '.project-card, .project-card__stage { transform: none !important; transition: none !important; }',
  });
  const visual = page.locator('#project-chronos-dsp .project-visual__root');
  await visual.scrollIntoViewIfNeeded();
  const bounds = await visual.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.move(bounds!.x + 120, bounds!.y + 100);
  await expect
    .poll(async () =>
      Number.parseFloat(
        await visual.evaluate((element) => element.style.getPropertyValue('--dither-lens-x')),
      ),
    )
    .toBeGreaterThan(0);
  const firstLensX = Number.parseFloat(
    await visual.evaluate((element) => element.style.getPropertyValue('--dither-lens-x')),
  );

  await page.mouse.move(bounds!.x + 220, bounds!.y + 100);
  await expect
    .poll(async () => {
      const lensX = Number.parseFloat(
        await visual.evaluate((element) => element.style.getPropertyValue('--dither-lens-x')),
      );
      return Math.abs(lensX - firstLensX - 100) < 2;
    })
    .toBe(true);
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

test('dither remains visible in the wide hero layout', async ({ page }) => {
  for (const width of [1101, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const hero = page.locator('.playground-hero');
    const withDither = await hero.screenshot();
    await page.addStyleTag({ content: '.dither-field { display: none !important; }' });
    const withoutDither = await hero.screenshot();

    expect(await meanChannelDifference(withDither, withoutDither), `${width}px`).toBeGreaterThan(1);
  }
});
