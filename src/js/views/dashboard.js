import { ICONS } from '../icons.js';

export function renderDashboard() {
  return `
    <!-- Encabezado -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="fw-bold mb-1" style="font-size:1.5rem;">Panel de control</h1>
        <p class="text-secondary mb-0" style="font-size:.875rem;">
          Vista general del inventario · Jueves, 09 julio 2026
        </p>
      </div>
      <div class="d-flex gap-2">
        <button id="btn-exportar"
                class="btn btn-outline-secondary btn-sm px-3">
          Exportar
        </button>
        <button id="btn-nuevo-movimiento"
                class="btn btn-brand btn-sm px-3">
          + Nuevo movimiento
        </button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="kpi-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary"
                 style="width:36px;height:36px;">${ICONS.boxes}</div>
            <span class="badge rounded-pill text-success" style="background:#dcfce7;font-size:.75rem;">▲ 3.2%</span>
          </div>
          <p class="text-secondary mb-1" style="font-size:.75rem;">Total SKUs</p>
          <p class="fw-bold mb-1" style="font-size:1.5rem;">12,847</p>
          <svg class="w-100" height="32" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,25 20,20 40,22 60,10 80,14 100,5"
                      fill="none" stroke="#0f172a" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="kpi-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary"
                 style="width:36px;height:36px;">${ICONS.dollar}</div>
            <span class="badge rounded-pill text-success" style="background:#dcfce7;font-size:.75rem;">▲ 8.1%</span>
          </div>
          <p class="text-secondary mb-1" style="font-size:.75rem;">Valor de inventario</p>
          <p class="fw-bold mb-1" style="font-size:1.5rem;">$1.284.902</p>
          <svg class="w-100" height="32" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,20 20,18 40,15 60,17 80,8 100,6"
                      fill="none" stroke="#0f172a" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="kpi-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center"
                 style="width:36px;height:36px;background:#fef9c3;color:#ca8a04;">${ICONS.warning}</div>
            <span class="badge rounded-pill" style="background:#fef9c3;color:#ca8a04;font-size:.75rem;">▼ 12</span>
          </div>
          <p class="text-secondary mb-1" style="font-size:.75rem;">Bajo stock</p>
          <p class="fw-bold mb-1" style="font-size:1.5rem;">38</p>
          <svg class="w-100" height="32" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,10 20,12 40,8 60,15 80,18 100,20"
                      fill="none" stroke="#f59e0b" stroke-width="2"/>
          </svg>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="kpi-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary"
                 style="width:36px;height:36px;">${ICONS.swap}</div>
            <span class="badge rounded-pill bg-light text-secondary" style="font-size:.75rem;">▼ 2.4%</span>
          </div>
          <p class="text-secondary mb-1" style="font-size:.75rem;">Movimientos hoy</p>
          <p class="fw-bold mb-1" style="font-size:1.5rem;">1,204</p>
          <svg class="w-100" height="32" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,15 20,5 40,18 60,8 80,20 100,10"
                      fill="none" stroke="#0f172a" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Tabla + Donut -->
    <div class="row g-4">

      <!-- Tabla productos -->
      <div class="col-12 col-xl-8">
        <div class="bg-white rounded-3 border" style="border-color:#e2e8f0!important;">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 px-4 py-3 border-bottom">
            <div>
              <h2 class="fw-semibold mb-0" style="font-size:1rem;">Productos en almacén</h2>
              <p class="text-secondary mb-0" style="font-size:.75rem;">Actualizado hace 2 minutos · 12,847 SKUs totales</p>
            </div>
            <div class="d-flex gap-1 bg-light p-1 rounded-3" style="font-size:.75rem;font-weight:500;">
              <button class="btn btn-sm bg-white shadow-sm text-dark px-3 py-1 rounded-2">Todos</button>
              <button class="btn btn-sm text-secondary px-3 py-1">Óptimo</button>
              <button class="btn btn-sm text-secondary px-3 py-1">Bajo</button>
              <button class="btn btn-sm text-secondary px-3 py-1">Crítico</button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-jacks mb-0">
              <thead>
                <tr>
                  <th class="px-4">Producto</th>
                  <th class="px-4">SKU</th>
                  <th class="px-4">Categoría</th>
                  <th class="px-4">Stock</th>
                  <th class="px-4">Mínimo</th>
                  <th class="px-4">Estado</th>
                </tr>
              </thead>
              <tbody id="tabla-productos">
                <tr>
                  <td class="px-4 fw-medium">Tornillo hexagonal M8 x 40mm</td>
                  <td class="px-4 text-secondary">TRN-M8-040</td>
                  <td class="px-4 text-secondary">Ferretería</td>
                  <td class="px-4">
                    <div class="progress mb-1" style="height:4px;width:96px;">
                      <div class="progress-bar bg-success" style="width:90%"></div>
                    </div>
                    <span style="font-size:.75rem;color:#64748b;">1240</span>
                  </td>
                  <td class="px-4 text-secondary">400</td>
                  <td class="px-4">
                    <span class="badge badge-ok rounded-pill d-inline-flex align-items-center gap-1 px-2 py-1">
                      <span class="rounded-circle" style="width:6px;height:6px;background:#22c55e;display:inline-block;"></span>Óptimo
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 fw-medium">Caja de cartón 30x30</td>
                  <td class="px-4 text-secondary">CJA-3030</td>
                  <td class="px-4 text-secondary">Empaque</td>
                  <td class="px-4">
                    <div class="progress mb-1" style="height:4px;width:96px;">
                      <div class="progress-bar bg-warning" style="width:40%"></div>
                    </div>
                    <span style="font-size:.75rem;color:#64748b;">96</span>
                  </td>
                  <td class="px-4 text-secondary">150</td>
                  <td class="px-4">
                    <span class="badge badge-warn rounded-pill d-inline-flex align-items-center gap-1 px-2 py-1">
                      <span class="rounded-circle" style="width:6px;height:6px;background:#f59e0b;display:inline-block;"></span>Bajo
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Donut -->
      <div class="col-12 col-xl-4">
        <div class="bg-white rounded-3 border p-4 h-100" style="border-color:#e2e8f0!important;">
          <h2 class="fw-semibold mb-0" style="font-size:1rem;">Distribución por categoría</h2>
          <p class="text-secondary mb-4" style="font-size:.75rem;">Participación sobre el total de SKUs</p>
          <div class="d-flex justify-content-center">
            <div class="rounded-circle position-relative d-flex align-items-center justify-content-center"
                 style="width:160px;height:160px;
                        background:conic-gradient(#0f172a 0% 65%,#e2e8f0 65% 100%);">
              <div class="rounded-circle bg-white position-absolute d-flex flex-column
                          align-items-center justify-content-center"
                   style="width:112px;height:112px;">
                <span class="text-secondary" style="font-size:.7rem;">SKUs</span>
                <span class="fw-bold" style="font-size:1.1rem;">12.8k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}
