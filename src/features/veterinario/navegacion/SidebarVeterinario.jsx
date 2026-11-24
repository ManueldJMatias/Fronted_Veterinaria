import { NavLink } from 'react-router-dom';
import iconInicio from '../../../assets/iconos/casa.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
import '../../../shared/navegacion/NavegacionEstilos.css';

const enlaces = [
  { ruta: 'dashboard', etiqueta: 'Inicio', icono: iconInicio },
  { ruta: 'agenda', etiqueta: 'Agenda de citas', icono: iconCitas },
  { ruta: 'calendario', etiqueta: 'Calendario', icono: iconCitas },
  { ruta: 'expedientes', etiqueta: 'Expedientes clínicos', icono: iconMedicos },
  { ruta: 'soap', etiqueta: 'Consulta SOAP', icono: iconMascotas },
  { ruta: 'recetas', etiqueta: 'Recetas médicas', icono: iconMedicos },
  { ruta: 'vacunas', etiqueta: 'Carnet de vacunación', icono: iconMascotas },
  { ruta: 'disponibilidad', etiqueta: 'Disponibilidad', icono: iconCitas },
  { ruta: 'historial', etiqueta: 'Historial médico', icono: iconMascotas },
  { ruta: 'directorio', etiqueta: 'Clientes', icono: iconMedicos },
];

const SidebarVeterinario = () => (
  <aside className="sidebar-cliente">
    <div className="sidebar-logo">
      <span className="sidebar-brand-mark" aria-hidden="true">CV</span>
      <span className="sidebar-brand-name">Clínica veterinaria</span>
    </div>
    <nav className="sidebar-menu" aria-label="Navegación veterinaria">
      {enlaces.map(({ ruta, etiqueta, icono }) => (
        <NavLink
          key={ruta}
          to={`/veterinario/${ruta}`}
          className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
        >
          <img src={icono} alt="" className="menu-icon" />
          <span>{etiqueta}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default SidebarVeterinario;
