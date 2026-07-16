import { renderDashboard }    from './views/dashboard.js';
import { renderProductos }    from './views/productos.js';
import { renderConfiguracion } from './views/configuracion.js';
import { renderPlaceholder }  from './views/placeholder.js';
import { logout }             from './main.js';
import { ICONS }              from './icons.js';

// Mapa central de rutas: agrega aquí cada vista nueva que crees.
const ROUTES = {
  dashboard:    { title: 'Dashboard',    icon: ICONS.grid,     render: renderDashboard },
  productos:    { title: 'Productos',    icon: ICONS.package,  render: renderProductos },
  movimientos:  { title: 'Movimientos',  icon: ICONS.swap,     render: () => renderPlaceholder('Movimientos') },
  reportes:     { title: 'Reportes',     icon: ICONS.barChart, render: () => renderPlaceholder('Reportes') },
  configuracion:{ title: 'Configuración',icon: ICONS.settings, render: renderConfiguracion },
};

const appEl = document.getElementById('app');
const navEl = document.getElementById('sidebar-nav');

// Genera las iniciales a partir del nombre completo del usuario
function getInitials(nombre = '') {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

// Rellena nombre, rol e iniciales en sidebar y header
function populateUserInfo(user) {
  if (!user) return;

  const initials = getInitials(user.nombre || user.name || '');
  const nombre   = user.nombre || user.name || '—';
  const rol      = user.rol    || user.role  || '—';

  // Sidebar
  const sidebarAvatar = document.getElementById('sidebar-avatar');
  const sidebarNombre = document.getElementById('sidebar-nombre');
  const sidebarRol    = document.getElementById('sidebar-rol');
  if (sidebarAvatar) sidebarAvatar.textContent = initials || '--';
  if (sidebarNombre) sidebarNombre.textContent = nombre;
  if (sidebarRol)    sidebarRol.textContent    = rol;

  // Header
  const headerAvatar = document.getElementById('header-avatar');
  const headerNombre = document.getElementById('header-nombre');
  const headerRol    = document.getElementById('header-rol');
  if (headerAvatar) headerAvatar.textContent = initials || '--';
  if (headerNombre) headerNombre.textContent = nombre;
  if (headerRol)    headerRol.textContent    = rol;
}

// Genera los links del sidebar automáticamente a partir de ROUTES.
function buildSidebar() {
  // Mantiene el encabezado "Operación" y agrega los links
  const linksHtml = Object.entries(ROUTES)
    .map(([key, route]) => `
      <a href="#${key}"
         data-route="${key}"
         class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg
                hover:bg-slate-50 text-slate-600 text-sm font-medium transition">
        ${route.icon}
        <span>${route.title}</span>
      </a>
    `)
    .join('');

  navEl.innerHTML = `
    <p class="px-3 pb-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
      Operación
    </p>
    ${linksHtml}
  `;
}

// Pinta la vista activa: contenido + link resaltado en el sidebar
function renderRoute() {
  const hash  = window.location.hash.replace('#', '') || 'dashboard';
  const route = ROUTES[hash] || ROUTES.dashboard;

  appEl.innerHTML = route.render();

  document.querySelectorAll('.nav-link').forEach(link => {
    const isActive = link.dataset.route === hash;
    link.classList.toggle('bg-slate-900', isActive);
    link.classList.toggle('text-white',   isActive);
    link.classList.toggle('text-slate-600', !isActive);
  });
}

export function initRouter(user) {
  populateUserInfo(user);
  buildSidebar();
  renderRoute();
  window.addEventListener('hashchange', renderRoute);

  // Botón de cerrar sesión en el sidebar
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('¿Cerrar sesión?')) logout();
    });
  }
}
