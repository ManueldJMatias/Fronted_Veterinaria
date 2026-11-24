import React from 'react';
import NavbarAdmin from '../navegacion/NavbarAdmin';
import SidebarAdmin from '../navegacion/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import '../../../shared/navegacion/NavegacionEstilos.css'; // Reutilizando CSS del layout base

const AdminLayout = ({ alCerrarSesion }) => {
  return (
    <div className="layout-cliente">
      <SidebarAdmin />
      <div className="contenido-principal">
        <NavbarAdmin alCerrarSesion={alCerrarSesion} />
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
