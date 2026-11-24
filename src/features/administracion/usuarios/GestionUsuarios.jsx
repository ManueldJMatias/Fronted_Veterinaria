import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DetallesUsuarioModal from './DetallesUsuarioModal';
import { clienteService, veterinarioService } from '../../../services/api';
import iconOjo from '../../../assets/iconos/ojo.svg';
import iconBasura from '../../../assets/iconos/barra-de-basura.svg';
import './GestionUsuariosEstilos.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    
    // Estados para el Modal de Detalles
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {
        const cargarUsuariosAPI = async () => {
            try {
                const [clientes, veterinarios] = await Promise.all([
                    clienteService.obtenerTodos().catch(() => []),
                    veterinarioService.obtenerVeterinarios().catch(() => [])
                ]);

                const listaClientesMapeados = (clientes || []).map(c => ({
                    id: c.idCliente || c.id,
                    nombre: c.nombre,
                    apellido: c.apPaterno || '',
                    correo: c.correoElectronico || c.correo,
                    rol: 'Cliente',
                    fechaRegistro: '2026-07-01',
                    mascotas: c.mascotas || []
                }));

                const listaVetsMapeados = (veterinarios || []).map(v => ({
                    id: v.idVeterinario || v.id,
                    nombre: v.nombre,
                    apellido: v.apPaterno || '',
                    correo: v.correoElectronico || v.correo,
                    rol: 'Veterinario',
                    fechaRegistro: '2026-06-01',
                    especialidad: v.especialidad,
                    cedula: v.cedula,
                    horarios: v.horarios || []
                }));

                const listaCombinada = [...listaVetsMapeados, ...listaClientesMapeados];
                if (listaCombinada.length > 0) {
                    setUsuarios(listaCombinada);
                }
            } catch (err) {
                console.error("Error al obtener usuarios backend:", err);
                setUsuarios([]);
            }
        };

        cargarUsuariosAPI();
    }, []);

    const eliminarUsuario = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará al usuario permanentemente y todos sus registros asociados.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff3b30',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Usar prevUsuarios para asegurar el estado más reciente y forzar a String ambos IDs para evitar bugs de tipos
                setUsuarios(prevUsuarios => prevUsuarios.filter(u => String(u.id) !== String(id)));
                Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido dado de baja del sistema.',
                    'success'
                );
            }
        });
    };

    const verDetalles = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalAbierto(true);
    };

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(u => {
        const coincideBusqueda = 
            u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
            u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.correo.toLowerCase().includes(busqueda.toLowerCase());
        
        const coincideRol = filtroRol ? u.rol.toLowerCase() === filtroRol.toLowerCase() : true;
        
        return coincideBusqueda && coincideRol;
    });

    return (
        <div className="contenedorUsuarios">
            <section className="heroUsuarios">
                <div className="heroUsuariosContenido">
                    <span className="heroUsuariosEtiqueta">Administración de la clínica</span>
                    <h2 className="tituloUsuarios">Gestión de usuarios</h2>
                    <p className="subtituloUsuarios">
                        Administra clientes y veterinarios desde un solo lugar.
                    </p>
                </div>
                <div className="heroUsuariosSello" aria-hidden="true">
                    <span className="heroUsuariosInicial">M</span>
                    <span className="heroUsuariosSelloTexto">Cuidado<br />conectado</span>
                </div>
            </section>

            <section className="resumenUsuarios" aria-label="Resumen de usuarios">
                <article className="tarjetaResumenUsuarios resumenTotal">
                    <span className="resumenEtiqueta">Personal de la clínica</span>
                    <strong>{usuarios.length}</strong>
                    <span className="resumenDetalle">Perfiles registrados</span>
                </article>
                <article className="tarjetaResumenUsuarios resumenClientes">
                    <span className="resumenEtiqueta">Clientes</span>
                    <strong>{usuarios.filter(usuario => usuario.rol === 'Cliente').length}</strong>
                    <span className="resumenDetalle">Familias y mascotas</span>
                </article>
                <article className="tarjetaResumenUsuarios resumenVeterinarios">
                    <span className="resumenEtiqueta">Veterinarios</span>
                    <strong>{usuarios.filter(usuario => usuario.rol === 'Veterinario').length}</strong>
                    <span className="resumenDetalle">Profesionales registrados</span>
                </article>
            </section>

            <section className="panelUsuarios">
                <div className="panelUsuariosCabecera">
                    <div>
                        <span className="panelUsuariosSobrelinea">Directorio</span>
                        <h3>Personas en el sistema</h3>
                    </div>
                    <span className="contadorUsuarios">
                        {usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? 'resultado' : 'resultados'}
                    </span>
                </div>

                <div className="barraHerramientasUsuarios">
                    <label className="buscadorUsuariosContenedor">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m16 16 4 4" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar nombre o correo..."
                            className="buscadorUsuarios"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </label>
                    <label className="filtroUsuarios">
                        <span>Filtrar por rol</span>
                        <select
                            className="selectFiltroUsuarios"
                            value={filtroRol}
                            onChange={(e) => setFiltroRol(e.target.value)}
                        >
                            <option value="">Todos los roles</option>
                            <option value="Cliente">Clientes</option>
                            <option value="Veterinario">Veterinarios</option>
                            <option value="Admin">Administradores</option>
                        </select>
                    </label>
                </div>

                <div className="tablaUsuariosContenedor">
                    <table className="tablaUsuarios">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Fecha de registro</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map(usuario => (
                                    <tr key={`${usuario.rol}-${usuario.id}`}>
                                        <td>
                                            <div className="identidadUsuario">
                                                <span className={`avatarUsuario ${usuario.rol.toLowerCase()}`}>
                                                    {usuario.nombre.charAt(0).toUpperCase()}
                                                </span>
                                                <span className="datosIdentidadUsuario">
                                                    <span className="nombreUsuario">
                                                        {usuario.nombre} {usuario.apellido}
                                                    </span>
                                                    <span className="correoUsuario">{usuario.correo}</span>
                                                    <span className="idUsuario">
                                                        #{usuario.rol === 'Veterinario' ? 'VET' : 'CLI'}-{usuario.id}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badgeRol ${usuario.rol.toLowerCase()}`}>
                                                <span className="puntoRol" />
                                                {usuario.rol}
                                            </span>
                                        </td>
                                        <td><span className="fechaUsuario">{usuario.fechaRegistro}</span></td>
                                        <td>
                                            {usuario.rol !== 'Admin' && (
                                                <div className="accionesUsuario">
                                                    <button
                                                        className="btnAccionUsuario ver"
                                                        title="Ver detalles"
                                                        aria-label={`Ver detalles de ${usuario.nombre}`}
                                                        onClick={() => verDetalles(usuario)}
                                                    >
                                                        <img src={iconOjo} alt="" className="icono-accion-admin" />
                                                    </button>
                                                    <button
                                                        className="btnAccionUsuario eliminar"
                                                        title="Eliminar usuario"
                                                        aria-label={`Eliminar a ${usuario.nombre}`}
                                                        onClick={() => eliminarUsuario(usuario.id)}
                                                    >
                                                        <img src={iconBasura} alt="" className="icono-accion-admin" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="td-vacio-admin">
                                        <span className="vacioIcono" aria-hidden="true">?</span>
                                        <strong>No encontramos usuarios</strong>
                                        <span>Prueba con otro nombre, correo o rol.</span>
                                        <button
                                            type="button"
                                            className="limpiarFiltrosUsuarios"
                                            onClick={() => {
                                                setBusqueda('');
                                                setFiltroRol('');
                                            }}
                                        >
                                            Limpiar filtros
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <DetallesUsuarioModal 
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                usuario={usuarioSeleccionado}
            />
        </div>
    );
};

export default GestionUsuarios;
