/**
 * empleado.ts - Modelo de datos del empleado en el front-end.
 * Debe coincidir con el esquema definido en el back-end (models/empleado.js).
 */
export class Empleado {
  _id: string; // con guion bajo porque el id lo genera MongoDB
  name: string;
  position: string;
  office: string;
  salary: number;

  // Constructor con valores por defecto: permite crear un empleado vacío (new Empleado())
  constructor(_id = '', name = '', position = '', office = '', salary = 0) {
    this._id = _id;
    this.name = name;
    this.position = position;
    this.office = office;
    this.salary = salary;
  }
}