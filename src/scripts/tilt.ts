export {};

const finePointer = window.matchMedia('(pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reduceMotion) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const reset = () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    };

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--ry', `${px * 8}deg`);
      card.style.setProperty('--rx', `${py * -8}deg`);
    });

    card.addEventListener('pointerleave', reset);
    card.addEventListener('blur', reset);
  });
}
