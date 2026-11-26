import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('playground opens with a personal project hook', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Leelansh');
  await expect(page.getByRole('link', { name: /Latest project/ })).toHaveAttribute(
    'href',
    '/work/chronos-dsp/',
  );
  await expect(page.locator('.playground-comparison a')).toHaveCount(3);
});

test('primary pill settles into its shadow and presses flat', async ({ page }) => {
  await page.goto('/');
  const button = page.locator('.button--primary[data-magnetic]');
  const press = () =>
    button.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--button-press').trim(),
    );
  const translation = () =>
    button.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      return matrix.e;
    });

  await expect.poll(press).toBe('0px');
  await button.hover();
  await expect.poll(press).toBe('2px');
  await expect(button).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  expect(await button.evaluate((element) => getComputedStyle(element).boxShadow)).toContain(
    '2px 2px 0px',
  );

  const bounds = await button.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.move(bounds!.x + bounds!.width - 10, bounds!.y + bounds!.height / 2);
  await expect.poll(translation).toBeGreaterThan(8);
  await page.mouse.down();
  await expect.poll(press).toBe('4px');
  await expect.poll(translation).toBeGreaterThan(10);
  await expect(button).toHaveCSS('box-shadow', 'none');
  await expect(button).toHaveCSS('transition-duration', '0.07s');
  await page.mouse.up();
  await expect.poll(press).toBe('2px');

  await button.evaluate((element) => element.blur());
  await page.mouse.move(0, 0);
  await expect.poll(press).toBe('0px');

  await page.reload();
  await page.keyboard.press('Tab');
  await button.focus();
  await expect(button).toBeFocused();
  await expect.poll(press).toBe('2px');
  await expect(button).toHaveCSS('outline-style', 'solid');
  await expect(button).toHaveCSS('outline-width', '3px');
  await expect(button).toHaveCSS('outline-offset', '4px');
});

test('reduced motion keeps the primary pill detent static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const button = page.locator('.button--primary[data-magnetic]');
  await button.hover();
  await expect(button).toHaveCSS('transform', 'none');
  await expect(button).toHaveCSS('transition-duration', '0s');

  await page.keyboard.press('Tab');
  await button.focus();
  await expect(button).toHaveCSS('outline-width', '3px');
  await expect(button).toHaveCSS('transform', 'none');
  await page.mouse.down();
  await expect(button).toHaveCSS('transform', 'none');
  await expect(button).toHaveCSS('transition-duration', '0s');
  await page.mouse.up();
});

test('signal toy supports keyboard movement and reversible motion', async ({ page }) => {
  await page.goto('/');
  const transmitter = page.getByRole('slider', { name: 'Transmitter horizontal position' });
  await transmitter.focus();
  await page.keyboard.press('ArrowRight');
  await expect(transmitter).toHaveAttribute('aria-valuenow', '114');

  const toggle = page.getByRole('button', { name: 'Reduce motion' });
  await toggle.click();
  const enableMotion = page.getByRole('button', { name: 'Enable motion' });
  await expect(enableMotion).toBeVisible();
  await expect(enableMotion).not.toHaveAttribute('aria-pressed');
  await enableMotion.click();
  await expect(toggle).toBeVisible();
  await expect(toggle).not.toHaveAttribute('aria-pressed');
});

test('signal toy readouts tick after input and respect reduced motion', async ({ page }) => {
  await page.goto('/');
  const direct = page.locator('[data-toy-direct]');
  const echo = page.locator('[data-toy-echo]');
  const transmitter = page.getByRole('slider', { name: 'Transmitter horizontal position' });
  const activeTicks = () =>
    direct.evaluate(
      (element) =>
        element
          .getAnimations()
          .filter(
            (animation) =>
              'animationName' in animation && animation.animationName === 'signal-readout-tick',
          ).length,
    );
  const nextFrame = () =>
    page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
  await expect(direct).not.toHaveClass(/is-ticking/);

  await transmitter.scrollIntoViewIfNeeded();
  await transmitter.focus();
  await page.keyboard.press('ArrowRight');
  await expect(direct).toHaveText('257 units');
  await expect(direct).toHaveClass(/is-ticking/);
  await expect(direct).toHaveCSS('animation-name', 'signal-readout-tick');
  await expect(direct).toHaveCSS('animation-duration', '0.16s');
  await expect(echo).toHaveClass(/is-ticking/);
  await expect.poll(activeTicks).toBe(0);
  await expect(direct).not.toHaveClass(/is-ticking/);

  await page.keyboard.press('ArrowRight');
  await expect.poll(activeTicks).toBe(1);
  await expect.poll(activeTicks).toBe(0);

  await page.locator('[data-toy-range="transmitter"]').evaluate((element) => {
    const range = element as HTMLInputElement;
    range.value = '120';
    range.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(direct).toHaveClass(/is-ticking/);
  await expect(echo).toHaveClass(/is-ticking/);
  await expect.poll(activeTicks).toBe(0);

  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(direct).toHaveText('267 units');
  await expect(direct).toHaveClass(/is-ticking/);
  await expect.poll(activeTicks).toBe(0);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await transmitter.focus();
  await page.keyboard.press('ArrowRight');
  await nextFrame();
  await expect(direct).not.toHaveClass(/is-ticking/);
  await expect(direct).toHaveCSS('animation-name', 'none');
  await expect.poll(activeTicks).toBe(0);
  expect(
    Number.parseFloat(
      await direct.evaluate((element) => getComputedStyle(element).animationDuration),
    ),
  ).toBeLessThanOrEqual(0.001);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await transmitter.focus();
  await page.keyboard.press('ArrowRight');
  await nextFrame();
  await expect(direct).not.toHaveClass(/is-ticking/);
  await expect(direct).toHaveCSS('animation-name', 'none');
  await expect.poll(activeTicks).toBe(0);
  await page.getByRole('button', { name: 'Enable motion' }).click();
  await nextFrame();
  await expect(direct).not.toHaveClass(/is-ticking/);
  await expect(direct).toHaveCSS('animation-name', 'none');
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
  await expect(page.locator('[data-toy-direct]')).toHaveClass(/is-ticking/);
  await page.getByRole('button', { name: /Reset/ }).click();
  await expect(handle).toHaveAttribute('aria-valuenow', '104');
  await context.close();
});

test('diagrams remain accessible and clean at 320px and 200% text', async ({ page }) => {
  const largeText = 'html { font-size: 200% !important; }';
  for (const route of ['/', '/work/', '/work/chronos-dsp/']) {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(route);
    await page.addStyleTag({ content: largeText });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      320,
    );
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
