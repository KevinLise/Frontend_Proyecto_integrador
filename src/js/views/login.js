import { loginUsuario } from '../api.js';

// ── Rate limiting: máx 3 intentos, bloqueo 30s ──────────────────────────────
const RATE_KEY      = 'login_attempts';
const RATE_LOCK_KEY = 'login_locked_until';
const MAX_ATTEMPTS  = 3;
const LOCK_SECONDS  = 30;

function getRateState() {
  return {
    attempts:   parseInt(localStorage.getItem(RATE_KEY)      || '0', 10),
    lockedUntil: parseInt(localStorage.getItem(RATE_LOCK_KEY) || '0', 10),
  };
}

function recordFailedAttempt() {
  const { attempts } = getRateState();
  const next = attempts + 1;
  localStorage.setItem(RATE_KEY, next);
  if (next >= MAX_ATTEMPTS) {
    localStorage.setItem(RATE_LOCK_KEY, Date.now() + LOCK_SECONDS * 1000);
  }
}

function resetRateLimit() {
  localStorage.removeItem(RATE_KEY);
  localStorage.removeItem(RATE_LOCK_KEY);
}

function isLocked() {
  const { lockedUntil } = getRateState();
  return lockedUntil > Date.now();
}

function secondsRemaining() {
  const { lockedUntil } = getRateState();
  return Math.ceil((lockedUntil - Date.now()) / 1000);
}

export function renderLogin() {
  const root = document.getElementById('root');

  root.innerHTML = `
    <div class="min-h-screen flex flex-col lg:flex-row">

      <!-- ══════════════════════════════════════════════════════
           PANEL OSCURO
           · Desktop: mitad izquierda fija (lg:w-1/2, lg:min-h-screen)
           · Mobile/tablet: header compacto arriba
      ══════════════════════════════════════════════════════ -->
      <div class="
            bg-[#1a2234] relative overflow-hidden
            flex flex-col justify-between
            px-6 py-6 lg:px-10 lg:py-10
            lg:w-1/2 lg:min-h-screen lg:sticky lg:top-0 lg:h-screen
          ">

        <!-- Fondo cuadriculado -->
        <div class="absolute inset-0 opacity-[0.07] pointer-events-none"
             style="background-image:linear-gradient(#fff 1px,transparent 1px),
                                     linear-gradient(90deg,#fff 1px,transparent 1px);
                    background-size:40px 40px;">
        </div>

        <!-- Logo (siempre visible) -->
        <div class="relative z-10">
          <div class="inline-flex items-center gap-3 bg-white/10 border border-white/15
                      rounded-xl px-4 py-2.5 lg:py-3 backdrop-blur-sm">
            <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
                 class="w-7 h-7 lg:w-8 lg:h-8 rounded-lg object-contain">
            <span class="text-white font-bold text-sm tracking-wide">JACKS-STOCK</span>
          </div>
        </div>

        <!-- Contenido central: oculto en mobile, visible en lg -->
        <div class="relative z-10 hidden lg:flex flex-col gap-8">

          <div class="inline-flex items-center gap-2 w-fit">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              Sistema Operativo · 99.98%
            </span>
          </div>

          <div>
            <h2 class="text-white text-4xl font-bold leading-tight max-w-xs">
              Bienvenido a la torre de control de tu inventario.
            </h2>
            <p class="text-slate-400 text-sm mt-4 max-w-xs leading-relaxed">
              Monitorea SKUs, movimientos y niveles de stock con la precisión
              de un panel industrial — sin fricción, sin fórmulas rotas.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="bg-white/5 border border-white/10 rounded-xl p-4">
              <div class="text-slate-400 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <p class="text-white font-bold text-lg leading-none">12,847</p>
              <p class="text-slate-500 text-[11px] uppercase tracking-wider mt-1">SKUs</p>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-4">
              <div class="text-slate-400 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 17l6-6 4 4 8-8"/>
                </svg>
              </div>
              <p class="text-white font-bold text-lg leading-none">342</p>
              <p class="text-slate-500 text-[11px] uppercase tracking-wider mt-1">Mov. hoy</p>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-4">
              <div class="text-slate-400 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v5l3 3"/>
                </svg>
              </div>
              <p class="text-white font-bold text-lg leading-none">99.4%</p>
              <p class="text-slate-500 text-[11px] uppercase tracking-wider mt-1">Precisión</p>
            </div>
          </div>
        </div>

        <!-- Footer oscuro: solo desktop -->
        <div class="relative z-10 hidden lg:flex items-center justify-between">
          <p class="text-slate-600 text-xs">© ${new Date().getFullYear()} Jacks-Stock</p>
          <p class="text-slate-600 text-xs">v4.2 · PROD</p>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════
           PANEL BLANCO — formulario
      ══════════════════════════════════════════════════════ -->
      <div class="flex-1 flex items-center justify-center bg-white
                  px-5 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div class="w-full max-w-sm">

          <!-- Etiqueta + título -->
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            01 · Acceso
          </p>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Iniciar sesión</h1>
          <p class="text-slate-500 text-sm mb-8">
            Ingresa tus credenciales para acceder al panel de operaciones.
          </p>

          <!-- Error -->
          <div id="login-error"
               class="hidden mb-5 flex items-center gap-2 bg-red-50 border border-red-200
                      text-red-600 text-sm px-4 py-3 rounded-xl">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/>
            </svg>
            <span id="login-error-msg"></span>
          </div>

          <form id="login-form" novalidate class="space-y-5">

            <!-- Email -->
            <div>
              <label for="login-email"
                     class="block text-[11px] font-semibold text-slate-500 uppercase
                            tracking-widest mb-2">
                Correo corporativo
              </label>
              <div class="relative">
                <svg id="email-icon" class="w-4 h-4 absolute left-3.5 top-3 text-slate-400 transition-colors"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                           a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input id="login-email" type="email" autocomplete="username"
                       placeholder="mariana@empresa.com"
                       class="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200
                              text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300"
                       required>
                <!-- Ícono de validación (oculto hasta que el usuario escriba) -->
                <span id="email-status" class="absolute right-3.5 top-3 hidden">
                  <!-- se inyecta por JS -->
                </span>
              </div>
              <p id="email-hint" class="hidden mt-1.5 text-xs text-red-500">
                Ingresá un correo válido (ej: usuario@empresa.com).
              </p>
            </div>

            <!-- Contraseña -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                  Contraseña
                </label>
                <button type="button" id="btn-forgot-password"
                        class="text-xs text-slate-500 hover:text-slate-800 transition focus:outline-none
                               min-h-[44px] flex items-center">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div class="relative">
                <svg class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0
                           00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input id="login-password" type="password" autocomplete="current-password"
                       placeholder="••••••••••"
                       class="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200
                              text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300"
                       required>
                <button type="button" id="toggle-password"
                        class="absolute right-0 top-0 h-full px-3.5 text-slate-400
                               hover:text-slate-600 transition min-w-[44px] flex items-center
                               justify-center"
                        aria-label="Mostrar contraseña">
                  <svg id="icon-eye" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
                             9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg id="icon-eye-off" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                             a9.956 9.956 0 012.293-3.95M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Mantener sesión -->
            <label class="flex items-center gap-3 cursor-pointer select-none min-h-[44px]">
              <input id="remember-me" type="checkbox" checked
                     class="w-4 h-4 rounded border-slate-300 accent-slate-900 cursor-pointer shrink-0">
              <span class="text-sm text-slate-600">Mantener sesión iniciada en este equipo</span>
            </label>

            <!-- Submit -->
            <button type="submit" id="login-btn"
                    class="w-full bg-slate-900 hover:bg-slate-700 active:bg-black
                           text-white font-semibold py-3.5 rounded-xl text-sm
                           transition focus:outline-none focus:ring-2 focus:ring-slate-900/30
                           disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2 min-h-[48px]">
              <svg id="login-spinner" class="hidden w-4 h-4 animate-spin"
                   fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              <span id="login-btn-text">Acceder al panel</span>
              <svg id="login-arrow" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>

          </form>

          <!-- Divisor -->
          <div class="flex items-center gap-3 my-6">
            <div class="flex-1 h-px bg-slate-100"></div>
            <span class="text-[11px] text-slate-400 uppercase tracking-widest whitespace-nowrap">
              o continúa con
            </span>
            <div class="flex-1 h-px bg-slate-100"></div>
          </div>

          <!-- OAuth -->
          <div class="grid grid-cols-2 gap-3">
            <button type="button"
                    class="flex items-center justify-center gap-2 border border-slate-200
                           rounded-xl py-3 text-sm font-medium text-slate-700
                           hover:bg-slate-50 active:bg-slate-100 transition min-h-[48px]">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
                      1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
                      1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
                      8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09
                      14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button"
                    class="flex items-center justify-center gap-2 border border-slate-200
                           rounded-xl py-3 text-sm font-medium text-slate-700
                           hover:bg-slate-50 active:bg-slate-100 transition min-h-[48px]">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                <rect x="1"  y="1"  width="9" height="9" fill="#f25022"/>
                <rect x="11" y="1"  width="9" height="9" fill="#7fba00"/>
                <rect x="1"  y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              Microsoft
            </button>
          </div>

          <!-- Link registro -->
          <p class="text-center text-sm text-slate-500 mt-7">
            ¿Aún no tienes cuenta?
            <button id="btn-ir-registro"
                    class="text-slate-900 font-semibold hover:underline focus:outline-none
                           min-h-[44px] inline-flex items-center">
              Solicita acceso
            </button>
          </p>

        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════
         MODAL — Recuperar contraseña
    ══════════════════════════════════════════════════════ -->
    <div id="modal-forgot"
         class="hidden fixed inset-0 z-50 flex items-center justify-center p-4"
         role="dialog" aria-modal="true" aria-labelledby="modal-title">

      <!-- Backdrop -->
      <div id="modal-backdrop"
           class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <!-- Card -->
      <div class="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">

        <!-- Cerrar -->
        <button id="modal-close"
                class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
                aria-label="Cerrar">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div id="modal-step-email">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Recuperar acceso
          </p>
          <h2 id="modal-title" class="text-xl font-bold text-slate-900 mb-2">
            ¿Olvidaste tu contraseña?
          </h2>
          <p class="text-slate-500 text-sm mb-6">
            Ingresá tu correo corporativo y te enviamos un link para restablecer tu contraseña.
          </p>

          <!-- Error modal -->
          <div id="modal-error"
               class="hidden mb-4 flex items-center gap-2 bg-red-50 border border-red-200
                      text-red-600 text-sm px-4 py-3 rounded-xl">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/>
            </svg>
            <span id="modal-error-msg"></span>
          </div>

          <div class="relative mb-5">
            <svg class="w-4 h-4 absolute left-3.5 top-3 text-slate-400"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                       a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input id="modal-email" type="email" placeholder="mariana@empresa.com"
                   autocomplete="email"
                   class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200
                          text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/15
                          focus:border-slate-400 transition placeholder-slate-300">
          </div>

          <button id="modal-submit"
                  class="w-full bg-slate-900 hover:bg-slate-700 text-white font-semibold
                         py-3 rounded-xl text-sm transition flex items-center justify-center
                         gap-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed">
            <svg id="modal-spinner" class="hidden w-4 h-4 animate-spin"
                 fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            <span id="modal-btn-text">Enviar link de recuperación</span>
          </button>
        </div>

        <!-- Estado: email enviado -->
        <div id="modal-step-success" class="hidden text-center">
          <div class="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center
                      mx-auto mb-5">
            <svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                       a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-slate-900 mb-2">Revisá tu correo</h2>
          <p class="text-slate-500 text-sm mb-6">
            Si el correo está registrado, vas a recibir el link en los próximos minutos.
            Revisá también tu carpeta de spam.
          </p>
          <button id="modal-close-success"
                  class="w-full border border-slate-200 hover:bg-slate-50 text-slate-700
                         font-semibold py-3 rounded-xl text-sm transition min-h-[48px]">
            Entendido
          </button>
        </div>

      </div>
    </div>
  `;

  // ── 1. Validación en tiempo real de email ────────────────────────────────
  const emailInput  = document.getElementById('login-email');
  const emailStatus = document.getElementById('email-status');
  const emailHint   = document.getElementById('email-hint');
  const emailIcon   = document.getElementById('email-icon');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const SVG_CHECK = `<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  const SVG_X = `<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;

  function validateEmail(live = false) {
    const val = emailInput.value.trim();
    if (!val && !live) return; // no marcar si está vacío al perder foco sin escribir
    if (!val) {
      emailStatus.classList.add('hidden');
      emailInput.classList.remove('border-emerald-400', 'border-red-400');
      emailInput.classList.add('border-slate-200');
      emailHint.classList.add('hidden');
      return;
    }
    const valid = EMAIL_RE.test(val);
    emailStatus.innerHTML = valid ? SVG_CHECK : SVG_X;
    emailStatus.classList.remove('hidden');
    emailInput.classList.remove('border-slate-200', 'border-emerald-400', 'border-red-400');
    emailInput.classList.add(valid ? 'border-emerald-400' : 'border-red-400');
    emailIcon.classList.toggle('text-emerald-500', valid);
    emailIcon.classList.toggle('text-red-400', !valid);
    emailIcon.classList.toggle('text-slate-400', false);
    emailHint.classList.toggle('hidden', valid);
  }

  // Valida mientras escribe (solo si ya tiene contenido)
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) validateEmail(true);
  });
  // Valida al salir del campo
  emailInput.addEventListener('blur', () => validateEmail(false));
  // Limpia el estado al volver a enfocar si había error
  emailInput.addEventListener('focus', () => {
    if (emailInput.classList.contains('border-red-400')) {
      emailInput.classList.remove('border-red-400');
      emailInput.classList.add('border-slate-200');
      emailStatus.classList.add('hidden');
      emailHint.classList.add('hidden');
      emailIcon.className = 'w-4 h-4 absolute left-3.5 top-3 text-slate-400 transition-colors';
    }
  });

  // ── Toggle contraseña ─────────────────────────────────────────────────────
  const pwInput    = document.getElementById('login-password');
  const toggleBtn  = document.getElementById('toggle-password');
  const iconEye    = document.getElementById('icon-eye');
  const iconEyeOff = document.getElementById('icon-eye-off');

  toggleBtn.addEventListener('click', () => {
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    iconEye.classList.toggle('hidden', show);
    iconEyeOff.classList.toggle('hidden', !show);
  });

  // ── Ir a registro ─────────────────────────────────────────────────────────
  document.getElementById('btn-ir-registro').addEventListener('click', () => {
    import('./registro.js').then(({ renderRegistro }) => renderRegistro());
  });

  // ── 3. Modal "Olvidé mi contraseña" ──────────────────────────────────────
  const modal          = document.getElementById('modal-forgot');
  const modalBackdrop  = document.getElementById('modal-backdrop');
  const modalClose     = document.getElementById('modal-close');
  const modalCloseOk   = document.getElementById('modal-close-success');
  const stepEmail      = document.getElementById('modal-step-email');
  const stepSuccess    = document.getElementById('modal-step-success');
  const modalSubmit    = document.getElementById('modal-submit');
  const modalSpinner   = document.getElementById('modal-spinner');
  const modalBtnText   = document.getElementById('modal-btn-text');
  const modalError     = document.getElementById('modal-error');
  const modalErrorMsg  = document.getElementById('modal-error-msg');

  function openModal() {
    modal.classList.remove('hidden');
    document.getElementById('modal-email').value = emailInput.value.trim();
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('modal-email').focus(), 50);
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    stepEmail.classList.remove('hidden');
    stepSuccess.classList.add('hidden');
    modalError.classList.add('hidden');
    modalSubmit.disabled = false;
    modalBtnText.textContent = 'Enviar link de recuperación';
    modalSpinner.classList.add('hidden');
  }

  document.getElementById('btn-forgot-password').addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalCloseOk.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Cerrar con Escape
  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  modalSubmit.addEventListener('click', async () => {
    const email = document.getElementById('modal-email').value.trim();
    if (!EMAIL_RE.test(email)) {
      modalErrorMsg.textContent = 'Ingresá un correo válido.';
      modalError.classList.remove('hidden');
      return;
    }
    modalError.classList.add('hidden');
    modalSubmit.disabled = true;
    modalSpinner.classList.remove('hidden');
    modalBtnText.textContent = 'Enviando…';

    try {
      // Importación dinámica para no romper si el endpoint no existe aún
      const { solicitarRecuperacion } = await import('../api.js');
      await solicitarRecuperacion(email);
    } catch {
      // Mostramos éxito aunque falle (seguridad: no revelar si el email existe)
    } finally {
      stepEmail.classList.add('hidden');
      stepSuccess.classList.remove('hidden');
    }
  });

  // ── 2. Rate limiting con countdown ───────────────────────────────────────
  const form      = document.getElementById('login-form');
  const errorBox  = document.getElementById('login-error');
  const errorMsg  = document.getElementById('login-error-msg');
  const submitBtn = document.getElementById('login-btn');
  const spinner   = document.getElementById('login-spinner');
  const btnText   = document.getElementById('login-btn-text');
  const btnArrow  = document.getElementById('login-arrow');

  let countdownTimer = null;

  function startCountdown() {
    submitBtn.disabled = true;
    btnArrow.classList.add('hidden');

    function tick() {
      const secs = secondsRemaining();
      if (secs <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        submitBtn.disabled = false;
        spinner.classList.add('hidden');
        btnArrow.classList.remove('hidden');
        btnText.textContent = 'Acceder al panel';
        errorBox.classList.add('hidden');
        return;
      }
      spinner.classList.remove('hidden');
      btnText.textContent = `Esperar ${secs}s`;
    }

    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  // Si ya hay bloqueo activo al cargar la vista (ej: recargó la página)
  if (isLocked()) {
    startCountdown();
    errorMsg.textContent = `Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`;
    errorBox.classList.remove('hidden');
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    spinner.classList.toggle('hidden', !loading);
    btnArrow.classList.toggle('hidden', loading);
    btnText.textContent = loading ? 'Ingresando…' : 'Acceder al panel';
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorBox.classList.remove('hidden');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bloqueo activo
    if (isLocked()) {
      showError(`Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`);
      return;
    }

    errorBox.classList.add('hidden');

    const email    = emailInput.value.trim();
    const password = pwInput.value;

    if (!email || !password) {
      showError('Por favor completá todos los campos.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      showError('Ingresá un correo válido.');
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
          localStorage.setItem('auth_user', JSON.stringify(result.user));
        }
        sessionStorage.setItem('auth_token', result.token);
        sessionStorage.setItem('auth_user', JSON.stringify(result.user));

        window.dispatchEvent(new CustomEvent('auth:login', { detail: result.user }));
      } else {
        recordFailedAttempt();
        const { attempts } = getRateState();
        const left = MAX_ATTEMPTS - attempts;

        if (isLocked()) {
          showError(`Demasiados intentos fallidos. Esperá ${secondsRemaining()} segundos.`);
          startCountdown();
        } else {
          showError(
            (result.message || 'Credenciales incorrectas.') +
            (left > 0 ? ` Te ${left === 1 ? 'queda' : 'quedan'} ${left} intento${left === 1 ? '' : 's'}.` : '')
          );
        }
      }
    } catch {
      showError('No se pudo conectar con el servidor. Verificá tu conexión.');
    } finally {
      if (!isLocked()) setLoading(false);
    }
  });
}
