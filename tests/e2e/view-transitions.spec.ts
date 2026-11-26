import { expect, test, type Page } from '@playwright/test';

type TransitionState = {
  revealEvent: boolean;
  reveal: boolean;
  ready: boolean;
  groupDuration: string;
  oldFit: string;
  rootAnimation: string;
  otherGroupAnimation: string;
};

const readTransitionState = (page: Page) =>
  page.evaluate(() => (window as Window & { __vt?: TransitionState }).__vt);

const trackTransitions = async (page: Page) => {
  await page.context().addInitScript(() => {
    const state: TransitionState = {
      revealEvent: false,
      reveal: false,
      ready: false,
      groupDuration: '',
      oldFit: '',
      rootAnimation: '',
      otherGroupAnimation: '',
    };
    (window as Window & { __vt?: TransitionState }).__vt = state;
    window.addEventListener('pagereveal', (event) => {
      state.revealEvent = true;
      state.reveal = Boolean(event.viewTransition);
      if (!event.viewTransition) return;
      event.viewTransition.ready
        .then(() => {
          state.ready = true;
          state.groupDuration = getComputedStyle(
            document.documentElement,
            '::view-transition-group(project-chronos-dsp)',
          ).animationDuration;
          state.oldFit = getComputedStyle(
            document.documentElement,
            '::view-transition-old(project-chronos-dsp)',
          ).objectFit;
          state.rootAnimation = getComputedStyle(
            document.documentElement,
            '::view-transition-new(root)',
          ).animationName;
          state.otherGroupAnimation = getComputedStyle(
            document.documentElement,
            '::view-transition-group(project-life-os)',
          ).animationName;
        })
        .catch(() => {});
    });
  });
};

test('project visuals share a named route transition where supported', async ({
  page,
  browserName,
}) => {
  await trackTransitions(page);
  await page.goto('/work/');
  const visuals = page.locator('.project-visual__root');
  const initialNames = await visuals.evaluateAll((items) =>
    items.map((item) => getComputedStyle(item).viewTransitionName),
  );
  expect(initialNames.every((name) => name === 'none')).toBe(true);

  await page.locator('#project-chronos-dsp').hover();
  await expect(visuals.first()).toHaveCSS('view-transition-name', 'project-chronos-dsp');
  await expect(visuals.nth(1)).toHaveCSS('view-transition-name', 'none');
  await page.mouse.move(0, 0);
  await expect(visuals.first()).toHaveCSS('view-transition-name', 'none');

  const title = page.locator('#project-chronos-dsp h3 a');
  await page.keyboard.press('Tab');
  await title.focus();
  await expect(visuals.first()).toHaveCSS('view-transition-name', 'project-chronos-dsp');
  await page.keyboard.press('Enter');
  await page.waitForURL('**/work/chronos-dsp/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Chronos-DSP');
  await expect(page.locator('.case-body > .project-visual__root')).toHaveCSS(
    'view-transition-name',
    'project-chronos-dsp',
  );

  if (browserName === 'firefox') return;

  await expect.poll(async () => (await readTransitionState(page))?.reveal).toBe(true);
  await expect.poll(async () => (await readTransitionState(page))?.ready).toBe(true);
  expect((await readTransitionState(page))?.groupDuration).toBe('0.36s');
  expect((await readTransitionState(page))?.oldFit).toBe('contain');
  expect((await readTransitionState(page))?.rootAnimation).toBe('none');
  expect(['none', '']).toContain((await readTransitionState(page))?.otherGroupAnimation);
});

test('manual reduced motion removes the shared morph and skips the route transition', async ({
  page,
  browserName,
}) => {
  await trackTransitions(page);
  await page.goto('/');
  await page.getByRole('button', { name: 'Reduce motion' }).click();
  await page.locator('#project-chronos-dsp h3 a').focus();
  await expect(page.locator('#project-chronos-dsp .project-visual__root')).toHaveCSS(
    'view-transition-name',
    'none',
  );

  await page.locator('#project-chronos-dsp h3 a').click();
  await page.waitForURL('**/work/chronos-dsp/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Chronos-DSP');
  await expect(page.locator('.case-body > .project-visual__root')).toHaveCSS(
    'view-transition-name',
    'none',
  );
  if (browserName !== 'firefox') {
    await expect.poll(async () => (await readTransitionState(page))?.revealEvent).toBe(true);
    await expect.poll(async () => (await readTransitionState(page))?.reveal).toBe(false);
    expect(
      await page
        .locator('#view-transition-mode')
        .evaluate((element) => element instanceof HTMLStyleElement && element.disabled),
    ).toBe(true);
  }
});

test('OS reduced motion uses normal project navigation', async ({ page, browserName }) => {
  await trackTransitions(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#project-chronos-dsp h3 a').click();
  await page.waitForURL('**/work/chronos-dsp/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Chronos-DSP');
  if (browserName === 'firefox') return;
  await expect.poll(async () => (await readTransitionState(page))?.revealEvent).toBe(true);
  await expect.poll(async () => (await readTransitionState(page))?.reveal).toBe(false);
});

test('non-project pages do not opt into route snapshots', async ({ page }) => {
  await page.goto('/about/');
  await expect(page.locator('#view-transition-mode')).toHaveCount(0);
});

test('touch project navigation uses the normal route fallback', async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Touch navigation uses Chromium device emulation.');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await trackTransitions(page);
  await page.goto('/work/');
  await page.locator('#project-chronos-dsp h3 a').click();
  await page.waitForURL('**/work/chronos-dsp/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Chronos-DSP');
  await expect.poll(async () => (await readTransitionState(page))?.revealEvent).toBe(true);
  await expect.poll(async () => (await readTransitionState(page))?.reveal).toBe(false);
  await context.close();
});
