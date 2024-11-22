import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProductosTable from './components/ProductosTable';
import Carrito from './components/Carrito';
import Tienda from './components/Tienda';
import './css/styles.css';

const Navbar = ({ isAuthenticated }) => {
    const location = useLocation();

    // Mostrar el navbar solo si el usuario está autenticado y no en login/register
    if (!isAuthenticated || location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/tienda">Tienda</a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/productos">Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/carrito">Carrito</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} />
                <Routes>
                    <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/productos" element={<ProductosTable />} />
                    <Route path="/carrito" element={<Carrito />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
