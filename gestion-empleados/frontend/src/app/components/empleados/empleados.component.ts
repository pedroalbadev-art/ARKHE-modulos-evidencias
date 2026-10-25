/**
 * empleados.component.ts - Lógica del componente de registro de empleados.
 * Usa el servicio EmpleadoService para enviar los datos del formulario a la API.
 */
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

// M es el objeto global de Materialize (cargado por CDN en index.html), usado para el Toast
declare const M: any;

@Component({
  selector: 'app-empleados',
  imports: [FormsModule], // necesario para usar ngModel y ngForm en el formulario
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  // Se inyecta el servicio; es "public" para poder usarlo desde el HTML
  constructor(public empleadoService: EmpleadoService) {}

  // Envía los datos del formulario a la API para guardar un nuevo empleado
  agregarEmpleado(form: NgForm) {
    this.empleadoService.postEmpleado(form.value).subscribe({
      next: () => {
        this.resetForm(form);
        M.toast({ html: 'Guardado satisfactoriamente' });
      },
      error: () => {
        M.toast({ html: 'Error: revise que todos los campos estén completos' });
      },
    });
  }

  // Limpia el formulario y deja un empleado vacío en el servicio
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
    }
  }
}