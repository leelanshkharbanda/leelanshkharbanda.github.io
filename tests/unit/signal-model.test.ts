import { describe, expect, it } from 'vitest';
import {
  CONSTELLATION_BOUND,
  DEFAULT_POINT_COUNT,
  DEFAULT_SEED,
  DEFAULT_SIGNAL_STATE,
  MAX_POINT_COUNT,
  SIGNAL_STAGES,
  SIMULATION_LABEL,
  calculateBer,
  clampPointCount,
  clampStageIndex,
  createDefaultSignalState,
  createSeededRandom,
  formatDecimal,
  formatInteger,
  formatPercent,
  formatScientific,
  formatSeed,
  formatSignalMetric,
  formatStagePosition,
  generateConstellationPoints,
  getSignalSnapshot,
  projectConstellationPoint,
  resetSignalState,
} from '../../src/lib/signal-model';

describe('illustrative signal model', () => {
  it('keeps the four stages in source → channel → receiver → output order', () => {
    expect(SIGNAL_STAGES.map((stage) => stage.id)).toEqual([
      'source',
      'channel',
      'receiver',
      'output',
    ]);
    expect(SIGNAL_STAGES.map((stage) => stage.index)).toEqual([0, 1, 2, 3]);
    expect(SIMULATION_LABEL).toBe('Interactive simulation');
  });

  it('generates deterministic values from the same seed and stage', () => {
    const firstRandom = createSeededRandom(DEFAULT_SEED);
    const secondRandom = createSeededRandom(DEFAULT_SEED);
    const firstSequence = Array.from({ length: 8 }, () => firstRandom());
    const secondSequence = Array.from({ length: 8 }, () => secondRandom());

    expect(firstSequence).toEqual(secondSequence);
    expect(generateConstellationPoints('channel', { count: 24 })).toEqual(
      generateConstellationPoints('channel', { count: 24 }),
    );
    expect(generateConstellationPoints('channel', { count: 24, seed: 1 })).not.toEqual(
      generateConstellationPoints('channel', { count: 24, seed: 2 }),
    );
  });

  it('bounds stage selection, point counts, scatter, and generated coordinates', () => {
    expect(clampStageIndex(-10)).toBe(0);
    expect(clampStageIndex(99)).toBe(3);
    expect(clampStageIndex(Number.NaN)).toBe(0);
    expect(clampPointCount(0)).toBe(1);
    expect(clampPointCount(10_000)).toBe(MAX_POINT_COUNT);

    const points = generateConstellationPoints('output', {
      count: 10_000,
      scatter: 100,
      rotation: 100,
      seed: Number.POSITIVE_INFINITY,
    });

    const diagonalPoints = generateConstellationPoints('source', {
      count: 64,
      scatter: 0.75,
      rotation: Math.PI / 4,
    });

    expect(points).toHaveLength(MAX_POINT_COUNT);
    for (const point of [...points, ...diagonalPoints]) {
      expect(Number.isFinite(point.x)).toBe(true);
      expect(Number.isFinite(point.y)).toBe(true);
      expect(Math.abs(point.x)).toBeLessThanOrEqual(CONSTELLATION_BOUND);
      expect(Math.abs(point.y)).toBeLessThanOrEqual(CONSTELLATION_BOUND);
    }
  });

  it('projects every constellation point inside its bounded SVG plot', () => {
    const points = generateConstellationPoints('channel', { count: 64 });
    for (const point of points) {
      const projected = projectConstellationPoint(point, 240);
      expect(projected.x).toBeGreaterThanOrEqual(0);
      expect(projected.x).toBeLessThanOrEqual(240);
      expect(projected.y).toBeGreaterThanOrEqual(0);
      expect(projected.y).toBeLessThanOrEqual(240);
    }
  });

  it('resets to a fresh documented default and normalizes invalid snapshot state', () => {
    const firstDefault = createDefaultSignalState();
    const secondDefault = createDefaultSignalState();

    expect(firstDefault).toEqual(DEFAULT_SIGNAL_STATE);
    expect(firstDefault).not.toBe(secondDefault);
    firstDefault.stageIndex = 3;
    expect(secondDefault.stageIndex).toBe(0);
    expect(resetSignalState()).toEqual(DEFAULT_SIGNAL_STATE);

    const snapshot = getSignalSnapshot({
      stageIndex: 100,
      seed: Number.NaN,
      pointCount: -1,
    });
    expect(snapshot.state).toEqual({
      stageIndex: 3,
      seed: DEFAULT_SEED,
      pointCount: 1,
    });
    expect(snapshot.stage.id).toBe('output');
    expect(snapshot.points).toHaveLength(1);
  });

  it('keeps the default source constellation on the four ideal QPSK symbols', () => {
    const snapshot = getSignalSnapshot();
    expect(snapshot.state).toEqual(DEFAULT_SIGNAL_STATE);
    expect(snapshot.points).toHaveLength(DEFAULT_POINT_COUNT);
    for (const point of snapshot.points) {
      expect(point.x).toBe(point.idealX);
      expect(point.y).toBe(point.idealY);
    }
  });

  it('bounds BER inputs and handles an empty comparison safely', () => {
    expect(calculateBer(2, 128)).toBe(0.015625);
    expect(calculateBer(-1, 128)).toBe(0);
    expect(calculateBer(200, 128)).toBe(1);
    expect(calculateBer(1, 0)).toBe(0);
    expect(calculateBer(Number.NaN, Number.NaN)).toBe(0);
  });

  it('formats numbers, percentages, seeds, metrics, and stage positions consistently', () => {
    expect(formatInteger(1280)).toBe('1,280');
    expect(formatDecimal(17.234, 1)).toBe('17.2');
    expect(formatPercent(0.015625, 2)).toBe('1.56%');
    expect(formatScientific(0.000015625, 2)).toBe('1.56e-5');
    expect(formatSeed(DEFAULT_SEED)).toBe('0x4348524F');
    expect(formatSignalMetric({ value: 0.015625, format: 'percent', precision: 2 })).toBe('1.56%');
    expect(formatSignalMetric({ value: 'simulation', format: 'text' })).toBe('simulation');
    expect(formatStagePosition(3)).toBe('Stage 4 of 4 · Output');
    expect(formatInteger(Number.NaN)).toBe('—');
    expect(formatPercent(Number.POSITIVE_INFINITY)).toBe('—');
  });
});
