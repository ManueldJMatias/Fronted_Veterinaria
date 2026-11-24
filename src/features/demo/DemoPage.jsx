import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { demoModules } from './demoModules';
import './DemoPage.css';

function MetricCards({ metrics = [] }) {
    return (
        <section className="demo-metrics" aria-label="Indicadores">
            {metrics.map((metric) => (
                <article className={`demo-metric demo-tone-${metric.tone || 'teal'}`} key={metric.label}>
                    <span className="demo-metric-label">{metric.label}</span>
                    <strong className="demo-metric-value">{metric.value}</strong>
                    {metric.change && <span className="demo-metric-change">{metric.change}</span>}
                </article>
            ))}
        </section>
    );
}

function DashboardContent({ module, onExport }) {
    const max = Math.max(...module.chart.map((item) => item.value), 1);
    return (
        <>
            <MetricCards metrics={module.metrics} />
            <section className="demo-dashboard-grid">
                <article className="demo-panel demo-chart-panel">
                    <div className="demo-panel-heading">
                        <div>
                            <span className="demo-section-kicker">TENDENCIA</span>
                            <h2>{module.chartTitle}</h2>
                        </div>
                        <div className="demo-dashboard-actions">
                            <span className="demo-period">Últimos 7 días</span>
                            {module.columns && <button className="demo-secondary-button" type="button" onClick={onExport}>Descargar CSV</button>}
                        </div>
                    </div>
                    <div className="demo-chart" role="img" aria-label={module.chartTitle}>
                        {module.chart.map((item) => (
                            <div className="demo-chart-column" key={item.label}>
                                <span className="demo-chart-value">{item.displayValue || `${item.value}%`}</span>
                                <div className="demo-chart-track">
                                    <span style={{ height: `${Math.max((item.value / max) * 100, 8)}%` }} />
                                </div>
                                <span className="demo-chart-label">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </article>
                <article className="demo-panel demo-activity-panel">
                    <div className="demo-panel-heading">
                        <div>
                            <span className="demo-section-kicker">ACTUALIZACIONES</span>
                            <h2>Actividad reciente</h2>
                        </div>
                    </div>
                    <div className="demo-activity-list">
                        {module.activity.map((item) => (
                            <div className="demo-activity-item" key={item.title}>
                                <span className={`demo-activity-dot demo-dot-${item.tone}`} />
                                <div className="demo-activity-copy">
                                    <strong>{item.title}</strong>
                                    <span>{item.detail}</span>
                                </div>
                                <time>{item.time}</time>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </>
    );
}

function TableContent({ columns, rows, onView }) {
    if (rows.length === 0) {
        return (
            <div className="demo-empty-state">
                <span className="demo-empty-icon">⌕</span>
                <strong>No encontramos registros</strong>
                <span>Prueba con otra búsqueda o agrega un registro de demostración.</span>
            </div>
        );
    }

    return (
        <div className="demo-table-scroll">
            <table className="demo-table">
                <thead>
                    <tr>
                        {columns.map((column) => <th key={column.key}>{column.label}</th>)}
                        <th className="demo-action-heading">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={`${row[columns[0]?.key] || 'record'}-${index}`}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {['estado', 'status'].includes(column.key.toLowerCase())
                                        ? <span className={`demo-status ${String(row[column.key]).toLowerCase().replace(/\s+/g, '-')}`}>{row[column.key]}</span>
                                        : <span className="demo-cell-content">{row[column.key] || '—'}</span>}
                                </td>
                            ))}
                            <td className="demo-action-cell">
                                <button type="button" className="demo-text-button" onClick={() => onView(row)}>Ver detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CalendarContent({ module, rows, onAdd }) {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    return (
        <>
            <MetricCards metrics={module.metrics} />
            <section className="demo-panel demo-calendar-panel">
                <div className="demo-panel-heading">
                    <div>
                        <span className="demo-section-kicker">AGENDA SEMANAL</span>
                        <h2>Semana del 16 al 20 de noviembre</h2>
                    </div>
                    <button className="demo-primary-button" type="button" onClick={onAdd}>＋ Agregar cita</button>
                </div>
                <div className="demo-calendar-grid">
                    {days.map((day) => {
                        const dayRows = rows.filter((row) => row.dia === day);
                        return (
                            <article className="demo-calendar-day" key={day}>
                                <h3>{day}</h3>
                                {dayRows.length === 0
                                    ? <p className="demo-calendar-empty">Sin citas</p>
                                    : dayRows.map((row, index) => (
                                        <div className="demo-calendar-event" key={`${row.hora}-${index}`}>
                                            <strong>{row.hora}</strong>
                                            <span>{row.mascota}</span>
                                            <small>{row.servicio}</small>
                                        </div>
                                    ))}
                            </article>
                        );
                    })}
                </div>
            </section>
        </>
    );
}

function SettingsContent({ module, onSaved }) {
    const [settings, setSettings] = useState(module.settings);
    return (
        <section className="demo-panel demo-settings-panel">
            <div className="demo-panel-heading">
                <div>
                    <span className="demo-section-kicker">PREFERENCIAS</span>
                    <h2>Preferencias de la clínica</h2>
                </div>
            </div>
            <div className="demo-settings-list">
                {settings.map((setting, index) => (
                    <div className="demo-setting-row" key={setting.title}>
                        <div>
                            <strong>{setting.title}</strong>
                            <span>{setting.description}</span>
                        </div>
                        <button
                            type="button"
                            className={`demo-switch ${setting.enabled ? 'is-on' : ''}`}
                            role="switch"
                            aria-checked={setting.enabled}
                            aria-label={setting.title}
                            onClick={() => setSettings((current) => current.map((item, itemIndex) => (
                                itemIndex === index ? { ...item, enabled: !item.enabled } : item
                            )))}
                        >
                            <span />
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" className="demo-primary-button" onClick={onSaved}>Guardar preferencias</button>
        </section>
    );
}

function RecordModal({ title, fields, values, onChange, onClose, onSubmit, record }) {
    return (
        <div className="demo-modal-backdrop" onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
        }}>
            <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
                <div className="demo-modal-heading">
                    <div>
                        <span className="demo-section-kicker">{record ? 'DETALLE' : 'NUEVO REGISTRO'}</span>
                        <h2 id="demo-modal-title">{title}</h2>
                    </div>
                    <button type="button" className="demo-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
                </div>
                {record ? (
                    <dl className="demo-record-details">
                        {Object.entries(record).map(([key, value]) => (
                            <div key={key}><dt>{key}</dt><dd>{value || '—'}</dd></div>
                        ))}
                    </dl>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className="demo-form-grid">
                            {fields.map((field) => (
                                <label className={field.type === 'textarea' ? 'demo-form-field demo-form-wide' : 'demo-form-field'} key={field.name}>
                                    <span>{field.label}</span>
                                    {field.type === 'textarea'
                                        ? <textarea required value={values[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)} />
                                        : <input
                                            required
                                            type={['date', 'time', 'number'].includes(field.type) ? field.type : 'text'}
                                            value={values[field.name] || ''}
                                            onChange={(event) => onChange(field.name, event.target.value)}
                                        />}
                                </label>
                            ))}
                        </div>
                        <p className="demo-form-hint">Este registro solo se agrega a la vista actual; no se envía al servidor.</p>
                        <div className="demo-modal-actions">
                            <button type="button" className="demo-secondary-button" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="demo-primary-button">Agregar registro</button>
                        </div>
                    </form>
                )}
            </section>
        </div>
    );
}

function downloadCsv(module, rows) {
    const keys = module.columns.map((column) => column.key);
    const header = module.columns.map((column) => column.label);
    const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const content = [header, ...rows.map((row) => keys.map((key) => row[key] || ''))]
        .map((row) => row.map(escape).join(','))
        .join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${module.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

export default function DemoPage({ pageId }) {
    const params = useParams();
    const moduleId = pageId || params.moduleId;
    const module = demoModules[moduleId];
    if (!module) {
        return (
            <div className="demo-page">
                <section className="demo-panel demo-empty-state">
                    <strong>Interfaz no encontrada</strong>
                    <span>Selecciona un módulo desde el menú de demostración.</span>
                </section>
            </div>
        );
    }

    return <DemoModulePage key={moduleId} module={module} />;
}

function DemoModulePage({ module }) {
    const [rows, setRows] = useState(() => module.rows || []);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(null);
    const [draft, setDraft] = useState({});
    const [notice, setNotice] = useState('');

    const filteredRows = useMemo(() => rows.filter((row) => (
        Object.values(row).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
    )), [rows, search]);

    const openCreate = () => {
        setDraft({});
        setModal({ mode: 'create' });
    };

    const submitRecord = (event) => {
        event.preventDefault();
        setRows((current) => [{ ...draft }, ...current]);
        setModal(null);
        setNotice('Registro de demostración agregado. No se guardó en el backend.');
    };

    return (
        <div className="demo-page">
            <header className="demo-page-header">
                <div>
                    <div className="demo-breadcrumb"><span>{module.role}</span><span>/</span><span>Prototipo</span></div>
                    <h1>{module.title}</h1>
                    <p>{module.description}</p>
                </div>
                <span className="demo-only-badge"><span /> MODO DEMOSTRACIÓN</span>
            </header>

            {notice && <div className="demo-notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Cerrar aviso">×</button></div>}

            {module.kind === 'dashboard' && (
                <DashboardContent
                    module={module}
                    onExport={() => downloadCsv(module, module.rows)}
                />
            )}

            {module.kind === 'settings' && (
                <SettingsContent module={module} onSaved={() => setNotice('Preferencias de demostración actualizadas en esta sesión.')} />
            )}

            {module.kind === 'calendar' && (
                <CalendarContent module={module} rows={rows} onAdd={openCreate} />
            )}

            {module.kind === 'table' && (
                <>
                    <MetricCards metrics={module.metrics} />
                    <section className="demo-panel demo-data-panel">
                        <div className="demo-panel-heading demo-table-heading">
                            <div>
                                <span className="demo-section-kicker">REGISTROS</span>
                                <h2>Información del módulo</h2>
                            </div>
                            <div className="demo-table-controls">
                                <label className="demo-search">
                                    <span aria-hidden="true">⌕</span>
                                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar..." aria-label="Buscar registros" />
                                </label>
                                <button type="button" className="demo-secondary-button" onClick={() => downloadCsv(module, filteredRows)}>Descargar CSV</button>
                                <button type="button" className="demo-primary-button" onClick={openCreate}>＋ Nuevo registro</button>
                            </div>
                        </div>
                        <TableContent columns={module.columns} rows={filteredRows} onView={(record) => setModal({ mode: 'view', record })} />
                        <div className="demo-table-footer">Mostrando {filteredRows.length} de {rows.length} registros de demostración</div>
                    </section>
                </>
            )}

            {module.kind === 'calendar' && (
                <div className="demo-calendar-actions">
                    <button type="button" className="demo-secondary-button" onClick={() => downloadCsv(module, rows)}>Descargar agenda CSV</button>
                </div>
            )}

            <footer className="demo-disclaimer">
                <span className="demo-disclaimer-icon">i</span>
                <span>Prototipo de interfaz: los datos son ilustrativos y los cambios no se persisten ni modifican el backend.</span>
            </footer>

            {modal && (
                <RecordModal
                    title={module.title}
                    fields={module.fields || []}
                    values={draft}
                    onChange={(field, value) => setDraft((current) => ({ ...current, [field]: value }))}
                    onClose={() => setModal(null)}
                    onSubmit={submitRecord}
                    record={modal.record}
                />
            )}
        </div>
    );
}
