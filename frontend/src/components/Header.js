import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Tienda.css'; // Ruta correcta para los estilos

const Header = ( ) => {
    
    return (
        <>
            {/* Navbar Superior */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/tienda">Mi Tienda Virtual</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/productos">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrito">Carrito</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button type="button" className="btn btn-secondary position-relative me-5">
                                Inbox
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger m-1">
                                    {/* {counterCarrito} */1}
                                </span>
                            </button>
                            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Header;