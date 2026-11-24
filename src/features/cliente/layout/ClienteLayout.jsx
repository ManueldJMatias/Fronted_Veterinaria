import React from 'react';
import Navbar from '../navegacion/Navbar';
import Sidebar from '../navegacion/Sidebar';
import { Outlet } from 'react-router-dom';
import '../../../shared/navegacion/NavegacionEstilos.css';

const ClienteLayout = ({ alCerrarSesion }) => {
  return (
    <div className="layout-cliente">
      <Sidebar />
      <div className="contenido-principal">
        <Navbar alCerrarSesion={alCerrarSesion} />
        {/* El Outlet renderizará el componente hijo que corresponda a la ruta (ej. Dashboard) */}
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default ClienteLayout;
