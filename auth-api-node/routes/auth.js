// routes/auth.js
// Rutas del servicio de autenticacion: registro (/registro) e inicio de
// sesion (/login).
//
// Se usa la clase express.Router() para crear un manejador de rutas modular
// y montable, tal como se explico en el material de formacion (Express, 2021):
// permite agrupar estas dos rutas en su propio archivo en vez de mezclarlas
// con la configuracion general del servidor en app.js.
const express = require('express');

const router = express.Router();

// bcryptjs se usa para "hashear" (cifrar de un solo sentido) las contrasenas
// antes de guardarlas. Nunca se guarda la contrasena en texto plano: es una
// buena practica de seguridad basica en cualquier servicio de autenticacion.
const bcrypt = require('bcryptjs');

// Modulos nativos de Node.js para trabajar con archivos y con rutas del
// sistema operativo. Se usa la version "promises" de fs para poder usar
// async/await, tal como se explico en el material (Mozilla, 2021): las
// funciones async devuelven una promesa y await pausa la ejecucion hasta
// que esa promesa se resuelve, sin bloquear el resto del servidor.
const fs = require('fs').promises;
const path = require('path');

// Ruta del archivo JSON que funciona como almacenamiento simple para esta
// evidencia: un arreglo con los usuarios ya registrados.
const RUTA_ARCHIVO = path.join(__dirname, '..', 'data', 'usuarios.json');

// Numero de "salt rounds" que usa bcrypt al generar el hash: entre mas alto,
// mas seguro mas pero lento. 10 es un valor estandar para ejercicios de este
// tipo.
const SALT_ROUNDS = 10;

// Funcion auxiliar: lee el archivo usuarios.json y devuelve su contenido ya
// convertido de texto JSON a un arreglo de JavaScript.
async function leerUsuarios() {
  const contenido = await fs.readFile(RUTA_ARCHIVO, 'utf-8');
  return JSON.parse(contenido);
}

// Funcion auxiliar: recibe el arreglo de usuarios ya actualizado y lo
// vuelve a guardar en el archivo usuarios.json (sobrescribiendo el anterior).
async function guardarUsuarios(usuarios) {
  await fs.writeFile(RUTA_ARCHIVO, JSON.stringify(usuarios, null, 2), 'utf-8');
}

// POST /api/registro
// Recibe { usuario, contrasena } en el body de la peticion (en formato
// JSON) y crea un nuevo registro si los datos son validos.
router.post('/registro', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validacion 1: ambos campos son obligatorios y no pueden venir vacios.
    if (!usuario || !contrasena || usuario.trim() === '' || contrasena.trim() === '') {
      return res.status(400).json({ mensaje: 'Usuario y contrasena son obligatorios' });
    }

    const usuarios = await leerUsuarios();

    // Validacion 2: no se permite registrar dos veces el mismo usuario.
    const yaExiste = usuarios.some(
      (u) => u.usuario.toLowerCase() === usuario.trim().toLowerCase(),
    );
    if (yaExiste) {
      return res.status(409).json({ mensaje: 'El usuario ya se encuentra registrado' });
    }

    // La contrasena nunca se guarda en texto plano: se genera su hash con bcrypt.
    const contrasenaHasheada = await bcrypt.hash(contrasena, SALT_ROUNDS);

    // Se agrega el nuevo usuario al arreglo y se guarda en el archivo JSON.
    usuarios.push({ usuario: usuario.trim(), contrasena: contrasenaHasheada });
    await guardarUsuarios(usuarios);

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    // Manejo de errores: se captura cualquier fallo inesperado (por ejemplo,
    // un problema leyendo o escribiendo el archivo) y se informa con un
    // mensaje claro, en vez de dejar que el servidor termine de forma abrupta.
    console.error('Error en /registro:', error);
    return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
  }
});

// POST /api/login
// Recibe { usuario, contrasena } y valida las credenciales contra el
// archivo usuarios.json.
router.post('/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Validacion: ambos campos son obligatorios.
    if (!usuario || !contrasena) {
      return res.status(400).json({ mensaje: 'Usuario y contrasena son obligatorios' });
    }

    const usuarios = await leerUsuarios();

    // Se busca el usuario dentro del arreglo.
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario.toLowerCase() === usuario.trim().toLowerCase(),
    );

    // Si el usuario no existe, se responde con error de autenticacion.
    // Por seguridad no se especifica si el problema fue el usuario o la
    // contrasena: solo se informa que la autenticacion fallo.
    if (!usuarioEncontrado) {
      return res.status(401).json({ mensaje: 'Error en la autenticacion' });
    }

    // Se compara la contrasena recibida contra el hash guardado.
    // bcrypt.compare hashea internamente el valor recibido y lo compara
    // contra el hash guardado; en ningun momento se "desencripta" ese hash.
    const coincide = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

    if (!coincide) {
      return res.status(401).json({ mensaje: 'Error en la autenticacion' });
    }

    return res.status(200).json({ mensaje: 'Autenticacion satisfactoria' });
  } catch (error) {
    console.error('Error en /login:', error);
    return res.status(500).json({ mensaje: 'Error interno al iniciar sesion' });
  }
});

module.exports = router;
