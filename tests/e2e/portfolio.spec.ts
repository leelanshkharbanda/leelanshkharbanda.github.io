import { readFileSync, statSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PDFDocument } from 'pdf-lib';

const projectSlugs = [
  'chronos-dsp',
  'life-os',
  'modulation-studio',
  'hpc-boost',
  'moe-memory-wall',
  'riscv-simulator',
  'university-erp',
  'tasveer',
];
const productionOrigin = new URL(process.env.SITE_URL ?? 'https://leelanshkharbanda.github.io')
  .origin;
const routes = [
  '/',
  '/work/',
  '/about/',
  '/resume/',
  ...projectSlugs.map((slug) => `/work/${slug}/`),
];

test('home orients the visitor and shows exactly three selected projects', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Leelansh Kharbanda/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I make small systems');
  await expect(page.locator('#selected-work .project-card')).toHaveCount(3);
  await expect(page.getByRole('link', { name: 'Résumé', exact: true }).first()).toBeVisible();
  await expect(page.locator('a[href^="mailto:leelansh24319@iiitd.ac.in"]').first()).toBeVisible();
});

test('work index preserves the five plus three curation model', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.project-list .project-card')).toHaveCount(5);
  await expect(page.locator('.archive-grid .project-card')).toHaveCount(3);
  await expect(page.locator('body')).not.toContainText('AionUi');
  await expect(page.locator('body')).not.toContainText('posthog');
});

for (const slug of projectSlugs) {
  test(`${slug} has a direct, evidence-bearing case study route`, async ({ page }) => {
    await page.goto(`/work/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to work/ })).toBeVisible();
    await expect(page.locator('.case-limits h2')).toHaveText('Limits');
    await expect(page.locator('.case-links a').first()).toHaveAttribute('href', /github\.com/);
  });
}

test('every route preserves core content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 }), route).toBeVisible();
  }
  await page.goto('/');
  await expect(page.locator('#selected-work .project-card')).toHaveCount(3);
  await expect(page.locator('a[href^="mailto:leelansh24319@iiitd.ac.in"]').first()).toBeVisible();
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/work/chronos-dsp/');
  await expect(page.locator('.project-visual__root')).toBeVisible();
  await page.getByText('Static stage ledger', { exact: true }).click();
  await expect(page.locator('.trace-static-details tbody tr')).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const table = page.locator('.trace-static-details table');
  const dimensions = await table.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  await expect(table).toContainText('Establish the symbol stream');
  await page.goto('/resume/');
  await expect(page.locator('.resume-project')).toHaveCount(5);
  await context.close();
});

test('every route reflows at 320 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(dimensions.page, route).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  await expect(page.locator('.mobile-nav summary')).toBeVisible();
});

test('every route tolerates 200% text and WCAG spacing at 320 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of routes) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${route} 200%`,
    ).toBeLessThanOrEqual(320);

    await page.goto(route);
    await page.addStyleTag({
      content:
        'body * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }',
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${route} spacing`,
    ).toBeLessThanOrEqual(320);

    await page.goto(route);
    await page.addStyleTag({
      content:
        'html { font-size: 200% !important; } body * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }',
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${route} combined`,
    ).toBeLessThanOrEqual(320);
  }
});

test('open mobile navigation stays within the viewport at 200% text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await page.locator('.mobile-nav summary').click();
  const bounds = await page.locator('.mobile-nav nav').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right, viewport: window.innerWidth };
  });
  expect(bounds.left).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
  for (const link of await page.locator('.mobile-nav nav a').all()) {
    const box = await link.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(bounds.viewport);
  }
});

test('reduced motion removes smooth scrolling and animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const motion = await page.evaluate(() => ({
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    animation: getComputedStyle(document.querySelector('.section-heading')!).animationDuration,
  }));
  expect(motion.scroll).toBe('auto');
  expect(Number.parseFloat(motion.animation)).toBeLessThanOrEqual(0.001);
});

test('reduced-motion preference updates while the page is open', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'smooth',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'smooth',
  );
});

test('forced colors preserve the authored SVG palette where supported', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/work/chronos-dsp/');
  const supported = await page.evaluate(
    () => 'forcedColorAdjust' in document.documentElement.style,
  );
  if (!supported) {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.project-visual__root')).toBeVisible();
    return;
  }
  const adjustment = await page
    .locator('.project-visual__root')
    .evaluate((element) => getComputedStyle(element).forcedColorAdjust);
  expect(adjustment).toBe('none');
  await expect(page.locator('.trace-inspector__root')).toHaveCSS('forced-color-adjust', 'none');
});

test('skip link is the first keyboard stop and reaches main content', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('#main-content')).toBeFocused();
});

test('indexable routes have unique metadata', async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    titles.add(title);
    descriptions.add(description ?? '');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`^${productionOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png/);
  }

  expect(titles.size).toBe(routes.length);
  expect(descriptions.size).toBe(routes.length);
});

test('signal sketch advances, reports, and resets without autoplay', async ({ page }) => {
  await page.goto('/work/chronos-dsp/');
  const inspector = page.locator('.trace-inspector__root');
  const next = page.getByRole('button', { name: 'Next', exact: true });
  const previous = page.getByRole('button', { name: 'Previous', exact: true });
  const reset = page.getByRole('button', { name: 'Reset', exact: true });

  await inspector.scrollIntoViewIfNeeded();
  await expect(inspector).toHaveAttribute('data-stage', 'source');
  await expect(next).toBeEnabled();
  await next.click();
  await expect(inspector).toHaveAttribute('data-stage', 'channel');
  await expect(inspector).toContainText('Stage 2 of 4');
  await next.click();
  await next.click();
  await expect(inspector).toHaveAttribute('data-stage', 'output');
  await expect(inspector).toContainText('1.56%');
  await expect(next).toBeDisabled();
  await previous.click();
  await expect(inspector).toHaveAttribute('data-stage', 'receiver');
  await reset.click();
  await expect(inspector).toHaveAttribute('data-stage', 'source');
});

test('unknown routes return a useful 404 page', async ({ page }) => {
  const response = await page.goto('/missing-record/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('does not resolve');
  await expect(page.getByRole('link', { name: 'Browse work' })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
});

test('copy email enhancement preserves the visible mail link', async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Clipboard permission flow is verified in Chromium.');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-status')).toHaveText('Email copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'leelansh24319@iiitd.ac.in',
  );
  await expect(page.locator('a[href^="mailto:leelansh24319@iiitd.ac.in"]').first()).toBeVisible();
});

test('failed JavaScript chunks leave the static case study usable', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.goto('/work/chronos-dsp/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.project-visual__root')).toBeVisible();
  await page.getByText('Static stage ledger', { exact: true }).click();
  await expect(page.locator('.trace-static-details tbody tr')).toHaveCount(4);
  await expect(page.getByRole('link', { name: /Back to work/ })).toBeVisible();
});

test('failed fonts preserve readable content and layout', async ({ page }) => {
  await page.route('**/fonts/*.woff2', (route) => route.abort());
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('denied Clipboard and Storage APIs fail safely', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new DOMException('Denied', 'NotAllowedError')) },
    });
    Storage.prototype.getItem = () => {
      throw new DOMException('Denied', 'SecurityError');
    };
    Storage.prototype.setItem = () => {
      throw new DOMException('Denied', 'SecurityError');
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-status')).toHaveText(
    'Select the email address or use the mail link.',
  );
  await expect(page.locator('a[href^="mailto:leelansh24319@iiitd.ac.in"]').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reduce motion' })).toBeVisible();
});

test('résumé prints to one-page A4 and Letter files', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'PDF generation is verified in Chromium.');
  await page.goto('/resume/');
  for (const format of ['A4', 'Letter'] as const) {
    const path = `test-results/resume-${format.toLowerCase()}.pdf`;
    await page.pdf({ path, format, printBackground: true });
    expect(statSync(path).size).toBeGreaterThan(10_000);
    const pdf = await PDFDocument.load(readFileSync(path));
    expect(pdf.getPageCount(), format).toBe(1);
  }
});

test('indexable routes have no serious or critical axe violations', async ({ page }) => {
  const violations: { route: string; id: string; targets: string[] }[] = [];

  for (const route of routes) {
    await page.goto(route);
    if (route === '/work/chronos-dsp/') {
      await page.getByText('Static stage ledger', { exact: true }).click();
    }
    const results = await new AxeBuilder({ page }).analyze();
    for (const violation of results.violations) {
      if (!['serious', 'critical'].includes(violation.impact ?? '')) continue;
      violations.push({
        route,
        id: violation.id,
        targets: violation.nodes.map((node) => node.target.join(' ')),
      });
    }
  }

  expect(violations).toEqual([]);
});
