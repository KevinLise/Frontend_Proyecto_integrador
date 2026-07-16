/**
 * auth.js — gestión de estado de autenticación.
 * Guarda el token en localStorage para persistir la sesión entre recargas.
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY  = 'auth_user';

/** Devuelve el token almacenado o null si no hay sesión activa. */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** Devuelve los datos del usuario almacenados o null. */
export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Guarda token y datos de usuario después de un login/registro exitoso. */
export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Elimina la sesión (logout). */
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/** true si hay un token guardado. */
export function isAuthenticated() {
  return Boolean(getToken());
}
