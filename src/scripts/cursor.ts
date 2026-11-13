export {};

const cursor = document.querySelector<HTMLElement>('[data-cursor]');
const finePointer = window.matchMedia('(pointer: fine)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (cursor && finePointer.matches && !reduceMotion.matches) {
  let targetX = -100;
  let targetY = -100;
  let frame = 0;

  const render = () => {
    cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    frame = 0;
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-active');

      if (frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    },
    { passive: true },
  );

  window.addEventListener('pointerleave', () => {
    cursor.classList.remove('is-active');
  });

  window.addEventListener('pointerdown', () => {
    cursor.classList.add('is-pressed');
  });

  window.addEventListener('pointerup', () => {
    cursor.classList.remove('is-pressed');
  });
}
