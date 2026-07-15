import { renderDashboard } from './views/dashboard.js';
import { renderProductos } from './views/productos.js';
import { renderConfiguracion } from './views/configuracion.js';
import { renderReportes } from './views/reportes.js';
import { renderMovimientos } from './views/movimientos.js';
import { renderPlaceholder } from './views/placeholder.js';
import { ICONS } from './icons.js';

// Mapa central de rutas: agrega aquí cada vista nueva que crees.
// El campo "icon" es el icono que se muestra en el sidebar junto al nombre.
const ROUTES = {
  dashboard: { title: 'Dashboard', icon: ICONS.grid, render: renderDashboard },
  productos: { title: 'Productos', icon: ICONS.package, render: renderProductos },
  movimientos: { title: 'Movimientos', icon: ICONS.swap, render: renderMovimientos },
  reportes: { title: 'Reportes', icon: ICONS.barChart, render: renderReportes },
  configuracion: { title: 'Configuración', icon: ICONS.settings, render: renderConfiguracion },
};

const appEl = document.getElementById('app');
const navEl = document.getElementById('sidebar-nav');

// Genera los links del sidebar automáticamente a partir de ROUTES.
// Ahora cada link lleva su icono (route.icon) antes del texto.
function buildSidebar() {
  navEl.innerHTML = Object.entries(ROUTES)
    .map(([key, route]) => `
      <a href="#${key}"
         data-route="${key}"
         class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-600 text-sm font-medium transition">
        ${route.icon}
        <span>${route.title}</span>
      </a>
    `)
    .join('');
}

// Pinta la vista activa: contenido + link resaltado en el sidebar
function renderRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  const route = ROUTES[hash] || ROUTES.dashboard;

  appEl.innerHTML = route.render(); // <-- inyección de HTML

  document.querySelectorAll('.nav-link').forEach(link => {
    const isActive = link.dataset.route === hash;
    link.classList.toggle('bg-slate-900', isActive);
    link.classList.toggle('text-white', isActive);
    link.classList.toggle('text-slate-600', !isActive);
  });
}

export function initRouter() {
  buildSidebar();
  renderRoute();
  window.addEventListener('hashchange', renderRoute);
}
