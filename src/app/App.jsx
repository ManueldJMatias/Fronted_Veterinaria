import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContenedorPadre from '../features/autenticacion/ContenedorPadre';
import ClienteLayout from '../features/cliente/layout/ClienteLayout';
import ContenedorPrincipal from '../features/cliente/dashboard/contenedorPrincipal';
import ListaMascotas from '../features/cliente/mascotas/ListaMascotas';
import ListaMedicos from '../features/cliente/directorio-medicos/ListaMedicos';
import MisCitas from '../features/cliente/citas/MisCitas';

// Modulo Compartido
import PerfilUsuario from '../shared/perfil-usuario/PerfilUsuario';

// Modulo Veterinario
import VeterinarioLayout from '../features/veterinario/layout/VeterinarioLayout';
import DashboardVeterinario from '../features/veterinario/dashboard/DashboardVeterinario';
import ExpedientesVeterinario from '../features/veterinario/expedientes/ExpedientesVeterinario';
import ListaClientes from '../features/veterinario/directorio-clientes/ListaClientes';
import AgendaVeterinario from '../features/veterinario/agenda/AgendaVeterinario';

// Modulo Admin
import AdminLayout from '../features/administracion/layout/AdminLayout';
import GestionUsuarios from '../features/administracion/usuarios/GestionUsuarios';
import DemoPage from '../features/demo/DemoPage';
import DemoGalleryLayout from '../features/demo/DemoGalleryLayout';
import CajaLayout from '../features/cajero/layout/CajaLayout';

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const manejarLoginExitoso = () => {
    setSesionIniciada(true);
  };

  const manejarCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setSesionIniciada(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública / Login */}
        <Route 
          path="/" 
          element={
            !sesionIniciada ? (
              <ContenedorPadre alIniciarSesion={manejarLoginExitoso} />
            ) : (
              <Navigate to={
                localStorage.getItem('rol') === 'ADMIN' ? '/admin/dashboard' :
                localStorage.getItem('rol') === 'VETERINARIO' ? '/veterinario/dashboard' :
                localStorage.getItem('rol') === 'CAJERO' ? '/cajero/dashboard' :
                '/cliente/dashboard'
              } replace />
            )
          } 
        />

        {/* Rutas del Módulo Cliente */}
        <Route 
          path="/cliente" 
          element={
            sesionIniciada && localStorage.getItem('rol') === 'CLIENTE' ? (
              <ClienteLayout alCerrarSesion={manejarCerrarSesion} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="dashboard" element={<ContenedorPrincipal />} />
          <Route path="mascotas" element={<ListaMascotas />} />
          <Route path="medicos" element={<ListaMedicos />} />
          <Route path="citas" element={<MisCitas />} />
          <Route path="perfil" element={<PerfilUsuario />} />
          <Route path="historial" element={<DemoPage pageId="client-history" />} />
          <Route path="vacunas" element={<DemoPage pageId="client-vaccines" />} />
          <Route path="pagos" element={<DemoPage pageId="client-payments" />} />
          <Route path="notificaciones" element={<DemoPage pageId="client-notifications" />} />
        </Route>

        {/* Rutas del Módulo Veterinario */}
        <Route 
          path="/veterinario" 
          element={
            sesionIniciada && localStorage.getItem('rol') === 'VETERINARIO' ? (
              <VeterinarioLayout alCerrarSesion={manejarCerrarSesion} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="dashboard" element={<DashboardVeterinario />} />
          <Route path="expedientes" element={<ExpedientesVeterinario />} />
          <Route path="directorio" element={<ListaClientes />} />
          <Route path="agenda" element={<AgendaVeterinario />} />
          <Route path="calendario" element={<DemoPage pageId="vet-calendar" />} />
          <Route path="soap" element={<DemoPage pageId="vet-soap" />} />
          <Route path="recetas" element={<DemoPage pageId="vet-prescriptions" />} />
          <Route path="vacunas" element={<DemoPage pageId="vet-vaccines" />} />
          <Route path="disponibilidad" element={<DemoPage pageId="vet-availability" />} />
          <Route path="historial" element={<DemoPage pageId="vet-history" />} />
          <Route path="perfil" element={<PerfilUsuario />} />
        </Route>

        {/* Rutas del Módulo Administrador */}
        <Route 
          path="/admin" 
          element={
            sesionIniciada && localStorage.getItem('rol') === 'ADMIN' ? (
              <AdminLayout alCerrarSesion={manejarCerrarSesion} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DemoPage pageId="admin-dashboard" />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="agenda" element={<AgendaVeterinario esAdmin={true} />} />
          <Route path="expedientes" element={<ExpedientesVeterinario esAdmin={true} />} />
          <Route path="medicos" element={<ListaMedicos esAdmin={true} />} />
          <Route path="personal" element={<DemoPage pageId="admin-personal" />} />
          <Route path="servicios" element={<DemoPage pageId="admin-services" />} />
          <Route path="tarifas" element={<DemoPage pageId="admin-prices" />} />
          <Route path="consultorios" element={<DemoPage pageId="admin-clinics" />} />
          <Route path="horarios" element={<DemoPage pageId="admin-schedules" />} />
          <Route path="inventario" element={<DemoPage pageId="admin-inventory" />} />
          <Route path="reportes" element={<DemoPage pageId="admin-reports" />} />
          <Route path="configuracion" element={<DemoPage pageId="admin-settings" />} />
          <Route path="perfil" element={<PerfilUsuario />} />
        </Route>

        {/* El rol cajero aún no está conectado al backend; sus pantallas son prototipos. */}
        <Route
          path="/cajero"
          element={
            sesionIniciada && localStorage.getItem('rol') === 'CAJERO' ? (
              <CajaLayout alCerrarSesion={manejarCerrarSesion} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DemoPage pageId="cashier-dashboard" />} />
          <Route path="citas" element={<DemoPage pageId="cashier-appointments" />} />
          <Route path="llegadas" element={<DemoPage pageId="cashier-checkin" />} />
          <Route path="ordenes" element={<DemoPage pageId="cashier-orders" />} />
          <Route path="punto-de-venta" element={<DemoPage pageId="cashier-pos" />} />
          <Route path="pagos" element={<DemoPage pageId="cashier-payments" />} />
          <Route path="recibos" element={<DemoPage pageId="cashier-receipts" />} />
          <Route path="facturacion" element={<DemoPage pageId="cashier-billing" />} />
        </Route>

        {import.meta.env.DEV && (
          <Route path="/demo" element={<DemoGalleryLayout />}>
            <Route index element={<Navigate to="general/admin-dashboard" replace />} />
            <Route path=":role/:moduleId" element={<DemoPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
