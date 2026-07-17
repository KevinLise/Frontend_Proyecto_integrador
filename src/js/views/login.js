import { loginUsuario } from '../api.js';
import { Modal } from 'bootstrap';

// ── Rate limiting ───────────────────────────────────────────────────────────
const RATE_KEY      = 'login_attempts';
const RATE_LOCK_KEY = 'login_locked_until';
const MAX_ATTEMPTS  = 3;
const LOCK_SECONDS  = 30;

function getRateState() {
  return {
    attempts:    parseInt(localStorage.getItem(RATE_KEY)      || '0', 10),
    lockedUntil: parseInt(localStorage.getItem(RATE_LOCK_KEY) || '0', 10),
  };
}
function recordFailedAttempt() {
  const { attempts } = getRateState();
  const next = attempts + 1;
  localStorage.setItem(RATE_KEY, next);
  if (next >= MAX_ATTEMPTS)
    localStorage.setItem(RATE_LOCK_KEY, Date.now() + LOCK_SECONDS * 1000);
}
function resetRateLimit() {
  localStorage.removeItem(RATE_KEY);
  localStorage.removeItem(RATE_LOCK_KEY);
}
function isLocked()        { return getRateState().lockedUntil > Date.now(); }
function secondsRemaining(){ return Math.ceil((getRateState().lockedUntil - Date.now()) / 1000); }

export function renderLogin() {
  const root = document.getElementById('root');

  // Limpiar modal anterior si quedó del ciclo anterior
  document.getElementById('modal-forgot')?.remove();

  // ── HTML principal ──────────────────────────────────────────────────────
  root.innerHTML = `
<div class="min-vh-100 d-flex flex-column flex-lg-row">

  <!-- Panel oscuro -->
  <div class="panel-dark d-flex flex-column justify-content-between
              px-4 py-4 px-lg-5 py-lg-5 col-12 col-lg-6" style="min-height:220px;">
    <div class="grid-bg"></div>

    <div class="position-relative z-1">
      <div class="d-inline-flex align-items-center gap-3 rounded-3 px-3 py-2"
           style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);">
        <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
             class="rounded-2 object-fit-contain" style="width:30px;height:30px;">
        <span class="text-white fw-bold" style="font-size:.875rem;letter-spacing:.05em;">JACKS-STOCK</span>
      </div>
    </div>

    <div class="position-relative z-1 d-none d-lg-flex flex-column gap-4">
      <div class="d-inline-flex align-items-center gap-2">
        <span class="rounded-circle bg-success animate-pulse"
              style="width:8px;height:8px;display:inline-block;"></span>
        <span class="text-success fw-semibold"
              style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;">
          Sistema Operativo · 99.98%
        </span>
      </div>
      <div>
        <h2 class="text-white fw-bold lh-sm" style="font-size:2rem;max-width:280px;">
          Bienvenido a la torre de control de tu inventario.
        </h2>
        <p class="mt-3" style="color:#94a3b8;font-size:.875rem;max-width:280px;line-height:1.6;">
          Monitorea SKUs, movimientos y niveles de stock con precisión industrial.
        </p>
      </div>
      <div class="row g-2">
        <div class="col-4">
          <div class="rounded-3 p-3" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);">
            <p class="text-white fw-bold mb-1" style="font-size:1.1rem;">12,847</p>
            <p class="mb-0 text-uppercase" style="color:#64748b;font-size:10px;letter-spacing:.08em;">SKUs</p>
          </div>
        </div>
        <div class="col-4">
          <div class="rounded-3 p-3" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);">
            <p class="text-white fw-bold mb-1" style="font-size:1.1rem;">342</p>
            <p class="mb-0 text-uppercase" style="color:#64748b;font-size:10px;letter-spacing:.08em;">Mov. hoy</p>
          </div>
        </div>
        <div class="col-4">
          <div class="rounded-3 p-3" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);">
            <p class="text-white fw-bold mb-1" style="font-size:1.1rem;">99.4%</p>
            <p class="mb-0 text-uppercase" style="color:#64748b;font-size:10px;letter-spacing:.08em;">Precisión</p>
          </div>
        </div>
      </div>
    </div>

    <div class="position-relative z-1 d-none d-lg-flex justify-content-between">
      <p class="mb-0" style="color:#475569;font-size:.75rem;">© ${new Date().getFullYear()} Jacks-Stock</p>
      <p class="mb-0" style="color:#475569;font-size:.75rem;">v4.2 · PROD</p>
    </div>
  </div>

  <!-- Panel blanco — formulario -->
  <div class="flex-grow-1 d-flex align-items-center justify-content-center bg-white px-4 py-5 px-lg-5">
    <div class="w-100" style="max-width:360px;">

      <p class="text-uppercase fw-semibold text-secondary mb-2"
         style="font-size:.7rem;letter-spacing:.1em;">01 · Acceso</p>
      <h1 class="fw-bold mb-1" style="font-size:1.75rem;">Iniciar sesión</h1>
      <p class="text-secondary mb-4" style="font-size:.875rem;">
        Ingresa tus credenciales para acceder al panel.
      </p>

      <!-- Error -->
      <div id="login-error"
           class="d-none alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-4"
           style="font-size:.875rem;border-radius:10px;">
        <svg class="flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/>
        </svg>
        <span id="login-error-msg"></span>
      </div>

      <form id="login-form" novalidate>
        <!-- Email -->
        <div class="mb-3">
          <label for="login-email"
                 class="form-label text-uppercase fw-semibold text-secondary"
                 style="font-size:.7rem;letter-spacing:.08em;">Correo corporativo</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <svg id="email-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                         a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <input id="login-email" type="email" autocomplete="username"
                   placeholder="mariana@empresa.com"
                   class="form-control border-start-0 border-end-0 input-jacks ps-0" required>
            <span id="email-status" class="input-group-text bg-white border-start-0"></span>
          </div>
          <div id="email-hint" class="d-none mt-1 text-danger" style="font-size:.75rem;">
            Ingresá un correo válido.
          </div>
        </div>

        <!-- Contraseña -->
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <label class="form-label mb-0 text-uppercase fw-semibold text-secondary"
                   style="font-size:.7rem;letter-spacing:.08em;">Contraseña</label>
            <button type="button" id="btn-forgot-password"
                    class="btn btn-link btn-sm p-0 text-secondary text-decoration-none"
                    style="font-size:.75rem;">¿Olvidaste tu contraseña?</button>
          </div>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0
                         00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </span>
            <input id="login-password" type="password" autocomplete="current-password"
                   placeholder="••••••••••"
                   class="form-control border-start-0 border-end-0 input-jacks ps-0" required>
            <button type="button" id="toggle-password"
                    class="input-group-text bg-white border-start-0" aria-label="Mostrar contraseña">
              <svg id="icon-eye" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
                         9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg id="icon-eye-off" class="d-none" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                         a9.956 9.956 0 012.293-3.95M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mantener sesión -->
        <div class="form-check mb-4">
          <input id="remember-me" type="checkbox" class="form-check-input" checked>
          <label for="remember-me" class="form-check-label" style="font-size:.875rem;">
            Mantener sesión iniciada en este equipo
          </label>
        </div>

        <!-- Submit -->
        <button type="submit" id="login-btn"
                class="btn btn-brand w-100 d-flex align-items-center justify-content-center gap-2 py-3">
          <span class="spinner-border spinner-border-sm spinner-xs d-none"
                id="login-spinner" role="status" aria-hidden="true"></span>
          <span id="login-btn-text">Acceder al panel</span>
          <svg id="login-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </form>

      <!-- Divisor -->
      <div class="d-flex align-items-center gap-3 my-4">
        <div class="flex-grow-1 border-top"></div>
        <span class="text-secondary text-uppercase"
              style="font-size:.7rem;letter-spacing:.08em;white-space:nowrap;">o continúa con</span>
        <div class="flex-grow-1 border-top"></div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-6">
          <button type="button" class="btn btn-outline-secondary w-100 d-flex align-items-center
                  justify-content-center gap-2 py-2" style="font-size:.875rem;">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-outline-secondary w-100 d-flex align-items-center
                  justify-content-center gap-2 py-2" style="font-size:.875rem;">
            <svg width="16" height="16" viewBox="0 0 21 21">
              <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
              <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
              <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            Microsoft
          </button>
        </div>
      </div>

      <p class="text-center text-secondary mb-0" style="font-size:.875rem;">
        ¿Aún no tienes cuenta?
        <button id="btn-ir-registro"
                class="btn btn-link p-0 fw-semibold text-dark text-decoration-none">
          Solicita acceso
        </button>
      </p>
    </div>
  </div>
</div>`;

  // ── Modal: se inserta en body para que Bootstrap lo gestione bien ─────────
  const modalDiv = document.createElement('div');
  modalDiv.innerHTML = `
<div id="modal-forgot" class="modal fade" tabindex="-1"
     role="dialog" aria-labelledby="modal-title">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content rounded-4 border-0 shadow-lg p-2">
      <div id="modal-step-email">
        <div class="modal-header border-0 pb-0">
          <div>
            <p class="text-uppercase fw-semibold text-secondary mb-1"
               style="font-size:.7rem;letter-spacing:.08em;">Recuperar acceso</p>
            <h5 class="modal-title fw-bold" id="modal-title">¿Olvidaste tu contraseña?</h5>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body pt-2">
          <p class="text-secondary mb-3" style="font-size:.875rem;">
            Ingresá tu correo corporativo para recibir el link de recuperación.
          </p>
          <div id="modal-error" class="d-none alert alert-danger py-2 px-3 mb-3"
               style="font-size:.875rem;border-radius:8px;">
            <span id="modal-error-msg"></span>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text bg-white">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                         a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <input id="modal-email" type="email" placeholder="mariana@empresa.com"
                   autocomplete="email" class="form-control input-jacks border-start-0 ps-0">
          </div>
          <button id="modal-submit"
                  class="btn btn-brand w-100 d-flex align-items-center justify-content-center gap-2 py-2">
            <span class="spinner-border spinner-border-sm spinner-xs d-none" id="modal-spinner"></span>
            <span id="modal-btn-text">Enviar link de recuperación</span>
          </button>
        </div>
      </div>
      <div id="modal-step-success" class="d-none text-center p-4">
        <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center
                    justify-content-center mb-3" style="width:56px;height:56px;">
          <svg width="28" height="28" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h5 class="fw-bold mb-2">Revisá tu correo</h5>
        <p class="text-secondary mb-4" style="font-size:.875rem;">
          Si el correo está registrado, vas a recibir el link en los próximos minutos.
        </p>
        <button id="modal-close-success" class="btn btn-outline-secondary w-100 py-2 rounded-3">
          Entendido
        </button>
      </div>
    </div>
  </div>
</div>`;
  document.body.appendChild(modalDiv.firstElementChild);

  // ── Referencias DOM ───────────────────────────────────────────────────────
  const emailInput  = document.getElementById('login-email');
  const emailStatus = document.getElementById('email-status');
  const emailHint   = document.getElementById('email-hint');
  const pwInput     = document.getElementById('login-password');
  const form        = document.getElementById('login-form');
  const errorBox    = document.getElementById('login-error');
  const errorMsg    = document.getElementById('login-error-msg');
  const submitBtn   = document.getElementById('login-btn');
  const spinner     = document.getElementById('login-spinner');
  const btnText     = document.getElementById('login-btn-text');
  const btnArrow    = document.getElementById('login-arrow');
  const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const SVG_CHECK = `<svg width="14" height="14" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  const SVG_X = `<svg width="14" height="14" fill="none" stroke="#f87171" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;

  // ── Validación email ──────────────────────────────────────────────────────
  function validateEmail(live = false) {
    const val = emailInput.value.trim();
    if (!val && !live) return;
    if (!val) {
      emailStatus.innerHTML = '';
      emailInput.classList.remove('is-valid-custom', 'is-invalid-custom');
      emailHint.classList.add('d-none');
      return;
    }
    const valid = EMAIL_RE.test(val);
    emailStatus.innerHTML = valid ? SVG_CHECK : SVG_X;
    emailInput.classList.toggle('is-valid-custom',   valid);
    emailInput.classList.toggle('is-invalid-custom', !valid);
    emailHint.classList.toggle('d-none', valid);
  }
  emailInput.addEventListener('input', () => { if (emailInput.value.trim()) validateEmail(true); });
  emailInput.addEventListener('blur',  () => validateEmail(false));
  emailInput.addEventListener('focus', () => {
    emailInput.classList.remove('is-invalid-custom');
    emailStatus.innerHTML = '';
    emailHint.classList.add('d-none');
  });

  // ── Toggle contraseña ─────────────────────────────────────────────────────
  document.getElementById('toggle-password').addEventListener('click', () => {
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    document.getElementById('icon-eye').classList.toggle('d-none', show);
    document.getElementById('icon-eye-off').classList.toggle('d-none', !show);
  });

  // ── Ir a registro ─────────────────────────────────────────────────────────
  document.getElementById('btn-ir-registro').addEventListener('click', () => {
    import('./registro.js').then(({ renderRegistro }) => renderRegistro());
  });

  // ── Modal recuperar contraseña ────────────────────────────────────────────
  const modalEl      = document.getElementById('modal-forgot');
  const bsModal      = new Modal(modalEl);
  const stepEmail    = document.getElementById('modal-step-email');
  const stepSuccess  = document.getElementById('modal-step-success');
  const modalSubmit  = document.getElementById('modal-submit');
  const modalSpinner = document.getElementById('modal-spinner');
  const modalBtnText = document.getElementById('modal-btn-text');
  const modalError   = document.getElementById('modal-error');
  const modalErrMsg  = document.getElementById('modal-error-msg');

  document.getElementById('btn-forgot-password').addEventListener('click', () => {
    document.getElementById('modal-email').value = emailInput.value.trim();
    stepEmail.classList.remove('d-none');
    stepSuccess.classList.add('d-none');
    modalError.classList.add('d-none');
    modalSubmit.disabled = false;
    modalBtnText.textContent = 'Enviar link de recuperación';
    modalSpinner.classList.add('d-none');
    bsModal.show();
  });

  document.getElementById('modal-close-success').addEventListener('click', () => bsModal.hide());

  modalSubmit.addEventListener('click', async () => {
    const email = document.getElementById('modal-email').value.trim();
    if (!EMAIL_RE.test(email)) {
      modalErrMsg.textContent = 'Ingresá un correo válido.';
      modalError.classList.remove('d-none');
      return;
    }
    modalError.classList.add('d-none');
    modalSubmit.disabled = true;
    modalSpinner.classList.remove('d-none');
    modalBtnText.textContent = 'Enviando…';
    try {
      const { solicitarRecuperacion } = await import('../api.js');
      await solicitarRecuperacion(email);
    } catch { /* siempre mostrar éxito por seguridad */ } finally {
      stepEmail.classList.add('d-none');
      stepSuccess.classList.remove('d-none');
    }
  });

  // ── Rate limiting + Submit ────────────────────────────────────────────────
  let countdownTimer = null;

  function startCountdown() {
    submitBtn.disabled = true;
    btnArrow.classList.add('d-none');
    function tick() {
      const secs = secondsRemaining();
      if (secs <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
        btnArrow.classList.remove('d-none');
        btnText.textContent = 'Acceder al panel';
        errorBox.classList.add('d-none');
        return;
      }
      spinner.classList.remove('d-none');
      btnText.textContent = `Esperar ${secs}s`;
    }
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  if (isLocked()) {
    startCountdown();
    errorMsg.textContent = `Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`;
    errorBox.classList.remove('d-none');
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    spinner.classList.toggle('d-none', !loading);
    btnArrow.classList.toggle('d-none', loading);
    btnText.textContent = loading ? 'Ingresando…' : 'Acceder al panel';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isLocked()) {
      errorMsg.textContent = `Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`;
      errorBox.classList.remove('d-none');
      return;
    }
    errorBox.classList.add('d-none');
    const email    = emailInput.value.trim();
    const password = pwInput.value;
    if (!email || !password) {
      errorMsg.textContent = 'Por favor completá todos los campos.';
      errorBox.classList.remove('d-none');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      errorMsg.textContent = 'Ingresá un correo válido.';
      errorBox.classList.remove('d-none');
      validateEmail(false);
      return;
    }
    setLoading(true);
    try {
      const result = await loginUsuario({ email, password });
      if (result.success) {
        resetRateLimit();
        const remember = document.getElementById('remember-me').checked;
        if (remember) {
          localStorage.setItem('auth_token', result.token);
          localStorage.setItem('auth_user',  JSON.stringify(result.user));
        }
        sessionStorage.setItem('auth_token', result.token);
        sessionStorage.setItem('auth_user',  JSON.stringify(result.user));
        window.dispatchEvent(new CustomEvent('auth:login', { detail: result.user }));
      } else {
        recordFailedAttempt();
        const { attempts } = getRateState();
        const left = MAX_ATTEMPTS - attempts;
        if (isLocked()) {
          errorMsg.textContent = `Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`;
          errorBox.classList.remove('d-none');
          startCountdown();
        } else {
          errorMsg.textContent =
            (result.message || 'Credenciales incorrectas.') +
            (left > 0 ? ` Te ${left === 1 ? 'queda' : 'quedan'} ${left} intento${left === 1 ? '' : 's'}.` : '');
          errorBox.classList.remove('d-none');
        }
      }
    } catch {
      errorMsg.textContent = 'No se pudo conectar con el servidor. Verificá tu conexión.';
      errorBox.classList.remove('d-none');
    } finally {
      if (!isLocked()) setLoading(false);
    }
  });
}
