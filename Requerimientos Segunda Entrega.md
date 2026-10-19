# Proyecto Integrador — E-commerce
## Segunda Entrega: React, React Router y MockAPI

**Fecha de entrega: Lunes 12 de octubre**

En esta etapa migrás todo lo que construiste en la primera entrega a React y conectás la aplicación a datos reales a través de MockAPI.

> 💡 No estás rehaciendo el proyecto desde cero — estás evolucionándolo. El HTML que escribiste en la primera entrega es la referencia de estructura y diseño. Ahora lo expresás en componentes. Si la primera entrega está bien hecha, esta transición es fluida.

**Requisito previo:** esta entrega incluye todo lo desarrollado en la primera. No se puede entregar sin tener la base de HTML/CSS funcionando.

---

## Stack tecnológico

| Tecnología | Rol |
|-----------|-----|
| React (Vite) | Framework de UI |
| React Router v6 | Navegación entre vistas |
| MockAPI | Base de datos simulada (REST API) |
| React Hook Form | Manejo de formularios (recomendado) |
| CSS propio | Estilos — **sin Bootstrap** (excepto para carousel si se usa) |

> 💡 **¿Por qué Vite y no Create React App?** CRA está deprecado desde 2023. Vite es el estándar actual: arranca en menos de 1 segundo, tiene hot reload instantáneo y genera builds mucho más pequeños.

---

## Configuración inicial

```bash
npm create vite@latest ecommerce-react -- --template react
cd ecommerce-react
npm install
npm install react-router-dom
npm install react-hook-form     # recomendado para formularios
npm run dev
```

**Otras liberías opcionales:**
- `sweetalert2` para alertas bonitas
- `react-icons` para íconos
- `axios` para peticiones HTTP (aunque `fetch` es suficiente)
- `bootstrap` solo para el carousel (si se decide usarlo) o para estilos rápidos. Se puede usar `react-bootstrap` pero no es obligatorio.

---

## Estructura de carpetas

### Importante: esta es solo una sugerencia de estructura. No es obligatorio seguirla al pie de la letra, pero sí es importante que mantengas una organización clara entre componentes, páginas y servicios.


```
src/
├── assets/
│   └── images/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── ProductCard.jsx
│   │   ├── Button.jsx
│   │   └── Loader.jsx
│   └── products/
│       └── ProductTable.jsx
├── pages/
│   ├── Home.jsx
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── AdminProducts.jsx
│   ├── AdminUsers.jsx
│   └── About.jsx
├── services/
│   ├── products.service.js     ← todas las llamadas a MockAPI de productos
│   └── users.service.js        ← todas las llamadas a MockAPI de usuarios
├── App.jsx
└── main.jsx
```

> 💡 La carpeta `services/` es una de las decisiones de arquitectura más importantes de esta entrega. En lugar de escribir `fetch('https://...')` o `axios.get('https://...')` dentro de un componente, lo encapsulás en una función con nombre descriptivo: `getProducts()`, `createProduct(data)`, `deleteProduct(id)`. Así si mañana cambia la URL de la API, tocás solo ese archivo — no todos los componentes que usan esa data.

---

## Configuración de MockAPI

1. Creá una cuenta gratuita en [https://mockapi.io](https://mockapi.io)
2. Creá un nuevo proyecto
3. Creá dos recursos:
   - `products` con los campos: `name`, `price`, `description`, `image`, `category`, `createdAt`
   - `users` con los campos: `name`, `email`, `password`, `birthDate`, `province`
4. Cargá al menos 8 productos con datos reales (los mismos de la primera entrega)
5. Guardá la URL base del proyecto — la vas a necesitar en `services/`

```js
// services/products.service.js
const BASE_URL = 'https://tu-proyecto.mockapi.io'

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  return res.json()
}

//  Demás funciones: getProductById(id), createProduct(data), updateProduct(id, data), deleteProduct(id)
```

---

## Configuración de rutas (App.jsx)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import Home          from './pages/Home'
import Register      from './pages/Register'
import Login         from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Products      from './pages/Products'
import AdminProducts from './pages/AdminProducts'
import AdminUsers    from './pages/AdminUsers'
import About         from './pages/About'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        // Rutas públicas
        // El orden importa: las rutas más específicas deben ir antes que las más generales por ejemplo, `/products/:id` antes que `/products`

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
```

> 💡 `path="/products/:id"` define un **parámetro dinámico**. Cuando el usuario navega a `/products/3`, React Router extrae el `3` y lo pone disponible dentro del componente a través del hook `useParams()`. Es la base de cómo funciona el detalle de producto dinámico.

---

## Páginas

### Home

- La página de inicio debe mostrar un resumen de la tienda, con un banner o hero, una sección destacada de productos y una sección de beneficios. La estructura es libre, pero debe incluir:
- Obtiene los productos con `getProducts()` al montar el componente (`useEffect`)
- Mientras carga, muestra un estado de carga (spinner o texto)
- Renderiza los productos como cards con `ProductCard`
- Mantiene la estructura de la primera entrega: banner, hero, cards, características

```jsx
// Lógica de carga de productos en Home.jsx
```

> 💡 El array vacío `[]` como segundo argumento de `useEffect` significa "ejecutá este efecto solo una vez, cuando el componente se monta". Sin ese array, el efecto se ejecutaría después de cada renderizado — incluyendo los que causa él mismo, generando un loop infinito.

---

### Detalle de producto

- Obtiene el `id` desde la URL con `useParams()`
- Hace una petición `GET /products/:id` a MockAPI
- Muestra toda la información del producto

```jsx
// Lógica de carga de producto individual en ProductDetail.jsx recuerden que debe obtener el id desde la URL con useParams()
```

---

### Register

- Reutiliza la estructura del formulario de la primera entrega, pero ahora con validaciones y conexión a MockAPI.
- Validaciones con React Hook Form (recomendado) o manejo manual de estado
- Al enviar: petición `POST /users` a MockAPI con los datos del formulario
- Muestra mensaje de éxito o error según el resultado

**Validaciones mínimas requeridas:**
- Todos los campos obligatorios deben estar completos
- El email debe tener formato válido usar pattern o una función de validación personalizada con regex y validate de React Hook Form.
- La contraseña y "repetir contraseña" deben coincidir
- La contraseña debe tener al menos 6 caracteres

---

### Login 🆕

- Formulario con email y password
- En esta entrega **no autentica contra una API real** — los datos se muestran en `console.log`
- El foco está en la estructura del componente y el manejo del formulario

> 💡 En la tercera entrega este componente va a conectarse con tu propio backend y va a recibir un token JWT real. Por eso es importante que la estructura sea limpia desde ahora.

---

### Admin de productos

Esta es la página más compleja de la entrega. Tiene tres responsabilidades:

1. **Listar** todos los productos de MockAPI en una tabla
2. **Crear** nuevos productos con un formulario
3. **Editar y eliminar** productos existentes

**Campos del formulario de producto:**

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| Nombre | `text` | ✅ |
| Precio | `number` | ✅ |
| Descripción | `textarea` | ✅ |
| Imagen (URL) | `text` | ✅ |
| Categoría | `select` | ✅ |
| Fecha de creación | Generada automáticamente con `new Date().toISOString()` | — |

**Importante:** Si desean agregar más campos, pueden hacerlo, pero estos son los mínimos requeridos.

**Acciones sobre cada producto:**

- **Crear** → `POST /products`
- **Editar** → al hacer clic en "Editar", el formulario se pre-carga con los datos del producto y al enviar hace `PUT /products/:id`
- **Eliminar** → `DELETE /products/:id` con confirmación previa

Cada operación debe mostrar un mensaje de éxito o error (podés usar `alert`, un componente propio, o SweetAlert2).

> 💡 Para manejar el modo "crear vs editar" del formulario, podés usar un estado `selectedProduct`. Si es `null`, el formulario está en modo creación. Si tiene un producto, está en modo edición. El mismo formulario sirve para los dos casos — solo cambia el texto del botón y la función que se llama al enviar.

---

### Admin de usuarios

- Tabla con todos los usuarios registrados en MockAPI
- Obtiene los datos con `GET /users`

**Acciones:**
- Crear usuario → `POST /users`, se puede reutilizar el formulario de Register.jsx
- Editar usuario → `PUT /users/:id`, se puede reutilizar el formulario de Register.jsx
- Eliminar usuario → `DELETE /users/:id`

---

## Entrega en GitHub

El repositorio debe ser **público** e incluir un `README.md` con:

- Nombre del proyecto
- Descripción breve
- Tecnologías utilizadas
- Pasos para clonar e instalar:
  ```bash
  git clone https://github.com/tu-usuario/ecommerce-react
  cd ecommerce-react
  npm install
  npm run dev
  ```

---

## Criterios de evaluación

| Criterio | Descripción |
|----------|-------------|
| **Requerimientos** | Todas las páginas y funcionalidades están implementadas |
| **React y React Router** | Componentes bien estructurados, rutas correctamente definidas |
| **Consumo de API** | Peticiones correctas a MockAPI, manejo de loading y errores |
| **Formularios** | Validaciones implementadas, feedback al usuario |
| **Organización** | Carpetas y componentes con responsabilidades claras |
| **GitHub** | Repositorio público con README completo |
| **Responsive** | El diseño se adapta correctamente a todos los tamaños |
