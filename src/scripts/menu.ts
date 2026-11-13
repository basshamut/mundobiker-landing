export {};

const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const panel = document.querySelector<HTMLElement>('[data-menu]');

if (toggle && panel) {
  const links = Array.from(panel.querySelectorAll<HTMLElement>('a'));
  let open = false;

  const setOpen = (next: boolean, restoreFocus = true) => {
    open = next;
    toggle.setAttribute('aria-expanded', String(next));
    panel.toggleAttribute('data-open', next);
    panel.setAttribute('aria-hidden', String(!next));
    document.documentElement.classList.toggle('no-scroll', next);

    if (next) {
      links[0]?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false, false));
  });

  document.addEventListener('keydown', (event) => {
    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      const focusables = [toggle, ...links];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!first || !last) return;

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
