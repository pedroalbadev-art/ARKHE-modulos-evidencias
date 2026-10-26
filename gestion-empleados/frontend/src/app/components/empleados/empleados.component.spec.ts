/**
 * empleados.component.spec.ts - Pruebas unitarias del componente de registro.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgForm } from '@angular/forms';
import { EmpleadosComponent } from './empleados.component';
import { Empleado } from '../../models/empleado';

describe('EmpleadosComponent', () => {
  let fixture: ComponentFixture<EmpleadosComponent>;
  let component: EmpleadosComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable(); // espera a que el HTML se dibuje
  });

  it('se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('muestra los cuatro campos del formulario', () => {
    const campos = fixture.nativeElement.querySelectorAll('input');
    expect(campos.length).toBe(4);
  });

  it('el botón Limpiar no envía el formulario (type="button")', () => {
    const botones = fixture.nativeElement.querySelectorAll('button');
    expect(botones[0].getAttribute('type')).toBe('button'); // Limpiar
    expect(botones[1].getAttribute('type')).toBe('submit'); // Guardar
  });

  it('resetForm deja un empleado vacío en el servicio', () => {
    component.empleadoService.selectedEmpleado = new Empleado('', 'Laura', 'Contadora', 'Cali', 2500000);
    const formularioFalso = { reset: () => {} } as unknown as NgForm; // formulario simulado

    component.resetForm(formularioFalso);

    expect(component.empleadoService.selectedEmpleado.name).toBe('');
  });
});