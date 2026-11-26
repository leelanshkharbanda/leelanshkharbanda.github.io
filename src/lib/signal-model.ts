export const SIGNAL_STAGE_IDS = ['source', 'channel', 'receiver', 'output'] as const;

export type SignalStageId = (typeof SIGNAL_STAGE_IDS)[number];
export type MetricFormat = 'integer' | 'decimal' | 'percent' | 'scientific' | 'seed' | 'text';

export interface SignalMetric {
  readonly label: string;
  readonly value: number | string;
  readonly format: MetricFormat;
  readonly precision?: number;
  readonly unit?: string;
}

export interface SignalStage {
  readonly id: SignalStageId;
  readonly index: number;
  readonly datum: string;
  readonly label: string;
  readonly summary: string;
  readonly detail: string;
  readonly change: string;
  readonly output: string;
  readonly scatter: number;
  readonly rotation: number;
  readonly metrics: readonly SignalMetric[];
}

export interface SignalState {
  stageIndex: number;
  seed: number;
  pointCount: number;
}

export interface ConstellationPoint {
  readonly index: number;
  readonly stage: SignalStageId;
  readonly symbol: 0 | 1 | 2 | 3;
  readonly idealX: number;
  readonly idealY: number;
  readonly x: number;
  readonly y: number;
}

export interface ConstellationOptions {
  count?: number;
  seed?: number;
  scatter?: number;
  rotation?: number;
}

export interface SignalSnapshot {
  readonly state: SignalState;
  readonly stage: SignalStage;
  readonly points: readonly ConstellationPoint[];
}

export const SIMULATION_LABEL = 'Illustrative simulation · not hardware-measured';
export const FIXTURE_NOTICE =
  'Fixed values for this portfolio sketch; not recorded Chronos-DSP output.';

export const DEFAULT_SEED = 0x4348524f;
export const DEFAULT_POINT_COUNT = 64;
export const MIN_POINT_COUNT = 1;
export const MAX_POINT_COUNT = 256;
export const MAX_CONSTELLATION_SCATTER = 0.75;
export const CONSTELLATION_BOUND =
  Math.ceil((Math.SQRT2 + MAX_CONSTELLATION_SCATTER) * 1_000_000) / 1_000_000;

const ILLUSTRATIVE_BIT_COUNT = 128;
const ILLUSTRATIVE_BIT_ERRORS = 2;

export function calculateBer(bitErrors: number, bitCount: number): number {
  if (!Number.isFinite(bitCount) || bitCount <= 0) return 0;
  const boundedBits = Math.max(1, Math.trunc(bitCount));
  const boundedErrors = Number.isFinite(bitErrors) ? Math.trunc(bitErrors) : 0;
  return Math.min(Math.max(0, boundedErrors), boundedBits) / boundedBits;
}

export const SIGNAL_STAGES: readonly SignalStage[] = [
  {
    id: 'source',
    index: 0,
    datum: 'TS-01',
    label: 'Source',
    summary: 'Scene geometry, QPSK symbols, and a repeatable seed establish the starting state.',
    detail:
      'This fixed fixture uses 64 symbols and three candidate paths to show how the stages relate. It does not recreate a particular Chronos-DSP scene.',
    change: 'Establish the symbol stream, candidate paths, and deterministic starting seed.',
    output: 'Seeded source symbols',
    scatter: 0,
    rotation: 0,
    metrics: [
      { label: 'Fixture symbols', value: DEFAULT_POINT_COUNT, format: 'integer', unit: 'symbols' },
      { label: 'Candidate paths', value: 3, format: 'integer', unit: 'paths' },
      { label: 'Seed', value: DEFAULT_SEED, format: 'seed' },
    ],
  },
  {
    id: 'channel',
    index: 1,
    datum: 'TS-02',
    label: 'Channel',
    summary: 'Candidate paths and illustrative impairment spread and rotate the source symbols.',
    detail:
      'The scatter is a visual sketch of multipath and impairment, not numerical output from the Chronos-DSP renderer or a calibrated radio channel.',
    change: 'Introduce conceptual path impairment while keeping the fixture deterministic.',
    output: 'Impaired simulated symbols',
    scatter: 0.38,
    rotation: -0.3,
    metrics: [
      { label: 'Candidate paths', value: 3, format: 'integer', unit: 'paths' },
      {
        label: 'Scatter spread',
        value: 0.38,
        format: 'decimal',
        precision: 2,
        unit: 'illustrative units',
      },
      { label: 'Seed', value: DEFAULT_SEED, format: 'seed' },
    ],
  },
  {
    id: 'receiver',
    index: 2,
    datum: 'TS-03',
    label: 'Receiver',
    summary: 'Decision boundaries recover a simulated symbol stream from the impaired view.',
    detail:
      'The view reduces scatter and removes the illustrative rotation to show receiver decisions. It does not validate a synchronizer or receiver design.',
    change: 'Apply conceptual decision and phase correction to the simulated symbols.',
    output: 'Recovered symbol decisions',
    scatter: 0.16,
    rotation: 0,
    metrics: [
      { label: 'Decision points', value: DEFAULT_POINT_COUNT, format: 'integer', unit: 'symbols' },
      { label: 'Phase correction', value: 17.2, format: 'decimal', precision: 1, unit: 'degrees' },
      {
        label: 'Residual scatter',
        value: 0.16,
        format: 'decimal',
        precision: 2,
        unit: 'illustrative units',
      },
    ],
  },
  {
    id: 'output',
    index: 3,
    datum: 'TS-04',
    label: 'Output',
    summary: 'Simulated IQ, path count, and an error metric update together.',
    detail:
      'Two fixture bit errors in 128 bits produce an illustrative BER of 1.56%. This is a portfolio sketch, not Chronos-DSP output or a hardware measurement.',
    change: 'Collect the recovered symbols and illustrative error count into an output ledger.',
    output: 'IQ view and illustrative BER',
    scatter: 0.07,
    rotation: 0,
    metrics: [
      { label: 'Compared bits', value: ILLUSTRATIVE_BIT_COUNT, format: 'integer', unit: 'bits' },
      {
        label: 'Fixture bit errors',
        value: ILLUSTRATIVE_BIT_ERRORS,
        format: 'integer',
        unit: 'bits',
      },
      {
        label: 'Illustrative BER',
        value: calculateBer(ILLUSTRATIVE_BIT_ERRORS, ILLUSTRATIVE_BIT_COUNT),
        format: 'percent',
        precision: 2,
      },
    ],
  },
];

export const DEFAULT_SIGNAL_STATE: Readonly<SignalState> = Object.freeze({
  stageIndex: 0,
  seed: DEFAULT_SEED,
  pointCount: DEFAULT_POINT_COUNT,
});

const QPSK_SYMBOLS = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
] as const;

const integerFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

function clampNumber(value: number, minimum: number, maximum: number, fallback: number): number {
  return Number.isFinite(value) ? Math.min(maximum, Math.max(minimum, value)) : fallback;
}

function clampInteger(value: number, minimum: number, maximum: number, fallback: number): number {
  return Math.trunc(clampNumber(value, minimum, maximum, fallback));
}

function roundTo(value: number, precision = 6): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function normalizeSeed(seed: number): number {
  return Number.isFinite(seed) ? Math.trunc(seed) >>> 0 : DEFAULT_SEED;
}

export function clampStageIndex(stageIndex: number): number {
  return clampInteger(stageIndex, 0, SIGNAL_STAGES.length - 1, DEFAULT_SIGNAL_STATE.stageIndex);
}

export function clampPointCount(pointCount: number): number {
  return clampInteger(
    pointCount,
    MIN_POINT_COUNT,
    MAX_POINT_COUNT,
    DEFAULT_SIGNAL_STATE.pointCount,
  );
}

export function createSeededRandom(seed: number): () => number {
  let state = normalizeSeed(seed) || 0x6d2b79f5;

  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
}

export function getStage(stageIndex: number): SignalStage {
  return SIGNAL_STAGES[clampStageIndex(stageIndex)]!;
}

export function getStageById(stageId: SignalStageId): SignalStage {
  return SIGNAL_STAGES.find((stage) => stage.id === stageId) ?? SIGNAL_STAGES[0]!;
}

export function createDefaultSignalState(): SignalState {
  return { ...DEFAULT_SIGNAL_STATE };
}

export function resetSignalState(): SignalState {
  return createDefaultSignalState();
}

export function generateConstellationPoints(
  stageId: SignalStageId,
  options: ConstellationOptions = {},
): ConstellationPoint[] {
  const stage = getStageById(stageId);
  const count = clampPointCount(options.count ?? DEFAULT_POINT_COUNT);
  const seed = normalizeSeed(options.seed ?? DEFAULT_SEED);
  const scatter = clampNumber(
    options.scatter ?? stage.scatter,
    0,
    MAX_CONSTELLATION_SCATTER,
    stage.scatter,
  );
  const rotation = clampNumber(
    options.rotation ?? stage.rotation,
    -Math.PI,
    Math.PI,
    stage.rotation,
  );
  const random = createSeededRandom(seed);
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);

  return Array.from({ length: count }, (_, index) => {
    const symbol = Math.floor(random() * QPSK_SYMBOLS.length) as 0 | 1 | 2 | 3;
    const ideal = QPSK_SYMBOLS[symbol]!;
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(random()) * scatter;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    const rotatedX = ideal.x * cosine - ideal.y * sine;
    const rotatedY = ideal.x * sine + ideal.y * cosine;

    return {
      index,
      stage: stage.id,
      symbol,
      idealX: ideal.x,
      idealY: ideal.y,
      x: roundTo(rotatedX + offsetX),
      y: roundTo(rotatedY + offsetY),
    };
  });
}

export function getSignalSnapshot(state: Partial<SignalState> = {}): SignalSnapshot {
  const normalizedState: SignalState = {
    stageIndex: clampStageIndex(state.stageIndex ?? DEFAULT_SIGNAL_STATE.stageIndex),
    seed: normalizeSeed(state.seed ?? DEFAULT_SIGNAL_STATE.seed),
    pointCount: clampPointCount(state.pointCount ?? DEFAULT_SIGNAL_STATE.pointCount),
  };
  const stage = getStage(normalizedState.stageIndex);

  return {
    state: normalizedState,
    stage,
    points: generateConstellationPoints(stage.id, {
      seed: normalizedState.seed,
      count: normalizedState.pointCount,
    }),
  };
}

export function projectConstellationPoint(
  point: Pick<ConstellationPoint, 'x' | 'y'>,
  size = 240,
): { x: number; y: number } {
  const boundedSize = clampNumber(size, 120, 1024, 240);
  const center = boundedSize / 2;
  const scale = (boundedSize * 0.34) / CONSTELLATION_BOUND;

  return {
    x: roundTo(center + point.x * scale, 3),
    y: roundTo(center - point.y * scale, 3),
  };
}

export function formatInteger(value: number): string {
  return Number.isFinite(value) ? integerFormatter.format(value) : '—';
}

export function formatDecimal(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return '—';
  const digits = clampInteger(precision, 0, 6, 2);
  const normalized = Object.is(value, -0) ? 0 : value;
  return normalized.toFixed(digits);
}

export function formatPercent(fraction: number, precision = 2): string {
  return Number.isFinite(fraction) ? `${formatDecimal(fraction * 100, precision)}%` : '—';
}

export function formatScientific(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return '—';
  const digits = clampInteger(precision, 0, 6, 2);
  return value.toExponential(digits);
}

export function formatSeed(seed: number): string {
  return `0x${normalizeSeed(seed).toString(16).toUpperCase().padStart(8, '0')}`;
}

export function formatSignalMetric(
  metric: Pick<SignalMetric, 'value' | 'format' | 'precision'>,
): string {
  const { value, format, precision } = metric;
  if (format === 'text' || typeof value === 'string') return String(value);

  switch (format) {
    case 'integer':
      return formatInteger(value);
    case 'decimal':
      return formatDecimal(value, precision);
    case 'percent':
      return formatPercent(value, precision);
    case 'scientific':
      return formatScientific(value, precision);
    case 'seed':
      return formatSeed(value);
  }
}

export function formatStagePosition(stageIndex: number): string {
  const stage = getStage(stageIndex);
  return `Stage ${stage.index + 1} of ${SIGNAL_STAGES.length} · ${stage.label}`;
}
