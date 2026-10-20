import { useContext, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Offcanvas } from 'bootstrap';
import { ShopContext } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

// "Rebajas" y "Precios Especiales" todavía no tienen productos propios: por ahora llevan a la tienda
const menu = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop', label: 'Rebajas', placeholder: true },
    { to: '/shop', label: 'Precios Especiales', placeholder: true },
    { to: '/locales', label: 'Locales' },
];

const Header = () => {
    const { totalItems } = useContext(ShopContext);
    const { user, logout } = useAuth();
    const offcanvasRef = useRef(null);

    // Cierra el menú lateral (mobile) al elegir una opción, sin bloquear la navegación
    const closeMenu = () => Offcanvas.getInstance(offcanvasRef.current)?.hide();

    return (
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Abrir menú">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nav-bar-icons">
                        {user ? (
                            <div className="dropdown d-inline-block">
                                <a href="#" className="icon" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Mi cuenta">
                                    <i className="fas fa-user"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><span className="dropdown-item-text">Hola, {user.firstName}</span></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={logout}>Salir</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/login" className="icon" aria-label="Ingresar"><i className="fas fa-user"></i></Link>
                        )}
                        <Link to="/cart" className="icon cart-icon" aria-label={`Carrito (${totalItems})`}>
                            <i className="fas fa-shopping-cart"></i>
                            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                        </Link>
                    </div>
                    <div className="nav-bar-brand">
                        <Link to="/">
                            <img src="/img/logo.png" alt="Valsaa Logo" className="brand-logo" />
                        </Link>
                    </div>
                    <div className="nav-bar-bottom">
                        <ul className="nav-bar-menu">
                            {menu.map(item => (
                                <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div ref={offcanvasRef} className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Valsaa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {menu.map(item => (
                                    <li key={item.label} className="nav-item">
                                        {item.placeholder ? (
                                            <Link className="nav-link" to={item.to} onClick={closeMenu}>{item.label}</Link>
                                        ) : (
                                            <NavLink className="nav-link" to={item.to} onClick={closeMenu}>{item.label}</NavLink>
                                        )}
                                    </li>
                                ))}
                                <li className="nav-item">
                                    {user ? (
                                        <button className="nav-link" onClick={() => { closeMenu(); logout(); }}>Salir ({user.firstName})</button>
                                    ) : (
                                        <NavLink className="nav-link" to="/login" onClick={closeMenu}>Ingresar</NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
