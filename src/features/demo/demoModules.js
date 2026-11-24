const table = (role, title, description, columns, rows, fields, metrics = []) => ({
    role,
    title,
    description,
    kind: 'table',
    columns,
    rows,
    fields,
    metrics,
});

const dashboard = (role, title, description, metrics, chartTitle, chart, activity, report = {}) => ({
    role,
    title,
    description,
    kind: 'dashboard',
    metrics,
    chartTitle,
    chart,
    activity,
    ...report,
});

export const demoModules = {
    'admin-dashboard': dashboard(
        'Administrador',
        'Panel de control',
        'Resumen general de la clínica y sus operaciones.',
        [
            { label: 'Citas para hoy', value: '28', change: '+12%', tone: 'teal' },
            { label: 'Pacientes atendidos', value: '19', change: '68% de la agenda', tone: 'coral' },
            { label: 'Ingresos del mes', value: '$84,250', change: '+8.4%', tone: 'green' },
            { label: 'Personal activo', value: '14', change: 'En 2 consultorios', tone: 'blue' },
        ],
        'Actividad de la clínica',
        [
            { label: 'Lun', value: 44 },
            { label: 'Mar', value: 68 },
            { label: 'Mié', value: 54 },
            { label: 'Jue', value: 78 },
            { label: 'Vie', value: 62 },
            { label: 'Sáb', value: 91 },
            { label: 'Dom', value: 37 },
        ],
        [
            { title: 'Nueva cita confirmada', detail: 'Luna · Consulta general', time: 'Hace 12 min', tone: 'teal' },
            { title: 'Inventario por agotarse', detail: 'Vacuna antirrábica · 4 unidades', time: 'Hace 38 min', tone: 'coral' },
            { title: 'Pago recibido', detail: 'Orden #ORD-2048 · $680.00', time: 'Hace 1 h', tone: 'green' },
        ],
    ),
    'admin-personal': table(
        'Administrador',
        'Personal de la clínica',
        'Directorio de profesionales y colaboradores. Datos de muestra.',
        [
            { key: 'nombre', label: 'Nombre' }, { key: 'puesto', label: 'Puesto' },
            { key: 'correo', label: 'Correo' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { nombre: 'Dra. Beatriz Jiménez', puesto: 'Veterinaria', correo: 'beatriz@clinica.demo', estado: 'Activo' },
            { nombre: 'Laura Mendoza', puesto: 'Recepción', correo: 'laura@clinica.demo', estado: 'Activo' },
            { nombre: 'Carlos Ruiz', puesto: 'Cajero', correo: 'carlos@clinica.demo', estado: 'Activo' },
        ],
        [{ name: 'nombre', label: 'Nombre completo' }, { name: 'puesto', label: 'Puesto' }, { name: 'correo', label: 'Correo' }],
        [{ label: 'Personal activo', value: '14' }, { label: 'Veterinarios', value: '8' }, { label: 'Recepción y caja', value: '6' }],
    ),
    'admin-services': table(
        'Administrador',
        'Servicios veterinarios',
        'Catálogo de servicios disponibles en la clínica.',
        [
            { key: 'servicio', label: 'Servicio' }, { key: 'categoria', label: 'Categoría' },
            { key: 'duracion', label: 'Duración' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { servicio: 'Consulta general', categoria: 'Consulta', duracion: '30 min', estado: 'Activo' },
            { servicio: 'Vacunación', categoria: 'Prevención', duracion: '20 min', estado: 'Activo' },
            { servicio: 'Limpieza dental', categoria: 'Procedimiento', duracion: '60 min', estado: 'Activo' },
        ],
        [{ name: 'servicio', label: 'Nombre del servicio' }, { name: 'categoria', label: 'Categoría' }, { name: 'duracion', label: 'Duración estimada' }],
        [{ label: 'Servicios activos', value: '18' }, { label: 'Categorías', value: '6' }, { label: 'Más solicitado', value: 'Consulta' }],
    ),
    'admin-prices': table(
        'Administrador',
        'Tarifas y precios',
        'Consulta y administra los precios de los servicios.',
        [
            { key: 'servicio', label: 'Servicio' }, { key: 'categoria', label: 'Categoría' },
            { key: 'precio', label: 'Precio' }, { key: 'vigencia', label: 'Vigencia' },
        ],
        [
            { servicio: 'Consulta general', categoria: 'Consulta', precio: '$450.00', vigencia: '01 jun 2026' },
            { servicio: 'Vacuna antirrábica', categoria: 'Prevención', precio: '$250.00', vigencia: '01 jun 2026' },
            { servicio: 'Baño y corte', categoria: 'Estética', precio: '$500.00', vigencia: '01 jun 2026' },
        ],
        [{ name: 'servicio', label: 'Servicio' }, { name: 'categoria', label: 'Categoría' }, { name: 'precio', label: 'Precio', type: 'number' }],
        [{ label: 'Servicios con tarifa', value: '18' }, { label: 'Última actualización', value: '01 jun 2026' }, { label: 'Moneda', value: 'MXN' }],
    ),
    'admin-clinics': table(
        'Administrador',
        'Consultorios',
        'Espacios, capacidad y disponibilidad de la clínica.',
        [
            { key: 'nombre', label: 'Consultorio' }, { key: 'responsable', label: 'Responsable' },
            { key: 'ubicacion', label: 'Ubicación' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { nombre: 'Consultorio 1', responsable: 'Dra. Beatriz Jiménez', ubicacion: 'Planta baja', estado: 'Disponible' },
            { nombre: 'Consultorio 2', responsable: 'Dr. Alejandro Fernández', ubicacion: 'Planta baja', estado: 'En uso' },
            { nombre: 'Área de vacunación', responsable: 'Equipo clínico', ubicacion: 'Planta alta', estado: 'Disponible' },
        ],
        [{ name: 'nombre', label: 'Nombre del espacio' }, { name: 'responsable', label: 'Responsable' }, { name: 'ubicacion', label: 'Ubicación' }],
        [{ label: 'Espacios activos', value: '4' }, { label: 'Disponibles ahora', value: '2' }, { label: 'En uso', value: '2' }],
    ),
    'admin-schedules': table(
        'Administrador',
        'Horarios y disponibilidad',
        'Vista demostrativa de la disponibilidad del personal.',
        [
            { key: 'profesional', label: 'Profesional' }, { key: 'dia', label: 'Día' },
            { key: 'horario', label: 'Horario' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { profesional: 'Dra. Beatriz Jiménez', dia: 'Lunes', horario: '10:00–18:00', estado: 'Confirmado' },
            { profesional: 'Dr. Alejandro Fernández', dia: 'Martes', horario: '09:00–17:00', estado: 'Confirmado' },
            { profesional: 'Dra. Carmen Ríos', dia: 'Miércoles', horario: '09:00–15:00', estado: 'Pendiente' },
        ],
        [{ name: 'profesional', label: 'Profesional' }, { name: 'dia', label: 'Día' }, { name: 'horario', label: 'Horario' }],
        [{ label: 'Turnos publicados', value: '36' }, { label: 'Solicitudes pendientes', value: '3' }, { label: 'Cobertura semanal', value: '92%' }],
    ),
    'admin-inventory': table(
        'Administrador',
        'Inventario',
        'Control demostrativo de insumos y existencias.',
        [
            { key: 'producto', label: 'Producto' }, { key: 'categoria', label: 'Categoría' },
            { key: 'existencia', label: 'Existencia' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { producto: 'Vacuna antirrábica', categoria: 'Vacunas', existencia: '4 unidades', estado: 'Por agotarse' },
            { producto: 'Guantes de nitrilo', categoria: 'Material', existencia: '120 unidades', estado: 'Disponible' },
            { producto: 'Antiparasitario canino', categoria: 'Medicamentos', existencia: '18 unidades', estado: 'Disponible' },
        ],
        [{ name: 'producto', label: 'Producto' }, { name: 'categoria', label: 'Categoría' }, { name: 'existencia', label: 'Existencia', type: 'number' }],
        [{ label: 'Productos registrados', value: '126' }, { label: 'Por reabastecer', value: '7' }, { label: 'Categorías', value: '9' }],
    ),
    'admin-reports': dashboard(
        'Administrador',
        'Reportes y estadísticas',
        'Indicadores de ejemplo para revisar el desempeño de la clínica.',
        [
            { label: 'Ingresos del mes', value: '$84,250', change: '+8.4%', tone: 'green' },
            { label: 'Citas completadas', value: '186', change: '+14%', tone: 'teal' },
            { label: 'Cancelaciones', value: '8', change: '−2.1%', tone: 'coral' },
            { label: 'Nuevos clientes', value: '32', change: '+6.8%', tone: 'blue' },
        ],
        'Ingresos por semana',
        [
            { label: 'Sem 1', value: 52, displayValue: '$12.5k' }, { label: 'Sem 2', value: 68, displayValue: '$16.2k' },
            { label: 'Sem 3', value: 61, displayValue: '$14.8k' }, { label: 'Sem 4', value: 88, displayValue: '$21.6k' },
        ],
        [
            { title: 'Servicio más solicitado', detail: 'Consulta general · 74 citas', time: 'Este mes', tone: 'teal' },
            { title: 'Mayor ingreso', detail: 'Medicina preventiva · $21,600', time: 'Este mes', tone: 'green' },
            { title: 'Ocupación de agenda', detail: 'Promedio de 82% semanal', time: 'Este mes', tone: 'coral' },
        ],
        {
            columns: [
                { key: 'periodo', label: 'Periodo' }, { key: 'ingresos', label: 'Ingresos' },
                { key: 'citas', label: 'Citas completadas' },
            ],
            rows: [
                { periodo: 'Semana 1', ingresos: '$12,500', citas: '42' },
                { periodo: 'Semana 2', ingresos: '$16,200', citas: '48' },
                { periodo: 'Semana 3', ingresos: '$14,800', citas: '44' },
                { periodo: 'Semana 4', ingresos: '$21,600', citas: '52' },
            ],
        },
    ),
    'admin-settings': {
        role: 'Administrador',
        title: 'Configuración del sistema',
        description: 'Preferencias generales de la clínica. Los cambios son solo de demostración.',
        kind: 'settings',
        settings: [
            { title: 'Confirmación de citas', description: 'Solicitar confirmación antes de cerrar una reserva.', enabled: true },
            { title: 'Avisos de inventario', description: 'Mostrar alertas de insumos próximos a agotarse.', enabled: true },
            { title: 'Recordatorios por correo', description: 'Enviar recordatorios antes de una cita.', enabled: false },
            { title: 'Modo de recepción', description: 'Mostrar accesos rápidos para el personal de recepción.', enabled: true },
        ],
    },
    'vet-calendar': {
        role: 'Veterinario',
        title: 'Calendario de consultas',
        description: 'Agenda semanal de ejemplo para visualizar pacientes y horarios.',
        kind: 'calendar',
        columns: [
            { key: 'dia', label: 'Día' }, { key: 'hora', label: 'Hora' }, { key: 'mascota', label: 'Paciente' },
            { key: 'servicio', label: 'Motivo' }, { key: 'estado', label: 'Estado' },
        ],
        rows: [
            { dia: 'Lunes', hora: '09:00', mascota: 'Simitrio · Perro', servicio: 'Consulta general', estado: 'Confirmada' },
            { dia: 'Lunes', hora: '11:30', mascota: 'Luna · Gata', servicio: 'Vacunación', estado: 'Confirmada' },
            { dia: 'Martes', hora: '10:00', mascota: 'Rocco · Perro', servicio: 'Revisión dermatológica', estado: 'Pendiente' },
            { dia: 'Miércoles', hora: '13:00', mascota: 'Cleo · Gata', servicio: 'Control de peso', estado: 'Confirmada' },
        ],
        fields: [{ name: 'dia', label: 'Día' }, { name: 'hora', label: 'Hora' }, { name: 'mascota', label: 'Paciente' }, { name: 'servicio', label: 'Motivo' }],
        metrics: [{ label: 'Citas esta semana', value: '24' }, { label: 'Próxima cita', value: '09:00' }, { label: 'Espacios disponibles', value: '6' }],
    },
    'vet-soap': table(
        'Veterinario',
        'Registro clínico SOAP',
        'Notas de consulta demostrativas: subjetivo, objetivo, evaluación y plan.',
        [
            { key: 'paciente', label: 'Paciente' }, { key: 'fecha', label: 'Fecha' },
            { key: 'motivo', label: 'Motivo' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { paciente: 'Simitrio · Perro', fecha: 'Hoy, 09:00', motivo: 'Revisión general', estado: 'Borrador' },
            { paciente: 'Luna · Gata', fecha: 'Ayer, 16:30', motivo: 'Vacunación anual', estado: 'Firmada' },
        ],
        [
            { name: 'paciente', label: 'Paciente' }, { name: 'motivo', label: 'Motivo de consulta' },
            { name: 'subjetivo', label: 'Subjetivo', type: 'textarea' }, { name: 'objetivo', label: 'Objetivo', type: 'textarea' },
            { name: 'evaluacion', label: 'Evaluación', type: 'textarea' }, { name: 'plan', label: 'Plan', type: 'textarea' },
        ],
        [{ label: 'Notas de hoy', value: '5' }, { label: 'Pendientes de firma', value: '2' }, { label: 'Firmadas esta semana', value: '18' }],
    ),
    'vet-prescriptions': table(
        'Veterinario',
        'Recetas médicas',
        'Registro de prescripciones de ejemplo para pacientes.',
        [
            { key: 'paciente', label: 'Paciente' }, { key: 'medicamento', label: 'Medicamento' },
            { key: 'indicacion', label: 'Indicación' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { paciente: 'Rocco · Perro', medicamento: 'Antiinflamatorio', indicacion: 'Cada 12 h · 5 días', estado: 'Activa' },
            { paciente: 'Luna · Gata', medicamento: 'Antiparasitario', indicacion: 'Dosis única', estado: 'Entregada' },
        ],
        [
            { name: 'paciente', label: 'Paciente' }, { name: 'medicamento', label: 'Medicamento' },
            { name: 'indicacion', label: 'Dosis e indicaciones', type: 'textarea' },
        ],
        [{ label: 'Recetas emitidas', value: '18' }, { label: 'En tratamiento', value: '7' }, { label: 'Por entregar', value: '2' }],
    ),
    'vet-vaccines': table(
        'Veterinario',
        'Aplicación de vacunas',
        'Registro demostrativo del carnet y próximas dosis.',
        [
            { key: 'mascota', label: 'Paciente' }, { key: 'vacuna', label: 'Vacuna' },
            { key: 'fecha', label: 'Aplicación' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { mascota: 'Simitrio · Perro', vacuna: 'Antirrábica', fecha: 'Hoy', estado: 'Aplicada' },
            { mascota: 'Cleo · Gata', vacuna: 'Triple felina', fecha: 'Próxima semana', estado: 'Programada' },
        ],
        [{ name: 'mascota', label: 'Paciente' }, { name: 'vacuna', label: 'Vacuna aplicada' }, { name: 'fecha', label: 'Fecha', type: 'date' }],
        [{ label: 'Dosis aplicadas', value: '12' }, { label: 'Próximas dosis', value: '8' }, { label: 'Carnets actualizados', value: '94%' }],
    ),
    'vet-availability': table(
        'Veterinario',
        'Mi disponibilidad',
        'Administra los bloques de horario que se mostrarían para agendar.',
        [
            { key: 'dia', label: 'Día' }, { key: 'inicio', label: 'Inicio' },
            { key: 'fin', label: 'Fin' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { dia: 'Lunes', inicio: '09:00', fin: '17:00', estado: 'Publicado' },
            { dia: 'Miércoles', inicio: '10:00', fin: '18:00', estado: 'Publicado' },
            { dia: 'Viernes', inicio: '09:00', fin: '14:00', estado: 'Borrador' },
        ],
        [{ name: 'dia', label: 'Día' }, { name: 'inicio', label: 'Hora de inicio', type: 'time' }, { name: 'fin', label: 'Hora de fin', type: 'time' }],
        [{ label: 'Bloques semanales', value: '8' }, { label: 'Horas disponibles', value: '32' }, { label: 'Solicitudes', value: '2' }],
    ),
    'vet-history': table(
        'Veterinario',
        'Historial médico',
        'Consultas y antecedentes clínicos de ejemplo.',
        [
            { key: 'mascota', label: 'Paciente' }, { key: 'fecha', label: 'Fecha' },
            { key: 'diagnostico', label: 'Diagnóstico' }, { key: 'veterinario', label: 'Profesional' },
        ],
        [
            { mascota: 'Simitrio · Perro', fecha: '12 nov 2026', diagnostico: 'Paciente sano', veterinario: 'Dr. Alejandro' },
            { mascota: 'Rocco · Perro', fecha: '08 nov 2026', diagnostico: 'Dermatitis leve', veterinario: 'Dra. Beatriz' },
        ],
        [{ name: 'mascota', label: 'Paciente' }, { name: 'fecha', label: 'Fecha de consulta', type: 'date' }, { name: 'diagnostico', label: 'Diagnóstico' }],
        [{ label: 'Expedientes revisados', value: '12' }, { label: 'Consultas del mes', value: '64' }, { label: 'Seguimientos', value: '9' }],
    ),
    'cashier-dashboard': dashboard(
        'Cajero',
        'Recepción y caja',
        'Resumen diario de llegadas, cobros y órdenes pendientes.',
        [
            { label: 'Llegadas pendientes', value: '4', change: '2 próximas', tone: 'coral' },
            { label: 'Órdenes por cobrar', value: '7', change: '$5,840', tone: 'teal' },
            { label: 'Cobrado hoy', value: '$12,450', change: '+9.2%', tone: 'green' },
            { label: 'Facturas pendientes', value: '3', change: 'Requieren revisión', tone: 'blue' },
        ],
        'Cobros de la semana',
        [
            { label: 'Lun', value: 48 }, { label: 'Mar', value: 63 }, { label: 'Mié', value: 57 },
            { label: 'Jue', value: 72 }, { label: 'Vie', value: 66 }, { label: 'Sáb', value: 91 },
        ],
        [
            { title: 'Paciente en recepción', detail: 'Coquito · Cita de las 12:00', time: 'Hace 5 min', tone: 'coral' },
            { title: 'Orden lista para cobro', detail: 'ORD-2048 · Consulta general', time: 'Hace 18 min', tone: 'teal' },
            { title: 'Pago registrado', detail: 'REC-1023 · $680.00', time: 'Hace 32 min', tone: 'green' },
        ],
    ),
    'cashier-appointments': table(
        'Cajero',
        'Control de citas',
        'Citas próximas y su estado de recepción.',
        [
            { key: 'hora', label: 'Hora' }, { key: 'mascota', label: 'Paciente' },
            { key: 'propietario', label: 'Propietario' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { hora: '09:00', mascota: 'Simitrio', propietario: 'Miguel A.', estado: 'En recepción' },
            { hora: '10:30', mascota: 'Luna', propietario: 'Ana L.', estado: 'Confirmada' },
            { hora: '12:00', mascota: 'Coquito', propietario: 'Miguel A.', estado: 'Por confirmar' },
        ],
        [{ name: 'hora', label: 'Hora', type: 'time' }, { name: 'mascota', label: 'Paciente' }, { name: 'propietario', label: 'Propietario' }],
        [{ label: 'Citas de hoy', value: '28' }, { label: 'Confirmadas', value: '22' }, { label: 'Pendientes', value: '6' }],
    ),
    'cashier-checkin': table(
        'Cajero',
        'Llegada de pacientes',
        'Registra la llegada y avisa al equipo clínico.',
        [
            { key: 'mascota', label: 'Paciente' }, { key: 'propietario', label: 'Propietario' },
            { key: 'cita', label: 'Cita' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { mascota: 'Simitrio · Perro', propietario: 'Miguel Alberto', cita: '09:00 · General', estado: 'En recepción' },
            { mascota: 'Luna · Gata', propietario: 'Ana López', cita: '10:30 · Vacunación', estado: 'Esperando' },
        ],
        [{ name: 'mascota', label: 'Paciente' }, { name: 'propietario', label: 'Propietario' }, { name: 'cita', label: 'Hora y servicio' }],
        [{ label: 'Por recibir', value: '4' }, { label: 'En espera', value: '2' }, { label: 'Llegaron hoy', value: '15' }],
    ),
    'cashier-orders': table(
        'Cajero',
        'Órdenes de cobro',
        'Servicios concluidos pendientes de cobro.',
        [
            { key: 'orden', label: 'Orden' }, { key: 'cliente', label: 'Cliente' },
            { key: 'total', label: 'Total' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { orden: 'ORD-2048', cliente: 'Miguel Alberto', total: '$680.00', estado: 'Pendiente' },
            { orden: 'ORD-2047', cliente: 'Ana López', total: '$250.00', estado: 'Pendiente' },
            { orden: 'ORD-2046', cliente: 'Carlos Ramírez', total: '$450.00', estado: 'Pagada' },
        ],
        [{ name: 'orden', label: 'Folio' }, { name: 'cliente', label: 'Cliente' }, { name: 'total', label: 'Total', type: 'number' }],
        [{ label: 'Pendientes', value: '7' }, { label: 'Monto por cobrar', value: '$5,840' }, { label: 'Pagadas hoy', value: '16' }],
    ),
    'cashier-pos': table(
        'Cajero',
        'Punto de venta',
        'Agrega conceptos a una venta de demostración.',
        [
            { key: 'producto', label: 'Concepto' }, { key: 'cantidad', label: 'Cantidad' },
            { key: 'precio', label: 'Precio' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { producto: 'Consulta general', cantidad: '1', precio: '$450.00', estado: 'En cuenta' },
            { producto: 'Vacuna antirrábica', cantidad: '1', precio: '$250.00', estado: 'En cuenta' },
        ],
        [{ name: 'producto', label: 'Producto o servicio' }, { name: 'cantidad', label: 'Cantidad', type: 'number' }, { name: 'precio', label: 'Precio', type: 'number' }],
        [{ label: 'Conceptos', value: '2' }, { label: 'Subtotal', value: '$700.00' }, { label: 'Total', value: '$700.00' }],
    ),
    'cashier-payments': table(
        'Cajero',
        'Historial de pagos',
        'Movimientos de ejemplo registrados en caja.',
        [
            { key: 'folio', label: 'Folio' }, { key: 'cliente', label: 'Cliente' },
            { key: 'metodo', label: 'Método' }, { key: 'monto', label: 'Monto' },
        ],
        [
            { folio: 'REC-1023', cliente: 'Miguel Alberto', metodo: 'Tarjeta', monto: '$680.00' },
            { folio: 'REC-1022', cliente: 'Ana López', metodo: 'Efectivo', monto: '$250.00' },
            { folio: 'REC-1021', cliente: 'Carlos Ramírez', metodo: 'Transferencia', monto: '$450.00' },
        ],
        [{ name: 'folio', label: 'Folio' }, { name: 'cliente', label: 'Cliente' }, { name: 'monto', label: 'Monto', type: 'number' }],
        [{ label: 'Transacciones hoy', value: '24' }, { label: 'Total cobrado', value: '$12,450' }, { label: 'Método principal', value: 'Tarjeta' }],
    ),
    'cashier-receipts': table(
        'Cajero',
        'Recibos',
        'Consulta y descarga recibos de ejemplo.',
        [
            { key: 'folio', label: 'Folio' }, { key: 'fecha', label: 'Fecha' },
            { key: 'cliente', label: 'Cliente' }, { key: 'monto', label: 'Monto' },
        ],
        [
            { folio: 'REC-1023', fecha: 'Hoy, 10:18', cliente: 'Miguel Alberto', monto: '$680.00' },
            { folio: 'REC-1022', fecha: 'Hoy, 09:42', cliente: 'Ana López', monto: '$250.00' },
        ],
        [{ name: 'folio', label: 'Folio' }, { name: 'cliente', label: 'Cliente' }, { name: 'monto', label: 'Monto', type: 'number' }],
        [{ label: 'Recibos emitidos', value: '24' }, { label: 'Reimpresiones', value: '2' }, { label: 'Último folio', value: 'REC-1023' }],
    ),
    'cashier-billing': table(
        'Cajero',
        'Facturación',
        'Seguimiento demostrativo de solicitudes de factura.',
        [
            { key: 'folio', label: 'Folio' }, { key: 'cliente', label: 'Cliente' },
            { key: 'fecha', label: 'Fecha' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { folio: 'FAC-501', cliente: 'Miguel Alberto', fecha: 'Hoy', estado: 'Por emitir' },
            { folio: 'FAC-500', cliente: 'Ana López', fecha: 'Ayer', estado: 'Emitida' },
        ],
        [{ name: 'folio', label: 'Folio' }, { name: 'cliente', label: 'Razón social / cliente' }, { name: 'fecha', label: 'Fecha', type: 'date' }],
        [{ label: 'Solicitudes nuevas', value: '3' }, { label: 'Por emitir', value: '2' }, { label: 'Emitidas este mes', value: '42' }],
    ),
    'client-history': table(
        'Cliente',
        'Historial clínico',
        'Resumen de consultas de tus mascotas. Información de ejemplo.',
        [
            { key: 'mascota', label: 'Mascota' }, { key: 'fecha', label: 'Fecha' },
            { key: 'motivo', label: 'Motivo' }, { key: 'veterinario', label: 'Veterinario' },
        ],
        [
            { mascota: 'Simitrio', fecha: '12 nov 2026', motivo: 'Revisión general', veterinario: 'Dr. Alejandro' },
            { mascota: 'Coquito', fecha: '04 nov 2026', motivo: 'Vacunación', veterinario: 'Dra. Beatriz' },
        ],
        [{ name: 'mascota', label: 'Mascota' }, { name: 'fecha', label: 'Fecha', type: 'date' }, { name: 'motivo', label: 'Motivo de consulta' }],
        [{ label: 'Consultas registradas', value: '8' }, { label: 'Mascotas activas', value: '3' }, { label: 'Próximo control', value: 'En 2 semanas' }],
    ),
    'client-vaccines': table(
        'Cliente',
        'Carnet digital de vacunación',
        'Vacunas aplicadas y próximas dosis de tus mascotas.',
        [
            { key: 'mascota', label: 'Mascota' }, { key: 'vacuna', label: 'Vacuna' },
            { key: 'fecha', label: 'Aplicación' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { mascota: 'Simitrio', vacuna: 'Antirrábica', fecha: '12 nov 2026', estado: 'Aplicada' },
            { mascota: 'Coquito', vacuna: 'Séxtuple', fecha: 'Próxima: 20 nov', estado: 'Próxima dosis' },
        ],
        [{ name: 'mascota', label: 'Mascota' }, { name: 'vacuna', label: 'Vacuna' }, { name: 'fecha', label: 'Fecha', type: 'date' }],
        [{ label: 'Vacunas al día', value: '8' }, { label: 'Próximas dosis', value: '2' }, { label: 'Carnets', value: '3' }],
    ),
    'client-payments': table(
        'Cliente',
        'Historial de pagos',
        'Consulta los pagos relacionados con la atención de tus mascotas.',
        [
            { key: 'fecha', label: 'Fecha' }, { key: 'concepto', label: 'Concepto' },
            { key: 'mascota', label: 'Mascota' }, { key: 'monto', label: 'Monto' },
        ],
        [
            { fecha: '12 nov 2026', concepto: 'Consulta general', mascota: 'Simitrio', monto: '$450.00' },
            { fecha: '04 nov 2026', concepto: 'Vacunación', mascota: 'Coquito', monto: '$250.00' },
        ],
        [{ name: 'fecha', label: 'Fecha', type: 'date' }, { name: 'concepto', label: 'Concepto' }, { name: 'monto', label: 'Monto', type: 'number' }],
        [{ label: 'Pagos del año', value: '8' }, { label: 'Total pagado', value: '$3,840' }, { label: 'Saldo pendiente', value: '$0.00' }],
    ),
    'client-notifications': table(
        'Cliente',
        'Notificaciones',
        'Recordatorios y avisos para el cuidado de tus mascotas.',
        [
            { key: 'aviso', label: 'Notificación' }, { key: 'fecha', label: 'Fecha' },
            { key: 'mascota', label: 'Mascota' }, { key: 'estado', label: 'Estado' },
        ],
        [
            { aviso: 'Próxima dosis de vacuna', fecha: '20 nov 2026', mascota: 'Coquito', estado: 'Nueva' },
            { aviso: 'Cita confirmada', fecha: '18 nov 2026', mascota: 'Simitrio', estado: 'Leída' },
        ],
        [{ name: 'aviso', label: 'Aviso' }, { name: 'fecha', label: 'Fecha', type: 'date' }, { name: 'mascota', label: 'Mascota relacionada' }],
        [{ label: 'Sin leer', value: '2' }, { label: 'Este mes', value: '8' }, { label: 'Recordatorios activos', value: '3' }],
    ),
};

export const demoNavigation = [
    {
        role: 'General',
        base: 'general',
        items: [
            { id: 'admin-dashboard', label: 'Dashboard principal' },
            { id: 'admin-settings', label: 'Configuración' },
        ],
    },
    {
        role: 'Administrador',
        base: 'admin',
        items: [
            { id: 'admin-dashboard', label: 'Dashboard admin' },
            { id: 'admin-personal', label: 'Personal' },
            { id: 'admin-services', label: 'Servicios' },
            { id: 'admin-prices', label: 'Tarifas y precios' },
            { id: 'admin-clinics', label: 'Consultorios' },
            { id: 'admin-schedules', label: 'Horarios' },
            { id: 'admin-inventory', label: 'Inventario' },
            { id: 'admin-reports', label: 'Reportes' },
            { id: 'admin-settings', label: 'Configuración' },
        ],
    },
    {
        role: 'Veterinario',
        base: 'veterinario',
        items: [
            { id: 'vet-calendar', label: 'Calendario' },
            { id: 'vet-soap', label: 'Consulta SOAP' },
            { id: 'vet-prescriptions', label: 'Recetas médicas' },
            { id: 'vet-vaccines', label: 'Vacunas' },
            { id: 'vet-availability', label: 'Disponibilidad' },
            { id: 'vet-history', label: 'Historial médico' },
        ],
    },
    {
        role: 'Cajero',
        base: 'cajero',
        items: [
            { id: 'cashier-dashboard', label: 'Dashboard de recepción' },
            { id: 'cashier-appointments', label: 'Control de citas' },
            { id: 'cashier-checkin', label: 'Llegada de pacientes' },
            { id: 'cashier-orders', label: 'Órdenes de cobro' },
            { id: 'cashier-pos', label: 'Punto de venta' },
            { id: 'cashier-payments', label: 'Historial de pagos' },
            { id: 'cashier-receipts', label: 'Recibos' },
            { id: 'cashier-billing', label: 'Facturación' },
        ],
    },
    {
        role: 'Cliente',
        base: 'cliente',
        items: [
            { id: 'client-history', label: 'Historial clínico' },
            { id: 'client-vaccines', label: 'Carnet de vacunas' },
            { id: 'client-payments', label: 'Historial de pagos' },
            { id: 'client-notifications', label: 'Notificaciones' },
        ],
    },
];
