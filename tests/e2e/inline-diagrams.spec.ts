import { expect, test } from '@playwright/test';

const diagrams = [
  { slug: 'chronos-dsp', type: 'signal-path' },
  { slug: 'life-os', type: 'local-system' },
  { slug: 'modulation-studio', type: 'constellation' },
  { slug: 'hpc-boost', type: 'counter-ledger' },
  { slug: 'moe-memory-wall', type: 'memory-grid' },
  { slug: 'riscv-simulator', type: 'instruction-trace' },
];

const connectorTopology: Record<string, { full: string[]; compact: string[] }> = {
  'signal-path': {
    full: [
      'direct:tx→rx',
      'reflected:tx→rx',
      'transmitted:tx→rx',
      'scene-source:tx→TS-01',
      'scene-channel:rx→TS-02',
      'paths-receiver:candidate-paths→TS-03',
      'source-channel:TS-01→TS-02',
      'channel-receiver:TS-02→TS-03',
      'receiver-output:TS-03→TS-04',
    ],
    compact: [
      'compact-source-channel:TS-01→TS-02',
      'compact-channel-receiver:TS-02→TS-03',
      'compact-receiver-output:TS-03→TS-04',
    ],
  },
  'local-system': {
    full: [
      'react-tauri:react→tauri',
      'tauri-rust:tauri→rust',
      'local-sqlite:local-bus→sqlite',
      'local-onnx:local-bus→onnx',
      'local-lancedb:local-bus→lancedb',
      'context-loop:context-bus→context',
      'optional-network:rust→optional-network',
    ],
    compact: [
      'compact-ui-ipc:ui→ipc',
      'compact-ipc-rust:ipc→rust-compact',
      'compact-local-sqlite:local-bus-compact→sqlite-compact',
      'compact-local-onnx:local-bus-compact→onnx-compact',
      'compact-local-lance:local-bus-compact→lance-compact',
      'compact-context-loop:context-bus-compact→context-compact',
      'compact-optional:local-core→optional-compact',
    ],
  },
  constellation: {
    full: ['source-channel:source→channel', 'channel-receiver:channel→receiver'],
    compact: ['compact-source-channel:source→channel', 'compact-channel-receiver:channel→receiver'],
  },
  'counter-ledger': {
    full: [
      'traces-budget:step-01→step-02',
      'budget-subsets:step-02→step-03',
      'subsets-fixed:step-03→step-04',
      'fixed-heldout:step-04→step-05',
      'fixed-selection:step-04→selection',
      'heldout-result:step-05→negative',
    ],
    compact: [
      'compact-train-evaluate:train→evaluate',
      'compact-evaluate-negative:evaluate→negative',
    ],
  },
  'memory-grid': {
    full: [
      'predictor-cache:predictor→cache',
      'experts-cache-prefetch:experts→cache',
      'experts-cache-demand:experts→cache',
      'cache-decode:cache→decode',
    ],
    compact: [
      'compact-predictor-cache:predictor→cache',
      'compact-experts-cache-prefetch:experts→cache',
      'compact-experts-cache-demand:experts→cache',
      'compact-cache-decode:cache→decode',
    ],
  },
  'instruction-trace': {
    full: ['assembly-encoding:assembly→encoding', 'encoding-state:encoding→state'],
    compact: [
      'compact-assembly-encoding:assembly→encoding',
      'compact-encoding-state:encoding→state',
    ],
  },
};

const inspectGeometry = (svg: SVGSVGElement) => {
  const frame = svg.getBoundingClientRect();
  const isVisible = (element: Element) =>
    element.getClientRects().length > 0 && getComputedStyle(element).display !== 'none';
  const texts = [...svg.querySelectorAll('text')].filter(isVisible).map((element) => {
    const box = element.getBoundingClientRect();
    return {
      text: element.textContent?.trim().replace(/\s+/g, ' '),
      x: box.x - frame.x,
      y: box.y - frame.y,
      width: box.width,
      height: box.height,
    };
  });
  const outside = texts.filter(
    (box) =>
      box.x < -1 ||
      box.y < -1 ||
      box.x + box.width > frame.width + 1 ||
      box.y + box.height > frame.height + 1,
  );
  const overlaps: string[] = [];
  for (let first = 0; first < texts.length; first += 1) {
    for (let second = first + 1; second < texts.length; second += 1) {
      const a = texts[first];
      const b = texts[second];
      const width = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
      const height = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
      if (width > 1 && height > 1) {
        overlaps.push(`${a.text} / ${b.text}`);
      }
    }
  }
  const scale = Math.abs(svg.getScreenCTM()?.a ?? 1);
  const minRenderedFontSize = Math.min(
    ...[...svg.querySelectorAll<SVGTextElement>('text')]
      .filter(isVisible)
      .map((element) => Number.parseFloat(getComputedStyle(element).fontSize) * scale),
  );
  return {
    outside: outside.map((box) => box.text),
    overlaps,
    visibleTextCount: texts.length,
    minRenderedFontSize,
    visibleLayouts: [...svg.querySelectorAll('[data-layout]')]
      .filter(isVisible)
      .map((element) => element.getAttribute('data-layout')),
  };
};

const inspectTopology = (svg: SVGSVGElement) => {
  const isVisible = (element: Element) =>
    element.getClientRects().length > 0 && getComputedStyle(element).display !== 'none';
  const layout = [...svg.querySelectorAll('[data-layout]')].find(isVisible);
  if (!layout) return { actual: [], detached: ['missing visible layout'] };
  const inverse = svg.getScreenCTM()!.inverse();
  const nodeBounds = (name: string) => {
    const node = [...layout.querySelectorAll<SVGGraphicsElement>('[data-node]')].find(
      (element) => element.dataset.node === name,
    );
    if (!node) return null;
    const box = node.getBBox();
    const matrix = node.getScreenCTM()!;
    const points = [
      [box.x, box.y],
      [box.x + box.width, box.y],
      [box.x, box.y + box.height],
      [box.x + box.width, box.y + box.height],
    ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix).matrixTransform(inverse));
    return {
      left: Math.min(...points.map((point) => point.x)),
      right: Math.max(...points.map((point) => point.x)),
      top: Math.min(...points.map((point) => point.y)),
      bottom: Math.max(...points.map((point) => point.y)),
    };
  };
  const distance = (point: DOMPoint, bounds: NonNullable<ReturnType<typeof nodeBounds>>) => {
    const x = Math.max(bounds.left, Math.min(point.x, bounds.right));
    const y = Math.max(bounds.top, Math.min(point.y, bounds.bottom));
    return Math.hypot(point.x - x, point.y - y);
  };
  const connectors = [...layout.querySelectorAll<SVGGeometryElement>('[data-connector]')].filter(
    isVisible,
  );
  const actual = connectors.map(
    (connector) =>
      `${connector.dataset.connector}:${connector.dataset.from}→${connector.dataset.to}`,
  );
  const detached = connectors.flatMap((connector) => {
    const start = connector.getPointAtLength(0);
    const end = connector.getPointAtLength(connector.getTotalLength());
    const matrix = connector.getScreenCTM()!;
    const startPoint = new DOMPoint(start.x, start.y)
      .matrixTransform(matrix)
      .matrixTransform(inverse);
    const endPoint = new DOMPoint(end.x, end.y).matrixTransform(matrix).matrixTransform(inverse);
    const from = nodeBounds(connector.dataset.from ?? '');
    const to = nodeBounds(connector.dataset.to ?? '');
    if (!from || !to) return [`${connector.dataset.connector}:missing node`];
    return distance(startPoint, from) <= 8 && distance(endPoint, to) <= 8
      ? []
      : [`${connector.dataset.connector}:detached`];
  });
  return { actual, detached };
};

test('inline diagrams keep complete desktop geometry without text collisions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const diagram of diagrams) {
    await page.goto(`/work/${diagram.slug}/`);
    const root = page.locator('.case-body > .project-visual__root');
    const svg = root.locator('svg');
    await expect(root).toHaveAttribute('data-diagram', diagram.type);
    await expect(svg).toHaveCount(1);
    await expect(root.locator('[data-layout="full"]')).toBeVisible();
    await expect(root.locator('[data-layout="compact"]')).toBeHidden();
    const geometry = await svg.evaluate(inspectGeometry);
    expect(geometry.outside, `${diagram.type} text outside SVG`).toEqual([]);
    expect(geometry.overlaps, `${diagram.type} text collisions`).toEqual([]);
    expect(geometry.visibleLayouts).toEqual(['full']);
    const topology = await svg.evaluate(inspectTopology);
    expect(topology.actual, `${diagram.type} full connector topology`).toEqual(
      connectorTopology[diagram.type]!.full,
    );
    expect(topology.detached, `${diagram.type} full connector endpoints`).toEqual([]);
    expect(await root.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
      true,
    );
  }
});

test('inline diagrams switch to simpler readable phone layouts', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const diagram of diagrams) {
    await page.goto(`/work/${diagram.slug}/`);
    const root = page.locator('.case-body > .project-visual__root');
    const svg = root.locator('svg');
    await expect(root.locator('[data-layout="full"]')).toBeHidden();
    await expect(root.locator('[data-layout="compact"]')).toBeVisible();
    const geometry = await svg.evaluate(inspectGeometry);
    expect(geometry.outside, `${diagram.type} compact text outside SVG`).toEqual([]);
    expect(geometry.overlaps, `${diagram.type} compact text collisions`).toEqual([]);
    expect(geometry.visibleLayouts).toEqual(['compact']);
    expect(geometry.visibleTextCount).toBeGreaterThanOrEqual(3);
    expect(
      geometry.minRenderedFontSize,
      `${diagram.type} compact rendered type`,
    ).toBeGreaterThanOrEqual(11.5);
    const topology = await svg.evaluate(inspectTopology);
    expect(topology.actual, `${diagram.type} compact connector topology`).toEqual(
      connectorTopology[diagram.type]!.compact,
    );
    expect(topology.detached, `${diagram.type} compact connector endpoints`).toEqual([]);
    expect(await root.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
      true,
    );
  }
});

test('compact inline diagrams remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  for (const diagram of diagrams) {
    await page.goto(`/work/${diagram.slug}/`);
    const root = page.locator('.case-body > .project-visual__root');
    await expect(root.locator('svg')).toBeVisible();
    await expect(root.locator('[data-layout="compact"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Inspect/ })).toBeHidden();
  }
  await context.close();
});

test('inspector keeps the detailed layout when the inline phone diagram is compact', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/chronos-dsp/');
  const root = page.locator('.case-body > .project-visual__root');
  await expect(root.locator('[data-layout="compact"]')).toBeVisible();
  await page.getByRole('button', { name: /Inspect/ }).click();
  const inspectorSvg = page.locator('.diagram-inspector__svg');
  await expect(inspectorSvg.locator('[data-layout="full"]')).toBeVisible();
  await expect(inspectorSvg.locator('[data-layout="compact"]')).toBeHidden();
  await expect(root.locator('[data-layout="compact"]')).toBeVisible();
});
