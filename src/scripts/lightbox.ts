export {};

const lightbox = document.querySelector<HTMLElement>('[data-lightbox]');

if (lightbox) {
  const items = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-gallery-item]'),
  );
  const title = lightbox.querySelector<HTMLElement>('[data-lightbox-title]');
  const image = lightbox.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const closeButton = lightbox.querySelector<HTMLButtonElement>(
    '[data-lightbox-close]',
  );
  const previousButton = lightbox.querySelector<HTMLButtonElement>(
    '[data-lightbox-prev]',
  );
  const nextButton = lightbox.querySelector<HTMLButtonElement>(
    '[data-lightbox-next]',
  );

  let currentIndex = 0;
  let trigger: HTMLElement | null = null;

  const render = () => {
    const item = items[currentIndex];
    if (!item) return;

    const itemTitle = item.dataset.galleryTitle ?? 'Trabajo en proceso';
    const source = item.dataset.gallerySrc;
    const alt = item.dataset.galleryAlt ?? itemTitle;

    if (title) title.textContent = itemTitle;

    if (image) {
      if (source) {
        image.src = source;
        image.alt = alt;
      } else {
        image.removeAttribute('src');
        image.alt = '';
      }
    }

    items.forEach((element, index) => {
      if (index === currentIndex) {
        element.setAttribute('aria-current', 'true');
      } else {
        element.removeAttribute('aria-current');
      }
    });
  };

  const open = (index: number, source: HTMLElement) => {
    currentIndex = index;
    trigger = source;
    render();
    lightbox.hidden = false;
    document.documentElement.classList.add('no-scroll');
    closeButton?.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.documentElement.classList.remove('no-scroll');
    trigger?.focus();
  };

  const move = (direction: number) => {
    if (items.length === 0) return;
    currentIndex = (currentIndex + direction + items.length) % items.length;
    render();
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index, item));
  });

  closeButton?.addEventListener('click', close);
  previousButton?.addEventListener('click', () => move(-1));
  nextButton?.addEventListener('click', () => move(1));

  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
      return;
    }

    if (event.key === 'Tab') {
      const focusables = Array.from(
        lightbox.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
