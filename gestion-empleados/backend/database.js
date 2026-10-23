/**
 * database.js - Conexión del back-end con la base de datos MongoDB.
 * Usa Mongoose para conectarse y, más adelante, para definir los esquemas de datos.
 */
const mongoose = require('mongoose');

// Dirección de la base de datos: servidor local (puerto 27017), base de datos "empleados"
const URI = 'mongodb://127.0.0.1:27017/empleados';

// connect devuelve una promesa: "then" se ejecuta si conecta, "catch" si falla
mongoose.connect(URI)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.error(err));

// Se exporta porque la conexión se usa en toda la aplicación
module.exports = mongoose;