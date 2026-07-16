// Aquí van todas las funciones que hablan con tu backend (Python/Express).
// Ejemplo de patrón que vas a repetir para cada endpoint:

const BASE_URL = 'http://localhost:8000'; // cambia esto por la URL real de tu backend

// ══════════════════════════════════════════════════════════════════
// MOCK — ponelo en false cuando el backend esté listo
// ══════════════════════════════════════════════════════════════════
const USE_MOCK = true;

// Usuarios de prueba disponibles
const MOCK_USERS = [
  { email: 'admin@jacks.com',   password: 'Admin123!',  nombre: 'Mariana Ríos',    rol: 'Administradora' },
  { email: 'almacen@jacks.com', password: 'Almacen1!',  nombre: 'Carlos Mendoza',  rol: 'Almacén Central' },
  { email: 'ventas@jacks.com',  password: 'Ventas12!',  nombre: 'Lucía Fernández', rol: 'Ventas' },
];

function mockDelay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// ══════════════════════════════════════════════════════════════════

/**
 * Inicia sesión con email y contraseña.
 * Espera que el backend devuelva: { token, user: { nombre, rol, ... } }
 * En caso de credenciales inválidas el backend debe responder 401.
 */
export async function loginUsuario({ email, password }) {
  if (USE_MOCK) {
    await mockDelay();
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      return {
        success: true,
        token: 'mock-token-' + btoa(email),
        user: { nombre: user.nombre, rol: user.rol, email: user.email },
      };
    }
    return { success: false, message: 'Correo o contraseña incorrectos.' };
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 401) {
      return { success: false, message: 'Correo o contraseña incorrectos.' };
    }

    if (!res.ok) {
      return { success: false, message: 'Error del servidor. Intentá más tarde.' };
    }

    const data = await res.json();
    return { success: true, token: data.token, user: data.user };
  } catch (error) {
    console.error('loginUsuario:', error);
    throw error; // lo maneja la vista
  }
}

/**
 * Registra un nuevo usuario.
 * Espera que el backend devuelva: { token, user } o solo un mensaje de éxito.
 * En caso de email duplicado el backend debe responder 409.
 */
export async function registrarUsuario({ nombre, email, rol, password }) {
  if (USE_MOCK) {
    await mockDelay();
    const existe = MOCK_USERS.find(u => u.email === email);
    if (existe) {
      return { success: false, message: 'El correo ya está registrado.' };
    }
    // Simula registro exitoso con token
    const newUser = { nombre, rol: rol || 'Almacén', email };
    return {
      success: true,
      token: 'mock-token-' + btoa(email),
      user: newUser,
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, rol, password }),
    });

    if (res.status === 409) {
      return { success: false, message: 'El correo ya está registrado.' };
    }

    if (!res.ok) {
      return { success: false, message: 'Error del servidor. Intentá más tarde.' };
    }

    const data = await res.json();
    return { success: true, token: data.token ?? null, user: data.user ?? null };
  } catch (error) {
    console.error('registrarUsuario:', error);
    throw error;
  }
}

/**
 * Solicita un link de recuperación de contraseña por email.
 * Por seguridad, siempre devuelve éxito en el frontend
 * aunque el email no exista (el backend no debe revelar si está registrado).
 */
export async function solicitarRecuperacion(email) {
  if (USE_MOCK) {
    await mockDelay(800);
    return; // siempre éxito en mock
  }

  const res = await fetch(`${BASE_URL}/auth/recuperar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok && res.status !== 404) {
    throw new Error('Error al solicitar recuperación');
  }
}

export async function getProductos() {
  if (USE_MOCK) {
    await mockDelay();
    return [
      { id: 1, nombre: 'Caja de cartón A4',  sku: 'CJA-001', categoria: 'Embalaje',   stock: 240, precio: 150  },
      { id: 2, nombre: 'Paleta de madera',   sku: 'PLT-002', categoria: 'Logística',  stock: 18,  precio: 800  },
      { id: 3, nombre: 'Film stretch 500m',  sku: 'FLM-003', categoria: 'Embalaje',   stock: 5,   precio: 1200 },
      { id: 4, nombre: 'Cinta adhesiva x12', sku: 'CNT-004', categoria: 'Embalaje',   stock: 90,  precio: 60   },
      { id: 5, nombre: 'Montacargas eléct.', sku: 'MCG-005', categoria: 'Maquinaria', stock: 2,   precio: 95000},
    ];
  }

  try {
    const res = await fetch(`${BASE_URL}/productos`);
    if (!res.ok) throw new Error('Error al obtener productos');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// export async function crearProducto(data) { ... }
// export async function actualizarProducto(id, data) { ... }
// export async function eliminarProducto(id) { ... }
