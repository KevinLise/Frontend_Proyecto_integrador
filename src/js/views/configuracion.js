import { ICONS } from '../icons.js';

// Genera un switch Bootstrap (form-switch) para la sección notificaciones
function switchNotificacion(id, titulo, descripcion, activado) {
  return `
    <div class="d-flex align-items-start justify-content-between gap-3 py-3
                border-bottom" style="border-color:#f1f5f9!important;">
      <div>
        <p class="fw-medium mb-0" style="font-size:.875rem;">${titulo}</p>
        <p class="text-secondary mb-0" style="font-size:.75rem;">${descripcion}</p>
      </div>
      <div class="form-check form-switch mb-0 flex-shrink-0">
        <input class="form-check-input" type="checkbox" id="${id}" ${activado ? 'checked' : ''}>
      </div>
    </div>
  `;
}

// Tarjeta de tema visual
function tarjetaTema(nombre, previewClass, previewStyle, activo) {
  return `
    <button class="tema-btn btn border d-flex flex-column align-items-center gap-2 p-3 rounded-3
                   ${activo ? 'border-dark border-2' : 'border-secondary-subtle'}"
            style="flex:1;min-width:80px;">
      <div class="w-100 rounded-2 ${previewClass}" style="height:56px;${previewStyle}"></div>
      <span class="fw-medium d-flex align-items-center gap-1" style="font-size:.8rem;">
        ${nombre} ${activo ? '<span class="text-dark">✓</span>' : ''}
      </span>
    </button>
  `;
}

export function renderConfiguracion() {
  return `
    <div class="mb-4">
      <p class="text-uppercase fw-semibold text-secondary mb-1" style="font-size:.7rem;letter-spacing:.08em;">Ajustes</p>
      <h1 class="fw-bold mb-1" style="font-size:1.5rem;">Configuración</h1>
      <p class="text-secondary mb-0" style="font-size:.875rem;">
        Administra tu cuenta, empresa y preferencias del sistema.
      </p>
    </div>

    <div class="row g-4 align-items-start">

      <!-- Nav lateral -->
      <div class="col-12 col-lg-3">
        <div class="bg-white rounded-3 border p-2" style="border-color:#e2e8f0!important;position:sticky;top:80px;">
          <button data-target="config-cuenta"
                  class="config-nav-btn active">${ICONS.user} Cuenta</button>
          <button data-target="config-empresa"
                  class="config-nav-btn">${ICONS.building} Empresa</button>
          <button data-target="config-notificaciones"
                  class="config-nav-btn">${ICONS.bell} Notificaciones</button>
          <button data-target="config-seguridad"
                  class="config-nav-btn">${ICONS.shield} Seguridad</button>
          <button data-target="config-apariencia"
                  class="config-nav-btn">${ICONS.palette} Apariencia</button>
          <button data-target="config-api"
                  class="config-nav-btn">${ICONS.api} API &amp; Integraciones</button>
        </div>
      </div>

      <!-- Secciones -->
      <div class="col-12 col-lg-9 d-flex flex-column gap-4">

        <!-- Cuenta -->
        <section id="config-cuenta" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-circle bg-primary text-white d-flex align-items-center
                          justify-content-center fw-semibold flex-shrink-0"
                   style="width:48px;height:48px;">MR</div>
              <div>
                <p class="fw-semibold mb-0">Mariana Ríos</p>
                <p class="text-secondary mb-0" style="font-size:.75rem;">Administradora · Almacén Central</p>
              </div>
            </div>
            <button class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2">
              ${ICONS.camera} Cambiar foto
            </button>
          </div>
          <div class="row g-3">
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Nombre completo</label>
              <input type="text" value="Mariana Ríos Salgado" class="form-control input-jacks">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Correo corporativo</label>
              <input type="email" value="mariana.rios@stocksmart.co" class="form-control input-jacks">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Cargo</label>
              <input type="text" value="Jefa de almacén" class="form-control input-jacks">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Teléfono</label>
              <input type="tel" value="+57 320 812 4409" class="form-control input-jacks">
            </div>
          </div>
        </section>

        <!-- Empresa -->
        <section id="config-empresa" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-1" style="font-size:1rem;">Empresa</h2>
          <p class="text-secondary mb-4" style="font-size:.75rem;">Datos fiscales y del centro logístico.</p>
          <div class="row g-3">
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Razón social</label>
              <input type="text" value="Logística Andina S.A.S." class="form-control input-jacks">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">NIT</label>
              <input type="text" value="900.482.117-3" class="form-control input-jacks">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Moneda base</label>
              <select class="form-select input-jacks">
                <option>COP · Peso colombiano</option>
                <option>USD · Dólar estadounidense</option>
              </select>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Zona horaria</label>
              <select class="form-select input-jacks">
                <option>América / Bogotá (GMT-5)</option>
                <option>América / Ciudad de México (GMT-6)</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Notificaciones -->
        <section id="config-notificaciones" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-1" style="font-size:1rem;">Notificaciones</h2>
          <p class="text-secondary mb-2" style="font-size:.75rem;">Elige qué eventos disparan alertas.</p>
          ${switchNotificacion('notif-stock-bajo',  'Stock bajo mínimo',    'Envía correo cuando un SKU cae por debajo del mínimo definido.', true)}
          ${switchNotificacion('notif-critico',     'Stock crítico',         'Alerta inmediata al llegar a niveles críticos.', true)}
          ${switchNotificacion('notif-resumen',     'Resumen diario',        'Correo con KPIs y movimientos del día a las 07:00.', false)}
          ${switchNotificacion('notif-inusuales',   'Movimientos inusuales', 'Detecta salidas atípicas por hora o volumen.', true)}
        </section>

        <!-- Seguridad -->
        <section id="config-seguridad" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-1" style="font-size:1rem;">Seguridad</h2>
          <p class="text-secondary mb-4" style="font-size:.75rem;">Contraseña y verificación en dos pasos.</p>
          <div class="mb-3">
            <label class="form-label text-secondary" style="font-size:.75rem;font-weight:500;">Nueva contraseña</label>
            <input type="password" placeholder="••••••••" class="form-control input-jacks">
          </div>
          ${switchNotificacion('notif-2fa', 'Verificación en dos pasos', 'Pide un código adicional al iniciar sesión.', false)}
        </section>

        <!-- Apariencia -->
        <section id="config-apariencia" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-1" style="font-size:1rem;">Apariencia</h2>
          <p class="text-secondary mb-4" style="font-size:.75rem;">Selecciona el tema de la interfaz.</p>
          <div class="d-flex gap-3" id="selector-tema">
            ${tarjetaTema('Claro',      'border',   'background:#fff;',          true)}
            ${tarjetaTema('Automático', '',         'background:linear-gradient(135deg,#fff 50%,#334155 50%);', false)}
            ${tarjetaTema('Oscuro',     'bg-dark',  '',                          false)}
          </div>
        </section>

        <!-- API -->
        <section id="config-api" class="bg-white rounded-3 border p-4"
                 style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-1" style="font-size:1rem;">API &amp; Integraciones</h2>
          <p class="text-secondary mb-4" style="font-size:.75rem;">Conecta servicios externos.</p>
          <div class="d-flex align-items-center justify-content-center rounded-3 border border-dashed"
               style="min-height:120px;border-color:#cbd5e1!important;">
            <p class="text-secondary mb-0" style="font-size:.875rem;">Sin integraciones configuradas todavía</p>
          </div>
        </section>

        <!-- Botones guardar -->
        <div class="d-flex justify-content-end gap-3 pb-2">
          <button id="btn-cancelar-config" class="btn btn-outline-secondary px-4">
            Cancelar
          </button>
          <button id="btn-guardar-config" class="btn btn-brand px-4">
            Guardar cambios
          </button>
        </div>

      </div><!-- /col secciones -->
    </div><!-- /row -->
  `;
}

// PENDIENTE (lógica): los botones .config-nav-btn tienen data-target con el id de
// cada sección. Conectar click → scroll o mostrar/ocultar sección según ese id.
