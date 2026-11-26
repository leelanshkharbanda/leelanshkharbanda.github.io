const initFolioNav = () => {
  const nav = document.querySelector<HTMLElement>('[data-project-jump]');
  if (!nav) return;

  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const targets = links.map((link) => document.getElementById(link.hash.slice(1)));

  const setActive = (target: HTMLElement | null) => {
    if (!target) return;
    for (const link of links) {
      if (link.hash === `#${target.id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top),
        );
      if (visible[0]?.target instanceof HTMLElement) setActive(visible[0].target);
    },
    { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
  );
  links.forEach((link, index) => {
    const target = targets[index];
    if (!target) return;
    link.addEventListener('focus', () => setActive(target));
    link.addEventListener('click', () => setActive(target));
  });

  for (const target of targets) {
    if (target) observer.observe(target);
  }

  nav.addEventListener('keydown', (event) => {
    const currentIndex = links.findIndex((link) => link === document.activeElement);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % links.length;
    else if (event.key === 'ArrowLeft')
      nextIndex = (currentIndex - 1 + links.length) % links.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = links.length - 1;
    else return;

    event.preventDefault();
    links[nextIndex]?.focus();
  });
};

initFolioNav();
