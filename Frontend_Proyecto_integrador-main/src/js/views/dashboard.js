// Cada vista es una función que devuelve un STRING de HTML.
// El router se encarga de inyectar ese string dentro de <main id="app">.
// Cámbialo por el contenido real de tu dashboard cuando tengan definido el enfoque.

import { ICONS } from '../icons.js';

export function renderDashboard() {
  return `
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Panel de control</h1>
        <p class="text-sm text-slate-400 mt-1">Vista general del inventario · Jueves, 09 julio 2026</p>
      </div>
      <div class="flex items-center gap-3">
        <button id="btn-exportar" class="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Exportar
        </button>
        <button id="btn-nuevo-movimiento" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
          + Nuevo movimiento
        </button>
      </div>
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">${ICONS.boxes}</div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">▲ 3.2%</span>
        </div>
        <p class="text-xs text-slate-400">Total SKUs</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">12,847</p>
        <svg class="w-full h-8 mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <polyline points="0,25 20,20 40,22 60,10 80,14 100,5" fill="none" stroke="#0F172A" stroke-width="2"/>
        </svg>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">${ICONS.dollar}</div>
          <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">▲ 8.1%</span>
        </div>
        <p class="text-xs text-slate-400">Valor de inventario</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">$1.284.902</p>
        <svg class="w-full h-8 mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <polyline points="0,20 20,18 40,15 60,17 80,8 100,6" fill="none" stroke="#0F172A" stroke-width="2"/>
        </svg>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">${ICONS.warning}</div>
          <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">▼ 12</span>
        </div>
        <p class="text-xs text-slate-400">Bajo stock</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">38</p>
        <svg class="w-full h-8 mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <polyline points="0,10 20,12 40,8 60,15 80,18 100,20" fill="none" stroke="#F59E0B" stroke-width="2"/>
        </svg>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">${ICONS.swap}</div>
          <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">▼ 2.4%</span>
        </div>
        <p class="text-xs text-slate-400">Movimientos hoy</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">1,204</p>
        <svg class="w-full h-8 mt-2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <polyline points="0,15 20,5 40,18 60,8 80,20 100,10" fill="none" stroke="#0F172A" stroke-width="2"/>
        </svg>
      </div>
    </section>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <section class="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
          <div>
            <h2 class="font-semibold text-slate-900">Productos en almacén</h2>
            <p class="text-xs text-slate-400 mt-0.5">Actualizado hace 2 minutos · 12,847 SKUs totales</p>
          </div>
          <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button class="px-3 py-1.5 rounded-md bg-white shadow-sm text-slate-900">Todos</button>
            <button class="px-3 py-1.5 rounded-md text-slate-500">Óptimo</button>
            <button class="px-3 py-1.5 rounded-md text-slate-500">Bajo</button>
            <button class="px-3 py-1.5 rounded-md text-slate-500">Crítico</button>
          </div>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-slate-400 text-xs uppercase">
              <th class="px-6 py-3 font-medium">Producto</th>
              <th class="px-6 py-3 font-medium">SKU</th>
              <th class="px-6 py-3 font-medium">Categoría</th>
              <th class="px-6 py-3 font-medium">Stock</th>
              <th class="px-6 py-3 font-medium">Mínimo</th>
              <th class="px-6 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody id="tabla-productos" class="divide-y divide-slate-100">
            <tr>
              <td class="px-6 py-4 font-medium text-slate-800">Tornillo hexagonal M8 x 40mm</td>
              <td class="px-6 py-4 text-slate-400">TRN-M8-040</td>
              <td class="px-6 py-4 text-slate-500">Ferretería</td>
              <td class="px-6 py-4">
                <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div class="h-full bg-green-500" style="width: 90%"></div>
                </div>
                <span class="text-xs text-slate-500">1240</span>
              </td>
              <td class="px-6 py-4 text-slate-400">400</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>Óptimo
                </span>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 font-medium text-slate-800">Caja de cartón 30x30</td>
              <td class="px-6 py-4 text-slate-400">CJA-3030</td>
              <td class="px-6 py-4 text-slate-500">Empaque</td>
              <td class="px-6 py-4">
                <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                  <div class="h-full bg-amber-500" style="width: 40%"></div>
                </div>
                <span class="text-xs text-slate-500">96</span>
              </td>
              <td class="px-6 py-4 text-slate-400">150</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Bajo
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 class="font-semibold text-slate-900">Distribución por categoría</h2>
        <p class="text-xs text-slate-400 mt-0.5 mb-6">Participación sobre el total de SKUs</p>
        <div class="relative w-40 h-40 mx-auto rounded-full"
             style="background: conic-gradient(#0F172A 0% 65%, #E2E8F0 65% 100%);">
          <div class="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
            <span class="text-xs text-slate-400">SKUs</span>
            <span class="text-lg font-bold text-slate-900">12.8k</span>
          </div>
        </div>
      </section>
    </div>
  `;
}