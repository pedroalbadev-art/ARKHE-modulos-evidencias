// Datos de prueba (mock data) del modulo Apartamentos.
//
// Este modulo es un ejercicio de evidencia (GA7-220501096-AA4-EV03) que
// demuestra el uso del framework React. No se conecta a la base de datos
// real de ARKHE (MySQL) ni al backend en Flask: el software real sigue
// siendo Python + Flask, tal como quedo definido para el proyecto ARKHE.
//
// Los datos representan el proyecto de referencia del sistema, Tabora
// House (residencial VIS de 8 apartamentos), y replican los mismos campos
// del prototipo original: arkhe_apartamentos_modulo.html (evidencia
// GA6-220501096-AA4-EV02).
const apartamentosData = [
  {
    id: 1, proyecto: 'Tabora House', numero: '101', area: 58.0, habitaciones: 2, banos: 1, precio: 135000000, estado: 'Vendido',
  },
  {
    id: 2, proyecto: 'Tabora House', numero: '102', area: 58.0, habitaciones: 2, banos: 1, precio: 135000000, estado: 'Vendido',
  },
  {
    id: 3, proyecto: 'Tabora House', numero: '103', area: 62.0, habitaciones: 2, banos: 1, precio: 142000000, estado: 'Disponible',
  },
  {
    id: 4, proyecto: 'Tabora House', numero: '104', area: 62.0, habitaciones: 2, banos: 1, precio: 142000000, estado: 'Reservado',
  },
  {
    id: 5, proyecto: 'Tabora House', numero: '201', area: 70.0, habitaciones: 3, banos: 2, precio: 158000000, estado: 'Disponible',
  },
  {
    id: 6, proyecto: 'Tabora House', numero: '202', area: 70.0, habitaciones: 3, banos: 2, precio: 158000000, estado: 'Vendido',
  },
  {
    id: 7, proyecto: 'Tabora House', numero: '203', area: 75.0, habitaciones: 3, banos: 2, precio: 165000000, estado: 'Disponible',
  },
  {
    id: 8, proyecto: 'Tabora House', numero: '204', area: 75.0, habitaciones: 3, banos: 2, precio: 165000000, estado: 'Reservado',
  },
];

export default apartamentosData;
