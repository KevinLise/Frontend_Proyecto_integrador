# Frontend — Proyecto Integrador (StockSmart)

SPA en JavaScript Vanilla (sin frameworks), con Tailwind CSS vía CDN.
Cumple el requisito del enunciado de "SPA sin frameworks" — toda la
navegación pasa por un solo `index.html` y un hash router en JS puro.

## Estructura

```
frontend/
├── index.html                    # shell fijo: sidebar + header + <main id="app">
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js               # arranque de la app
│       ├── router.js             # hash router: define rutas e inyecta HTML en #app
│       ├── api.js                # funciones fetch() al backend (EN PROGRESO)
│       ├── icons.js              # todos los SVG de iconos, a mano (sin librería)
│       └── views/
│           ├── dashboard.js
│           ├── productos.js
│           ├── movimientos.js
│           ├── reportes.js
│           ├── configuracion.js
│           └── placeholder.js    # usado solo para vistas aún sin diseñar
```
## Cómo funciona la SPA

1. `index.html` nunca se recarga: solo tiene un `<main id="app">` vacío.
2. `router.js` escucha cambios en el `#hash` de la URL (ej. `#movimientos`).
3. Según el hash, llama a la función `render...()` de la vista correspondiente,
   que devuelve un **string de HTML** (no hay DOM virtual, no hay componentes).
4. Ese string se inyecta con `appEl.innerHTML = ...` dentro de `#app`.

Esto es importante para quien conecte la lógica: **cada vez que cambias de
sección, el HTML se destruye y se vuelve a crear desde cero**. Por eso los
`addEventListener` de cada vista (botones, formularios, tabs) hay que
volver a engancharlos cada vez que esa vista se re-renderiza — no sirve
agregarlos una sola vez al cargar la página.

## Estado actual (para quien tome la parte de lógica)

Todas las vistas del sidebar están **diseñadas y maquetadas con datos de
ejemplo (arrays hardcodeados)**. Lo que falta en cada una:

| Vista | Diseño | Pendiente de lógica |
|---|---|---|
| Dashboard | ✅ | Conectar KPIs a datos reales |
| Productos | ✅ | CRUD real vía `api.js`, formulario "Nuevo producto" con validación |
| Movimientos | ✅ | Filtro real de tabs (Todos/Entradas/Salidas/Ajustes), formulario "Nuevo movimiento" |
| Reportes | ✅ | Descarga real de XLSX/PDF por botón (`data-reporte-id`), datos del gráfico desde API |
| Configuración | ✅ | Scroll a sección según `data-target`, guardar formulario, cambio de tema |

Cada archivo de vista tiene comentarios `// IMPORTANTE PARA EL BACKEND` o
`// PENDIENTE` marcando exactamente qué forma de datos espera y qué falta
enganchar — léelos antes de empezar a conectar.

## Cómo agregar una vista nueva

1. Crea `src/js/views/miVista.js` con una función `renderMiVista()` que
   devuelva el HTML como string (copia el patrón de `dashboard.js`).
2. Impórtala en `router.js` y agrégala al objeto `ROUTES`:

```js
import { renderMiVista } from './views/miVista.js';

const ROUTES = {
  ...
  mivista: { title: 'Mi Vista', icon: ICONS.grid, render: renderMiVista },
};
```

El link del sidebar se genera solo, no hay que tocar el HTML a mano.

## Instalación y ejecución local

No requiere `npm install` (Tailwind está vía CDN — decisión documentada:
mantener cero dependencias, igual que con `icons.js` en vez de una
librería de iconos).

```bash
npx serve .
```

o con la extensión **Live Server** de VS Code: clic derecho sobre
`index.html` → "Open with Live Server".

## Pendiente general

- Conectar `api.js` con el backend real (hoy solo tiene `getProductos()`).
- Reemplazar todos los arrays `*_DEMO` de cada vista por la respuesta real de la API.
- Agregar validaciones a los formularios (requisito explícito del enunciado).
- Limpiar el import de `renderPlaceholder` en `router.js` cuando ya no quede ninguna sección sin diseñar.

