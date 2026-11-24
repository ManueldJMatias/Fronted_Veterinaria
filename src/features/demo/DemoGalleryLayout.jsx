import { NavLink, Outlet } from 'react-router-dom';
import { demoNavigation } from './demoModules';
import './DemoGalleryLayout.css';

export default function DemoGalleryLayout() {
    return (
        <div className="demo-gallery-layout">
            <aside className="demo-gallery-sidebar">
                <div className="demo-gallery-brand">
                    <span className="demo-gallery-logo">CV</span>
                    <div><strong>Clínica veterinaria</strong><span>GESTIÓN VETERINARIA</span></div>
                </div>
                <div className="demo-gallery-label">GALERÍA DE INTERFACES</div>
                <nav className="demo-gallery-navigation" aria-label="Módulos de demostración">
                    {demoNavigation.map((group) => (
                        <section className="demo-gallery-group" key={group.base}>
                            <h2>{group.role}</h2>
                            {group.items.map((item) => (
                                <NavLink
                                    className={({ isActive }) => `demo-gallery-link${isActive ? ' active' : ''}`}
                                    end
                                    key={`${group.base}-${item.id}`}
                                    to={`/demo/${group.base}/${item.id}`}
                                >
                                    <span className="demo-gallery-link-mark" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </section>
                    ))}
                </nav>
                <div className="demo-gallery-sidebar-note">
                    <span>ⓘ</span>
                    Prototipo visual con datos de ejemplo. No usa ni modifica la API.
                </div>
            </aside>
            <div className="demo-gallery-content">
                <header className="demo-gallery-topbar">
                    <div>
                        <span className="demo-gallery-top-kicker">FRONTEND · PROTOTIPO</span>
                        <strong>Demo de interfaces</strong>
                    </div>
                    <span className="demo-gallery-top-badge"><span /> Ambiente de desarrollo</span>
                </header>
                <div className="demo-gallery-outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
