type HandleName = 'transmitter' | 'receiver';

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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
  if (!transmitter || !receiver || !directPath || !echoPath || !bounce) return;

  const controls = toy.querySelector<HTMLElement>('.signal-toy__controls');
  const dragLabel = toy.querySelector<HTMLElement>('.signal-toy__drag-label');
  if (controls) controls.hidden = false;
  if (dragLabel) dragLabel.hidden = false;

  for (const [name, handle] of handles) {
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute(
      'aria-label',
      `${name === 'transmitter' ? 'Transmitter' : 'Receiver'} horizontal position`,
    );
    handle.setAttribute('aria-valuemin', '40');
    handle.setAttribute('aria-valuemax', '440');
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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const tickReadouts = () => {
    window.cancelAnimationFrame(tickFrame);
    for (const readout of [directReadout, echoReadout]) readout?.classList.remove('is-ticking');
    if (reducedMotion.matches || document.documentElement.dataset.motion === 'reduced') return;
    tickFrame = window.requestAnimationFrame(() => {
      if (reducedMotion.matches || document.documentElement.dataset.motion === 'reduced') return;
      void directReadout?.offsetWidth;
      for (const readout of [directReadout, echoReadout]) readout?.classList.add('is-ticking');
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

  const draw = () => {
    const tx = state.transmitter;
    const rx = state.receiver;
    const bounceX = (tx.x + rx.x) / 2;
    const directLength = Math.hypot(rx.x - tx.x, rx.y - tx.y);
    const echoLength =
      Math.hypot(bounceX - tx.x, 218 - tx.y) + Math.hypot(rx.x - bounceX, 218 - rx.y);

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
    state[name] = {
      x: clamp(point.x, 40, 440),
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
      else if (event.key === 'Home') nextX = 40;
      else if (event.key === 'End') nextX = 440;
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

  toy.querySelector<HTMLButtonElement>('[data-toy-reset]')?.addEventListener('click', () => {
    state.transmitter = { ...initial.transmitter };
    state.receiver = { ...initial.receiver };
    draw();
    tickReadouts();
  });

  window.addEventListener('resize', draw, { passive: true });
  void document.fonts.ready.then(draw);
  draw();
}
