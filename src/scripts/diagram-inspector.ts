const idRefAttributes = new Set([
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-details',
  'aria-errormessage',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
  'for',
  'headers',
]);

export function initDiagramInspector() {
  const dialog = document.querySelector<HTMLDialogElement>('#diagram-inspector');
  const canvas = document.querySelector<HTMLElement>('[data-diagram-inspector-canvas]');
  const title = document.querySelector<HTMLElement>('#diagram-inspector-title');
  const caption = document.querySelector<HTMLElement>('#diagram-inspector-caption');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-diagram-inspector-close]');
  const zoomOut = document.querySelector<HTMLButtonElement>('[data-diagram-zoom-out]');
  const zoomIn = document.querySelector<HTMLButtonElement>('[data-diagram-zoom-in]');
  const fitButton = document.querySelector<HTMLButtonElement>('[data-diagram-fit]');
  const zoomOutput = document.querySelector<HTMLOutputElement>('[data-diagram-zoom-output]');

  if (
    !dialog ||
    !canvas ||
    !title ||
    !caption ||
    !closeButton ||
    !zoomOut ||
    !zoomIn ||
    !fitButton ||
    !zoomOutput
  ) {
    return;
  }

  const minZoom = 0.1;
  const maxZoom = 2.5;
  const zoomStep = 0.25;
  let activeSvg: SVGSVGElement | null = null;
  let baseWidth = 960;
  let baseHeight = 430;
  let zoom = 1;
  let trigger: HTMLButtonElement | null = null;
  let previousOverflow = '';

  const cloneDiagram = (source: SVGSVGElement) => {
    const clone = source.cloneNode(true);
    if (!(clone instanceof SVGSVGElement)) return null;
    const ids = new Map<string, string>();
    for (const element of [clone, ...clone.querySelectorAll<Element>('[id]')]) {
      const oldId = element.id;
      if (!oldId) continue;
      const newId = `${oldId}-inspector`;
      ids.set(oldId, newId);
      element.id = newId;
    }
    for (const element of [clone, ...clone.querySelectorAll<Element>('*')]) {
      for (const attribute of Array.from(element.attributes)) {
        let value = attribute.value
          .replace(/url\(#([^)]+)\)/g, (_match, id: string) => `url(#${ids.get(id) ?? id})`)
          .replace(/^#(.+)$/, (_match, id: string) => `#${ids.get(id) ?? id}`);
        if (idRefAttributes.has(attribute.name)) {
          value = value
            .split(/\s+/)
            .map((id) => ids.get(id) ?? id)
            .join(' ');
        }
        if (value !== attribute.value) element.setAttribute(attribute.name, value);
      }
    }
    clone.classList.add('diagram-inspector__svg');
    return clone;
  };

  const updateZoom = (nextZoom: number, center = true) => {
    zoom = Math.min(maxZoom, Math.max(minZoom, nextZoom));
    if (activeSvg) activeSvg.style.width = `${baseWidth * zoom}px`;
    zoomOutput.value = `${Math.round(zoom * 100)}%`;
    zoomOutput.textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= minZoom;
    zoomIn.disabled = zoom >= maxZoom;
    if (center) {
      window.requestAnimationFrame(() => {
        canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2;
        canvas.scrollTop = (canvas.scrollHeight - canvas.clientHeight) / 2;
      });
    }
  };

  const fitToViewport = () => {
    const styles = window.getComputedStyle(canvas);
    const availableWidth =
      canvas.clientWidth -
      Number.parseFloat(styles.paddingLeft) -
      Number.parseFloat(styles.paddingRight);
    const availableHeight =
      canvas.clientHeight -
      Number.parseFloat(styles.paddingTop) -
      Number.parseFloat(styles.paddingBottom);
    updateZoom(Math.min(availableWidth / baseWidth, availableHeight / baseHeight), false);
  };

  const openInspector = (button: HTMLButtonElement) => {
    const figure = button.closest<HTMLElement>('.project-visual__root');
    const source = figure?.querySelector<SVGSVGElement>('svg');
    if (!figure || !source || dialog.open) return;
    const clone = cloneDiagram(source);
    if (!clone) return;

    activeSvg = clone;
    baseWidth = source.viewBox.baseVal.width || 960;
    baseHeight = source.viewBox.baseVal.height || 430;
    title.textContent = figure.dataset.projectTitle?.trim() || 'Diagram';
    const credit = figure.dataset.projectCredit?.trim();
    const diagramCaption = figure
      .querySelector('.project-visual__caption-text')
      ?.textContent?.trim();
    caption.textContent = [credit, diagramCaption].filter(Boolean).join(' · ');
    trigger = button;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    canvas.replaceChildren(clone);
    updateZoom(1, false);
    dialog.showModal();
    canvas.scrollLeft = 0;
    canvas.scrollTop = 0;
  };

  const closeInspector = () => dialog.close();

  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-diagram-inspect]')) {
    button.hidden = false;
    button.addEventListener('click', () => openInspector(button));
  }

  closeButton.addEventListener('click', closeInspector);
  zoomOut.addEventListener('click', () => updateZoom(zoom - zoomStep));
  zoomIn.addEventListener('click', () => updateZoom(zoom + zoomStep));
  fitButton.addEventListener('click', fitToViewport);
  canvas.addEventListener('keydown', (event) => {
    const horizontal = event.key === 'ArrowLeft' ? -80 : event.key === 'ArrowRight' ? 80 : 0;
    const vertical = event.key === 'ArrowUp' ? -80 : event.key === 'ArrowDown' ? 80 : 0;
    if (!horizontal && !vertical) return;
    canvas.scrollBy({ left: horizontal, top: vertical });
    event.preventDefault();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [closeButton, zoomOut, zoomIn, fitButton, canvas, caption].filter(
      (element) => !element.hasAttribute('disabled') && element.getClientRects().length > 0,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  });

  dialog.addEventListener('close', () => {
    canvas.replaceChildren();
    activeSvg = null;
    document.body.style.overflow = previousOverflow;
    trigger?.focus({ preventScroll: true });
    trigger = null;
  });
}
