/**
 * empleado.service.spec.ts - Pruebas unitarias del servicio EmpleadoService.
 * HttpTestingController simula la API: ninguna petición sale realmente a la red.
 */
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EmpleadoService } from './empleado.service';
import { Empleado } from '../models/empleado';

describe('EmpleadoService', () => {
  let service: EmpleadoService;
  let httpMock: HttpTestingController;
  const URL_API = 'http://localhost:3000/api/empleados';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()], // HTTP de prueba
    });
    service = TestBed.inject(EmpleadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Al final de cada prueba se verifica que no quedaron peticiones sin revisar
  afterEach(() => {
    httpMock.verify();
  });

  it('se crea con un empleado vacío seleccionado', () => {
    expect(service).toBeTruthy();
    expect(service.selectedEmpleado.name).toBe('');
  });

  it('getEmpleados hace un GET a la API y entrega la lista', () => {
    const lista = [new Empleado('1', 'Santiago', 'Desarrollador', 'Bogotá', 3500000)];
    let respuesta: Empleado[] = [];

    service.getEmpleados().subscribe((datos) => (respuesta = datos));

    const peticion = httpMock.expectOne(URL_API); // debe existir una petición a esa URL
    expect(peticion.request.method).toBe('GET');
    peticion.flush(lista); // la API "responde" con la lista
    expect(respuesta).toEqual(lista);
  });

  it('postEmpleado hace un POST con los datos del empleado', () => {
    const nuevo = new Empleado('', 'Laura', 'Contadora', 'Cali', 2500000);

    service.postEmpleado(nuevo).subscribe();

    const peticion = httpMock.expectOne(URL_API);
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual(nuevo);
    peticion.flush({ status: 'Empleado guardado' });
  });

  it('putEmpleado hace un PUT a la URL con el id del empleado', () => {
    const empleado = new Empleado('abc123', 'Santiago', 'Líder técnico', 'Medellín', 4800000);

    service.putEmpleado(empleado).subscribe();

    const peticion = httpMock.expectOne(`${URL_API}/abc123`);
    expect(peticion.request.method).toBe('PUT');
    peticion.flush({ status: 'Empleado actualizado' });
  });

  it('deleteEmpleado hace un DELETE a la URL con el id', () => {
    service.deleteEmpleado('abc123').subscribe();

    const peticion = httpMock.expectOne(`${URL_API}/abc123`);
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush({ status: 'Empleado eliminado' });
  });
});