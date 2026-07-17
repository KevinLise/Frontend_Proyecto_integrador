import { registrarUsuario } from '../api.js';

export function renderRegistro() {
  const root = document.getElementById('root');
  root.innerHTML = `
<div class="min-vh-100 d-flex flex-column flex-lg-row">

  <!-- ── PANEL BLANCO — formulario (izquierda en desktop) ── -->
  <div class="flex-grow-1 d-flex align-items-start align-items-lg-center justify-content-center
              bg-white px-4 py-5 px-lg-5">
    <div class="w-100" style="max-width:360px;">

      <!-- Logo mobile -->
      <div class="d-flex d-lg-none align-items-center gap-2 mb-4">
        <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
             class="rounded-2 object-fit-contain" style="width:32px;height:32px;">
        <span class="fw-bold text-dark" style="font-size:.875rem;letter-spacing:.05em;">JACKS-STOCK</span>
      </div>

      <p class="text-uppercase fw-semibold text-secondary mb-2" style="font-size:.7rem;letter-spacing:.1em;">
        02 · Registro
      </p>
      <h1 class="fw-bold mb-1" style="font-size:1.75rem;">Crea tu cuenta</h1>
      <p class="text-secondary mb-4" style="font-size:.875rem;">
        Configura tu operación en menos de 2 minutos. Sin tarjeta requerida.
      </p>

      <!-- Error -->
      <div id="registro-error"
           class="d-none alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-3"
           style="font-size:.875rem;border-radius:10px;">
        <svg class="flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"/>
        </svg>
        <span id="registro-error-msg"></span>
      </div>

      <!-- Éxito -->
      <div id="registro-success"
           class="d-none alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3"
           style="font-size:.875rem;border-radius:10px;">
        <svg class="flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Cuenta creada. Ingresando…</span>
      </div>

      <form id="registro-form" novalidate>

        <!-- Nombre + Apellido -->
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label text-uppercase fw-semibold text-secondary"
                   style="font-size:.7rem;letter-spacing:.08em;">Nombre</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </span>
              <input id="reg-nombre" type="text" placeholder="Mariana"
                     autocomplete="given-name" required
                     class="form-control border-start-0 input-jacks ps-0">
            </div>
          </div>
          <div class="col-6">
            <label class="form-label text-uppercase fw-semibold text-secondary"
                   style="font-size:.7rem;letter-spacing:.08em;">Apellido</label>
            <input id="reg-apellido" type="text" placeholder="Ríos"
                   autocomplete="family-name" required
                   class="form-control input-jacks">
          </div>
        </div>

        <!-- Empresa -->
        <div class="mb-3">
          <label class="form-label text-uppercase fw-semibold text-secondary"
                 style="font-size:.7rem;letter-spacing:.08em;">Empresa</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
              </svg>
            </span>
            <input id="reg-empresa" type="text" placeholder="Almacenes del Norte S.A."
                   autocomplete="organization"
                   class="form-control border-start-0 input-jacks ps-0">
          </div>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label class="form-label text-uppercase fw-semibold text-secondary"
                 style="font-size:.7rem;letter-spacing:.08em;">Correo corporativo</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <input id="reg-email" type="email" placeholder="mariana@empresa.com"
                   autocomplete="username" required
                   class="form-control border-start-0 input-jacks ps-0">
          </div>
        </div>

        <!-- Contraseña -->
        <div class="mb-3">
          <label class="form-label text-uppercase fw-semibold text-secondary"
                 style="font-size:.7rem;letter-spacing:.08em;">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </span>
            <input id="reg-password" type="password" placeholder="Mínimo 8 caracteres"
                   autocomplete="new-password" required minlength="8"
                   class="form-control border-start-0 border-end-0 input-jacks ps-0">
            <button type="button" id="toggle-reg-pw"
                    class="input-group-text bg-white border-start-0"
                    aria-label="Mostrar contraseña">
              <svg id="reg-eye" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg id="reg-eye-off" class="d-none" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M9.88 9.88A3 3 0 0114.12 14.12M3 3l18 18"/>
              </svg>
            </button>
          </div>
          <!-- Barra de fortaleza -->
          <div class="d-flex gap-1 mt-2 align-items-center">
            <div class="strength-bar" data-bar="1"></div>
            <div class="strength-bar" data-bar="2"></div>
            <div class="strength-bar" data-bar="3"></div>
            <div class="strength-bar" data-bar="4"></div>
            <span id="strength-label" class="ms-2 text-secondary text-nowrap"
                  style="font-size:.7rem;min-width:56px;text-align:right;">Seguridad</span>
          </div>
        </div>

        <!-- Términos -->
        <div class="form-check mb-4">
          <input id="reg-terms" type="checkbox" class="form-check-input" required>
          <label for="reg-terms" class="form-check-label" style="font-size:.875rem;">
            Acepto los
            <button type="button" class="btn btn-link p-0 fw-semibold text-dark text-decoration-none"
                    style="font-size:.875rem;">Términos</button>
            y la
            <button type="button" class="btn btn-link p-0 fw-semibold text-dark text-decoration-none"
                    style="font-size:.875rem;">Política de privacidad</button>
          </label>
        </div>

        <!-- Submit -->
        <button type="submit" id="registro-btn"
                class="btn btn-brand w-100 d-flex align-items-center justify-content-center gap-2 py-3">
          <span class="spinner-border spinner-border-sm spinner-xs d-none" id="registro-spinner"
                role="status" aria-hidden="true"></span>
          <span id="registro-btn-text">Crear cuenta</span>
          <svg id="registro-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </form>

      <p class="text-center text-secondary mt-4 mb-0" style="font-size:.875rem;">
        ¿Ya tienes cuenta?
        <button id="btn-ir-login" class="btn btn-link p-0 fw-semibold text-dark text-decoration-none">
          Inicia sesión
        </button>
      </p>
    </div>
  </div>

  <!-- ── PANEL OSCURO — marketing (derecha en desktop) ── -->
  <div class="panel-dark d-none d-lg-flex flex-column justify-content-between
              px-5 py-5 col-lg-6" style="min-height:100vh;">
    <div class="grid-bg"></div>

    <!-- Logo arriba derecha -->
    <div class="position-relative z-1 d-flex justify-content-end">
      <div class="d-inline-flex align-items-center gap-3 rounded-3 px-3 py-2"
           style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);">
        <img src="./src/assets/logo-emblem.png" alt="Jacks-Stock"
             class="rounded-2 object-fit-contain" style="width:30px;height:30px;">
        <span class="text-white fw-bold" style="font-size:.875rem;letter-spacing:.05em;">JACKS-STOCK</span>
      </div>
    </div>

    <!-- Contenido central -->
    <div class="position-relative z-1 d-flex flex-column gap-4">
      <div class="d-inline-flex align-items-center gap-2">
        <span class="rounded-circle bg-success animate-pulse" style="width:8px;height:8px;display:inline-block;"></span>
        <span class="text-success fw-semibold" style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;">
          Prueba gratuita · 30 días
        </span>
      </div>
      <h2 class="text-white fw-bold lh-sm" style="font-size:2rem;max-width:300px;">
        Convierte tu bodega en una operación de precisión industrial.
      </h2>

      <div class="d-flex flex-column gap-3">
        <div class="d-flex align-items-start gap-3">
          <div class="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width:36px;height:36px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);">
            <svg width="16" height="16" fill="none" stroke="#cbd5e1" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <div>
            <p class="text-white fw-semibold mb-0" style="font-size:.875rem;">Catálogo ilimitado</p>
            <p class="mb-0" style="color:#64748b;font-size:.75rem;">Registra SKUs, lotes y variantes sin límites.</p>
          </div>
        </div>
        <div class="d-flex align-items-start gap-3">
          <div class="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width:36px;height:36px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);">
            <svg width="16" height="16" fill="none" stroke="#cbd5e1" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6"/>
            </svg>
          </div>
          <div>
            <p class="text-white fw-semibold mb-0" style="font-size:.875rem;">Reportes en vivo</p>
            <p class="mb-0" style="color:#64748b;font-size:.75rem;">Métricas semáforo y flujos por categoría.</p>
          </div>
        </div>
        <div class="d-flex align-items-start gap-3">
          <div class="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width:36px;height:36px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);">
            <svg width="16" height="16" fill="none" stroke="#cbd5e1" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <p class="text-white fw-semibold mb-0" style="font-size:.875rem;">Automatización</p>
            <p class="mb-0" style="color:#64748b;font-size:.75rem;">Alertas de stock bajo y reorden automático.</p>
          </div>
        </div>
      </div>

      <!-- Badge sin tarjeta -->
      <div class="d-flex align-items-center gap-3 rounded-3 px-3 py-2"
           style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);">
        <svg width="16" height="16" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-uppercase fw-medium" style="color:#94a3b8;font-size:.7rem;letter-spacing:.08em;">
          Sin tarjeta · Cancela cuando quieras
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="position-relative z-1 d-flex justify-content-between">
      <p class="mb-0" style="color:#475569;font-size:.75rem;">© ${new Date().getFullYear()} Jacks-Stock</p>
      <p class="mb-0" style="color:#475569;font-size:.75rem;">v4.2 · PROD</p>
    </div>
  </div>

</div>
  `;

  // ── Toggle contraseña ────────────────────────────────────────────────────
  const pwInput = document.getElementById('reg-password');
  const eye     = document.getElementById('reg-eye');
  const eyeOff  = document.getElementById('reg-eye-off');

  document.getElementById('toggle-reg-pw').addEventListener('click', () => {
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    eye.classList.toggle('d-none', show);
    eyeOff.classList.toggle('d-none', !show);
  });

  // ── Barra de fortaleza ──────────────────────────────────────────────────
  const bars          = document.querySelectorAll('[data-bar]');
  const strengthLabel = document.getElementById('strength-label');
  const STRENGTH_CLASSES = ['', 'strength-1', 'strength-2', 'strength-3', 'strength-4'];
  const STRENGTH_LABELS  = ['', 'Muy débil',  'Débil',      'Aceptable',  'Fuerte'];

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
      bar.className = 'strength-bar ' + (i < score ? STRENGTH_CLASSES[score] : '');
    });
    strengthLabel.textContent = pwInput.value ? STRENGTH_LABELS[score] : 'Seguridad';
  });

  // ── Ir al login ──────────────────────────────────────────────────────────
  document.getElementById('btn-ir-login').addEventListener('click', () => {
    import('./login.js').then(({ renderLogin }) => renderLogin());
  });

  // ── Submit ───────────────────────────────────────────────────────────────
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
    spinner.classList.toggle('d-none', !loading);
    btnArrow.classList.toggle('d-none', loading);
    btnText.textContent = loading ? 'Creando cuenta…' : 'Crear cuenta';
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorBox.classList.remove('d-none');
    successBox.classList.add('d-none');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.classList.add('d-none');

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
        successBox.classList.remove('d-none');
        if (result.token) {
          sessionStorage.setItem('auth_token', result.token);
          sessionStorage.setItem('auth_user',  JSON.stringify(result.user));
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
