type HandleName = 'transmitter' | 'receiver';
type PulseName = 'direct' | 'echo';
type PulseIndicatorState = 'idle' | 'running' | 'direct' | 'echo' | 'complete' | 'static';

type Point = { x: number; y: number };

type LabelBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type PulseTrack = {
  name: PulseName;
  path: SVGPathElement;
  group: SVGGElement;
  dots: SVGCircleElement[];
  readout: HTMLElement | null;
  length: number;
  duration: number;
  arrived: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const handleMin = 48;
const handleMax = 432;
const handleMinY = 54;
const handleMaxY = 166;
const handleSeparation = 144;

const overlapArea = (first: LabelBox, second: LabelBox) =>
  Math.max(
    0,
    Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x),
  ) *
  Math.max(
    0,
    Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y),
  );

const labelCandidates = (point: Point, label: Pick<LabelBox, 'width' | 'height'>): LabelBox[] => {
  const centeredX = clamp(point.x - label.width / 2, 8, 480 - label.width - 8);
  return [
    { ...label, x: centeredX, y: clamp(point.y + 34, 8, 270 - label.height - 8) },
    { ...label, x: centeredX, y: clamp(point.y - 34 - label.height, 8, 270 - label.height - 8) },
    {
      ...label,
      x: clamp(point.x + 34, 8, 480 - label.width - 8),
      y: clamp(point.y - label.height / 2, 8, 270 - label.height - 8),
    },
    {
      ...label,
      x: clamp(point.x - 34 - label.width, 8, 480 - label.width - 8),
      y: clamp(point.y - label.height / 2, 8, 270 - label.height - 8),
    },
    {
      ...label,
      x: clamp(point.x + 24, 8, 480 - label.width - 8),
      y: clamp(point.y + 28, 8, 270 - label.height - 8),
    },
    {
      ...label,
      x: clamp(point.x - label.width - 24, 8, 480 - label.width - 8),
      y: clamp(point.y + 28, 8, 270 - label.height - 8),
    },
    {
      ...label,
      x: clamp(point.x + 24, 8, 480 - label.width - 8),
      y: clamp(point.y - label.height - 28, 8, 270 - label.height - 8),
    },
    {
      ...label,
      x: clamp(point.x - label.width - 24, 8, 480 - label.width - 8),
      y: clamp(point.y - label.height - 28, 8, 270 - label.height - 8),
    },
  ];
};

export function updateSignalToy(toy: HTMLElement) {
  const svg = toy.querySelector<SVGSVGElement>('.signal-toy__svg');
  if (!svg) return;

  const handles = new Map<HandleName, SVGGElement>();
  toy.querySelectorAll<SVGGElement>('[data-signal-handle]').forEach((handle) => {
    const name = handle.dataset.signalHandle as HandleName;
    if (name === 'transmitter' || name === 'receiver') handles.set(name, handle);
  });

  const transmitter = handles.get('transmitter');
  const receiver = handles.get('receiver');
  const directPath = toy.querySelector<SVGPathElement>('[data-signal-path="direct"]');
  const echoPath = toy.querySelector<SVGPathElement>('[data-signal-path="echo"]');
  const bounce = toy.querySelector<SVGCircleElement>('[data-signal-bounce]');
  const directReadout = toy.querySelector<HTMLElement>('[data-toy-direct]');
  const echoReadout = toy.querySelector<HTMLElement>('[data-toy-echo]');
  const pulseButton = toy.querySelector<HTMLButtonElement>('[data-toy-pulse]');
  const pulseStatus = toy.querySelector<HTMLElement>('[data-toy-pulse-status]');
  const pulseIndicator = toy.querySelector<HTMLElement>('[data-toy-pulse-indicator]');
  const directPulse = toy.querySelector<SVGGElement>('[data-signal-pulse="direct"]');
  const echoPulse = toy.querySelector<SVGGElement>('[data-signal-pulse="echo"]');
  if (!transmitter || !receiver || !directPath || !echoPath || !bounce) return;

  const controls = toy.querySelector<HTMLElement>('.signal-toy__controls');
  const dragLabel = toy.querySelector<HTMLElement>('.signal-toy__drag-label');
  const interactiveNote = toy.querySelector<HTMLElement>('.signal-toy__interactive-note');
  const keyboardHelp = toy.querySelector<HTMLElement>('#signal-toy-keyboard-help');
  const legend = toy.querySelector<SVGGElement>('.signal-toy__legend');
  toy.classList.add('has-signal-toy-controls');
  if (controls) controls.hidden = false;
  if (dragLabel) dragLabel.hidden = false;
  if (interactiveNote) interactiveNote.hidden = false;
  if (keyboardHelp) keyboardHelp.hidden = false;

  const initial: Record<HandleName, Point> = {
    transmitter: { x: 104, y: 104 },
    receiver: { x: 370, y: 82 },
  };
  const state: Record<HandleName, Point> = {
    transmitter: { ...initial.transmitter },
    receiver: { ...initial.receiver },
  };
  let active: HandleName | null = null;
  let activePointerId: number | null = null;
  let grabOffset: Point | null = null;
  let tickFrame = 0;
  let pulseFrame = 0;
  let pulseFinishTimer = 0;
  let pulseStartedAt = 0;
  let pulseRunning = false;
  const pulseTracks: PulseTrack[] = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionAllowed = () =>
    !reducedMotion.matches && document.documentElement.dataset.motion !== 'reduced';

  const setPulseIndicator = (state: PulseIndicatorState, label: string) => {
    if (!pulseIndicator) return;
    pulseIndicator.dataset.state = state;
    pulseIndicator.textContent = label;
  };

  const tickReadout = (readout: HTMLElement | null) => {
    if (!readout || !motionAllowed()) return;
    readout.classList.remove('is-ticking');
    void readout.offsetWidth;
    readout.classList.add('is-ticking');
  };

  const tickReadouts = () => {
    window.cancelAnimationFrame(tickFrame);
    for (const readout of [directReadout, echoReadout]) readout?.classList.remove('is-ticking');
    if (!motionAllowed()) return;
    tickFrame = window.requestAnimationFrame(() => {
      tickReadout(directReadout);
      tickReadout(echoReadout);
    });
  };

  for (const readout of [directReadout, echoReadout]) {
    if (!readout) continue;
    const clearTick = (event: AnimationEvent) => {
      if (event.animationName === 'signal-readout-tick') readout.classList.remove('is-ticking');
    };
    readout.addEventListener('animationend', clearTick);
    readout.addEventListener('animationcancel', clearTick);
  }

  const cancelPulse = (message = '') => {
    window.cancelAnimationFrame(pulseFrame);
    window.clearTimeout(pulseFinishTimer);
    pulseFrame = 0;
    pulseFinishTimer = 0;
    pulseRunning = false;
    pulseTracks.length = 0;
    toy.dataset.pulse = 'idle';
    for (const group of toy.querySelectorAll<SVGGElement>('[data-signal-pulse]')) {
      group.classList.remove('is-active');
    }
    receiver.classList.remove('is-receiving');
    setPulseIndicator('idle', 'READY');
    if (pulseStatus) pulseStatus.textContent = message;
  };

  const positionPulse = (track: PulseTrack, distance: number) => {
    for (const dot of track.dots) {
      const offset = Number(dot.dataset.pulseOffset ?? 0);
      const point = track.path.getPointAtLength(clamp(distance - offset, 0, track.length));
      dot.setAttribute('cx', String(point.x));
      dot.setAttribute('cy', String(point.y));
    }
  };

  const receivePulse = (track: PulseTrack) => {
    track.group.classList.remove('is-active');
    receiver.classList.remove('is-receiving');
    void receiver.getBoundingClientRect().width;
    receiver.classList.add('is-receiving');
    tickReadout(track.readout);
    const label = track.name === 'direct' ? 'Direct' : 'Reflected';
    setPulseIndicator(track.name, `${label.toUpperCase()} / RX`);
    if (pulseStatus) {
      pulseStatus.textContent = `${label} pulse received in this illustrative sketch.`;
    }
  };

  const animatePulse = (time: number) => {
    if (!pulseRunning) return;
    if (!motionAllowed()) {
      cancelPulse('Pulse stopped because motion is reduced.');
      return;
    }

    const elapsed = time - pulseStartedAt;
    let complete = true;
    for (const track of pulseTracks) {
      const progress = clamp(elapsed / track.duration, 0, 1);
      positionPulse(track, progress * track.length);
      if (progress >= 1 && !track.arrived) {
        track.arrived = true;
        receivePulse(track);
      }
      if (progress < 1) complete = false;
    }

    if (complete) {
      pulseRunning = false;
      pulseFrame = 0;
      toy.dataset.pulse = 'received';
      pulseFinishTimer = window.setTimeout(() => {
        pulseFinishTimer = 0;
        if (toy.dataset.pulse !== 'received') return;
        toy.dataset.pulse = 'complete';
        setPulseIndicator('complete', 'RX / BOTH');
      }, 720);
      return;
    }

    pulseFrame = window.requestAnimationFrame(animatePulse);
  };

  const sendPulse = () => {
    if (!directPulse || !echoPulse) return;
    cancelPulse();

    const directLength = directPath.getTotalLength();
    const echoLength = echoPath.getTotalLength();
    const directUnits = Math.round(directLength);
    const echoUnits = Math.round(echoLength);

    if (!motionAllowed()) {
      toy.dataset.pulse = 'static';
      setPulseIndicator('static', 'PATH CHECK');
      if (pulseStatus) {
        pulseStatus.textContent = `Path check: direct ${directUnits} units, reflected ${echoUnits} units.`;
      }
      return;
    }

    const durationFor = (length: number) => Math.max(1, Math.round((length / 240) * 1000));
    const tracks: PulseTrack[] = [
      {
        name: 'direct',
        path: directPath,
        group: directPulse,
        dots: [...directPulse.querySelectorAll<SVGCircleElement>('[data-pulse-offset]')],
        readout: directReadout,
        length: directLength,
        duration: durationFor(directLength),
        arrived: false,
      },
      {
        name: 'echo',
        path: echoPath,
        group: echoPulse,
        dots: [...echoPulse.querySelectorAll<SVGCircleElement>('[data-pulse-offset]')],
        readout: echoReadout,
        length: echoLength,
        duration: durationFor(echoLength),
        arrived: false,
      },
    ];

    pulseTracks.push(...tracks);
    for (const track of tracks) {
      track.group.classList.add('is-active');
      positionPulse(track, 0);
    }
    toy.dataset.pulse = 'running';
    setPulseIndicator('running', 'PULSE / TX → RX');
    if (pulseStatus) {
      pulseStatus.textContent = `Pulse sent. Direct ${directUnits} units, reflected ${echoUnits} units.`;
    }
    pulseStartedAt = performance.now();
    pulseRunning = true;
    pulseFrame = window.requestAnimationFrame(animatePulse);
  };

  const layoutHandleLabels = () => {
    const txLabel = transmitter.querySelector<SVGTextElement>('.signal-toy__handle-label');
    const rxLabel = receiver.querySelector<SVGTextElement>('.signal-toy__handle-label');
    if (!txLabel || !rxLabel) return;

    txLabel.style.visibility = 'visible';
    rxLabel.style.visibility = 'visible';
    legend?.classList.remove('is-visible');
    txLabel.setAttribute('x', '0');
    txLabel.setAttribute('y', '0');
    rxLabel.setAttribute('x', '0');
    rxLabel.setAttribute('y', '0');
    const txRawBox = txLabel.getBBox();
    const rxRawBox = rxLabel.getBBox();
    const txBox = { width: txRawBox.width, height: txRawBox.height };
    const rxBox = { width: rxRawBox.width, height: rxRawBox.height };
    const txBaseline = -txRawBox.y;
    const rxBaseline = -rxRawBox.y;
    const txCandidates = labelCandidates(state.transmitter, txBox);
    const rxCandidates = labelCandidates(state.receiver, rxBox);
    const wall = { x: 0, y: 214, width: 480, height: 8 };
    const txCore = {
      x: state.transmitter.x - 15,
      y: state.transmitter.y - 15,
      width: 30,
      height: 30,
    };
    const rxCore = { x: state.receiver.x - 15, y: state.receiver.y - 15, width: 30, height: 30 };
    const rxHit = { x: state.receiver.x - 48, y: state.receiver.y - 48, width: 96, height: 96 };
    const txHit = {
      x: state.transmitter.x - 48,
      y: state.transmitter.y - 48,
      width: 96,
      height: 96,
    };
    const pathPoints: Point[] = [];
    for (const path of [directPath, echoPath]) {
      const length = path.getTotalLength();
      for (let distance = 24; distance <= length - 24; distance += 6) {
        const point = path.getPointAtLength(distance);
        pathPoints.push({ x: point.x, y: point.y });
      }
    }
    const intersectsPath = (box: LabelBox) =>
      pathPoints.some(
        (point) =>
          point.x >= box.x - 4 &&
          point.x <= box.x + box.width + 4 &&
          point.y >= box.y - 4 &&
          point.y <= box.y + box.height + 4,
      );
    let bestCost = Number.POSITIVE_INFINITY;
    let bestTx = txCandidates[0]!;
    let bestRx = rxCandidates[0]!;

    for (const [txIndex, txCandidate] of txCandidates.entries()) {
      for (const [rxIndex, rxCandidate] of rxCandidates.entries()) {
        const txGapBox = {
          x: txCandidate.x - 4,
          y: txCandidate.y - 4,
          width: txCandidate.width + 8,
          height: txCandidate.height + 8,
        };
        const rxGapBox = {
          x: rxCandidate.x - 4,
          y: rxCandidate.y - 4,
          width: rxCandidate.width + 8,
          height: rxCandidate.height + 8,
        };
        const cost =
          overlapArea(txGapBox, rxGapBox) * 10_000 +
          (overlapArea(txCandidate, wall) + overlapArea(rxCandidate, wall)) * 1_000 +
          (overlapArea(txCandidate, txCore) + overlapArea(rxCandidate, rxCore)) * 5_000 +
          (overlapArea(txCandidate, rxHit) + overlapArea(rxCandidate, txHit)) * 20_000 +
          (Number(intersectsPath(txCandidate)) + Number(intersectsPath(rxCandidate))) * 4_000 +
          (txIndex + rxIndex) * 10;
        if (cost >= bestCost) continue;
        bestCost = cost;
        bestTx = txCandidate;
        bestRx = rxCandidate;
      }
    }

    txLabel.setAttribute('x', String(bestTx.x + txBox.width / 2 - state.transmitter.x));
    txLabel.setAttribute('y', String(bestTx.y + txBaseline - state.transmitter.y));
    rxLabel.setAttribute('x', String(bestRx.x + rxBox.width / 2 - state.receiver.x));
    rxLabel.setAttribute('y', String(bestRx.y + rxBaseline - state.receiver.y));

    const txBlocked =
      intersectsPath(bestTx) ||
      overlapArea(bestTx, wall) > 0 ||
      overlapArea(bestTx, txCore) > 0 ||
      overlapArea(bestTx, rxHit) > 0;
    const rxBlocked =
      intersectsPath(bestRx) ||
      overlapArea(bestRx, wall) > 0 ||
      overlapArea(bestRx, rxCore) > 0 ||
      overlapArea(bestRx, txHit) > 0;
    const labelsCollide =
      overlapArea(
        { x: bestTx.x - 4, y: bestTx.y - 4, width: bestTx.width + 8, height: bestTx.height + 8 },
        { x: bestRx.x - 4, y: bestRx.y - 4, width: bestRx.width + 8, height: bestRx.height + 8 },
      ) > 0;
    if (txBlocked || rxBlocked || labelsCollide) {
      txLabel.style.visibility = 'hidden';
      rxLabel.style.visibility = 'hidden';
      legend?.classList.add('is-visible');
    }
  };

  const draw = () => {
    const tx = state.transmitter;
    const rx = state.receiver;
    const wallY = 218;
    const reflectedReceiverY = wallY * 2 - rx.y;
    const bounceRatio = (wallY - tx.y) / (reflectedReceiverY - tx.y);
    const bounceX = tx.x + (rx.x - tx.x) * bounceRatio;
    const directLength = Math.hypot(rx.x - tx.x, rx.y - tx.y);
    const echoLength =
      Math.hypot(bounceX - tx.x, wallY - tx.y) + Math.hypot(rx.x - bounceX, wallY - rx.y);

    transmitter.setAttribute('transform', `translate(${tx.x} ${tx.y})`);
    receiver.setAttribute('transform', `translate(${rx.x} ${rx.y})`);
    transmitter.dataset.x = String(Math.round(tx.x));
    transmitter.dataset.y = String(Math.round(tx.y));
    receiver.dataset.x = String(Math.round(rx.x));
    receiver.dataset.y = String(Math.round(rx.y));
    directPath.setAttribute('d', `M ${tx.x} ${tx.y} L ${rx.x} ${rx.y}`);
    echoPath.setAttribute('d', `M ${tx.x} ${tx.y} L ${bounceX} 218 L ${rx.x} ${rx.y}`);
    bounce.setAttribute('cx', String(bounceX));
    layoutHandleLabels();
    if (directReadout) directReadout.textContent = `${Math.round(directLength)} units`;
    if (echoReadout) echoReadout.textContent = `${Math.round(echoLength)} units`;

    for (const name of handles.keys()) {
      const range = toy.querySelector<HTMLInputElement>(`[data-toy-range="${name}"]`);
      const verticalRange = toy.querySelector<HTMLInputElement>(`[data-toy-range-y="${name}"]`);
      if (range) range.value = String(Math.round(state[name].x));
      if (verticalRange) verticalRange.value = String(Math.round(state[name].y));
    }
  };

  const moveHandle = (name: HandleName, point: Point) => {
    cancelPulse();
    const candidate = {
      x: clamp(point.x, handleMin, handleMax),
      y: clamp(point.y, handleMinY, handleMaxY),
    };
    const other = state[name === 'transmitter' ? 'receiver' : 'transmitter'];
    if (Math.hypot(candidate.x - other.x, candidate.y - other.y) < handleSeparation) {
      draw();
      return;
    }
    state[name] = candidate;
    draw();
    tickReadouts();
  };

  const pointerPosition = (event: PointerEvent): Point | null => {
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const local = point.matrixTransform(matrix.inverse());
    return { x: local.x, y: local.y };
  };

  for (const [name, handle] of handles) {
    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || !event.isPrimary || active) return;
      const point = pointerPosition(event);
      if (!point) return;
      toy.querySelector<HTMLInputElement>(`[data-toy-range="${name}"]`)?.focus({
        preventScroll: true,
      });
      active = name;
      activePointerId = event.pointerId;
      grabOffset = { x: state[name].x - point.x, y: state[name].y - point.y };
      handle.setPointerCapture(event.pointerId);
      handle.classList.add('is-dragging');
      event.preventDefault();
    });

    handle.addEventListener('pointermove', (event) => {
      if (active !== name || activePointerId !== event.pointerId || !event.isPrimary) return;
      const point = pointerPosition(event);
      if (!point || !grabOffset) return;
      moveHandle(name, { x: point.x + grabOffset.x, y: point.y + grabOffset.y });
    });

    const release = (event: PointerEvent) => {
      if (active !== name || activePointerId !== event.pointerId) return;
      active = null;
      activePointerId = null;
      grabOffset = null;
      handle.classList.remove('is-dragging');
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    };
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);
    handle.addEventListener('lostpointercapture', release);
  }

  toy.querySelectorAll<HTMLInputElement>('[data-toy-range]').forEach((range) => {
    range.addEventListener('input', () => {
      const name = range.dataset.toyRange as HandleName;
      moveHandle(name, { ...state[name], x: Number(range.value) });
    });
    range.addEventListener('keydown', (event) => {
      const name = range.dataset.toyRange as HandleName;
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        range.value = String(event.key === 'Home' ? handleMin : handleMax);
        range.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const delta = event.key === 'ArrowLeft' ? -10 : event.key === 'ArrowRight' ? 10 : 0;
      if (!delta) return;
      range.value = String(clamp(state[name].x + delta, handleMin, handleMax));
      range.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  toy.querySelectorAll<HTMLInputElement>('[data-toy-range-y]').forEach((range) => {
    range.addEventListener('input', () => {
      const name = range.dataset.toyRangeY as HandleName;
      moveHandle(name, { ...state[name], y: Number(range.value) });
    });
    range.addEventListener('keydown', (event) => {
      const name = range.dataset.toyRangeY as HandleName;
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        range.value = String(event.key === 'Home' ? handleMinY : handleMaxY);
        range.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const delta = event.key === 'ArrowUp' ? -10 : event.key === 'ArrowDown' ? 10 : 0;
      if (!delta) return;
      range.value = String(clamp(state[name].y + delta, handleMinY, handleMaxY));
      range.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  pulseButton?.addEventListener('click', sendPulse);

  toy.querySelector<HTMLButtonElement>('[data-toy-reset]')?.addEventListener('click', () => {
    cancelPulse('Channel reset.');
    state.transmitter = { ...initial.transmitter };
    state.receiver = { ...initial.receiver };
    draw();
    tickReadouts();
  });

  const stopPulse = () => {
    if (pulseRunning || toy.dataset.pulse === 'received') {
      cancelPulse('Pulse stopped because motion is reduced.');
    }
  };
  reducedMotion.addEventListener('change', stopPulse);
  window.addEventListener('portfolio-motion-change', stopPulse);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && pulseRunning) cancelPulse('Pulse stopped while the page was hidden.');
  });
  window.addEventListener('pagehide', () => cancelPulse());
  window.addEventListener(
    'resize',
    () => {
      cancelPulse();
      draw();
    },
    { passive: true },
  );
  void document.fonts.ready.then(draw);
  draw();
}
