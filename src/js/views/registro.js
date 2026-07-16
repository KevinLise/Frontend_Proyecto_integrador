import { registrarUsuario } from '../api.js';

export function renderRegistro() {
  const root = document.getElementById('root');

  root.innerHTML = `
    <div class="min-h-screen flex flex-col lg:flex-row">

      <!-- ══════════════════════════════════════════════════════
           PANEL BLANCO — formulario (izquierda en desktop)
      ══════════════════════════════════════════════════════ -->
      <div class="flex-1 flex items-start justify-center bg-white
                  px-5 py-10 sm:px-10 lg:px-16 xl:px-24 lg:items-center">
        <div class="w-full max-w-sm">

          <!-- Logo mobile (solo < lg) -->
          <div class="flex items-center gap-3 mb-8 lg:hidden">
            <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
                 class="w-8 h-8 rounded-lg object-contain">
            <span class="font-bold text-slate-900 text-sm tracking-wide">JACKS-STOCK</span>
          </div>

          <!-- Etiqueta + título -->
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            02 · Registro
          </p>
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Crea tu cuenta</h1>
          <p class="text-slate-500 text-sm mb-7">
            Configura tu operación en menos de 2 minutos. Sin tarjeta requerida.
          </p>

          <!-- Error -->
          <div id="registro-error"
               class="hidden mb-4 flex items-center gap-2 bg-red-50 border border-red-200
                      text-red-600 text-sm px-4 py-3 rounded-xl">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/>
            </svg>
            <span id="registro-error-msg"></span>
          </div>

          <!-- Éxito -->
          <div id="registro-success"
               class="hidden mb-4 flex items-center gap-2 bg-green-50 border border-green-200
                      text-green-700 text-sm px-4 py-3 rounded-xl">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Cuenta creada. Ingresando…</span>
          </div>

          <form id="registro-form" novalidate class="space-y-4">

            <!-- Nombre + Apellido: 2 cols en sm+, 1 col en mobile -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-500 uppercase
                              tracking-widest mb-2">Nombre</label>
                <div class="relative">
                  <svg class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <input id="reg-nombre" type="text" placeholder="Mariana"
                         autocomplete="given-name"
                         class="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 text-sm
                                focus:outline-none focus:ring-2 focus:ring-slate-900/15
                                focus:border-slate-400 transition placeholder-slate-300"
                         required>
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-500 uppercase
                              tracking-widest mb-2">Apellido</label>
                <input id="reg-apellido" type="text" placeholder="Ríos"
                       autocomplete="family-name"
                       class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm
                              focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300"
                       required>
              </div>
            </div>

            <!-- Empresa -->
            <div>
              <label class="block text-[11px] font-semibold text-slate-500 uppercase
                            tracking-widest mb-2">Empresa</label>
              <div class="relative">
                <svg class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
                </svg>
                <input id="reg-empresa" type="text" placeholder="Almacenes del Norte S.A."
                       autocomplete="organization"
                       class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm
                              focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300">
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-[11px] font-semibold text-slate-500 uppercase
                            tracking-widest mb-2">Correo corporativo</label>
              <div class="relative">
                <svg class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                           a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input id="reg-email" type="email" placeholder="mariana@empresa.com"
                       autocomplete="username"
                       class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm
                              focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300"
                       required>
              </div>
            </div>

            <!-- Contraseña -->
            <div>
              <label class="block text-[11px] font-semibold text-slate-500 uppercase
                            tracking-widest mb-2">Contraseña</label>
              <div class="relative">
                <svg class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0
                           00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input id="reg-password" type="password" placeholder="Mínimo 8 caracteres"
                       autocomplete="new-password"
                       class="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 text-sm
                              focus:outline-none focus:ring-2 focus:ring-slate-900/15
                              focus:border-slate-400 transition placeholder-slate-300"
                       required minlength="8">
                <button type="button" id="toggle-reg-pw"
                        class="absolute right-0 top-0 h-full px-3.5 text-slate-400
                               hover:text-slate-600 transition min-w-[44px] flex items-center
                               justify-center"
                        aria-label="Mostrar contraseña">
                  <svg id="reg-eye" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
                             9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg id="reg-eye-off" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                             a9.956 9.956 0 012.293-3.95M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"/>
                  </svg>
                </button>
              </div>

              <!-- Barra de seguridad -->
              <div class="mt-2 flex items-center gap-3">
                <div class="flex gap-1 flex-1">
                  <div class="h-1 flex-1 rounded-full bg-slate-200" data-bar="1"></div>
                  <div class="h-1 flex-1 rounded-full bg-slate-200" data-bar="2"></div>
                  <div class="h-1 flex-1 rounded-full bg-slate-200" data-bar="3"></div>
                  <div class="h-1 flex-1 rounded-full bg-slate-200" data-bar="4"></div>
                </div>
                <span id="strength-label" class="text-[11px] text-slate-400 w-16 text-right shrink-0">
                  Seguridad
                </span>
              </div>
            </div>

            <!-- Términos -->
            <label class="flex items-start gap-3 cursor-pointer select-none min-h-[44px] pt-1">
              <input id="reg-terms" type="checkbox"
                     class="mt-0.5 w-4 h-4 rounded border-slate-300 accent-slate-900
                            cursor-pointer shrink-0"
                     required>
              <span class="text-sm text-slate-600 leading-snug">
                Acepto los
                <button type="button"
                        class="text-slate-900 font-semibold hover:underline focus:outline-none">
                  Términos
                </button>
                y la
                <button type="button"
                        class="text-slate-900 font-semibold hover:underline focus:outline-none">
                  Política de privacidad
                </button>
              </span>
            </label>

            <!-- Submit -->
            <button type="submit" id="registro-btn"
                    class="w-full bg-slate-900 hover:bg-slate-700 active:bg-black
                           text-white font-semibold py-3.5 rounded-xl text-sm
                           transition focus:outline-none focus:ring-2 focus:ring-slate-900/30
                           disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2 min-h-[48px]">
              <svg id="registro-spinner" class="hidden w-4 h-4 animate-spin"
                   fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              <span id="registro-btn-text">Crear cuenta</span>
              <svg id="registro-arrow" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>

          </form>

          <!-- Link login -->
          <p class="text-center text-sm text-slate-500 mt-6 pb-4">
            ¿Ya tienes cuenta?
            <button id="btn-ir-login"
                    class="text-slate-900 font-semibold hover:underline focus:outline-none
                           min-h-[44px] inline-flex items-center">
              Inicia sesión
            </button>
          </p>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════
           PANEL OSCURO — marketing (derecha en desktop)
      ══════════════════════════════════════════════════════ -->
      <div class="
            bg-[#1a2234] relative overflow-hidden
            flex-col justify-between
            px-6 py-6 lg:px-10 lg:py-10
            hidden lg:flex lg:w-1/2 lg:sticky lg:top-0 lg:h-screen
          ">

        <!-- Fondo cuadriculado -->
        <div class="absolute inset-0 opacity-[0.07] pointer-events-none"
             style="background-image:linear-gradient(#fff 1px,transparent 1px),
                                     linear-gradient(90deg,#fff 1px,transparent 1px);
                    background-size:40px 40px;">
        </div>

        <!-- Logo arriba derecha -->
        <div class="relative z-10 flex justify-end">
          <div class="inline-flex items-center gap-3 bg-white/10 border border-white/15
                      rounded-xl px-4 py-3 backdrop-blur-sm">
            <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
                 class="w-8 h-8 rounded-lg object-contain">
            <span class="text-white font-bold text-sm tracking-wide">JACKS-STOCK</span>
          </div>
        </div>

        <!-- Contenido central -->
        <div class="relative z-10 flex flex-col gap-8">

          <div class="inline-flex items-center gap-2 w-fit">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              Prueba gratuita · 30 días
            </span>
          </div>

          <h2 class="text-white text-4xl font-bold leading-tight max-w-xs">
            Convierte tu bodega en una operación de precisión industrial.
          </h2>

          <div class="flex flex-col gap-4">
            <div class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center
                          justify-center shrink-0">
                <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <p class="text-white text-sm font-semibold">Catálogo ilimitado</p>
                <p class="text-slate-500 text-xs mt-0.5">Registra SKUs, lotes y variantes sin límites.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center
                          justify-center shrink-0">
                <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6"/>
                </svg>
              </div>
              <div>
                <p class="text-white text-sm font-semibold">Reportes en vivo</p>
                <p class="text-slate-500 text-xs mt-0.5">Métricas semáforo y flujos por categoría.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center
                          justify-center shrink-0">
                <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573
                           1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426
                           1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37
                           2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724
                           1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                           00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573
                           c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-white text-sm font-semibold">Automatización</p>
                <p class="text-slate-500 text-xs mt-0.5">Alertas de stock bajo y reorden automático.</p>
              </div>
            </div>
          </div>

          <!-- Badge sin tarjeta -->
          <div class="border border-white/10 rounded-xl px-4 py-3 bg-white/5 flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-slate-400 text-xs uppercase tracking-widest font-medium">
              Sin tarjeta · Cancela cuando quieras
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="relative z-10 flex items-center justify-between">
          <p class="text-slate-600 text-xs">© ${new Date().getFullYear()} Jacks-Stock</p>
          <p class="text-slate-600 text-xs">v4.2 · PROD</p>
        </div>
      </div>

    </div>
  `;

  // ── Toggle contraseña ──────────────────────────────────────────────────────
  const pwInput  = document.getElementById('reg-password');
  const togglePw = document.getElementById('toggle-reg-pw');
  const eye      = document.getElementById('reg-eye');
  const eyeOff   = document.getElementById('reg-eye-off');

  togglePw.addEventListener('click', () => {
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    eye.classList.toggle('hidden', show);
    eyeOff.classList.toggle('hidden', !show);
  });

  // ── Fortaleza ──────────────────────────────────────────────────────────────
  const bars          = document.querySelectorAll('[data-bar]');
  const strengthLabel = document.getElementById('strength-label');
  const COLORS = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
  const LABELS = ['', 'Muy débil', 'Débil', 'Aceptable', 'Fuerte'];

  function calcStrength(pwd) {
    let s = 0;
    if (pwd.length >= 8)          s++;
    if (/[A-Z]/.test(pwd))        s++;
    if (/[0-9]/.test(pwd))        s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  }

  pwInput.addEventListener('input', () => {
    const score = calcStrength(pwInput.value);
    bars.forEach((bar, i) => {
      bar.className = `h-1 flex-1 rounded-full ${i < score ? COLORS[score] : 'bg-slate-200'}`;
    });
    strengthLabel.textContent = pwInput.value ? LABELS[score] : 'Seguridad';
  });

  // ── Ir al login ────────────────────────────────────────────────────────────
  document.getElementById('btn-ir-login').addEventListener('click', () => {
    import('./login.js').then(({ renderLogin }) => renderLogin());
  });

  // ── Submit ─────────────────────────────────────────────────────────────────
  const form       = document.getElementById('registro-form');
  const errorBox   = document.getElementById('registro-error');
  const errorMsg   = document.getElementById('registro-error-msg');
  const successBox = document.getElementById('registro-success');
  const submitBtn  = document.getElementById('registro-btn');
  const spinner    = document.getElementById('registro-spinner');
  const btnText    = document.getElementById('registro-btn-text');
  const btnArrow   = document.getElementById('registro-arrow');

  function setLoading(loading) {
    submitBtn.disabled = loading;
    spinner.classList.toggle('hidden', !loading);
    btnArrow.classList.toggle('hidden', loading);
    btnText.textContent = loading ? 'Creando cuenta…' : 'Crear cuenta';
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorBox.classList.remove('hidden');
    successBox.classList.add('hidden');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.classList.add('hidden');

    const nombre   = document.getElementById('reg-nombre').value.trim();
    const apellido = document.getElementById('reg-apellido').value.trim();
    const empresa  = document.getElementById('reg-empresa').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const password = pwInput.value;
    const terms    = document.getElementById('reg-terms').checked;

    if (!nombre || !apellido || !email || !password) {
      showError('Por favor completá los campos obligatorios.');
      return;
    }
    if (password.length < 8) {
      showError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!terms) {
      showError('Debés aceptar los términos y la política de privacidad.');
      return;
    }

    setLoading(true);

    try {
      const result = await registrarUsuario({
        nombre: `${nombre} ${apellido}`.trim(),
        empresa,
        email,
        password,
      });

      if (result.success) {
        successBox.classList.remove('hidden');
        if (result.token) {
          sessionStorage.setItem('auth_token', result.token);
          sessionStorage.setItem('auth_user', JSON.stringify(result.user));
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('auth:login', { detail: result.user }));
          }, 800);
        } else {
          setTimeout(() => {
            import('./login.js').then(({ renderLogin }) => renderLogin());
          }, 1200);
        }
      } else {
        showError(result.message || 'No se pudo crear la cuenta. Intentá de nuevo.');
      }
    } catch {
      showError('No se pudo conectar con el servidor. Verificá tu conexión.');
    } finally {
      setLoading(false);
    }
  });
}
