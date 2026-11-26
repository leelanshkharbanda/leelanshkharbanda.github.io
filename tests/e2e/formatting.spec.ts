import { expect, test } from '@playwright/test';

const diagramProjects = [
  'chronos-dsp',
  'life-os',
  'modulation-studio',
  'hpc-boost',
  'moe-memory-wall',
  'riscv-simulator',
];

const diagramLinks: Record<string, [number, number, number, number][]> = {
  'chronos-dsp': [
    [107, 120, 294, 120],
    [107, 126, 294, 126],
    [107, 132, 294, 132],
    [430, 102, 518, 102],
    [126, 180, 126, 268],
    [346, 180, 346, 268],
    [566, 180, 566, 268],
    [786, 180, 786, 268],
    [212, 322, 258, 322],
    [432, 322, 478, 322],
    [652, 322, 698, 322],
  ],
  'life-os': [
    [224, 130, 272, 130],
    [434, 130, 482, 130],
    [526, 168, 144, 224],
    [548, 168, 354, 224],
    [571, 168, 571, 224],
    [144, 308, 326, 350],
    [354, 308, 354, 350],
    [571, 308, 396, 350],
    [690, 246, 732, 246],
  ],
  'modulation-studio': [
    [280, 196, 358, 196],
    [600, 196, 678, 196],
  ],
  'hpc-boost': [
    [184, 127, 222, 127],
    [368, 127, 406, 127],
    [552, 127, 590, 127],
    [736, 127, 774, 127],
    [664, 178, 250, 220],
    [848, 178, 848, 220],
  ],
  'moe-memory-wall': [
    [179, 136, 500, 196],
    [292, 294, 428, 294],
    [730, 294, 808, 294],
  ],
  'riscv-simulator': [
    [270, 130, 316, 130],
    [620, 190, 620, 234],
  ],
};

test('project diagram labels stay contained and connectors meet their targets', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const slug of diagramProjects) {
    await page.goto(`/work/${slug}/`);
    await page.evaluate(() => document.fonts.ready);
    const defects = await page
      .locator('.project-visual__root')
      .evaluate((figure, expectedLinks: [number, number, number, number][]) => {
        const svg = figure.querySelector('svg')!;
        const rootMatrix = svg.getScreenCTM()!;
        const inverse = rootMatrix.inverse();
        const bounds = (element: SVGGraphicsElement) => {
          const box = element.getBBox();
          const matrix = element.getScreenCTM()!;
          const points = [
            [box.x, box.y],
            [box.x + box.width, box.y],
            [box.x, box.y + box.height],
            [box.x + box.width, box.y + box.height],
          ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix).matrixTransform(inverse));
          return {
            left: Math.min(...points.map((point) => point.x)),
            top: Math.min(...points.map((point) => point.y)),
            right: Math.max(...points.map((point) => point.x)),
            bottom: Math.max(...points.map((point) => point.y)),
          };
        };
        const texts = [...svg.querySelectorAll<SVGTextElement>('text')].map((text) => ({
          text: text.textContent?.trim() ?? '',
          ...bounds(text),
        }));
        const shapes = [
          ...svg.querySelectorAll<SVGGraphicsElement>(
            'rect.project-visual__boundary, rect.project-visual__panel, rect.project-visual__stage-box, rect.project-visual__plot-frame, circle.project-visual__node-fill',
          ),
        ].map((shape) => bounds(shape));
        const viewBox = svg.viewBox.baseVal;
        const outside = texts
          .filter(
            (text) =>
              text.left < viewBox.x - 0.5 ||
              text.top < viewBox.y - 0.5 ||
              text.right > viewBox.x + viewBox.width + 0.5 ||
              text.bottom > viewBox.y + viewBox.height + 0.5,
          )
          .map((text) => text.text);
        const crowded = texts.flatMap((text) => {
          const centerX = (text.left + text.right) / 2;
          const centerY = (text.top + text.bottom) / 2;
          return shapes
            .filter(
              (shape) =>
                centerX >= shape.left &&
                centerX <= shape.right &&
                centerY >= shape.top &&
                centerY <= shape.bottom,
            )
            .filter(
              (shape) =>
                text.left < shape.left + 4 ||
                text.top < shape.top + 4 ||
                text.right > shape.right - 4 ||
                text.bottom > shape.bottom - 4,
            )
            .map(() => text.text);
        });
        const overlaps = texts.flatMap((text, index) =>
          texts.slice(index + 1).flatMap((other) => {
            const width = Math.min(text.right, other.right) - Math.max(text.left, other.left);
            const height = Math.min(text.bottom, other.bottom) - Math.max(text.top, other.top);
            return width > 1 && height > 1 ? [`${text.text} / ${other.text}`] : [];
          }),
        );
        const links = [...svg.querySelectorAll<SVGPathElement>('path[marker-end]')].map((path) => {
          const start = path.getPointAtLength(0);
          const end = path.getPointAtLength(path.getTotalLength());
          const startPoint = new DOMPoint(start.x, start.y)
            .matrixTransform(path.getScreenCTM()!)
            .matrixTransform(inverse);
          const endPoint = new DOMPoint(end.x, end.y)
            .matrixTransform(path.getScreenCTM()!)
            .matrixTransform(inverse);
          return [startPoint.x, startPoint.y, endPoint.x, endPoint.y] as [
            number,
            number,
            number,
            number,
          ];
        });
        const detached = links.flatMap((link, index) => {
          const expected = expectedLinks[index];
          if (!expected) return [link];
          return link.some((value, coordinate) => Math.abs(value - expected[coordinate]!) > 0.1)
            ? [link]
            : [];
        });
        if (links.length !== expectedLinks.length) {
          detached.push([links.length, expectedLinks.length, 0, 0]);
        }
        return { outside, crowded: [...new Set(crowded)], overlaps, detached };
      }, diagramLinks[slug]);
    expect(defects, slug).toEqual({ outside: [], crowded: [], overlaps: [], detached: [] });
  }
});

test('trace inspector connectors terminate at the next stage', async ({ page }) => {
  await page.goto('/work/chronos-dsp/');
  const links = await page.locator('.trace-inspector__svg').evaluate((element) => {
    const svg = element as SVGSVGElement;
    const inverse = svg.getScreenCTM()!.inverse();
    return [...svg.querySelectorAll<SVGPathElement>('.trace-inspector__path-link')].map((path) => {
      const start = path.getPointAtLength(0);
      const end = path.getPointAtLength(path.getTotalLength());
      const startPoint = new DOMPoint(start.x, start.y)
        .matrixTransform(path.getScreenCTM()!)
        .matrixTransform(inverse);
      const endPoint = new DOMPoint(end.x, end.y)
        .matrixTransform(path.getScreenCTM()!)
        .matrixTransform(inverse);
      return [startPoint.x, startPoint.y, endPoint.x, endPoint.y];
    });
  });
  const expected = [
    [184, 65, 216, 65],
    [350, 65, 382, 65],
    [516, 65, 548, 65],
  ];
  expect(links).toHaveLength(expected.length);
  for (const [index, link] of links.entries()) {
    for (const [coordinate, value] of link.entries()) {
      expect(value, `link ${index} coordinate ${coordinate}`).toBeCloseTo(
        expected[index]![coordinate]!,
        1,
      );
    }
  }
});

test('project diagrams fit inside their containers without horizontal cutoff', async ({ page }) => {
  for (const route of ['/', '/work/', ...diagramProjects.map((slug) => `/work/${slug}/`)]) {
    await page.goto(route);
    for (const width of [320, 390, 768, 1024, 1100, 1101, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.locator('.project-visual__root').evaluateAll((figures) =>
        figures.map((figure) => {
          const svg = figure.querySelector('svg')!;
          return {
            boxWidth: figure.getBoundingClientRect().width,
            clientWidth: figure.clientWidth,
            scrollWidth: figure.scrollWidth,
            svgWidth: svg.getBoundingClientRect().width,
          };
        }),
      );
      for (const diagram of dimensions) {
        expect(diagram.svgWidth, `${route} at ${width}px`).toBeLessThanOrEqual(
          diagram.boxWidth + 0.5,
        );
        expect(diagram.scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(
          diagram.clientWidth + 1,
        );
      }
    }
  }
});

test('trace inspector fits inside its container at every breakpoint', async ({ page }) => {
  await page.goto('/work/chronos-dsp/');
  for (const width of [320, 390, 641, 768, 1024, 1101, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.locator('.trace-inspector__figure').evaluate((figure) => {
      const svg = figure.querySelector('svg')!;
      return {
        clientWidth: figure.clientWidth,
        scrollWidth: figure.scrollWidth,
        svgWidth: svg.getBoundingClientRect().width,
      };
    });
    expect(dimensions.svgWidth, `${width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    expect(dimensions.scrollWidth, `${width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }
});

test('mobile case and next-project headings do not split words', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/work/life-os/');
    await page.evaluate(() => document.fonts.ready);
    const lines = await page.locator('.case-hero h1').evaluate((heading) => {
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const index = node.textContent?.indexOf('recommendations') ?? -1;
        if (index < 0) {
          node = walker.nextNode();
          continue;
        }
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + 'recommendations'.length);
        return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
      }
      return 0;
    });
    expect(lines, `Life OS heading at ${width}px`).toBe(1);

    await page.goto('/work/chronos-dsp/');
    await page.evaluate(() => document.fonts.ready);
    const nextLines = await page
      .locator('.next-project a > span')
      .first()
      .evaluate((span) => {
        const walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          const index = node.textContent?.indexOf('recommendations') ?? -1;
          if (index < 0) {
            node = walker.nextNode();
            continue;
          }
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + 'recommendations'.length);
          return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
        }
        return 0;
      });
    expect(nextLines, `next-project heading at ${width}px`).toBe(1);
  }
});

test('shared formatting regressions stay fixed', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/work/');
  const stageGaps = await page.locator('.project-visual__root').evaluateAll((figures) =>
    figures.map((figure) => {
      const stage = figure.closest('.project-card__stage')!;
      const caption = figure.querySelector('figcaption')!;
      return stage.getBoundingClientRect().bottom - caption.getBoundingClientRect().bottom;
    }),
  );
  expect(Math.max(...stageGaps)).toBeLessThanOrEqual(4);

  await page.goto('/work/chronos-dsp/');
  await expect(page.locator('.next-project')).toHaveCSS('border-top-width', '4px');
  await expect(page.locator('.trace-inspector__stage-row--active')).toHaveCSS(
    'border-bottom-color',
    'rgb(255, 133, 103)',
  );

  await page.goto('/resume/');
  await expect(page.locator('.resume-toolkit p').first()).toHaveCSS('font-size', '15.2px');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/');
  const cardOrder = await page.locator('.project-list .project-card').evaluateAll((cards) =>
    cards.map((card) => {
      const heading = card.querySelector('h3');
      const stage = card.querySelector('.project-card__stage');
      if (!heading || !stage) return true;
      return heading.getBoundingClientRect().top < stage.getBoundingClientRect().top;
    }),
  );
  expect(cardOrder).toEqual([true, true, true, true, true]);

  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/missing-record/');
  const actionWidths = await page
    .locator('.not-found .button')
    .evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().width));
  expect(Math.min(...actionWidths)).toBeGreaterThan(250);
});

test('signal toy labels stay inside the sketch at both handle limits', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const name of ['transmitter', 'receiver']) {
    const handle = page.locator(`[data-signal-handle="${name}"]`);
    for (const key of ['Home', 'End']) {
      await handle.focus();
      await page.keyboard.press(key);
      const bounds = await handle.evaluate((element) => {
        const svg = (element as SVGGElement).ownerSVGElement!;
        const label = element.querySelector('text')!;
        const box = label.getBBox();
        const matrix = label.getScreenCTM()!;
        const inverse = svg.getScreenCTM()!.inverse();
        const points = [
          [box.x, box.y],
          [box.x + box.width, box.y],
          [box.x, box.y + box.height],
          [box.x + box.width, box.y + box.height],
        ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix).matrixTransform(inverse));
        return {
          left: Math.min(...points.map((point) => point.x)),
          right: Math.max(...points.map((point) => point.x)),
        };
      });
      expect(bounds.left, `${name} ${key}`).toBeGreaterThanOrEqual(0);
      expect(bounds.right, `${name} ${key}`).toBeLessThanOrEqual(480);
    }
  }
});

test('signal toy labels reclamp after a desktop-to-mobile resize', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('[data-signal-handle="transmitter"]').focus();
  await page.keyboard.press('Home');
  await page.locator('[data-signal-handle="receiver"]').focus();
  await page.keyboard.press('End');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      page.locator('.signal-toy__svg').evaluate((element) => {
        const svg = element as SVGSVGElement;
        const inverse = svg.getScreenCTM()!.inverse();
        return [...svg.querySelectorAll<SVGTextElement>('.signal-toy__handle-label')].every(
          (label) => {
            const box = label.getBBox();
            const points = [
              [box.x, box.y],
              [box.x + box.width, box.y],
              [box.x, box.y + box.height],
              [box.x + box.width, box.y + box.height],
            ].map(([x, y]) =>
              new DOMPoint(x, y).matrixTransform(label.getScreenCTM()!).matrixTransform(inverse),
            );
            return (
              Math.min(...points.map((point) => point.x)) >= 0 &&
              Math.max(...points.map((point) => point.x)) <= 480
            );
          },
        );
      }),
    )
    .toBe(true);
});

test('signal toy remains positioned without JavaScript and readable on mobile', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-signal-handle="transmitter"]')).toHaveAttribute(
    'transform',
    'translate(104 104)',
  );
  await expect(page.locator('[data-signal-handle="receiver"]')).toHaveAttribute(
    'transform',
    'translate(370 82)',
  );
  await expect(page.locator('.signal-toy__drag-label')).toBeHidden();
  await expect(page.locator('.signal-toy__controls')).toBeHidden();
  await expect(page.locator('[data-signal-handle="transmitter"]')).not.toHaveAttribute('role');
  await expect(page.locator('.signal-toy__handle-label').first()).toHaveCSS('font-size', '16px');
  await expect(page.locator('[data-toy-direct]')).toHaveText('267 units');
  await expect(page.locator('[data-toy-echo]')).toHaveText('365 units');
  await expect(page.locator('.toy-sticker')).toHaveText('drag tx or rx');
  await expect(page.locator('.signal-toy__handle-label').first()).toHaveText('TX / SOURCE');

  await page.goto('/work/life-os/');
  await expect(page.locator('.project-visual__transcript')).toBeVisible();
  const dimensions = await page.locator('.project-visual__root').evaluate((figure) => ({
    clientWidth: figure.clientWidth,
    scrollWidth: figure.scrollWidth,
    svgWidth: figure.querySelector('svg')!.getBoundingClientRect().width,
  }));
  expect(dimensions.svgWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  await context.close();
});
