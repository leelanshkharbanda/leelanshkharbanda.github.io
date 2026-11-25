import { expect, test } from '@playwright/test';

test('playground opens with a personal project hook', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I make small systems');
  await expect(page.getByRole('link', { name: /Current experiment/ })).toHaveAttribute(
    'href',
    '/work/chronos-dsp/',
  );
});

test('project experiments reveal project-specific insight', async ({ page }) => {
  await page.goto('/');
  const experiment = page.locator('#project-chronos-dsp .project-card__experiment');
  await experiment.locator('summary').click();
  await expect(experiment).toContainText('direct and reflected paths');
});

test('signal toy supports keyboard movement and reversible motion', async ({ page }) => {
  await page.goto('/');
  const transmitter = page.getByRole('slider', { name: 'Transmitter horizontal position' });
  await transmitter.focus();
  await page.keyboard.press('ArrowRight');
  await expect(transmitter).toHaveAttribute('aria-valuenow', '114');

  const toggle = page.getByRole('button', { name: 'Reduce motion' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Enable motion' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Enable motion' }).click();
  await expect(page.getByRole('button', { name: 'Reduce motion' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});

test('mobile project title precedes its schematic', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const title = await page.locator('#project-chronos-dsp h3').boundingBox();
  const stage = await page.locator('#project-chronos-dsp .project-card__stage').boundingBox();
  expect(title?.y).toBeLessThan(stage?.y ?? 0);
});
