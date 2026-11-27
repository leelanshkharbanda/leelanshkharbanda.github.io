import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('diagram inspector preserves geometry, focus, zoom, and cleanup', async ({ page }) => {
  await page.goto('/work/chronos-dsp/');
  const trigger = page.getByRole('button', { name: /Inspect/ }).first();
  await trigger.scrollIntoViewIfNeeded();
  await expect(trigger).toBeVisible();
  await trigger.click();

  const dialog = page.locator('#diagram-inspector');
  const canvas = page.locator('[data-diagram-inspector-canvas]');
  const svg = page.locator('.diagram-inspector__svg');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: /Close/ })).toBeFocused();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await expect(svg).toHaveCount(1);
  await expect(page.locator('.case-body > .project-visual__root svg')).toHaveCount(1);
  await expect(page.locator('#diagram-inspector-title')).toHaveText('Chronos-DSP');
  await expect(page.locator('#diagram-inspector-caption')).toContainText(
    'Solo · Scene geometry to multipath rays and QPSK IQ/BER.',
  );

  const duplicateIds = await page.locator('[id]').evaluateAll((elements) => {
    const ids = elements.map((element) => element.id);
    return ids.length - new Set(ids).size;
  });
  expect(duplicateIds).toBe(0);
  const localReferences = await svg.evaluate((element) => {
    const references = [
      ...(element.getAttribute('aria-labelledby')?.split(/\s+/) ?? []),
      ...(element.getAttribute('aria-describedby')?.split(/\s+/) ?? []),
    ];
    return references.every((id) => element.querySelector(`#${CSS.escape(id)}`));
  });
  expect(localReferences).toBe(true);

  const initialWidth = await svg.evaluate((element) => element.getBoundingClientRect().width);
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.locator('[data-diagram-zoom-output]')).toHaveText('125%');
  expect(await svg.evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThan(
    initialWidth,
  );

  await page.getByRole('button', { name: 'Fit' }).click();
  const fitDimensions = await canvas.evaluate((element) => ({
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
  }));
  expect(fitDimensions.scrollWidth).toBeLessThanOrEqual(fitDimensions.clientWidth + 1);
  expect(fitDimensions.scrollHeight).toBeLessThanOrEqual(fitDimensions.clientHeight + 1);
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await canvas.focus();
  await page.keyboard.press('ArrowRight');
  expect(await canvas.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('ArrowDown');
  expect(await canvas.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowUp');

  const accessibility = await new AxeBuilder({ page }).include('#diagram-inspector').analyze();
  expect(
    accessibility.violations
      .filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))
      .map((violation) => violation.id),
  ).toEqual([]);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(svg).toHaveCount(0);
});

test('diagram inspector clamps zoom and keeps focus inside the dialog', async ({ page }) => {
  await page.goto('/work/chronos-dsp/');
  await page.getByRole('button', { name: /Inspect/ }).click();
  const dialog = page.locator('#diagram-inspector');
  for (let step = 0; step < 6; step += 1) {
    await page.getByRole('button', { name: 'Zoom in' }).click();
  }
  await expect(page.locator('[data-diagram-zoom-output]')).toHaveText('250%');
  await expect(page.getByRole('button', { name: 'Zoom in' })).toBeDisabled();
  for (let step = 0; step < 10; step += 1) {
    await page.getByRole('button', { name: 'Zoom out' }).click();
  }
  await expect(page.locator('[data-diagram-zoom-output]')).toHaveText('10%');
  await expect(page.getByRole('button', { name: 'Zoom out' })).toBeDisabled();
  for (let step = 0; step < 8; step += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await page.getByRole('button', { name: /Close/ }).click();
});

test('diagram inspector retains credit and fits long titles at 200% mobile text', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const slug of ['life-os', 'moe-memory-wall', 'riscv-simulator']) {
    await page.goto(`/work/${slug}/`);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const expectedTitle = (await page.locator('.case-hero h1').textContent())!
      .split(':')[0]!
      .trim();
    const trigger = page.getByRole('button', { name: /Inspect/ });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(page.locator('#diagram-inspector-title')).toHaveText(expectedTitle!.trim());
    if (slug === 'life-os') {
      await expect(page.locator('#diagram-inspector-caption')).toContainText(
        'Team project · 3 people',
      );
    }

    const dialog = page.locator('#diagram-inspector');
    const canvas = page.locator('[data-diagram-inspector-canvas]');
    expect((await canvas.boundingBox())?.height).toBeGreaterThanOrEqual(120);
    for (const name of ['Close', 'Zoom out', 'Zoom in', 'Fit']) {
      const control = page.getByRole('button', { name });
      const box = await control.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(720);
    }
    await page.getByRole('button', { name: 'Fit' }).click();
    const dimensions = await canvas.evaluate((element) => ({
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.clientHeight + 1);
    expect(
      await dialog.evaluate((element) => element.scrollHeight <= element.clientHeight + 1),
    ).toBe(true);

    const accessibility = await new AxeBuilder({ page }).include('#diagram-inspector').analyze();
    expect(accessibility.violations.map((violation) => violation.id)).toEqual([]);
    await page.getByRole('button', { name: 'Close' }).click();
  }
});

test('diagram inspector works from home and work previews', async ({ page }) => {
  for (const route of ['/', '/work/']) {
    await page.goto(route);
    const trigger = page.getByRole('button', { name: /Inspect/ }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(page.locator('#diagram-inspector')).toBeVisible();
    await expect(page.locator('.diagram-inspector__svg')).toHaveCount(1);
    await expect(page.locator('#diagram-inspector-title')).not.toBeEmpty();
    await page.getByRole('button', { name: /Close/ }).click();
    await expect(page.locator('#diagram-inspector')).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test('diagram inspector opens and closes with touch input', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('/work/modulation-studio/');
  const trigger = page.getByRole('button', { name: /Inspect/ });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.tap();
  await expect(page.locator('#diagram-inspector')).toBeVisible();
  await page.getByRole('button', { name: 'Zoom in' }).tap();
  await expect(page.locator('[data-diagram-zoom-output]')).toHaveText('125%');
  await page.getByRole('button', { name: 'Fit' }).tap();
  const dimensions = await page.locator('[data-diagram-inspector-canvas]').evaluate((element) => ({
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.clientHeight + 1);
  const accessibility = await new AxeBuilder({ page }).include('#diagram-inspector').analyze();
  expect(accessibility.violations.map((violation) => violation.id)).toEqual([]);
  await page.getByRole('button', { name: /Close/ }).tap();
  await expect(page.locator('#diagram-inspector')).toBeHidden();
  await expect(trigger).toBeFocused();
  await context.close();
});

test('touch panning moves the enlarged diagram viewport', async ({ browser, browserName }) => {
  test.skip(browserName !== 'chromium', 'Touch panning uses Chromium CDP input events.');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('/work/chronos-dsp/');
  await page.getByRole('button', { name: /Inspect/ }).tap();
  const canvas = page.locator('[data-diagram-inspector-canvas]');
  const box = await canvas.boundingBox();
  expect(box).not.toBeNull();
  const client = await context.newCDPSession(page);
  const x = box!.x + box!.width * 0.75;
  const y = box!.y + box!.height / 2;
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ id: 1, x, y }],
  });
  for (let step = 1; step <= 6; step += 1) {
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ id: 1, x: x - step * 20, y }],
    });
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  expect(await canvas.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await context.close();
});

test('diagram inspector stays optional without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/work/chronos-dsp/');
  await expect(page.locator('.case-body > .project-visual__root svg')).toBeVisible();
  await expect(page.getByRole('button', { name: /Inspect/ })).toBeHidden();
  await expect(page.locator('#diagram-inspector')).toBeHidden();
  await context.close();
});

test('diagram stages and plots respond to hover without layout shifts', async ({ page }) => {
  await page.goto('/work/modulation-studio/');
  const plot = page.locator('.project-visual__plot').first();
  const frame = plot.locator('.project-visual__plot-frame');
  const point = plot.locator('.project-visual__point').first();
  const frameStroke = await frame.evaluate((element) => getComputedStyle(element).stroke);
  await plot.hover();
  await expect
    .poll(() => frame.evaluate((element) => getComputedStyle(element).stroke))
    .not.toBe(frameStroke);
  await expect(point).toHaveCSS('opacity', '1');

  await page.goto('/work/chronos-dsp/');
  const stage = page.locator('.project-visual__stage').first();
  const stageBox = stage.locator('.project-visual__stage-box');
  const before = await stageBox.boundingBox();
  const fill = await stageBox.evaluate((element) => getComputedStyle(element).fill);
  await stage.hover();
  await expect
    .poll(() => stageBox.evaluate((element) => getComputedStyle(element).fill))
    .not.toBe(fill);
  const after = await stageBox.boundingBox();
  expect(after?.width).toBeCloseTo(before!.width, 1);
  expect(after?.height).toBeCloseTo(before!.height, 1);
});

test('diagram inspector respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/chronos-dsp/');
  const trigger = page.getByRole('button', { name: /Inspect/ });
  await trigger.scrollIntoViewIfNeeded();
  expect(
    Number.parseFloat(
      await trigger.evaluate((element) => getComputedStyle(element).transitionDuration),
    ),
  ).toBeLessThanOrEqual(0.001);
  await trigger.click();
  await expect(page.locator('#diagram-inspector')).toHaveCSS('animation-name', 'none');
  await page.getByRole('button', { name: /Close/ }).click();

  await page.goto('/work/modulation-studio/');
  const plot = page.locator('.project-visual__plot').first();
  const frame = plot.locator('.project-visual__plot-frame');
  const stroke = await frame.evaluate((element) => getComputedStyle(element).stroke);
  await plot.hover();
  await expect
    .poll(() => frame.evaluate((element) => getComputedStyle(element).stroke))
    .not.toBe(stroke);
});
