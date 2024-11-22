import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Tienda.css'; // Ruta correcta para los estilos
import bannerImage from '../assets/images/banner.png'; // Importar la imagen del banner

const Tienda = () => {
    return (
        <div>
            {/* Navbar Superior */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Mi Tienda Virtual</a>
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
                            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Banner Principal */}
            <div
                className="banner d-flex align-items-center justify-content-center text-center text-light"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px',
                }}
            >
                <div>
                    <h1>¡Bienvenido a Mi Tienda Virtual!</h1>
                    <p>Descubre nuestros productos al mejor precio.</p>
                    <Link to="/productos" className="btn btn-primary btn-lg">Explorar Productos</Link>
                </div>
            </div>

            {/* Sección de Productos Destacados */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Productos Destacados</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Producto 1" />
                            <div className="card-body">
                                <h5 className="card-title">Producto 1</h5>
                                <p className="card-text">$50.00</p>
                                <Link to="/carrito" className="btn btn-primary">Añadir al Carrito</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Producto 2" />
                            <div className="card-body">
                                <h5 className="card-title">Producto 2</h5>
                                <p className="card-text">$75.00</p>
                                <Link to="/carrito" className="btn btn-primary">Añadir al Carrito</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Producto 3" />
                            <div className="card-body">
                                <h5 className="card-title">Producto 3</h5>
                                <p className="card-text">$100.00</p>
                                <Link to="/carrito" className="btn btn-primary">Añadir al Carrito</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-light text-center py-3">
                <p>© 2024 Mi Tienda Virtual. Todos los derechos reservados.</p>
                <p>
                    <a href="#" className="text-light">Política de Privacidad</a> | 
                    <a href="#" className="text-light ms-2">Términos de Servicio</a>
                </p>
            </footer>
        </div>
    );
};

export default Tienda;
