// v2 instrument stage — progressive enhancement only. No libraries.
(() => {
  const root = document.documentElement;
  const slider = document.getElementById('snr');
  const readout = document.getElementById('readout');
  const fft = document.getElementById('fft-path');
  const canvas = document.querySelector('.field-canvas');
  const field = document.querySelector('.field');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!slider || !readout || !fft) return;

  const rngFor = (seed) => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const q = (x) => Math.exp(-x * x / 2) / (x * Math.sqrt(2 * Math.PI));

  function drawSignal(snr) {
    const clean = snr >= 30;
    const amp = clean ? 0 : Math.pow(10, -snr / 20) * 18;
    const rnd = rngFor(0xC0FFEE + snr);
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const base = Math.sin((i / 40) * Math.PI * 8) * 12;
      pts.push(`${i ? 'L' : 'M'}${i * 25} ${(30 - base - (rnd() - .5) * amp).toFixed(1)}`);
    }
    fft.setAttribute('d', pts.join(' '));
    if (clean) return 'QPSK · AWGN · BER 0';
    const ber = q(Math.sqrt(2 * Math.pow(10, snr / 10)));
    return `QPSK · AWGN · BER ${ber < 1e-6 ? '<1e-6' : ber.toFixed(4)}`;
  }

  slider.disabled = false;
  slider.addEventListener('input', () => {
    const snr = Number(slider.value);
    const next = drawSignal(snr);
    if (readout.textContent !== next) readout.textContent = next;
    slider.setAttribute('aria-valuetext', snr >= 30 ? 'Clean channel, bit error rate zero' : `${snr} decibels signal to noise ratio`);
  });

  // Decorative field: DPR capped at 2, one IO-gated rAF, cancelled offscreen/hidden.
  if (canvas && field && !reduce.matches && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, id = 0, visible = false, nodes = [];
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || 1; h = canvas.clientHeight || 1;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(12, Math.round(w * h / 9000)));
      const rnd = rngFor(42);
      nodes = Array.from({ length: count }, () => ({ x: rnd() * w, y: rnd() * h, r: 1 + rnd() * 1.5, p: rnd() * 6.28 }));
    };
    const frame = (t) => {
      if (!visible || document.hidden || reduce.matches) { id = 0; return; }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#FF5A33';
      for (const n of nodes) {
        const y = (n.y + Math.sin(t / 2400 + n.p) * 7 + h) % h;
        ctx.globalAlpha = .28;
        ctx.beginPath(); ctx.arc(n.x, y, n.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!canvas.classList.contains('is-painted')) canvas.classList.add('is-painted');
      id = requestAnimationFrame(frame);
    };
    const arm = () => { if (!id && visible && !document.hidden && !reduce.matches) id = requestAnimationFrame(frame); };
    size();
    if (reduce.addEventListener) reduce.addEventListener('change', () => {
      if (reduce.matches && id) { cancelAnimationFrame(id); id = 0; }
      else if (!reduce.matches) arm();
    });
    window.addEventListener('resize', size, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden && id) { cancelAnimationFrame(id); id = 0; } else arm(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; if (visible) arm(); else if (id) { cancelAnimationFrame(id); id = 0; } }, { rootMargin: '100px' }).observe(field);
    } else { visible = true; arm(); }
  }

  root.classList.add('js');
})();
