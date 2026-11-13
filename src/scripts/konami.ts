export {};

const sequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const liveStatus = document.querySelector<HTMLElement>('[data-live-status]');
let sequenceIndex = 0;
let logoClicks = 0;
let logoWindowStart = 0;

const announce = (message: string) => {
  if (liveStatus) liveStatus.textContent = message;
};

const toggleBlackout = () => {
  const active = document.documentElement.classList.toggle('blackout');
  announce(active ? 'Modo apagón activado.' : 'Modo apagón desactivado.');
};

document.addEventListener('keydown', (event) => {
  if (event.key === sequence[sequenceIndex]) {
    sequenceIndex += 1;

    if (sequenceIndex === sequence.length) {
      sequenceIndex = 0;
      toggleBlackout();
    }

    return;
  }

  sequenceIndex = event.key === sequence[0] ? 1 : 0;
});

const logo = document.querySelector<HTMLElement>('[data-logo]');

logo?.addEventListener('click', () => {
  const now = Date.now();

  if (now - logoWindowStart > 2000) {
    logoClicks = 0;
  }

  logoWindowStart = now;
  logoClicks += 1;

  if (logoClicks >= 5) {
    logoClicks = 0;
    toggleBlackout();
  }
});
