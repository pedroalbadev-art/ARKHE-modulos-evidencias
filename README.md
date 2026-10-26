# ARKHE - Módulos de evidencias

Esta carpeta es un contenedor para módulos de código construidos únicamente como
evidencia académica para el programa ADSO (SENA), cuando una evidencia puntual
exige usar una tecnología distinta al stack oficial de ARKHE (Python + Flask + MySQL).

**Importante:** nada de lo que hay aquí forma parte del software real ARKHE.
El repositorio del software real es `ARKHE-software` (carpeta hermana en el Escritorio).

Cada evidencia tiene su propia subcarpeta:

- `apartamentos-react/` — GA7-220501096-AA4-EV03 (componente front-end con
  framework). Módulo Apartamentos construido en React (con Vite) como ejercicio de
  front-end puro, con datos de prueba, replicando el diseño de
  `arkhe_apartamentos_modulo.html`. No se conecta a la base de datos real de ARKHE.
- `auth-api-node/` — GA7-220501096-AA5-EV01 (registro e inicio de sesión).
  Servicio web construido con Node.js y Express, con dos endpoints
  (`/api/registro` y `/api/login`), contraseñas cifradas con bcrypt y
  persistencia simple en un archivo JSON (`data/usuarios.json`), sin conexión
  a la base de datos real de ARKHE.
- `gestion-empleados/` — GA8-220501096-AA1-EV01 (desarrollar software a partir
  de la integración de sus módulos componentes). Aplicación web completa con el
  stack MEAN (MongoDB, Express, Angular y Node.js), construida siguiendo el
  ejemplo de registro de empleados del componente formativo. Incluye API REST,
  front-end en Angular con Materialize, pruebas unitarias (Jest y Vitest) y su
  propio `README.md` con las instrucciones de ejecución. No se conecta a la base
  de datos real de ARKHE.

Política acordada con el instructor (reunión 2026-09-14): el software ARKHE se
mantiene siempre en el lenguaje/stack elegido por el equipo; cuando una evidencia
exige otra tecnología, se resuelve con un módulo aislado como los de esta carpeta,
sin migrar ni integrar nada al repositorio del software real.
