/**
 * empleado.controller.test.js - Pruebas unitarias del controlador de empleados.
 * El modelo Empleado se reemplaza por un "mock" (simulacro), así las pruebas
 * verifican solo la lógica del controlador, sin conectarse a MongoDB.
 */

// Se reemplaza el modelo real por uno falso con las mismas funciones
jest.mock('../models/empleado', () => {
  const Empleado = jest.fn(); // el "new Empleado(...)" también es falso
  Empleado.find = jest.fn();
  Empleado.findById = jest.fn();
  Empleado.findByIdAndUpdate = jest.fn();
  Empleado.findByIdAndDelete = jest.fn();
  return Empleado;
});

const Empleado = require('../models/empleado');
const empleadoCtrl = require('../controllers/empleado.controller');

// Crea una respuesta (res) falsa que registra cómo la usa el controlador
const crearRespuesta = () => {
  const res = {};
  res.json = jest.fn();
  res.status = jest.fn().mockReturnValue(res); // permite encadenar res.status(400).json(...)
  return res;
};

describe('Controlador de empleados', () => {
  // Antes de cada prueba se limpian los registros de las funciones falsas
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getEmpleados responde con la lista de empleados', async () => {
    // Preparar
    const lista = [{ name: 'Santiago' }, { name: 'María Isabel' }];
    Empleado.find.mockResolvedValue(lista); // find() "devolverá" esta lista
    const res = crearRespuesta();

    // Actuar
    await empleadoCtrl.getEmpleados({}, res);

    // Comprobar
    expect(Empleado.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(lista);
  });

  test('createEmpleados guarda el empleado y confirma', async () => {
    const guardar = jest.fn().mockResolvedValue();
    Empleado.mockImplementation(() => ({ save: guardar })); // new Empleado() devuelve un objeto con save()
    const req = { body: { name: 'Laura', position: 'Contadora', office: 'Cali', salary: 2500000 } };
    const res = crearRespuesta();

    await empleadoCtrl.createEmpleados(req, res);

    expect(Empleado).toHaveBeenCalledWith(req.body);
    expect(guardar).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado guardado' });
  });

  test('createEmpleados responde 400 si los datos no son válidos', async () => {
    const guardar = jest.fn().mockRejectedValue(new Error('name is required')); // save() "falla"
    Empleado.mockImplementation(() => ({ save: guardar }));
    const res = crearRespuesta();

    await empleadoCtrl.createEmpleados({ body: {} }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: 'Datos inválidos', error: 'name is required' });
  });

  test('getUnicoEmpleado busca por el id de la URL', async () => {
    const empleado = { _id: 'abc123', name: 'Santiago' };
    Empleado.findById.mockResolvedValue(empleado);
    const res = crearRespuesta();

    await empleadoCtrl.getUnicoEmpleado({ params: { id: 'abc123' } }, res);

    expect(Empleado.findById).toHaveBeenCalledWith('abc123');
    expect(res.json).toHaveBeenCalledWith(empleado);
  });

  test('editarEmpleado actualiza aplicando las validaciones del esquema', async () => {
    Empleado.findByIdAndUpdate.mockResolvedValue({});
    const req = {
      params: { id: 'abc123' },
      body: { name: 'Santiago', position: 'Líder técnico', office: 'Medellín', salary: 4800000 },
    };
    const res = crearRespuesta();

    await empleadoCtrl.editarEmpleado(req, res);

    expect(Empleado.findByIdAndUpdate).toHaveBeenCalledWith(
      'abc123',
      { $set: req.body },
      { runValidators: true },
    );
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado actualizado' });
  });

  test('eliminarEmpleado borra por el id de la URL', async () => {
    Empleado.findByIdAndDelete.mockResolvedValue({});
    const res = crearRespuesta();

    await empleadoCtrl.eliminarEmpleado({ params: { id: 'abc123' } }, res);

    expect(Empleado.findByIdAndDelete).toHaveBeenCalledWith('abc123');
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado eliminado' });
  });
});