/**
 * empleado.js - Modelo de datos del empleado.
 * Define con Mongoose la estructura (esquema) que tendrá cada empleado
 * guardado en la base de datos MongoDB.
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmpleadoSchema = new Schema({
  name: { type: String, required: true }, // nombre del empleado
  position: { type: String, required: true }, // cargo
  office: { type: String, required: true }, // lugar de trabajo
  salary: { type: Number, required: true }, // salario
});

// Se crea el modelo "Empleado" a partir del esquema y se exporta
module.exports = mongoose.model('Empleado', EmpleadoSchema);