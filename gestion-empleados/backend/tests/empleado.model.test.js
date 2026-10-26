/**
 * empleado.model.test.js - Pruebas unitarias del modelo Empleado.
 * Verifican las reglas del esquema (campos obligatorios y tipos) sin
 * conectarse a la base de datos: validate() revisa las reglas en memoria.
 */
const Empleado = require('../models/empleado');

describe('Modelo Empleado', () => {
  test('acepta un empleado con todos los campos correctos', async () => {
    // Preparar
    const empleado = new Empleado({
      name: 'Santiago',
      position: 'Desarrollador',
      office: 'Bogotá',
      salary: 3500000,
    });

    // Actuar y comprobar: si validate() encuentra errores, lanza una excepción y la prueba falla
    await empleado.validate();
  });

  test('rechaza un empleado sin datos: los cuatro campos son obligatorios', async () => {
    const empleado = new Empleado({});

    // .catch((e) => e) captura el error de validación para poder revisarlo
    const error = await empleado.validate().catch((e) => e);

    expect(error.errors.name).toBeDefined();
    expect(error.errors.position).toBeDefined();
    expect(error.errors.office).toBeDefined();
    expect(error.errors.salary).toBeDefined();
  });

  test('rechaza un salario que no es un número', async () => {
    const empleado = new Empleado({
      name: 'Laura',
      position: 'Contadora',
      office: 'Cali',
      salary: 'mucho',
    });

    const error = await empleado.validate().catch((e) => e);

    expect(error.errors.salary).toBeDefined();
  });
});