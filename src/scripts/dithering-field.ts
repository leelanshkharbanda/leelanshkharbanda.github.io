const initDitherField = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-dither-field]');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context) return;

  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  let gridWidth = 0;
  let gridHeight = 0;
  let pixels: ImageData | null = null;
  let animationFrame = 0;
  let lastFrameTime = 0;
  let animating = false;
  const pointer = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };

  const saveData = () => {
    if (!('connection' in navigator)) return false;
    const connection = navigator.connection;
    return (
      typeof connection === 'object' &&
      connection !== null &&
      'saveData' in connection &&
      connection.saveData === true
    );
  };

  const motionAllowed = () =>
    finePointer.matches &&
    !reducedMotion.matches &&
    !saveData() &&
    document.documentElement.dataset.motion !== 'reduced';

  const draw = (time: number, still = false) => {
    if (!pixels) return;
    if (!still) {
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
    }

    const data = pixels.data;
    const radiusSquared = gridWidth * gridWidth * 0.035;
    const scrollOffset = window.scrollY * 0.0015;

    for (let y = 0; y < gridHeight; y += 1) {
      for (let x = 0; x < gridWidth; x += 1) {
        const wave = Math.sin(x * 0.11 + y * 0.07 + time * 0.00035) * 0.5 + 0.5;
        const drift = Math.cos(y * 0.09 - scrollOffset) * 0.5 + 0.5;
        const dx = x - gridWidth * pointer.x;
        const dy = y - gridHeight * pointer.y;
        const lens = Math.max(0, 1 - (dx * dx + dy * dy) / radiusSquared);
        const level = wave * 0.58 + drift * 0.22 + lens * 0.3;
        const threshold = (bayer[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
        const active = level > threshold;
        const lime = active && (x * 3 + y * 5) % 17 === 0;
        const index = (y * gridWidth + x) * 4;

        data[index] = lime ? 223 : 29;
        data[index + 1] = lime ? 255 : 30;
        data[index + 2] = lime ? 104 : 25;
        data[index + 3] = lime ? 170 : active ? 105 : 0;
      }
    }

    context.putImageData(pixels, 0, 0);
  };

  const animate = (time: number) => {
    if (!animating) return;
    if (!motionAllowed() || document.hidden) {
      syncMotion();
      return;
    }
    if (time - lastFrameTime >= 33) {
      draw(time);
      lastFrameTime = time;
    }
    animationFrame = window.requestAnimationFrame(animate);
  };

  const syncMotion = () => {
    const allowed = motionAllowed();
    canvas.dataset.motion = allowed ? 'animated' : 'static';
    document.documentElement.classList.toggle('has-dither-motion', allowed);

    if (allowed && !document.hidden) {
      if (!animating) {
        animating = true;
        lastFrameTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
      return;
    }

    animating = false;
    window.cancelAnimationFrame(animationFrame);
    draw(0, true);
  };

  const resize = () => {
    const cellSize = window.innerWidth < 640 ? 8 : 7;
    gridWidth = Math.max(1, Math.min(240, Math.ceil(window.innerWidth / cellSize)));
    gridHeight = Math.max(1, Math.min(160, Math.ceil(window.innerHeight / cellSize)));
    canvas.width = gridWidth;
    canvas.height = gridHeight;
    pixels = context.createImageData(gridWidth, gridHeight);
    canvas.dataset.ready = 'true';
    draw(0, true);
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      if (!motionAllowed()) return;
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;

      if (!(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>('[data-project-card]');
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty(
        '--dither-x',
        `${((event.clientX - bounds.left) / bounds.width) * 18}px`,
      );
      card.style.setProperty(
        '--dither-y',
        `${((event.clientY - bounds.top) / bounds.height) * 18}px`,
      );

      const visual = card.querySelector<HTMLElement>('.project-visual__root');
      if (!visual) return;
      const visualBounds = visual.getBoundingClientRect();
      visual.style.setProperty(
        '--dither-lens-x',
        `${((event.clientX - visualBounds.left) / visualBounds.width) * 100}%`,
      );
      visual.style.setProperty(
        '--dither-lens-y',
        `${((event.clientY - visualBounds.top) / visualBounds.height) * 100}%`,
      );
    },
    { passive: true },
  );

  document.documentElement.addEventListener('pointerleave', () => {
    target.x = 0.5;
    target.y = 0.5;
  });
  window.addEventListener('blur', () => {
    target.x = 0.5;
    target.y = 0.5;
  });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', syncMotion);
  finePointer.addEventListener('change', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  new MutationObserver(syncMotion).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });
  window.addEventListener('pagehide', () => {
    animating = false;
    window.cancelAnimationFrame(animationFrame);
  });

  resize();
  syncMotion();
};

initDitherField();
