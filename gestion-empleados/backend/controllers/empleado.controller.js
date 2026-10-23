/**
 * empleado.controller.js - Controlador del recurso "empleados".
 * Contiene la lógica de cada operación del CRUD. Se define como un objeto
 * con métodos y luego se exporta para usarlo en las rutas.
 */
const Empleado = require('../models/empleado'); // se requiere primero el modelo

const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
  const empleados = await Empleado.find(); // busca todos los documentos
  res.json(empleados);
};

// Crear un empleado
empleadoCtrl.createEmpleados = async (req, res) => {
  try {
    const empleado = new Empleado(req.body); // nueva instancia con los datos del cliente
    await empleado.save(); // Mongoose valida el esquema antes de guardar
    res.json({ status: 'Empleado guardado' });
  } catch (error) {
    // Si faltan campos obligatorios o el tipo no corresponde, se responde 400
    res.status(400).json({ status: 'Datos inválidos', error: error.message });
  }
};

// Conseguir un único empleado por su id
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
  const empleadoUnico = await Empleado.findById(req.params.id);
  res.json(empleadoUnico);
};

// Actualizar un empleado
empleadoCtrl.editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params; // captura el id que viene en la URL
    const empleadoEdit = {
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
    };
    // runValidators: aplica las reglas del esquema también al actualizar
    await Empleado.findByIdAndUpdate(id, { $set: empleadoEdit }, { runValidators: true });
    res.json({ status: 'Empleado actualizado' });
  } catch (error) {
    res.status(400).json({ status: 'Datos inválidos', error: error.message });
  }
};

// Eliminar un empleado
empleadoCtrl.eliminarEmpleado = async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  res.json({ status: 'Empleado eliminado' });
};

module.exports = empleadoCtrl; // se exporta el módulo