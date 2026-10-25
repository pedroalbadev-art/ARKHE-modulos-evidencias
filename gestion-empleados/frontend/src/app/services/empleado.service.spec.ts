/**
 * empleado.service.ts - Servicio que comunica el front-end con la API REST.
 * Define métodos reutilizables para listar, crear, editar y eliminar empleados.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root', // una sola instancia del servicio para toda la aplicación
})
export class EmpleadoService {
  selectedEmpleado: Empleado; // empleado que se está escribiendo en el formulario
  empleados: Empleado[]; // lista de empleados

  // Dirección de la API del back-end (solo lectura)
  readonly URL_API = 'http://localhost:3000/api/empleados';

  // Angular "inyecta" HttpClient, habilitado en app.config.ts con provideHttpClient()
  constructor(private http: HttpClient) {
    this.selectedEmpleado = new Empleado();
    this.empleados = [];
  }

  // GET: obtener todos los empleados
  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // POST: crear un empleado (se envían todos sus datos)
  postEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API, empleado);
  }

  // PUT: actualizar un empleado (el id va en la URL)
  putEmpleado(empleado: Empleado) {
    return this.http.put(`${this.URL_API}/${empleado._id}`, empleado);
  }

  // DELETE: eliminar un empleado (solo se necesita el id, no todo el empleado)
  deleteEmpleado(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}