// Deterministic, dependency-free channel monitor. Enhances static HTML only.
(() => {
  const slider = document.getElementById('snr');
  const wave = document.getElementById('wave');
  const dots = document.getElementById('dots');
  const readout = document.getElementById('readout');
  if (!slider || !wave || !dots || !readout) return;

  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const q = (x) => Math.exp(-x * x / 2) / (x * Math.sqrt(2 * Math.PI));

  function render(snr, announce) {
    const clean = snr >= 30;
    const noiseAmp = clean ? 0 : 0.9 * Math.pow(10, -snr / 20) * 6;
    const random = rng(0xC0FFEE + snr);
    const points = [];
    for (let i = 0; i <= 160; i++) {
      const x = i * 3;
      const carrier = Math.sin((i / 160) * Math.PI * 12) * 42;
      const noise = (random() - 0.5) * noiseAmp * 42;
      points.push(`${i ? 'L' : 'M'}${x} ${(100 - carrier - noise).toFixed(1)}`);
    }
    wave.setAttribute('d', points.join(' '));

    const jitter = clean ? 4 : Math.max(4, Math.pow(10, -snr / 20) * 26);
    const symbols = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
    const marks = [];
    for (let s = 0; s < symbols.length; s++) {
      for (let k = 0; k < 4; k++) {
        const cx = 240 + symbols[s][0] * 52 + (random() - 0.5) * jitter;
        const cy = 100 + symbols[s][1] * 40 + (random() - 0.5) * jitter;
        marks.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5"></circle>`);
      }
    }
    dots.innerHTML = marks.join('');

    const ber = clean ? 0 : q(Math.sqrt(2 * Math.pow(10, snr / 10)));
    const berText = ber === 0 ? '0' : ber < 1e-6 ? '<1e-6' : ber.toFixed(4);
    const snrText = clean ? '∞' : String(snr);
    if (announce) {
      const next = `AWGN · SNR ${snrText} · BER ${berText}`;
      if (readout.textContent !== next) readout.textContent = next;
      slider.setAttribute('aria-valuetext', clean ? 'Infinite signal to noise ratio, clean channel' : `${snr} decibels signal to noise ratio`);
    }
  }

  slider.addEventListener('input', () => render(Number(slider.value), true));
  render(Number(slider.value), false);
  document.documentElement.classList.add('js');
})();
