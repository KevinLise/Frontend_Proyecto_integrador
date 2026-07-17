// ── Importar Bootstrap 5 (JS + CSS) y estilos custom ──
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/styles.css';

import { initRouter } from './router.js';
import { renderLogin } from './views/login.js';

const shell = document.getElementById('app-shell');  // sidebar + header
const root  = document.getElementById('root');        // contenedor raíz

/**
 * Devuelve los datos del usuario autenticado.
 * Prioridad: sessionStorage (sesión activa) → localStorage (remember me).
 */
export function getAuthUser() {
  try {
    const fromSession = sessionStorage.getItem('auth_user');
    if (fromSession) return JSON.parse(fromSession);

    // remember me: el usuario marcó "mantener sesión"
    const fromLocal = localStorage.getItem('auth_user');
    if (fromLocal) {
      const user = JSON.parse(fromLocal);
      // Pasamos el token a sessionStorage para que la sesión funcione normal
      sessionStorage.setItem('auth_token', localStorage.getItem('auth_token') || '');
      sessionStorage.setItem('auth_user', fromLocal);
      return user;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Cierra la sesión: limpia sessionStorage y localStorage, vuelve al login.
 */
export function logout() {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_user');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  showLogin();
}

function showLogin() {
  shell.classList.add('d-none');
  shell.style.display = '';   // deja que Bootstrap controle display
  root.innerHTML = '';
  renderLogin();
}

function showApp(user) {
  root.innerHTML = '';        // limpia la pantalla de login
  shell.classList.remove('d-none');
  shell.style.display = 'flex'; // restaura el flex layout del app-shell
  initRouter(user);           // arranca el router pasándole el usuario
}

document.addEventListener('DOMContentLoaded', () => {
  const user = getAuthUser();

  if (user) {
    showApp(user);
  } else {
    showLogin();
  }

  // El evento lo emite login.js cuando el backend responde OK
  window.addEventListener('auth:login', (e) => {
    showApp(e.detail);
  });
});
