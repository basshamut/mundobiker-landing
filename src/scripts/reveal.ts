export {};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if ('IntersectionObserver' in window && reveals.length > 0 && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  reveals.forEach((element) => revealObserver.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

const pauseTargets = Array.from(
  document.querySelectorAll<HTMLElement>('[data-animate]'),
);

if ('IntersectionObserver' in window && pauseTargets.length > 0) {
  const pauseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      });
    },
    { threshold: 0 },
  );

  pauseTargets.forEach((element) => pauseObserver.observe(element));
}

if (!reduceMotion) {
  const glitches = Array.from(document.querySelectorAll<HTMLElement>('.glitch'));

  const schedule = (element: HTMLElement) => {
    const delay = 6000 + Math.random() * 5000;

    window.setTimeout(() => {
      element.classList.add('is-glitching');
      window.setTimeout(() => element.classList.remove('is-glitching'), 650);
      schedule(element);
    }, delay);
  };

  glitches.forEach(schedule);
}
