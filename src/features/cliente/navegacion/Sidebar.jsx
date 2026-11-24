import { NavLink } from 'react-router-dom';
import iconInicio from '../../../assets/iconos/casa.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
import '../../../shared/navegacion/NavegacionEstilos.css';

const enlaces = [
  { ruta: 'dashboard', etiqueta: 'Inicio', icono: iconInicio },
  { ruta: 'citas', etiqueta: 'Mis citas', icono: iconCitas },
  { ruta: 'mascotas', etiqueta: 'Mis mascotas', icono: iconMascotas },
  { ruta: 'historial', etiqueta: 'Historial clínico', icono: iconMascotas },
  { ruta: 'vacunas', etiqueta: 'Carnet de vacunas', icono: iconMascotas },
  { ruta: 'pagos', etiqueta: 'Historial de pagos', icono: iconCitas },
  { ruta: 'notificaciones', etiqueta: 'Notificaciones', icono: iconCitas },
  { ruta: 'medicos', etiqueta: 'Médicos', icono: iconMedicos },
  { ruta: 'perfil', etiqueta: 'Perfil del propietario', icono: iconMedicos },
];

const Sidebar = () => (
  <aside className="sidebar-cliente">
    <div className="sidebar-logo">
      <span className="sidebar-brand-mark" aria-hidden="true">CV</span>
      <span className="sidebar-brand-name">Clínica veterinaria</span>
    </div>
    <nav className="sidebar-menu" aria-label="Navegación de cliente">
      {enlaces.map(({ ruta, etiqueta, icono }) => (
        <NavLink
          key={ruta}
          to={`/cliente/${ruta}`}
          className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
        >
          <img src={icono} alt="" className="menu-icon" />
          <span>{etiqueta}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
