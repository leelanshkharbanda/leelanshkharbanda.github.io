import { useEffect, useState } from 'react';
import {
  FIXTURE_NOTICE,
  SIMULATION_LABEL,
  SIGNAL_STAGES,
  clampStageIndex,
  formatSignalMetric,
  formatStagePosition,
  getSignalSnapshot,
  projectConstellationPoint,
  resetSignalState,
} from '../../lib/signal-model';

export interface TraceInspectorProps {
  id?: string;
}

const CHRONOS_SOURCE_URL = 'https://github.com/leelanshkharbanda/Chronos-DSP';

export default function TraceInspector({ id = 'chronos-trace-inspector' }: TraceInspectorProps) {
  const [stageIndex, setStageIndex] = useState(resetSignalState().stageIndex);
  const [isHydrated, setIsHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState('Initial illustrative source stage.');
  const snapshot = getSignalSnapshot({ stageIndex });
  const { stage, points } = snapshot;

  const safeId =
    id
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'chronos-trace-inspector';
  const headingId = `trace-inspector-${safeId}-heading`;
  const titleId = `trace-inspector-${safeId}-svg-title`;
  const descriptionId = `trace-inspector-${safeId}-svg-description`;
  const markerId = `trace-inspector-${safeId}-arrow`;
  const panelId = `trace-inspector-${safeId}-panel`;
  const activeHeadingId = `trace-inspector-${safeId}-active-heading`;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  function moveToStage(nextIndex: number) {
    const boundedIndex = clampStageIndex(nextIndex);
    const nextStage = SIGNAL_STAGES[boundedIndex]!;
    setStageIndex(boundedIndex);
    setAnnouncement(`${formatStagePosition(boundedIndex)}. ${nextStage.output}.`);
  }

  function resetTrace() {
    const defaults = resetSignalState();
    setStageIndex(defaults.stageIndex);
    setAnnouncement('Reset to Stage 1 of 4 · Source.');
  }

  return (
    <section
      className="trace-inspector__root"
      id={`trace-inspector-${safeId}`}
      aria-labelledby={headingId}
      data-stage={stage.id}
      data-active-stage={stage.id}
      data-hydrated={isHydrated ? 'true' : 'false'}
    >
      <header className="trace-inspector__header">
        <div>
          <p className="trace-inspector__eyebrow">Chronos-DSP / evidence ledger</p>
          <h2 className="trace-inspector__heading" id={headingId}>
            Trace Inspector
          </h2>
          <p className="trace-inspector__introduction">
            Follow one fixed, illustrative signal fixture from source geometry to simulated output.
          </p>
        </div>
        <p className="trace-inspector__evidence-label">{SIMULATION_LABEL}</p>
      </header>

      <p className="trace-inspector__notice">{FIXTURE_NOTICE}</p>

      <div
        className="trace-inspector__controls"
        role="group"
        aria-label="Trace stage controls"
        aria-busy={!isHydrated}
      >
        <button
          className="trace-inspector__button"
          type="button"
          disabled={!isHydrated || stageIndex === 0}
          onClick={() => moveToStage(stageIndex - 1)}
          aria-controls={panelId}
        >
          Previous
        </button>
        <button
          className="trace-inspector__button"
          type="button"
          disabled={!isHydrated || stageIndex === SIGNAL_STAGES.length - 1}
          onClick={() => moveToStage(stageIndex + 1)}
          aria-controls={panelId}
        >
          Next
        </button>
        <button
          className="trace-inspector__button trace-inspector__button--reset"
          type="button"
          disabled={!isHydrated}
          onClick={resetTrace}
          aria-controls={panelId}
        >
          Reset
        </button>
      </div>

      {!isHydrated && (
        <p className="trace-inspector__loading">
          Static source stage shown. Stage controls become available when the island loads.
        </p>
      )}

      <ol className="trace-inspector__stages" aria-label="Signal path stages">
        {SIGNAL_STAGES.map((row) => {
          const isActive = row.id === stage.id;
          return (
            <li
              className={`trace-inspector__stage-row${isActive ? ' trace-inspector__stage-row--active' : ''}`}
              key={row.id}
              aria-current={isActive ? 'step' : undefined}
              data-stage={row.id}
            >
              <span className="trace-inspector__stage-datum" aria-hidden="true">
                {row.datum}
              </span>
              <div className="trace-inspector__stage-copy">
                <h3 className="trace-inspector__stage-label">{row.label}</h3>
                <p className="trace-inspector__stage-summary">{row.summary}</p>
              </div>
              <span className="trace-inspector__stage-state">
                {isActive ? 'Active stage' : `Stage ${row.index + 1}`}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="trace-inspector__status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div className="trace-inspector__panel" id={panelId}>
        <div className="trace-inspector__readout">
          <p className="trace-inspector__readout-position">{formatStagePosition(stageIndex)}</p>
          <h3 className="trace-inspector__readout-heading" id={activeHeadingId}>
            {stage.label} <span className="trace-inspector__readout-datum">{stage.datum}</span>
          </h3>
          <p className="trace-inspector__readout-detail">{stage.detail}</p>
          <p className="trace-inspector__readout-change">
            <strong>What changes:</strong> {stage.change}
          </p>
          <p className="trace-inspector__readout-output">
            <strong>Output:</strong> {stage.output}
          </p>

          <dl className="trace-inspector__metrics">
            {stage.metrics.map((metric) => (
              <div className="trace-inspector__metric" key={metric.label}>
                <dt className="trace-inspector__metric-label">{metric.label}</dt>
                <dd className="trace-inspector__metric-value">
                  {formatSignalMetric(metric)}
                  {metric.unit ? (
                    <span className="trace-inspector__metric-unit"> {metric.unit}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <p className="trace-inspector__source-note">
            Mechanism source:{' '}
            <a className="trace-inspector__source-link" href={CHRONOS_SOURCE_URL}>
              Chronos-DSP repository
            </a>
            . This fixture explains stage relationships; it does not reproduce repository output.
          </p>
        </div>

        <figure className="trace-inspector__figure">
          <svg
            className="trace-inspector__svg"
            viewBox="0 0 720 390"
            width="720"
            height="390"
            role="img"
            aria-labelledby={`${titleId} ${descriptionId}`}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
          >
            <title id={titleId}>Illustrative signal path and QPSK constellation</title>
            <desc id={descriptionId}>
              Active stage: {stage.label}. {stage.summary} The constellation uses fixed illustrative
              values and is not hardware-measured.
            </desc>
            <defs>
              <marker
                id={markerId}
                className="trace-inspector__arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path className="trace-inspector__arrow-path" d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>

            <g className="trace-inspector__path" aria-hidden="true">
              {SIGNAL_STAGES.map((row) => {
                const x = 52 + row.index * 166;
                const isActive = row.id === stage.id;
                return (
                  <g
                    className={`trace-inspector__path-node${isActive ? ' trace-inspector__path-node--active' : ''}`}
                    data-stage={row.id}
                    key={row.id}
                  >
                    <rect
                      className="trace-inspector__path-box"
                      x={x}
                      y="34"
                      width="132"
                      height="62"
                      rx="2"
                    />
                    <text className="trace-inspector__path-datum" x={x + 12} y="55">
                      {row.datum}
                    </text>
                    <text className="trace-inspector__path-label" x={x + 12} y="80">
                      {row.label}
                    </text>
                  </g>
                );
              })}
              <path
                className="trace-inspector__path-link"
                d="M 184 65 L 206 65"
                marker-end={`url(#${markerId})`}
              />
              <path
                className="trace-inspector__path-link"
                d="M 350 65 L 372 65"
                marker-end={`url(#${markerId})`}
              />
              <path
                className="trace-inspector__path-link"
                d="M 516 65 L 538 65"
                marker-end={`url(#${markerId})`}
              />
            </g>

            <g
              className="trace-inspector__constellation"
              transform="translate(250 132)"
              aria-hidden="true"
            >
              <rect
                className="trace-inspector__plot-frame"
                x="0"
                y="0"
                width="220"
                height="220"
                rx="2"
              />
              <path className="trace-inspector__axis" d="M 110 12 L 110 208 M 12 110 L 208 110" />
              <text className="trace-inspector__plot-label" x="208" y="102" text-anchor="end">
                I
              </text>
              <text className="trace-inspector__plot-label" x="118" y="20">
                Q
              </text>
              {points.map((point) => {
                const projected = projectConstellationPoint(point, 220);
                return (
                  <circle
                    className="trace-inspector__point"
                    cx={projected.x}
                    cy={projected.y}
                    r="3.5"
                    key={point.index}
                  />
                );
              })}
            </g>
            <text className="trace-inspector__plot-caption" x="360" y="378" text-anchor="middle">
              FIXED ILLUSTRATIVE QPSK VIEW / {stage.label.toUpperCase()}
            </text>
          </svg>
          <figcaption className="trace-inspector__figure-caption">
            The active row, datum, metric ledger, and constellation update together. Values change
            immediately; no trace animation or autoplay is used.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
