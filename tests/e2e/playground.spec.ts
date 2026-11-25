import { expect, test } from '@playwright/test';

test('playground opens with a personal project hook', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I make small systems');
  await expect(page.getByRole('link', { name: /Current experiment/ })).toHaveAttribute(
    'href',
    '/work/chronos-dsp/',
  );
  await expect(page.locator('.playground-comparison a')).toHaveCount(3);
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

test('touch drag keeps the toy, range, and reset in sync', async ({ browser, browserName }) => {
  test.skip(browserName !== 'chromium', 'Touch drag uses Chromium CDP input events.');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('/');
  const handle = page.getByRole('slider', { name: 'Transmitter horizontal position' });
  await handle.scrollIntoViewIfNeeded();
  const box = await handle.boundingBox();
  expect(box).not.toBeNull();
  const client = await context.newCDPSession(page);
  const x = box!.x + box!.width / 2;
  const y = box!.y + box!.height / 2;
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ id: 1, x, y }],
  });
  for (let step = 1; step <= 6; step += 1) {
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ id: 1, x: x + step * 10, y }],
    });
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const moved = Number(await handle.getAttribute('aria-valuenow'));
  expect(moved).toBeGreaterThan(104);
  await expect(page.locator('[data-toy-range="transmitter"]')).toHaveValue(String(moved));
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(handle).toHaveAttribute('aria-valuenow', '104');
  await context.close();
});

test('mobile project title precedes its schematic', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const title = await page.locator('#project-chronos-dsp h3').boundingBox();
  const stage = await page.locator('#project-chronos-dsp .project-card__stage').boundingBox();
  expect(title?.y).toBeLessThan(stage?.y ?? 0);
});
