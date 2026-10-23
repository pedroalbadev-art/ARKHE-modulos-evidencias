/**
 * empleado.routes.js - Rutas del servidor para el recurso "empleados".
 * Cada ruta asocia un método HTTP con un método del controlador.
 */
const express = require('express');
const empleadoCtrl = require('../controllers/empleado.controller');

const router = express.Router();

router.get('/', empleadoCtrl.getEmpleados); // obtener todos los empleados
router.post('/', empleadoCtrl.createEmpleados); // guardar un empleado
router.get('/:id', empleadoCtrl.getUnicoEmpleado); // obtener un único empleado
router.put('/:id', empleadoCtrl.editarEmpleado); // actualizar un empleado
router.delete('/:id', empleadoCtrl.eliminarEmpleado); // eliminar un empleado

module.exports = router;