import { NavLink } from 'react-router-dom';
import iconInicio from '../../../assets/iconos/casa.png';
import iconUsuarios from '../../../assets/iconos/usuario.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
import '../../../shared/navegacion/NavegacionEstilos.css';

const enlaces = [
  { ruta: 'dashboard', etiqueta: 'Dashboard', icono: iconInicio },
  { ruta: 'usuarios', etiqueta: 'Gestión de usuarios', icono: iconUsuarios },
  { ruta: 'agenda', etiqueta: 'Agenda global', icono: iconCitas },
  { ruta: 'expedientes', etiqueta: 'Expedientes', icono: iconMascotas },
  { ruta: 'medicos', etiqueta: 'Veterinarios', icono: iconMedicos },
  { ruta: 'personal', etiqueta: 'Personal', icono: iconUsuarios },
  { ruta: 'servicios', etiqueta: 'Servicios', icono: iconCitas },
  { ruta: 'tarifas', etiqueta: 'Tarifas y precios', icono: iconCitas },
  { ruta: 'consultorios', etiqueta: 'Consultorios', icono: iconMascotas },
  { ruta: 'horarios', etiqueta: 'Horarios', icono: iconCitas },
  { ruta: 'inventario', etiqueta: 'Inventario', icono: iconMascotas },
  { ruta: 'reportes', etiqueta: 'Reportes', icono: iconInicio },
  { ruta: 'configuracion', etiqueta: 'Configuración', icono: iconInicio },
];

const SidebarAdmin = () => (
  <aside className="sidebar-cliente">
    <div className="sidebar-logo">
      <span className="sidebar-brand-mark" aria-hidden="true">CV</span>
      <span className="sidebar-brand-name">Clínica veterinaria</span>
    </div>
    <nav className="sidebar-menu" aria-label="Navegación de administración">
      {enlaces.map(({ ruta, etiqueta, icono }) => (
        <NavLink
          key={ruta}
          to={`/admin/${ruta}`}
          className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
        >
          <img src={icono} alt="" className="menu-icon" />
          <span>{etiqueta}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default SidebarAdmin;
