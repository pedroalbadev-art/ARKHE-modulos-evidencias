# Auth API - Registro e Inicio de Sesion

Evidencia **GA7-220501096-AA5-EV01** (RAP 220501096-04, actividad GA7-220501096-AA5).
Programa: Analisis y Desarrollo de Software (ADSO) - SENA.
Estudiante: Pedro Alba Mendez - Ficha 3235890.

## Que es esto

Servicio web construido con **Node.js + Express**, con dos endpoints: uno para
registrar un usuario y otro para iniciar sesion. Es un modulo aislado, aparte
del software real del proyecto ARKHE (que sigue en Python + Flask + MySQL),
construido unicamente como ejercicio de esta evidencia puntual, tal como se
acordo con el instructor para evidencias que exigen una tecnologia distinta al
stack oficial de ARKHE.

## Decisiones tecnicas

- **Almacenamiento:** un archivo `data/usuarios.json` (arreglo de usuarios),
  en vez de una base de datos como MongoDB. El instrumento de evaluacion no
  exige integracion con base de datos, asi que se opto por la opcion mas
  simple que cumple igualmente los indicadores.
- **Contrasenas cifradas:** se usa `bcryptjs` para generar un hash de la
  contrasena antes de guardarla. Nunca se guarda en texto plano.
- **Campos:** unicamente `usuario` y `contrasena`, tal como lo pide el
  enunciado de la evidencia, sin agregar campos adicionales.

## Estructura

```
auth-api-node/
├── app.js              # Configuracion del servidor Express
├── routes/
│   └── auth.js          # Rutas /registro y /login
├── data/
│   └── usuarios.json    # "Base de datos" simple en JSON
├── package.json
└── .gitignore
```

## Como ejecutarlo

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Iniciar el servidor:
   ```
   npm start
   ```
   (o `npm run dev` si se tiene nodemon, para que el servidor se reinicie
   solo al guardar cambios)
3. El servidor queda escuchando en `http://localhost:3000`.

## Endpoints (probados con Postman)

### POST /api/registro

Body (JSON):
```json
{
  "usuario": "pedro",
  "contrasena": "miClave123"
}
```

Respuesta exitosa (201):
```json
{ "mensaje": "Usuario registrado correctamente" }
```

Posibles errores: campos vacios (400), usuario ya registrado (409).

### POST /api/login

Body (JSON):
```json
{
  "usuario": "pedro",
  "contrasena": "miClave123"
}
```

Respuesta si la autenticacion es correcta (200):
```json
{ "mensaje": "Autenticacion satisfactoria" }
```

Respuesta si el usuario no existe o la contrasena no coincide (401):
```json
{ "mensaje": "Error en la autenticacion" }
```

## Control de versiones

Este modulo vive dentro del repositorio compartido `ARKHE-modulos-evidencias`
(ver `enlace_repositorio.txt` en la raiz de ese repositorio), usado
exclusivamente para evidencias que requieren una tecnologia distinta al stack
oficial de ARKHE.
