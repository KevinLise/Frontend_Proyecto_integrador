// ============================================================
// VISTA: PRODUCTOS
// Esta vista no depende de ninguna librería externa.
// Los iconos están escritos como código SVG directo (no se
// descargan de internet, no son imágenes, son vectores puros).
// ============================================================

// Diccionario de iconos: cada key es un nombre, cada value es el
// código SVG completo como string. Así los reutilizamos varias veces
// sin repetir el código SVG completo en cada lugar donde se usa.
import { ICONS } from '../icons.js';

// Datos de ejemplo (hardcodeados) para poder maquetar sin depender
// todavía del backend. Cuando conecten api.js, esto se reemplaza
// por la respuesta real del fetch().
const PRODUCTOS_DEMO = [
  { name: "Tornillo hexagonal M8 x 40mm", sku: "TRN-M8-040", category: "Ferretería", location: "A-12-03", stock: 1240, price: 0.35, status: "ok" },
  { name: "Caja cartón corrugado 40x30x25", sku: "CJA-COR-4030", category: "Embalaje", location: "B-04-01", stock: 86, price: 2.10, status: "warn" },
  { name: "Motor eléctrico 1.5HP 220V", sku: "MTR-15H-220", category: "Motores", location: "D-02-07", stock: 12, price: 289.90, status: "low" },
  { name: "Rodamiento SKF 6205-2RS", sku: "RDM-6205-RS", category: "Repuestos", location: "C-08-04", stock: 342, price: 8.75, status: "ok" },
  { name: "Cinta embalaje transparente 48mm", sku: "CTA-EMB-048", category: "Embalaje", location: "B-05-02", stock: 58, price: 1.40, status: "warn" },
  { name: "Correa trapecial A-42", sku: "CRR-TRP-A42", category: "Repuestos", location: "C-09-01", stock: 4, price: 12.50, status: "low" },
];

// Estas 3 constantes traducen el status ("ok"/"warn"/"low") a:
// - el texto que se muestra (STATUS_LABEL)
// - el color del punto (STATUS_DOT)
// - el color de fondo del badge completo (STATUS_BADGE)
const STATUS_LABEL = { ok: "Óptimo", warn: "Bajo", low: "Crítico" };
const STATUS_DOT = { ok: "bg-green-500", warn: "bg-amber-500", low: "bg-red-500" };
const STATUS_BADGE = {
  ok: "bg-green-50 text-green-600",
  warn: "bg-amber-50 text-amber-600",
  low: "bg-red-50 text-red-600",
};

// Esta función recibe UN producto y devuelve el HTML de UNA fila <tr>.
// Se usa dentro de un .map() más abajo para generar todas las filas.
function filaProducto(p) {
  return `
    <tr class="hover:bg-slate-50 transition">
      <td class="px-6 py-4"><input type="checkbox" class="rounded"></td>
      <td class="px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            ${ICONS.package}
          </div>
          <span class="font-medium text-slate-800">${p.name}</span>
        </div>
      </td>
      <td class="px-4 py-4">
        <span class="font-mono text-xs text-slate-600 bg-slate-100 rounded-md px-2 py-1">${p.sku}</span>
      </td>
      <td class="px-4 py-4 text-slate-600">${p.category}</td>
      <td class="px-4 py-4 font-mono text-xs text-slate-400">${p.location}</td>
      <td class="px-4 py-4 text-right font-mono font-semibold text-slate-900">${p.stock.toLocaleString('es')}</td>
      <td class="px-4 py-4 text-right font-mono text-slate-600">$${p.price.toFixed(2)}</td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[p.status]}">
          <span class="w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status]}"></span>
          ${STATUS_LABEL[p.status]}
        </span>
      </td>
    </tr>
  `;
}

// Esta es la función principal que exportamos. El router la llama
// y usa lo que devuelve para inyectarlo dentro de <main id="app">.
export function renderProductos() {
  return `
    <!-- ENCABEZADO: título + botones de acción -->
    <div class="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <p class="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">Catálogo</p>
        <h1 class="text-2xl font-bold text-slate-900">Productos</h1>
        <p class="text-sm text-slate-400 mt-1">Gestiona SKUs, categorías y ubicaciones del almacén.</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Estos botones no tienen lógica todavía, solo diseño.
             Los id= son para que tu compañero de lógica los enganche después. -->
        <button id="btn-importar-csv" class="px-4 h-10 rounded-xl border border-slate-200 bg-white text-sm font-medium hover:bg-slate-50 inline-flex items-center gap-2">
          ${ICONS.upload} Importar CSV
        </button>
        <button id="btn-nuevo-producto" class="px-4 h-10 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 inline-flex items-center gap-2">
          ${ICONS.plus} Nuevo producto
        </button>
      </div>
    </div>

    <!-- TARJETAS KPI: 4 resúmenes rápidos arriba de la tabla -->
    <section class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">${ICONS.boxes}</div>
        <div>
          <p class="text-xs text-slate-400 font-medium">Total productos</p>
          <p class="text-xl font-bold font-mono">12,847</p>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">${ICONS.tag}</div>
        <div>
          <p class="text-xs text-slate-400 font-medium">Categorías activas</p>
          <p class="text-xl font-bold font-mono">24</p>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">${ICONS.layers}</div>
        <div>
          <p class="text-xs text-slate-400 font-medium">Ubicaciones</p>
          <p class="text-xl font-bold font-mono">186</p>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">${ICONS.alert}</div>
        <div>
          <p class="text-xs text-slate-400 font-medium">Requieren atención</p>
          <p class="text-xl font-bold font-mono">38</p>
        </div>
      </div>
    </section>

    <!-- TARJETA PRINCIPAL: buscador + filtros + tabla + paginación -->
    <div class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">

      <!-- Barra de buscador y filtros -->
      <div class="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div class="relative flex-1 min-w-[240px]">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">${ICONS.search}</span>
          <input type="search" placeholder="Buscar por nombre, SKU o ubicación..."
            class="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-100 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300/40 text-sm">
        </div>
        <select class="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700">
          <option>Todas las categorías</option>
          <option>Ferretería</option>
          <option>Embalaje</option>
          <option>Repuestos</option>
          <option>Motores</option>
        </select>
        <select class="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700">
          <option>Todos los estados</option>
          <option>Óptimo</option>
          <option>Bajo</option>
          <option>Crítico</option>
        </select>
        <button class="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 inline-flex items-center gap-2 hover:bg-slate-50">
          ${ICONS.filter} Más filtros
        </button>
      </div>

      <!-- Tabla de productos -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/50 border-b border-slate-100">
              <th class="font-medium px-6 py-3"><input type="checkbox" class="rounded"></th>
              <th class="font-medium px-4 py-3">Producto</th>
              <th class="font-medium px-4 py-3">SKU</th>
              <th class="font-medium px-4 py-3">Categoría</th>
              <th class="font-medium px-4 py-3">Ubicación</th>
              <th class="font-medium px-4 py-3 text-right">Stock</th>
              <th class="font-medium px-4 py-3 text-right">Precio</th>
              <th class="font-medium px-6 py-3">Estado</th>
            </tr>
          </thead>
          <!-- id="tabla-productos": aquí es donde tu compañero, cuando
               conecte el backend, va a reemplazar estas filas de ejemplo
               por las filas reales usando document.getElementById() -->
          <tbody id="tabla-productos" class="divide-y divide-slate-100">
            ${PRODUCTOS_DEMO.map(filaProducto).join('')}
          </tbody>
        </table>
      </div>

      <!-- Paginación (solo visual por ahora, sin lógica de cambio de página) -->
      <div class="flex items-center justify-between px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
        <span>Mostrando ${PRODUCTOS_DEMO.length} de 12,847 productos</span>
        <div class="flex items-center gap-1">
          <button class="px-2.5 py-1 rounded-md hover:bg-slate-100">Anterior</button>
          <button class="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono">1</button>
          <button class="px-2.5 py-1 rounded-md hover:bg-slate-100 font-mono">2</button>
          <button class="px-2.5 py-1 rounded-md hover:bg-slate-100 font-mono">3</button>
          <button class="px-2.5 py-1 rounded-md hover:bg-slate-100">Siguiente</button>
        </div>
      </div>
    </div>
  `;
}