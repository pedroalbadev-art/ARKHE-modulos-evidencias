// app.js
// Servicio web de Registro e Inicio de Sesion - Evidencia GA7-220501096-AA5-EV01
//
// Se importa la libreria de Express, tal como se explico en el componente
// formativo "Construccion API", para crear el servidor y definir las rutas
// del servicio.
const express = require('express');

// Se importan las rutas de autenticacion (registro e inicio de sesion),
// separadas en su propio archivo (routes/auth.js) para mantener el codigo
// organizado, tal como se vio en el material con el archivo post.js.
const authRoutes = require('./routes/auth');

// Se crea la instancia de la aplicacion Express.
const app = express();

// Puerto por donde va a escuchar el servidor. Se usa una variable de entorno
// si existe (process.env.PORT), y si no, se usa el puerto 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Middleware que convierte automaticamente el body de las peticiones que
// llegan en formato JSON a un objeto de JavaScript disponible en req.body.
// En versiones actuales de Express ya no es necesario instalar el paquete
// "body-parser" por separado, como se hacia en el material de formacion:
// express.json() cumple exactamente la misma funcion.
app.use(express.json());

// Se monta el router de autenticacion bajo el prefijo "/api".
// Esto define las rutas finales que se probaran con Postman:
//   POST /api/registro
//   POST /api/login
app.use('/api', authRoutes);

// Ruta de prueba por defecto (GET), solo para confirmar que el servidor
// esta activo al abrirlo desde el navegador.
app.get('/', (req, res) => {
  res.send('API de Registro e Inicio de Sesion - funcionando correctamente');
});

// Se inicia el servidor y queda escuchando peticiones en el puerto configurado.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
