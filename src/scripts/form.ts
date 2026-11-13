import { whatsappHref } from '../data/business';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const fieldNames = ['nombre', 'vehiculo', 'servicio', 'mensaje'] as const;

  const getField = (name: string) =>
    form.elements.namedItem(name) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | null;

  const getError = (name: string) =>
    form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);

  const setError = (name: string, message: string) => {
    const field = getField(name);
    const error = getError(name);

    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `error-${name}`);
    }

    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  };

  const clearError = (name: string) => {
    const field = getField(name);
    const error = getError(name);

    if (field) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }

    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
  };

  const clearAll = () => {
    fieldNames.forEach(clearError);
  };

  const validate = () => {
    clearAll();

    const values = {
      nombre: String(new FormData(form).get('nombre') ?? '').trim(),
      vehiculo: String(new FormData(form).get('vehiculo') ?? '').trim(),
      servicio: String(new FormData(form).get('servicio') ?? '').trim(),
      mensaje: String(new FormData(form).get('mensaje') ?? '').trim(),
    };

    const errors: { name: string; message: string }[] = [];

    if (values.nombre.length < 2) {
      errors.push({ name: 'nombre', message: 'Escribe tu nombre.' });
    }

    if (values.vehiculo.length < 2) {
      errors.push({
        name: 'vehiculo',
        message: 'Dinos qué auto o moto traes.',
      });
    }

    if (values.servicio.length === 0) {
      errors.push({
        name: 'servicio',
        message: 'Elige el servicio que te interesa.',
      });
    }

    if (values.mensaje.length < 10) {
      errors.push({
        name: 'mensaje',
        message: 'Cuéntanos un poco más (mínimo 10 caracteres).',
      });
    }

    errors.forEach((error) => setError(error.name, error.message));

    return { valid: errors.length === 0, errors, values };
  };

  form.addEventListener('input', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.dataset.field) {
      clearError(target.dataset.field);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const result = validate();

    if (!result.valid) {
      if (status) {
        status.textContent = `Revisa ${result.errors.length} campo(s) antes de enviar.`;
      }

      const firstError = result.errors[0];
      getField(firstError.name)?.focus();
      return;
    }

    const message = [
      `Hola Mundo Biker, soy ${result.values.nombre}.`,
      `Vehículo: ${result.values.vehiculo}.`,
      `Servicio: ${result.values.servicio}.`,
      `Mensaje: ${result.values.mensaje}`,
    ].join(' ');

    const href = whatsappHref(message);

    if (href === '#contacto') {
      if (status) {
        status.textContent =
          'El número de WhatsApp está pendiente. Tus datos no se enviaron.';
      }
      return;
    }

    if (status) {
      status.textContent = 'Abriendo WhatsApp con tu solicitud...';
    }

    const whatsappWindow = window.open(href, '_blank');

    if (whatsappWindow) {
      whatsappWindow.opener = null;
    } else {
      window.location.assign(href);
    }
  });
}
