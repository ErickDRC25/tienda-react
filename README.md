# Tienda React - Frontend Ecommerce

Frontend desarrollado con React y Tailwind CSS para un sistema ecommerce, consumiendo la API REST construida en FastAPI: [ecommerce_api](https://github.com/ErickDRC25/ecommerce_api).

Incluye tienda pública con carrito de compras y un panel de administración con dashboard analítico, protegidos con autenticación JWT.

---

# Sobre este proyecto

Este es un proyecto de práctica enfocado principalmente en la **lógica de consumo de API, autenticación y manejo de estado en React**. La interfaz es intencionalmente sencilla: prioricé que cada funcionalidad conectara correctamente con el backend antes de invertir tiempo en diseño visual avanzado.

El estilado se hizo con Tailwind CSS, que fue clave para lograr una interfaz funcional y ordenada con conocimientos básicos de CSS. Pulir la UI/UX es justamente uno de los siguientes pasos que tengo pendientes.

---

# Tecnologías utilizadas

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM 7
- Fetch API (consumo de endpoints)
- JWT (autenticación basada en token)
- ESLint

---

# Funcionalidades principales

## Autenticación
- Login con JWT contra la API
- Token guardado en `localStorage`
- Redirección automática según rol (admin / cliente)
- Rutas protegidas en el panel de administración

---

## Tienda (vista pública)
- Listado de productos disponibles
- Carrito de compras: agregar, actualizar cantidad, eliminar productos
- Visualización del total del carrito
- Historial de órdenes del usuario con detalle por orden

---

## Panel de administración
- Dashboard con métricas: ventas totales, total de órdenes, total de usuarios, producto más vendido, top de clientes
- Filtro de ventas por estado (pendiente, pagado, enviado, entregado, cancelado)
- Filtro de ventas por fecha
- CRUD completo de productos
- CRUD completo de categorías
- Gestión de órdenes

---

# Estructura del proyecto

```
src/
├── components/
│   ├── Login.jsx
│   ├── Carrito.jsx
│   ├── Ordenes.jsx
│   ├── categoria/
│   ├── productos/
│   ├── orden/
│   └── dashboard/
├── pages/
│   ├── Inicio.jsx
│   └── Admin.jsx
├── navAdmin.jsx
├── App.jsx
└── main.jsx
```

---

# Instalación y ejecución

## 1. Clonar el repositorio

```bash
git clone https://github.com/ErickDRC25/tienda-react.git
cd tienda-react
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

> Esta variable debe apuntar a la URL donde esté corriendo el backend ([ecommerce_api](https://github.com/ErickDRC25/ecommerce_api)).

## 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

## 5. Compilar para producción

```bash
npm run build
```

---

# Backend relacionado

Este frontend depende de la API REST desarrollada en FastAPI:

 [github.com/ErickDRC25/ecommerce_api](https://github.com/ErickDRC25/ecommerce_api)

Debe estar corriendo (local o desplegada) para que el login, el carrito, las órdenes y el dashboard funcionen correctamente.

---

# Aprendizajes del proyecto

Durante este proyecto practiqué:

- Consumo de APIs REST con `fetch`
- Manejo de autenticación JWT desde el cliente
- Rutas protegidas con React Router
- Manejo de estado con hooks (`useState`, `useEffect`)
- Diseño de interfaces con Tailwind CSS
- Variables de entorno en Vite
- Buenas prácticas de control de versiones con Git

---

# Próximos pasos

- Mejorar la UI/UX (espaciados, tipografía, responsividad, estados de carga)
- Agregar validaciones y mensajes de error más claros en los formularios
- Tests básicos de componentes

---

# Autor

Erick Diego Romero Cruz