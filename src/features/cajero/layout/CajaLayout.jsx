import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../../shared/navegacion/NavegacionEstilos.css';

const enlaces = [
  { ruta: 'dashboard', etiqueta: 'Recepción y caja', marca: 'R' },
  { ruta: 'citas', etiqueta: 'Control de citas', marca: 'C' },
  { ruta: 'llegadas', etiqueta: 'Llegada de pacientes', marca: 'L' },
  { ruta: 'ordenes', etiqueta: 'Órdenes de cobro', marca: 'O' },
  { ruta: 'punto-de-venta', etiqueta: 'Punto de venta', marca: 'V' },
  { ruta: 'pagos', etiqueta: 'Historial de pagos', marca: 'P' },
  { ruta: 'recibos', etiqueta: 'Recibos', marca: 'R' },
  { ruta: 'facturacion', etiqueta: 'Facturación', marca: 'F' },
];

export default function CajaLayout({ alCerrarSesion }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    alCerrarSesion?.();
    navigate('/', { replace: true });
  };

  return (
    <div className="layout-cliente">
      <aside className="sidebar-cliente">
        <div className="sidebar-logo">
          <span className="sidebar-brand-mark" aria-hidden="true">CV</span>
          <span className="sidebar-brand-name">Clínica veterinaria</span>
        </div>
        <nav className="sidebar-menu" aria-label="Navegación de caja">
          {enlaces.map(({ ruta, etiqueta, marca }) => (
            <NavLink
              key={ruta}
              to={`/cajero/${ruta}`}
              className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            >
              <span className="cashier-menu-mark" aria-hidden="true">{marca}</span>
              <span>{etiqueta}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="contenido-principal">
        <header className="navbar-cliente cashier-topbar">
          <div className="cashier-topbar-title">
            <strong>Clínica veterinaria · Recepción</strong>
            <span>Área de caja</span>
          </div>
          <button type="button" className="cashier-logout" onClick={cerrarSesion}>Cerrar sesión</button>
        </header>
        <main><Outlet /></main>
      </div>
    </div>
  );
}
