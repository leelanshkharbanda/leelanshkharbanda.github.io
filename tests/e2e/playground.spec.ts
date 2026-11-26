import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('playground opens with a personal project hook', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I make small systems');
  await expect(page.getByRole('link', { name: /Latest project/ })).toHaveAttribute(
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

test('visual scrollers stay keyboard accessible at 320px and 200% text', async ({ page }) => {
  const largeText = 'html { font-size: 200% !important; }';
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.addStyleTag({ content: largeText });
  const preview = page.locator('.project-visual__root').first();
  await expect(preview).toHaveAttribute('tabindex', '0');
  expect(await preview.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await preview.focus();
  await page.keyboard.press('ArrowRight');
  await expect(preview).toBeFocused();
  expect(await preview.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe('3px');
  expect(await preview.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('ArrowLeft');
  expect(await preview.evaluate((element) => element.scrollLeft)).toBe(0);

  await page.goto('/work/chronos-dsp/');
  await page.addStyleTag({ content: largeText });
  const trace = page.locator('.trace-inspector__figure');
  await expect(trace).toHaveAttribute('tabindex', '0');
  await expect(trace).toHaveAttribute('aria-label', 'Interactive signal path and constellation');
  expect(await trace.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await trace.focus();
  await page.keyboard.press('ArrowRight');
  await expect(trace).toBeFocused();
  expect(await trace.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe('3px');
  expect(await trace.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('ArrowLeft');
  expect(await trace.evaluate((element) => element.scrollLeft)).toBe(0);

  for (const route of ['/', '/work/', '/work/chronos-dsp/']) {
    await page.goto(route);
    await page.addStyleTag({ content: largeText });
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    );
    expect(
      serious.map((violation) => violation.id),
      route,
    ).toEqual([]);
  }
});

test('mobile project title precedes its schematic', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const title = await page.locator('#project-chronos-dsp h3').boundingBox();
  const stage = await page.locator('#project-chronos-dsp .project-card__stage').boundingBox();
  expect(title?.y).toBeLessThan(stage?.y ?? 0);
});

test('project cards keep diagram captions and evidence inside their bounds', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      for (const textScale of [100, 200]) {
        if (textScale === 200) {
          await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
        }
        const clipped = await page.locator('.project-card').evaluateAll((cards) =>
          cards.flatMap((card) => {
            const bounds = card.getBoundingClientRect();
            return [
              ...card.querySelectorAll('.project-visual__caption-text, .project-visual__evidence'),
            ]
              .filter((element) => {
                const rect = element.getBoundingClientRect();
                return rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1;
              })
              .map((element) => element.textContent?.trim());
          }),
        );
        expect(clipped, `${route} at ${width}px and ${textScale}% text`).toEqual([]);
      }
    }
  }
});

test('project diagram stages do not leave empty space below captions', async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const gaps = await page.locator('.project-visual__root').evaluateAll((figures) =>
        figures.map((figure) => {
          const caption = figure.querySelector('figcaption');
          const stage = figure.closest('.project-card__stage');
          if (!caption || !stage) return 0;
          return stage.getBoundingClientRect().bottom - caption.getBoundingClientRect().bottom;
        }),
      );
      expect(Math.max(...gaps), `${route} at ${width}px`).toBeLessThanOrEqual(32);
    }
  }
});

test('project preview notes do not cover diagram captions', async ({ page }) => {
  for (const width of [768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overlaps = await page.locator('.project-card').evaluateAll((cards) =>
        cards.flatMap((card) => {
          const note = card.querySelector('.project-card__preview-note');
          if (!note) return [];
          const noteRect = note.getBoundingClientRect();
          return [
            ...card.querySelectorAll('.project-visual__caption-text, .project-visual__evidence'),
          ]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              const width = Math.max(
                0,
                Math.min(noteRect.right, rect.right) - Math.max(noteRect.left, rect.left),
              );
              const height = Math.max(
                0,
                Math.min(noteRect.bottom, rect.bottom) - Math.max(noteRect.top, rect.top),
              );
              return width * height;
            })
            .filter((area) => area > 16);
        }),
      );
      expect(overlaps, `${route} at ${width}px`).toEqual([]);
    }
  }
});
