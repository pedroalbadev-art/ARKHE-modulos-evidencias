# Gestión de Empleados — Aplicación web MEAN

Evidencia **GA8-220501096-AA1-EV01** — Desarrollar software a partir de la integración de sus módulos componentes.
Programa ADSO — SENA. Estudiante: Pedro Alba Méndez — Ficha 3235890.

Aplicación web completa (back-end + front-end) para el registro de empleados, construida siguiendo el
componente formativo "Construcción aplicación web". Es un módulo de aprendizaje independiente del proyecto ARKHE.

## Arquitectura (MEAN)

| Capa | Tecnología | Carpeta |
|---|---|---|
| Base de datos | MongoDB 9 + Mongoose | (servidor local, base `empleados`) |
| Back-end / API REST | Node.js + Express | `backend/` |
| Front-end | Angular 22 + Materialize | `frontend/` |

## Ambiente de desarrollo

- Node.js 24.21.0 / npm 11.19.0
- MongoDB Community Server 9.0.4 (servicio de Windows, puerto 27017) y MongoDB Compass
- Angular CLI 22.2.4
- Visual Studio Code, Git y GitHub, Postman

## Cómo ejecutar

1. **Back-end** (desde `gestion-empleados/`):
   ```
   npm install
   npm run dev
   ```
   API disponible en `http://localhost:3000/api/empleados`.

2. **Front-end** (desde `gestion-empleados/frontend/`):
   ```
   npm install
   ng serve
   ```
   Aplicación disponible en `http://localhost:4200`.

## API REST

| Método | Ruta | Acción |
|---|---|---|
| GET | `/api/empleados` | Listar empleados |
| POST | `/api/empleados` | Crear empleado |
| GET | `/api/empleados/:id` | Consultar un empleado |
| PUT | `/api/empleados/:id` | Actualizar empleado |
| DELETE | `/api/empleados/:id` | Eliminar empleado |

## Ambiente de pruebas

- **Pruebas unitarias del back-end** (Jest, 9 pruebas), desde `gestion-empleados/`: `npm test`
- **Pruebas unitarias del front-end** (Vitest vía Angular, 13 pruebas), desde `frontend/`: `ng test --watch=false`
- **Pruebas de la API**: Postman.

## Compilado

`ng build` (desde `frontend/`) genera los archivos de producción en `frontend/dist/frontend/browser/`.