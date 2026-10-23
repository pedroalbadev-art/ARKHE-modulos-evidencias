/**
 * index.js - Archivo principal del back-end.
 * Configura el servidor Express, sus middlewares y sus rutas.
 * Se crea una API REST: la forma de que el servidor reciba y envíe datos.
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express(); // la constante app tiene todo el funcionamiento del servidor

// Conexión a la base de datos (se activa en la sección 1.4)
require('./database');

// ---------- Configuraciones ----------
// Usa el puerto que asigne el entorno (por ejemplo, un servicio en la nube) o el 3000
app.set('port', process.env.PORT || 3000);

// ---------- Middlewares ----------
app.use(morgan('dev')); // muestra en consola cada petición que llega
app.use(express.json()); // convierte el JSON que envía el cliente en un objeto que el servidor entiende
app.use(cors({ origin: 'http://localhost:4200' })); // permite la comunicación con el cliente Angular

// ---------- Rutas del servidor ----------
app.use('/api/empleados', require('./routes/empleado.routes'));

// ---------- Inicio del servidor ----------
app.listen(app.get('port'), () => {
  console.log('Server activo en el puerto', app.get('port'));
});