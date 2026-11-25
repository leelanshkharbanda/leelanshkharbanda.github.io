const finePointer = window.matchMedia('(pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const cursor = document.querySelector<HTMLElement>('.playground-cursor');
const magnets = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
const cards = [...document.querySelectorAll<HTMLElement>('[data-project-card]')];

const motionAllowed = () =>
  finePointer.matches &&
  !reducedMotion.matches &&
  document.documentElement.dataset.motion !== 'reduced';

const resetMagnets = () => {
  for (const magnet of magnets) {
    magnet.style.setProperty('--magnet-x', '0px');
    magnet.style.setProperty('--magnet-y', '0px');
  }
};

const resetCards = () => {
  for (const card of cards) {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--card-x', '0px');
    card.style.setProperty('--card-y', '0px');
  }
};

const syncMotion = () => {
  document.documentElement.classList.toggle('has-playground-motion', motionAllowed());
  if (!motionAllowed()) {
    resetMagnets();
    resetCards();
    cursor?.classList.remove('is-visible', 'is-active', 'is-pressed');
  }
};

for (const magnet of magnets) {
  magnet.addEventListener('pointermove', (event) => {
    if (!motionAllowed()) return;
    const bounds = magnet.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    magnet.style.setProperty('--magnet-x', `${Math.max(-9, Math.min(9, x))}px`);
    magnet.style.setProperty('--magnet-y', `${Math.max(-7, Math.min(7, y))}px`);
  });
  magnet.addEventListener('pointerleave', () => {
    magnet.style.setProperty('--magnet-x', '0px');
    magnet.style.setProperty('--magnet-y', '0px');
  });
  magnet.addEventListener('blur', () => {
    magnet.style.setProperty('--magnet-x', '0px');
    magnet.style.setProperty('--magnet-y', '0px');
  });
}

for (const card of cards) {
  card.addEventListener('pointermove', (event) => {
    if (!motionAllowed()) return;
    const bounds = card.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--tilt-x', `${(-vertical * 2.4).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(horizontal * 2.4).toFixed(2)}deg`);
    card.style.setProperty('--card-x', `${(horizontal * 4).toFixed(2)}px`);
    card.style.setProperty('--card-y', `${(vertical * -4).toFixed(2)}px`);
  });
  card.addEventListener('pointerleave', resetCards);
  card.addEventListener('focusout', (event) => {
    if (!card.contains(event.relatedTarget as Node | null)) resetCards();
  });
}

if (cursor) {
  document.addEventListener(
    'pointermove',
    (event) => {
      if (!motionAllowed()) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add('is-visible');
      cursor.classList.toggle(
        'is-active',
        Boolean((event.target as Element | null)?.closest('a, button, summary, [role="slider"]')),
      );
    },
    { passive: true },
  );
  document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'), {
    passive: true,
  });
  document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), {
    passive: true,
  });
  document.documentElement.addEventListener('pointerleave', () => {
    cursor.classList.remove('is-visible');
  });
}

finePointer.addEventListener('change', syncMotion);
reducedMotion.addEventListener('change', syncMotion);
new MutationObserver(syncMotion).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-motion'],
});
window.addEventListener('blur', () => {
  resetMagnets();
  resetCards();
  cursor?.classList.remove('is-visible', 'is-pressed');
});
syncMotion();
