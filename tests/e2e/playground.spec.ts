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

test('project preview sticker tilts with hover and keyboard focus', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#project-chronos-dsp');
  const note = card.locator('.project-card__preview-note');
  const angle = () =>
    note.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      return (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
    });
  const translationY = () =>
    note.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).f);
  const origin = () =>
    note.evaluate((element) => {
      const style = getComputedStyle(element);
      const [x, y] = style.transformOrigin.split(' ').map(Number.parseFloat);
      return {
        x,
        y,
        width: Number.parseFloat(style.width),
        height: Number.parseFloat(style.height),
      };
    });

  await expect.poll(async () => Math.abs(await angle())).toBeLessThan(0.01);
  await card.hover();
  await expect.poll(async () => Math.abs((await angle()) + 2)).toBeLessThan(0.01);
  await expect.poll(async () => Math.abs((await translationY()) + 1)).toBeLessThan(0.01);
  const stickerOrigin = await origin();
  expect(stickerOrigin.x).toBeCloseTo(stickerOrigin.width, 1);
  expect(stickerOrigin.y).toBeCloseTo(stickerOrigin.height / 2, 1);
  expect(
    await note.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const bar = element.parentElement!.getBoundingClientRect();
      return (
        rect.top < bar.top - 1 ||
        rect.bottom > bar.bottom + 1 ||
        rect.left < bar.left - 1 ||
        rect.right > bar.right + 1
      );
    }),
  ).toBe(false);

  await page.mouse.move(0, 0);
  await expect.poll(async () => Math.abs(await angle())).toBeLessThan(0.01);
  await card.locator('h3 a').focus();
  await expect.poll(async () => Math.abs((await angle()) + 2)).toBeLessThan(0.01);
  await card.locator('h3 a').evaluate((element) => element.blur());
  await expect.poll(async () => Math.abs(await angle())).toBeLessThan(0.01);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.hover();
  await expect(note).toHaveCSS('transform', 'none');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await card.hover();
  await expect(note).toHaveCSS('transform', 'none');
});

test('preview sticker stays contained at narrow widths and 200% text', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const scale of [100, 200]) {
      if (scale === 200) {
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      }
      const card = page.locator('#project-chronos-dsp');
      const note = card.locator('.project-card__preview-note');
      await card.scrollIntoViewIfNeeded();
      await card.locator('h3 a').focus();
      await expect
        .poll(() =>
          note.evaluate((element) => {
            const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
            return Math.abs((Math.atan2(matrix.b, matrix.a) * 180) / Math.PI + 2);
          }),
        )
        .toBeLessThan(0.01);
      expect(
        await note.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const bar = element.parentElement!.getBoundingClientRect();
          return (
            rect.top < bar.top - 1 ||
            rect.bottom > bar.bottom + 1 ||
            rect.left < bar.left - 1 ||
            rect.right > bar.right + 1
          );
        }),
      ).toBe(false);
      await card.locator('h3 a').evaluate((element) => element.blur());
    }
  }
});

test('identity mark rotates on hover and keyboard focus', async ({ page }, testInfo) => {
  await page.goto('/');
  const link = page.locator('.identity-link');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  const mark = link.locator('.identity-link__mark');
  const angle = () =>
    mark.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      return (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
    });
  const expectAngle = (target: number) =>
    expect.poll(async () => Math.abs((await angle()) - target)).toBeLessThan(0.01);
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';

  await expectAngle(-9);
  await link.hover();
  await expectAngle(8);
  await page.mouse.move(0, 0);
  await expectAngle(-9);

  await skip.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('outline-width', '3px');
  await expectAngle(8);
  await link.evaluate((element) => element.blur());
  await expectAngle(-9);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(mark).toHaveCSS('transform', 'none');
  await skip.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(mark).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await link.hover();
  await expect(mark).toHaveCSS('transform', 'none');
  await link.evaluate((element) => element.blur());
  await skip.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(mark).toHaveCSS('transform', 'none');
});

test('navigation links match hover color on keyboard focus', async ({ page }, testInfo) => {
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ['/', '/work/']) {
    await page.goto(route);
    const link = page.locator('.desktop-nav a').first();
    const restingColor = route === '/' ? 'rgba(0, 0, 0, 0)' : 'rgb(29, 30, 25)';
    await expect(link).toHaveCSS('background-color', restingColor);
    await link.hover();
    await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
    await page.mouse.move(0, 0);
    await expect(link).toHaveCSS('background-color', restingColor);
    await page.getByRole('link', { name: 'Skip to content' }).focus();
    for (let step = 0; step < 2; step += 1) await page.keyboard.press(tabKey);
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
    await expect(link).toHaveCSS('outline-width', '3px');
    if (route === '/work/') await expect(link).toHaveAttribute('aria-current', 'page');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/work/']) {
    await page.goto(route);
    const summary = page.locator('.mobile-nav summary');
    const link = page.locator('.mobile-nav a').first();
    const restingColor = route === '/' ? 'rgba(0, 0, 0, 0)' : 'rgb(29, 30, 25)';
    await summary.click();
    await page.mouse.move(0, 0);
    await expect(link).toHaveCSS('background-color', restingColor);
    await link.hover();
    await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
    await page.mouse.move(0, 0);
    await expect(link).toHaveCSS('background-color', restingColor);
    await summary.focus();
    await page.keyboard.press(tabKey);
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
    await expect(link).toHaveCSS('outline-width', '3px');
    if (route === '/work/') await expect(link).toHaveAttribute('aria-current', 'page');
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.desktop-nav a').first()).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('.mobile-nav a').first()).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await expect(page.locator('.desktop-nav a').first()).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('.mobile-nav a').first()).toHaveCSS('transition-duration', '0s');
});

test('quiet and footer links match hover accent on keyboard focus', async ({ page }, testInfo) => {
  await page.goto('/');
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  const quiet = page.locator('#project-chronos-dsp .quiet-link');
  const quietPrevious = page
    .locator('#project-chronos-dsp .project-card__actions .arrow-link')
    .first();
  await expect(quiet).toHaveCSS('color', 'rgb(92, 90, 80)');
  await quiet.hover();
  await expect(quiet).toHaveCSS('color', 'rgb(169, 52, 26)');
  await page.mouse.move(0, 0);
  await expect(quiet).toHaveCSS('color', 'rgb(92, 90, 80)');
  await quietPrevious.focus();
  await page.keyboard.press(tabKey);
  await expect(quiet).toBeFocused();
  await expect(quiet).toHaveCSS('color', 'rgb(169, 52, 26)');
  await expect(quiet).toHaveCSS('outline-width', '3px');

  const footer = page.locator('.site-footer__links a').first();
  const footerPrevious = page.locator('.site-footer__top > a');
  await expect(footer).toHaveCSS('color', 'rgb(199, 201, 188)');
  await footer.hover();
  await expect(footer).toHaveCSS('color', 'rgb(223, 255, 104)');
  await page.mouse.move(0, 0);
  await expect(footer).toHaveCSS('color', 'rgb(199, 201, 188)');
  await footerPrevious.focus();
  await page.keyboard.press(tabKey);
  await expect(footer).toBeFocused();
  await expect(footer).toHaveCSS('color', 'rgb(223, 255, 104)');
  await expect(footer).toHaveCSS('outline-width', '3px');
  await expect(footer).toHaveCSS('outline-color', 'rgb(255, 133, 103)');

  await expect(quiet).toHaveCSS('transition-duration', '0.16s');
  await expect(footer).toHaveCSS('transition-duration', '0.16s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(quiet).toHaveCSS('transition-duration', '0s');
  await expect(footer).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await expect(quiet).toHaveCSS('transition-duration', '0s');
  await expect(footer).toHaveCSS('transition-duration', '0s');
});

test('project titles match hover color and underline on keyboard focus', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const title = page.locator('#project-chronos-dsp h3 a');
  const previous = page.locator('.playground-comparison a').last();
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await expect(title).toHaveCSS('color', 'rgb(29, 30, 25)');
  await expect(title).toHaveCSS('text-decoration-line', 'none');
  await title.hover();
  await expect(title).toHaveCSS('color', 'rgb(169, 52, 26)');
  await expect(title).toHaveCSS('text-decoration-line', 'underline');
  await page.mouse.move(0, 0);
  await expect(title).toHaveCSS('color', 'rgb(29, 30, 25)');
  await expect(title).toHaveCSS('text-decoration-line', 'none');
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(title).toBeFocused();
  await expect(title).toHaveCSS('color', 'rgb(169, 52, 26)');
  await expect(title).toHaveCSS('text-decoration-line', 'underline');
  await expect(title).toHaveCSS('outline-width', '3px');
  await title.evaluate((element) => element.blur());
  await expect(title).toHaveCSS('color', 'rgb(29, 30, 25)');
  await expect(title).toHaveCSS('text-decoration-line', 'none');
  await expect(title).toHaveCSS('transition-duration', '0.16s');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await title.hover();
  await expect(title).toHaveCSS('color', 'rgb(169, 52, 26)');
  await expect(title).toHaveCSS('transition-duration', '0s');
  await page.mouse.move(0, 0);
  await expect(title).toHaveCSS('text-decoration-line', 'none');
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(title).toBeFocused();
  await expect(title).toHaveCSS('color', 'rgb(169, 52, 26)');
  await expect(title).toHaveCSS('text-decoration-line', 'underline');
});

test('next-project links match hover coral on keyboard focus', async ({ page }, testInfo) => {
  await page.goto('/work/chronos-dsp/');
  const link = page.locator('.next-project a');
  const previous = page.locator('.case-body a').last();
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await expect(link).toHaveCSS('color', 'rgb(246, 242, 231)');
  await link.hover();
  await expect(link).toHaveCSS('color', 'rgb(255, 133, 103)');
  await page.mouse.move(0, 0);
  await expect(link).toHaveCSS('color', 'rgb(246, 242, 231)');
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('color', 'rgb(255, 133, 103)');
  await expect(link).toHaveCSS('outline-width', '3px');
  await link.evaluate((element) => element.blur());
  await expect(link).toHaveCSS('color', 'rgb(246, 242, 231)');
  await expect(link).toHaveCSS('transition-duration', '0.16s');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(link).toHaveCSS('color', 'rgb(255, 133, 103)');
  await expect(link).toHaveCSS('transition-duration', '0s');
  await page.mouse.move(0, 0);
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('color', 'rgb(255, 133, 103)');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/work/chronos-dsp/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await expect(link).toHaveCSS('transition-duration', '0s');
});

test('featured comparison links match hover yellow on keyboard focus', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const link = page.locator('.playground-comparison a').first();
  const previous = page.getByRole('button', { name: /Reset/ });
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await expect(link).toHaveCSS('background-color', 'rgb(246, 242, 231)');
  await link.hover();
  await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await page.mouse.move(0, 0);
  await expect(link).toHaveCSS('background-color', 'rgb(246, 242, 231)');
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await expect(link).toHaveCSS('outline-width', '3px');
  await expect(link).toHaveCSS('position', 'relative');
  await expect(link).toHaveCSS('z-index', '1');
  await link.evaluate((element) => element.blur());
  await expect(link).toHaveCSS('background-color', 'rgb(246, 242, 231)');
  await expect(link).toHaveCSS('transition-duration', '0.16s');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await expect(link).toHaveCSS('transition-duration', '0s');
  await page.mouse.move(0, 0);
  await previous.focus();
  await page.keyboard.press(tabKey);
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await expect(link).toHaveCSS('transition-duration', '0s');
});

test('about threads match their hover detent on keyboard focus', async ({ page }, testInfo) => {
  await page.goto('/about/');
  const link = page.locator('.about-thread').first();
  const skip = page.getByRole('link', { name: 'Skip to content' });
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  const focusThread = async () => {
    await skip.focus();
    for (let step = 0; step < 6; step += 1) await page.keyboard.press(tabKey);
  };
  const transform = () =>
    link.evaluate((element) => {
      const value = getComputedStyle(element).transform;
      if (value === 'none') return { x: 0, y: 0, angle: 0 };
      const matrix = new DOMMatrixReadOnly(value);
      return {
        x: Math.round(matrix.e),
        y: Math.round(matrix.f),
        angle: Math.round((Math.atan2(matrix.b, matrix.a) * 180) / Math.PI),
      };
    });
  const expectDetent = async () => {
    await expect.poll(transform).toEqual({ x: 3, y: 3, angle: -1 });
    await expect(link).toHaveCSS('box-shadow', 'rgb(29, 30, 25) 2px 2px 0px 0px');
  };

  await expect.poll(transform).toEqual({ x: 0, y: 0, angle: 0 });
  await link.hover();
  await expectDetent();
  await page.mouse.move(0, 0);
  await expect.poll(transform).toEqual({ x: 0, y: 0, angle: 0 });
  await focusThread();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('outline-width', '3px');
  await expectDetent();
  await link.evaluate((element) => element.blur());
  await expect.poll(transform).toEqual({ x: 0, y: 0, angle: 0 });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(link).toHaveCSS('transform', 'none');
  await expect(link).toHaveCSS('transition-duration', '0s');
  await focusThread();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/about/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await focusThread();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('transform', 'none');
});

test('arrow links nudge on hover and keyboard focus', async ({ page }, testInfo) => {
  await page.goto('/');
  const link = page.locator('#project-chronos-dsp .project-card__actions .arrow-link').first();
  const title = page.locator('#project-chronos-dsp h3 a');
  const arrow = link.locator('span').first();
  const translation = () =>
    arrow.evaluate((element) => {
      const transform = getComputedStyle(element).transform;
      return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).e;
    });

  await expect.poll(translation).toBe(0);
  await link.hover();
  await expect.poll(translation).toBeGreaterThan(3.5);
  await page.mouse.move(0, 0);
  await expect.poll(translation).toBe(0);

  await title.focus();
  await page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS('outline-style', 'solid');
  await expect(link).toHaveCSS('outline-width', '3px');
  await expect.poll(translation).toBeGreaterThan(3.5);
  await link.evaluate((element) => element.blur());
  await expect.poll(translation).toBe(0);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(arrow).toHaveCSS('transform', 'none');
  await title.focus();
  await page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(arrow).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await link.hover();
  await expect(arrow).toHaveCSS('transform', 'none');
  await title.focus();
  await page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(arrow).toHaveCSS('transform', 'none');
});

test('back links nudge their arrow on hover and keyboard focus', async ({ page }, testInfo) => {
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  for (const route of ['/work/chronos-dsp/', '/resume/']) {
    await page.goto(route);
    const link = page.locator('.back-link').first();
    const arrow = link.locator('.back-link__arrow');
    const translation = () =>
      arrow.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).e;
      });

    await expect.poll(translation).toBe(0);
    await link.hover();
    await expect.poll(translation).toBeLessThan(-2.5);
    await page.mouse.move(0, 0);
    await expect.poll(translation).toBe(0);
    await page.getByRole('link', { name: 'Skip to content' }).focus();
    for (let step = 0; step < 6; step += 1) {
      await page.keyboard.press(tabKey);
    }
    await expect(link).toBeFocused();
    await expect(link).toHaveCSS('outline-width', '3px');
    await expect.poll(translation).toBeLessThan(-2.5);
    await link.evaluate((element) => element.blur());
    await expect.poll(translation).toBe(0);
  }

  await page.goto('/resume/');
  const link = page.locator('.back-link').first();
  const arrow = link.locator('.back-link__arrow');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await link.hover();
  await expect(arrow).toHaveCSS('transform', 'none');
  await page.getByRole('link', { name: 'Skip to content' }).focus();
  for (let step = 0; step < 6; step += 1) {
    await page.keyboard.press(tabKey);
  }
  await expect(link).toBeFocused();
  await expect(arrow).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await link.hover();
  await expect(arrow).toHaveCSS('transform', 'none');
  await link.evaluate((element) => element.blur());
  await page.getByRole('link', { name: 'Skip to content' }).focus();
  for (let step = 0; step < 6; step += 1) {
    await page.keyboard.press(tabKey);
  }
  await expect(link).toBeFocused();
  await expect(arrow).toHaveCSS('transform', 'none');
});

test('mobile menu summary presses flat and shows open/focus state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  const translation = () =>
    summary.evaluate((element) => {
      const transform = getComputedStyle(element).transform;
      return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).e;
    });

  await expect(summary).toHaveCSS('background-color', 'rgb(223, 255, 104)');
  await summary.hover();
  await page.mouse.down();
  await expect.poll(translation).toBeGreaterThan(1.5);
  await expect(summary).toHaveCSS('box-shadow', 'none');
  await expect(summary).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await page.mouse.up();
  await expect(details).toHaveAttribute('open', '');
  await expect.poll(translation).toBe(0);
  await expect(summary).toHaveCSS('box-shadow', 'rgb(29, 30, 25) 2px 2px 0px 0px');

  await summary.click();
  await expect(details).not.toHaveAttribute('open', '');
  await expect(summary).toHaveCSS('background-color', 'rgb(223, 255, 104)');
  await page.keyboard.press('Tab');
  await summary.focus();
  await expect(summary).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(details).not.toHaveAttribute('open', '');
  await page.keyboard.press('Space');
  await expect(details).toHaveAttribute('open', '');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await summary.hover();
  await page.mouse.down();
  await expect(summary).toHaveCSS('transform', 'none');
  await expect(summary).toHaveCSS('transition-duration', '0s');
  await page.mouse.up();

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await summary.hover();
  await page.mouse.down();
  await expect(summary).toHaveCSS('transform', 'none');
  await page.mouse.up();
});

test('touch activation opens the mobile menu with visible state', async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Touch activation uses Chromium CDP input events.');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('/');
  const summary = page.locator('.mobile-nav summary');
  const box = await summary.boundingBox();
  expect(box).not.toBeNull();
  const client = await context.newCDPSession(page);
  const x = box!.x + box!.width / 2;
  const y = box!.y + box!.height / 2;
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ id: 1, x, y }],
  });
  await expect(summary).toBeVisible();
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect(page.locator('.mobile-nav')).toHaveAttribute('open', '');
  await expect(summary).toHaveCSS('background-color', 'rgb(255, 220, 99)');
  await context.close();
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
  await expect
    .poll(() => button.evaluate((element) => getComputedStyle(element).boxShadow))
    .toContain('2px 2px 0px');

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

test('secondary buttons match lilac hover background on keyboard focus', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const primary = page.locator('.button--primary[data-magnetic]');
  const secondary = page.locator('.button--secondary[data-magnetic]');
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await expect(secondary).toHaveCSS('background-color', 'rgb(246, 242, 231)');
  await secondary.hover();
  await expect(secondary).toHaveCSS('background-color', 'rgb(217, 201, 255)');
  await page.mouse.move(0, 0);
  await expect(secondary).toHaveCSS('background-color', 'rgb(246, 242, 231)');
  await primary.focus();
  await page.keyboard.press(tabKey);
  await expect(secondary).toBeFocused();
  await expect(secondary).toHaveCSS('background-color', 'rgb(217, 201, 255)');
  await expect(secondary).toHaveCSS('outline-width', '3px');
  await secondary.evaluate((element) => element.blur());
  await expect(secondary).toHaveCSS('background-color', 'rgb(246, 242, 231)');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await secondary.hover();
  await expect(secondary).toHaveCSS('background-color', 'rgb(217, 201, 255)');
  await expect(secondary).toHaveCSS('transform', 'none');
  await expect(secondary).toHaveCSS('transition-duration', '0s');
  await primary.focus();
  await page.keyboard.press(tabKey);
  await expect(secondary).toBeFocused();
  await expect(secondary).toHaveCSS('background-color', 'rgb(217, 201, 255)');
  await expect(secondary).toHaveCSS('transform', 'none');
});

test('interactive control accents match on keyboard focus', async ({ page }, testInfo) => {
  const tabKey = testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.goto('/');
  const reset = page.getByRole('button', { name: /Reset/ });
  await expect(reset).toHaveCSS('color', 'rgb(246, 242, 231)');
  await expect(reset).toHaveCSS('border-top-color', 'rgb(199, 201, 188)');
  await reset.hover();
  await expect(reset).toHaveCSS('color', 'rgb(223, 255, 104)');
  await expect(reset).toHaveCSS('border-top-color', 'rgb(223, 255, 104)');
  await page.mouse.move(0, 0);
  await expect(reset).toHaveCSS('color', 'rgb(246, 242, 231)');
  await page.locator('[data-toy-range="receiver"]').focus();
  await page.keyboard.press('Tab');
  if (testInfo.project.name === 'webkit') await reset.focus();
  await expect(reset).toBeFocused();
  await expect(reset).toHaveCSS('color', 'rgb(223, 255, 104)');
  await expect(reset).toHaveCSS('border-top-color', 'rgb(223, 255, 104)');
  await expect(reset).toHaveCSS('outline-width', '3px');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(reset).toHaveCSS('transition-duration', '0s');

  await page.goto('/work/chronos-dsp/');
  const next = page.getByRole('button', { name: 'Next', exact: true });
  await next.scrollIntoViewIfNeeded();
  await expect(next).toBeEnabled();
  await expect(next).toHaveCSS('color', 'rgb(246, 242, 231)');
  await expect(next).toHaveCSS('border-top-color', 'rgb(199, 201, 188)');
  await next.hover();
  await expect(next).toHaveCSS('color', 'rgb(255, 133, 103)');
  await expect(next).toHaveCSS('border-top-color', 'rgb(255, 133, 103)');
  await page.mouse.move(0, 0);
  await expect(next).toHaveCSS('color', 'rgb(246, 242, 231)');
  await next.click();
  const previous = page.getByRole('button', { name: 'Previous', exact: true });
  await previous.focus();
  await page.keyboard.press(tabKey);
  if (testInfo.project.name === 'webkit') await next.focus();
  await expect(next).toBeFocused();
  await expect(next).toHaveCSS('color', 'rgb(255, 133, 103)');
  await expect(next).toHaveCSS('border-top-color', 'rgb(255, 133, 103)');
  await expect(next).toHaveCSS('outline-width', '3px');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(next).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await expect(reset).toHaveCSS('transition-duration', '0s');
  await page.goto('/work/chronos-dsp/');
  await expect(next).toHaveCSS('transition-duration', '0s');
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
  await expect(enableMotion).toHaveCSS('color', 'rgb(223, 255, 104)');
  await expect(enableMotion).toHaveCSS('border-bottom-color', 'rgb(223, 255, 104)');
  await enableMotion.click();
  await expect(toggle).toBeVisible();
  await expect(toggle).not.toHaveAttribute('aria-pressed');
  await expect(toggle).toHaveCSS('color', 'rgb(199, 201, 188)');
  await expect(toggle).toHaveCSS('border-bottom-color', 'rgb(199, 201, 188)');
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
