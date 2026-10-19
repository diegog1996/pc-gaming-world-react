# PC Gaming World

## Descripción

PC Gaming World es una tienda online de productos y componentes para gaming. Este proyecto corresponde a la segunda entrega y transforma la versión original en HTML, CSS y JavaScript en una aplicación desarrollada con React.

La aplicación permite explorar productos, consultar sus detalles, registrar usuarios y administrar productos y usuarios mediante una API.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router DOM
- React Hook Form
- MockAPI
- Fetch API

## Funcionalidades

- Página de inicio con el diseño original de la tienda.
- Catálogo de productos conectado a MockAPI.
- Página de detalle dinámica para cada producto.
- Formulario de registro con validaciones.
- Formulario de inicio de sesión.
- Panel de administración de productos: crear, listar, editar y eliminar.
- Panel de administración de usuarios: crear, listar, editar y eliminar.
- Mensajes de carga, éxito y error en las operaciones correspondientes.
- Diseño adaptable a distintos tamaños de pantalla.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/diegog1996/pc-gaming-world-react.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd pc-gaming-world-react
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
VITE_API_URL=https://TU-PROYECTO.mockapi.io/api/v1
```

Reemplazar la URL de ejemplo por la URL base de tu proyecto de MockAPI. Esta URL debe incluir la versión de la API si corresponde, pero no debe terminar en `/products` ni en `/users`.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección local que indique Vite, normalmente `http://localhost:5173`.

## Estructura del proyecto

```text
pc-gaming-world-react/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

## API

La aplicación utiliza MockAPI para gestionar los recursos:

- `products`: catálogo de productos.
- `users`: usuarios registrados.

La URL de la API se configura mediante la variable de entorno `VITE_API_URL`.

## Autor

Proyecto académico desarrollado para la segunda entrega del curso de EducacionIT.
