# Blog de Noticias: Plataforma CMS Full-Stack (Módulo 9)
**Autor**: José Ricardo Salgado Escalona

Un sistema de gestión de contenidos (CMS) moderno y dinámico diseñado para la publicación, filtrado y moderación de noticias tecnológicas. Construido con arquitectura MVC (Modelo-Vista-Controlador) y una fuerte separación de responsabilidades entre el cliente y el servidor.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Completado-success)
![Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla_JS-f7df1e)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![PostgreSQL](https://img.shields.io/badge/Base_de_Datos-PostgreSQL-336791)

## ✨ Funcionalidades Principales

*   **Arquitectura MVC Robusta**: Separación clara entre Rutas, Controladores y Modelos en el backend.
*   **Autenticación y Seguridad (JWT)**: Sistema de login y registro encriptado con *bcrypt* y protegido mediante JSON Web Tokens.
*   **Gestión de Roles Integrada**: Diferenciación entre usuarios normales (lectores/comentaristas) y administradores (creadores/moderadores de noticias).
*   **Paginación de Ventana Deslizante (Sliding Window)**: Componente UI escalable para manejar cientos de noticias y comentarios sin romper la estética visual.
*   **Motor de Búsqueda de Texto Completo**: Búsqueda insensible a mayúsculas/minúsculas sobre títulos y contenido, además de filtrado avanzado por categorías.
*   **Sanitización y Validación Defensiva**: Uso de `express-validator` en el servidor y atributos HTML5 en el frontend para blindar la aplicación contra inyecciones SQL y XSS.

## 🛠️ Stack Tecnológico

**Backend:**
*   Node.js & Express.js
*   Sequelize (ORM)
*   PostgreSQL (Base de datos relacional)
*   JWT (Manejo de sesiones seguras)
*   Express Validator (Capa de Sanitización)

**Frontend:**
*   HTML5 & CSS3 (Vanilla)
*   JavaScript ES6+ (Fetch API, DOM Manipulation)
*   Bootstrap 5 (UI Framework & Diseño Responsivo)

## 🚀 Guía de Instalación Rápida

Sigue estos pasos para desplegar el proyecto localmente en tu máquina.

### 1. Prerrequisitos
Asegúrate de tener instalado:
- **Node.js** (v14 o superior)
- **PostgreSQL** corriendo en tu máquina (puerto por defecto 5432).

### 2. Configuración del Backend

Abre una terminal y dirígete a la carpeta `backend`:
```bash
cd backend
npm install
```

Configura tus variables de entorno. Duplica el archivo `.env.example` y renómbralo a `.env`:
```env
# Archivo: backend/.env
DB_NAME=blog_m9
DB_USER=postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_HOST=localhost
PORT=3000
JWT_SECRET=tu_super_secreto_seguro_123
```

### 3. Preparación de la Base de Datos

El proyecto cuenta con scripts automatizados para crear, sincronizar e inyectar datos de prueba:

```bash
# Paso 1: Crea la base de datos vacía (blog_m9)
npm run db:create

# Paso 2: Sincroniza las tablas e inserta +15 noticias reales
npm run db:init
```

*Nota: La cuenta de administrador por defecto es `admin@blog.com` con la contraseña `Password123!`*

### 4. Inicializar el Servidor

```bash
npm run dev
```
Verás el mensaje: `Servidor corriendo en http://localhost:3000`. ¡El backend está listo!

### 5. Iniciar el Frontend

El frontend no utiliza *bundlers* (como Vite o Webpack) para mantener la simpleza arquitectónica. 
Simplemente abre el archivo `index.html` ubicado en la carpeta `/frontend` haciendo doble clic en él, o utilizando la extensión *Live Server* de VSCode.

---

## 🔒 Auditoría de Seguridad

*   `node_modules` y `.env` están excluidos del control de versiones (`.gitignore`).
*   Los formularios previenen el envío de entidades HTML maliciosas (función `escapeHTML`).
*   Protección contra colisiones en bases de datos (Unique Constraint Handlers).

> *Proyecto desarrollado como entrega final del Módulo 9. Diseñado para demostrar competencias completas de desarrollo Full-Stack en entornos JavaScript.*
