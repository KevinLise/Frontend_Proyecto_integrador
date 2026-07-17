import { ICONS } from '../icons.js';

const PRODUCTOS_DEMO = [
  { name: "Tornillo hexagonal M8 x 40mm",    sku: "TRN-M8-040",   category: "Ferretería", location: "A-12-03", stock: 1240, price: 0.35,  status: "ok"   },
  { name: "Caja cartón corrugado 40x30x25",   sku: "CJA-COR-4030", category: "Embalaje",   location: "B-04-01", stock: 86,   price: 2.10,  status: "warn" },
  { name: "Motor eléctrico 1.5HP 220V",       sku: "MTR-15H-220",  category: "Motores",    location: "D-02-07", stock: 12,   price: 289.90,status: "low"  },
  { name: "Rodamiento SKF 6205-2RS",          sku: "RDM-6205-RS",  category: "Repuestos",  location: "C-08-04", stock: 342,  price: 8.75,  status: "ok"   },
  { name: "Cinta embalaje transparente 48mm", sku: "CTA-EMB-048",  category: "Embalaje",   location: "B-05-02", stock: 58,   price: 1.40,  status: "warn" },
  { name: "Correa trapecial A-42",            sku: "CRR-TRP-A42",  category: "Repuestos",  location: "C-09-01", stock: 4,    price: 12.50, status: "low"  },
];

const STATUS_LABEL = { ok: "Óptimo", warn: "Bajo", low: "Crítico" };
const STATUS_BADGE = { ok: "badge-ok", warn: "badge-warn", low: "badge-low" };
const STATUS_DOT   = { ok: "#22c55e", warn: "#f59e0b", low: "#dc2626" };

function filaProducto(p) {
  return `
    <tr>
      <td class="px-3"><input type="checkbox" class="form-check-input"></td>
      <td class="px-3">
        <div class="d-flex align-items-center gap-3">
          <div class="rounded-2 bg-light d-flex align-items-center justify-content-center text-secondary flex-shrink-0"
               style="width:36px;height:36px;">${ICONS.package}</div>
          <span class="fw-medium" style="font-size:.875rem;">${p.name}</span>
        </div>
      </td>
      <td class="px-3">
        <span class="badge bg-light text-secondary rounded-2 font-monospace" style="font-size:.75rem;">${p.sku}</span>
      </td>
      <td class="px-3 text-secondary" style="font-size:.875rem;">${p.category}</td>
      <td class="px-3 font-monospace text-secondary" style="font-size:.75rem;">${p.location}</td>
      <td class="px-3 text-end font-monospace fw-semibold" style="font-size:.875rem;">${p.stock.toLocaleString('es')}</td>
      <td class="px-3 text-end font-monospace text-secondary" style="font-size:.875rem;">$${p.price.toFixed(2)}</td>
      <td class="px-3">
        <span class="badge ${STATUS_BADGE[p.status]} rounded-pill d-inline-flex align-items-center gap-1 px-2 py-1"
              style="font-size:.75rem;font-weight:500;">
          <span class="rounded-circle flex-shrink-0"
                style="width:6px;height:6px;background:${STATUS_DOT[p.status]};display:inline-block;"></span>
          ${STATUS_LABEL[p.status]}
        </span>
      </td>
    </tr>
  `;
}

export function renderProductos() {
  return `
    <!-- Encabezado -->
    <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
      <div>
        <p class="text-uppercase fw-semibold text-secondary mb-1" style="font-size:.7rem;letter-spacing:.08em;">Catálogo</p>
        <h1 class="fw-bold mb-1" style="font-size:1.5rem;">Productos</h1>
        <p class="text-secondary mb-0" style="font-size:.875rem;">Gestiona SKUs, categorías y ubicaciones del almacén.</p>
      </div>
      <div class="d-flex gap-2">
        <button id="btn-importar-csv"
                class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2 px-3">
          ${ICONS.upload} Importar CSV
        </button>
        <button id="btn-nuevo-producto"
                class="btn btn-brand btn-sm d-inline-flex align-items-center gap-2 px-3">
          ${ICONS.plus} Nuevo producto
        </button>
      </div>
    </div>

    <!-- KPI mini -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3">
        <div class="kpi-card d-flex align-items-center gap-3 p-3">
          <div class="rounded-3 bg-light d-flex align-items-center justify-content-center text-secondary flex-shrink-0"
               style="width:44px;height:44px;">${ICONS.boxes}</div>
          <div>
            <p class="text-secondary mb-0" style="font-size:.75rem;font-weight:500;">Total productos</p>
            <p class="fw-bold font-monospace mb-0" style="font-size:1.1rem;">12,847</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="kpi-card d-flex align-items-center gap-3 p-3">
          <div class="rounded-3 bg-light d-flex align-items-center justify-content-center text-secondary flex-shrink-0"
               style="width:44px;height:44px;">${ICONS.tag}</div>
          <div>
            <p class="text-secondary mb-0" style="font-size:.75rem;font-weight:500;">Categorías activas</p>
            <p class="fw-bold font-monospace mb-0" style="font-size:1.1rem;">24</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="kpi-card d-flex align-items-center gap-3 p-3">
          <div class="rounded-3 bg-light d-flex align-items-center justify-content-center text-secondary flex-shrink-0"
               style="width:44px;height:44px;">${ICONS.layers}</div>
          <div>
            <p class="text-secondary mb-0" style="font-size:.75rem;font-weight:500;">Ubicaciones</p>
            <p class="fw-bold font-monospace mb-0" style="font-size:1.1rem;">186</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="kpi-card d-flex align-items-center gap-3 p-3">
          <div class="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width:44px;height:44px;background:#fef9c3;color:#ca8a04;">${ICONS.alert}</div>
          <div>
            <p class="text-secondary mb-0" style="font-size:.75rem;font-weight:500;">Requieren atención</p>
            <p class="fw-bold font-monospace mb-0" style="font-size:1.1rem;">38</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-3 border overflow-hidden" style="border-color:#e2e8f0!important;">

      <!-- Barra de búsqueda y filtros -->
      <div class="d-flex flex-wrap align-items-center gap-3 px-4 py-3 border-bottom">
        <div class="position-relative flex-grow-1" style="min-width:240px;">
          <span class="position-absolute text-secondary"
                style="left:12px;top:50%;transform:translateY(-50%);">${ICONS.search}</span>
          <input type="search" placeholder="Buscar por nombre, SKU o ubicación..."
                 class="form-control bg-light border-0 ps-5 rounded-3"
                 style="font-size:.875rem;height:40px;">
        </div>
        <select class="form-select border" style="width:auto;font-size:.875rem;height:40px;">
          <option>Todas las categorías</option>
          <option>Ferretería</option>
          <option>Embalaje</option>
          <option>Repuestos</option>
          <option>Motores</option>
        </select>
        <select class="form-select border" style="width:auto;font-size:.875rem;height:40px;">
          <option>Todos los estados</option>
          <option>Óptimo</option>
          <option>Bajo</option>
          <option>Crítico</option>
        </select>
        <button class="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
                style="height:40px;">
          ${ICONS.filter} Más filtros
        </button>
      </div>

      <!-- Tabla responsive -->
      <div class="table-responsive">
        <table class="table table-jacks mb-0">
          <thead>
            <tr>
              <th class="px-3"><input type="checkbox" class="form-check-input"></th>
              <th class="px-3">Producto</th>
              <th class="px-3">SKU</th>
              <th class="px-3">Categoría</th>
              <th class="px-3">Ubicación</th>
              <th class="px-3 text-end">Stock</th>
              <th class="px-3 text-end">Precio</th>
              <th class="px-3">Estado</th>
            </tr>
          </thead>
          <tbody id="tabla-productos">
            ${PRODUCTOS_DEMO.map(filaProducto).join('')}
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="d-flex align-items-center justify-content-between px-4 py-3 border-top"
           style="font-size:.75rem;color:#94a3b8;">
        <span>Mostrando ${PRODUCTOS_DEMO.length} de 12,847 productos</span>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-sm btn-outline-secondary px-2 py-1">Anterior</button>
          <button class="btn btn-sm btn-brand px-2 py-1 font-monospace">1</button>
          <button class="btn btn-sm btn-outline-secondary px-2 py-1 font-monospace">2</button>
          <button class="btn btn-sm btn-outline-secondary px-2 py-1 font-monospace">3</button>
          <button class="btn btn-sm btn-outline-secondary px-2 py-1">Siguiente</button>
        </div>
      </div>
    </div>
  `;
}
