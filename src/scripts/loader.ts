export {};

const loader = document.querySelector<HTMLElement>('[data-loader]');

if (loader) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const finish = () => {
    if (!loader.isConnected) return;
    loader.classList.add('is-done');
    document.documentElement.classList.remove('no-scroll');
    window.setTimeout(() => loader.remove(), 350);
  };

  const skip = loader.querySelector<HTMLButtonElement>('[data-loader-skip]');
  skip?.addEventListener('click', finish);

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') finish();
    },
    { once: true },
  );

  if (reduceMotion.matches) {
    finish();
  } else {
    document.documentElement.classList.add('no-scroll');
    window.setTimeout(finish, 1600);
  }
}
