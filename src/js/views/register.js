import { registerUser } from '../api.js';
import { saveSession } from '../auth.js';

/**
 * Devuelve el HTML del formulario de registro.
 * El router inyecta este string en #auth-view.
 */
export function renderRegister() {
  return `
    <div class="w-full max-w-sm mx-auto">
      <h2 class="text-2xl font-bold text-slate-900 mb-1">Crear cuenta</h2>
      <p class="text-sm text-slate-500 mb-6">
        ¿Ya tenés cuenta?
        <a href="#login" class="text-slate-900 font-medium underline underline-offset-2">Iniciar sesión</a>
      </p>

      <form id="register-form" novalidate class="space-y-4">

        <div>
          <label for="reg-name" class="block text-sm font-medium text-slate-700 mb-1">
            Nombre completo
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autocomplete="name"
            required
            placeholder="Juan Pérez"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                   placeholder:text-slate-400"
          />
          <p id="reg-name-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <label for="reg-email" class="block text-sm font-medium text-slate-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autocomplete="email"
            required
            placeholder="tu@email.com"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                   placeholder:text-slate-400"
          />
          <p id="reg-email-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <label for="reg-password" class="block text-sm font-medium text-slate-700 mb-1">
            Contraseña
          </label>
          <div class="relative">
            <input
              id="reg-password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              placeholder="Mínimo 8 caracteres"
              class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                     placeholder:text-slate-400 pr-10"
            />
            <button
              type="button"
              id="toggle-reg-password"
              aria-label="Mostrar u ocultar contraseña"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <svg id="eye-show-reg" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                     -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg id="eye-hide-reg" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7
                     a9.97 9.97 0 012.59-4.293M9.88 9.88a3 3 0 104.24 4.24
                     M3 3l18 18"/>
              </svg>
            </button>
          </div>
          <!-- Barra de fortaleza de contraseña -->
          <div class="mt-2 flex gap-1">
            <div id="str-1" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
            <div id="str-2" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
            <div id="str-3" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
            <div id="str-4" class="h-1 flex-1 rounded-full bg-slate-200 transition-colors"></div>
          </div>
          <p id="reg-password-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <div>
          <label for="reg-confirm" class="block text-sm font-medium text-slate-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="reg-confirm"
            name="confirm"
            type="password"
            autocomplete="new-password"
            required
            placeholder="Repetí tu contraseña"
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                   placeholder:text-slate-400"
          />
          <p id="reg-confirm-error" class="mt-1 text-xs text-red-500 hidden"></p>
        </div>

        <p id="reg-global-error"
           class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 hidden">
        </p>

        <p id="reg-global-success"
           class="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 hidden">
        </p>

        <button
          type="submit"
          id="reg-submit"
          class="w-full bg-slate-900 text-white font-medium text-sm py-2.5 rounded-lg
                 hover:bg-slate-700 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  `;
}

/**
 * Adjunta los event listeners del formulario de registro.
 * Se llama después de que el HTML esté en el DOM.
 */
export function initRegister() {
  const form          = document.getElementById('register-form');
  const nameInput     = document.getElementById('reg-name');
  const emailInput    = document.getElementById('reg-email');
  const passInput     = document.getElementById('reg-password');
  const confirmInput  = document.getElementById('reg-confirm');
  const nameError     = document.getElementById('reg-name-error');
  const emailError    = document.getElementById('reg-email-error');
  const passError     = document.getElementById('reg-password-error');
  const confirmError  = document.getElementById('reg-confirm-error');
  const globalError   = document.getElementById('reg-global-error');
  const globalSuccess = document.getElementById('reg-global-success');
  const submitBtn     = document.getElementById('reg-submit');
  const toggleBtn     = document.getElementById('toggle-reg-password');
  const eyeShow       = document.getElementById('eye-show-reg');
  const eyeHide       = document.getElementById('eye-hide-reg');

  // Toggle mostrar/ocultar contraseña
  toggleBtn.addEventListener('click', () => {
    const isPassword = passInput.type === 'password';
    passInput.type   = isPassword ? 'text' : 'password';
    eyeShow.classList.toggle('hidden', isPassword);
    eyeHide.classList.toggle('hidden', !isPassword);
  });

  // Barra de fortaleza en tiempo real
  passInput.addEventListener('input', () => {
    showFieldError(passError, null);
    updateStrengthBar(passInput.value);
  });

  // Limpiar errores al escribir
  nameInput.addEventListener('input',    () => showFieldError(nameError, null));
  emailInput.addEventListener('input',   () => showFieldError(emailError, null));
  confirmInput.addEventListener('input', () => showFieldError(confirmError, null));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errores
    [nameError, emailError, passError, confirmError].forEach(el => showFieldError(el, null));
    showMessage(globalError,   null);
    showMessage(globalSuccess, null);

    const name     = nameInput.value.trim();
    const email    = emailInput.value.trim();
    const password = passInput.value;
    const confirm  = confirmInput.value;

    // Validación local
    let valid = true;
    if (!name) {
      showFieldError(nameError, 'El nombre es obligatorio.');
      valid = false;
    }
    if (!email) {
      showFieldError(emailError, 'El correo es obligatorio.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError(emailError, 'Ingresá un correo válido.');
      valid = false;
    }
    if (!password) {
      showFieldError(passError, 'La contraseña es obligatoria.');
      valid = false;
    } else if (password.length < 8) {
      showFieldError(passError, 'La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    }
    if (!confirm) {
      showFieldError(confirmError, 'Confirmá tu contraseña.');
      valid = false;
    } else if (password !== confirm) {
      showFieldError(confirmError, 'Las contraseñas no coinciden.');
      valid = false;
    }
    if (!valid) return;

    setLoading(submitBtn, true);

    try {
      const data = await registerUser({ name, email, password });

      if (data.error) {
        showMessage(globalError, data.error);
        return;
      }

      // Si el backend devuelve token directo al registrar, iniciamos sesión
      if (data.token) {
        saveSession(data.token, data.user);
        window.location.hash = '#dashboard';
        window.dispatchEvent(new Event('auth-change'));
      } else {
        // Si el backend solo confirma el registro (sin auto-login)
        showMessage(
          globalSuccess,
          '¡Cuenta creada con éxito! Redirigiendo al login…'
        );
        setTimeout(() => { window.location.hash = '#login'; }, 1800);
      }

    } catch (err) {
      showMessage(globalError, 'No se pudo conectar con el servidor. Intentá de nuevo.');
      console.error('[Register]', err);
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

// ── Helpers UI ──────────────────────────────────────────────────────────────

function showFieldError(el, msg) {
  if (msg) {
    el.textContent = msg;
    el.classList.remove('hidden');
  } else {
    el.textContent = '';
    el.classList.add('hidden');
  }
}

function showMessage(el, msg) {
  if (msg) {
    el.textContent = msg;
    el.classList.remove('hidden');
  } else {
    el.textContent = '';
    el.classList.add('hidden');
  }
}

function setLoading(btn, loading) {
  btn.disabled    = loading;
  btn.textContent = loading ? 'Creando cuenta…' : 'Crear cuenta';
}

/**
 * Calcula la fortaleza de la contraseña (0-4) y colorea la barra.
 * Criterios: longitud ≥8, mayúscula, número, carácter especial.
 */
function updateStrengthBar(password) {
  const bars = [
    document.getElementById('str-1'),
    document.getElementById('str-2'),
    document.getElementById('str-3'),
    document.getElementById('str-4'),
  ];

  let score = 0;
  if (password.length >= 8)              score++;
  if (/[A-Z]/.test(password))            score++;
  if (/\d/.test(password))               score++;
  if (/[^A-Za-z0-9]/.test(password))     score++;

  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const activeColor = score > 0 ? colors[score - 1] : '';

  bars.forEach((bar, i) => {
    bar.className = 'h-1 flex-1 rounded-full transition-colors ' +
      (i < score ? activeColor : 'bg-slate-200');
  });
}
