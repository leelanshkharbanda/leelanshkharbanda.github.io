type HandleName = 'transmitter' | 'receiver';
type PulseName = 'direct' | 'echo';
type PulseIndicatorState = 'idle' | 'running' | 'direct' | 'echo' | 'complete' | 'static';

type Point = { x: number; y: number };

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
  if (controls) controls.hidden = false;
  if (dragLabel) dragLabel.hidden = false;
  if (interactiveNote) interactiveNote.hidden = false;

  for (const [name, handle] of handles) {
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute(
      'aria-label',
      `${name === 'transmitter' ? 'Transmitter' : 'Receiver'} horizontal position`,
    );
    handle.setAttribute('aria-valuemin', String(handleMin));
    handle.setAttribute('aria-valuemax', String(handleMax));
  }

  const initial: Record<HandleName, Point> = {
    transmitter: { x: 104, y: 104 },
    receiver: { x: 370, y: 82 },
  };
  const state: Record<HandleName, Point> = {
    transmitter: { ...initial.transmitter },
    receiver: { ...initial.receiver },
  };
  let active: HandleName | null = null;
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
    transmitter.setAttribute('aria-valuenow', String(Math.round(tx.x)));
    receiver.setAttribute('aria-valuenow', String(Math.round(rx.x)));
    directPath.setAttribute('d', `M ${tx.x} ${tx.y} L ${rx.x} ${rx.y}`);
    echoPath.setAttribute('d', `M ${tx.x} ${tx.y} L ${bounceX} 218 L ${rx.x} ${rx.y}`);
    bounce.setAttribute('cx', String(bounceX));
    if (directReadout) directReadout.textContent = `${Math.round(directLength)} units`;
    if (echoReadout) echoReadout.textContent = `${Math.round(echoLength)} units`;

    for (const [name, handle] of handles) {
      const label = handle.querySelector<SVGTextElement>('.signal-toy__handle-label');
      if (label) {
        const halfWidth = label.getBBox().width / 2;
        const labelX = clamp(state[name].x, halfWidth + 8, 480 - halfWidth - 8);
        label.setAttribute('x', String(labelX - state[name].x));
      }
      const range = toy.querySelector<HTMLInputElement>(`[data-toy-range="${name}"]`);
      if (range) range.value = String(Math.round(state[name].x));
    }
  };

  const moveHandle = (name: HandleName, point: Point) => {
    cancelPulse();
    state[name] = {
      x: clamp(point.x, handleMin, handleMax),
      y: initial[name].y,
    };
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
      if (event.button !== 0) return;
      handle.focus({ preventScroll: true });
      active = name;
      handle.setPointerCapture(event.pointerId);
      handle.classList.add('is-dragging');
      const point = pointerPosition(event);
      if (point) moveHandle(name, point);
      event.preventDefault();
    });

    handle.addEventListener('pointermove', (event) => {
      if (active !== name) return;
      const point = pointerPosition(event);
      if (point) moveHandle(name, point);
    });

    const release = (event: PointerEvent) => {
      if (active !== name) return;
      active = null;
      handle.classList.remove('is-dragging');
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    };
    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);

    handle.addEventListener('keydown', (event) => {
      const currentX = state[name].x;
      let nextX = currentX;
      if (event.key === 'ArrowLeft') nextX -= 10;
      else if (event.key === 'ArrowRight') nextX += 10;
      else if (event.key === 'Home') nextX = handleMin;
      else if (event.key === 'End') nextX = handleMax;
      else return;
      moveHandle(name, { ...state[name], x: nextX });
      event.preventDefault();
    });
  }

  toy.querySelectorAll<HTMLInputElement>('[data-toy-range]').forEach((range) => {
    range.addEventListener('input', () => {
      const name = range.dataset.toyRange as HandleName;
      moveHandle(name, { ...state[name], x: Number(range.value) });
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
