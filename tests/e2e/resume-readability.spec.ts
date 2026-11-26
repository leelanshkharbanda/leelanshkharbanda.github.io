import { expect, test } from '@playwright/test';
import sharp from 'sharp';

const meanChannelDifference = async (first: Buffer, second: Buffer) => {
  const [firstPixels, secondPixels] = await Promise.all([
    sharp(first).removeAlpha().raw().toBuffer(),
    sharp(second).removeAlpha().raw().toBuffer(),
  ]);
  if (firstPixels.length !== secondPixels.length) return Number.POSITIVE_INFINITY;

  let difference = 0;
  for (let index = 0; index < firstPixels.length; index += 1) {
    difference += Math.abs(firstPixels[index] - secondPixels[index]);
  }
  return difference / firstPixels.length;
};

const proseSurfaces = [
  { route: '/', selector: '.work-section' },
  { route: '/work/', selector: '.work-section' },
  { route: '/about/', selector: '.about-story' },
  { route: '/resume/', selector: '.resume-page' },
  ...[
    'chronos-dsp',
    'life-os',
    'modulation-studio',
    'hpc-boost',
    'moe-memory-wall',
    'riscv-simulator',
    'university-erp',
    'tasveer',
  ].map((slug) => ({ route: `/work/${slug}/`, selector: '.case-body' })),
];

test('prose surfaces use a stable paper background', async ({ page }) => {
  for (const surface of proseSurfaces) {
    await page.goto(surface.route);
    await expect(page.locator(surface.selector)).toHaveCSS(
      'background-color',
      'rgb(246, 242, 231)',
    );
  }
});

test('print media removes dither paper surfaces', async ({ page }) => {
  await page.emulateMedia({ media: 'print' });
  await page.goto('/resume/');
  await expect(page.locator('.resume-page')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('.resume-page')).toHaveCSS('box-shadow', 'none');
  expect(
    await page
      .locator('.resume-page')
      .evaluate((element) => getComputedStyle(element, '::before').display),
  ).toBe('none');
});

test('résumé text stays readable with the dither field visible', async ({ page }) => {
  await page.goto('/resume/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('[data-dither-field]')).toHaveAttribute('data-ready', 'true');

  const resume = page.locator('.resume-page');
  const withDither = await resume.screenshot();
  await page.addStyleTag({ content: '.dither-field { display: none !important; }' });
  const withoutDither = await resume.screenshot();

  expect(await meanChannelDifference(withDither, withoutDither)).toBeLessThan(0.1);
});
