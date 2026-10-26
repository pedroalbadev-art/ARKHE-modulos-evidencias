/**
 * empleado.spec.ts - Pruebas unitarias del modelo Empleado (front-end).
 */
import { Empleado } from './empleado';

describe('Empleado (modelo)', () => {
  it('crea un empleado vacío con valores por defecto', () => {
    const empleado = new Empleado();

    expect(empleado._id).toBe('');
    expect(empleado.name).toBe('');
    expect(empleado.position).toBe('');
    expect(empleado.office).toBe('');
    expect(empleado.salary).toBe(0);
  });

  it('crea un empleado con los datos recibidos', () => {
    const empleado = new Empleado('abc123', 'Santiago', 'Desarrollador', 'Bogotá', 3500000);

    expect(empleado.name).toBe('Santiago');
    expect(empleado.salary).toBe(3500000);
  });
});