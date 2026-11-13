export {};

const layers = Array.from(
  document.querySelectorAll<HTMLElement>('[data-parallax]'),
);
const wideViewport = window.matchMedia('(min-width: 768px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (layers.length > 0 && wideViewport.matches && !reduceMotion.matches) {
  let ticking = false;

  const update = () => {
    const offset = window.scrollY;

    layers.forEach((layer) => {
      const speed = Number(layer.dataset.parallax ?? '0');
      const shift = Math.min(offset * speed, 120);
      layer.style.setProperty('--py', `${shift}px`);
    });

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}
