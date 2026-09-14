import { useState } from 'react';
import apartamentosData from '../data/apartamentosData';
import './Apartamentos.css';

// Opciones del filtro desplegable de estado. 'Todos' es el valor inicial
// y significa "no filtrar por estado".
const ESTADOS = ['Todos', 'Disponible', 'Reservado', 'Vendido'];

// Componente Apartamentos: muestra la lista de apartamentos del proyecto
// Tabora House, con un buscador por numero y un filtro por estado.
// Es un componente de React con estado (useState) e interaccion real,
// no una copia estatica del prototipo en HTML.
function Apartamentos() {
  // Texto que el usuario escribe en el buscador (filtra por numero de apartamento).
  const [busqueda, setBusqueda] = useState('');
  // Estado elegido en el filtro desplegable ('Todos' muestra todo).
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Se vuelve a calcular en cada render, a partir del texto de busqueda
  // y del estado elegido en el filtro. No modifica el arreglo original.
  const apartamentosFiltrados = apartamentosData.filter((apto) => {
    const coincideBusqueda = apto.numero.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || apto.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="apartamentos-container">
      <header className="modulo-header">
        <div>
          <h1 className="titulo">Apartamentos</h1>
          <p className="subtitulo">Proyecto Tabora House &mdash; gestion de unidades</p>
        </div>
        {/* Boton decorativo: esta evidencia es de front-end con framework,
            no incluye la logica de creacion (eso pertenece al backend real,
            en ARKHE-software). */}
        <button className="btn-nuevo" type="button">
          + Nuevo apartamento
        </button>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="buscador"
          placeholder="Buscar por numero de apartamento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          className="filtro-estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>

      <div className="tabla-wrapper">
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Apartamento</th>
              <th>Área (m²)</th>
              <th>Habitaciones</th>
              <th>Baños</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {apartamentosFiltrados.map((apto) => (
              <tr key={apto.id}>
                <td><span className="proyecto-badge">{apto.proyecto}</span></td>
                <td><strong>{apto.numero}</strong></td>
                <td>{apto.area.toFixed(1)}</td>
                <td>{apto.habitaciones}</td>
                <td>{apto.banos}</td>
                <td>{`$${apto.precio.toLocaleString('es-CO')}`}</td>
                <td>
                  <span className={`estado-badge estado-${apto.estado.toLowerCase()}`}>
                    {apto.estado}
                  </span>
                </td>
              </tr>
            ))}

            {apartamentosFiltrados.length === 0 && (
              <tr>
                <td colSpan="7" className="sin-resultados">
                  No se encontraron apartamentos con ese criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Apartamentos;
