import { Component } from '@angular/core';
import { EmpleadosComponent } from './components/empleados/empleados.component';

/**
 * Componente raíz de la aplicación.
 * Declara en "imports" los componentes que usa su plantilla (app.html).
 */
@Component({
  selector: 'app-root',
  imports: [EmpleadosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}