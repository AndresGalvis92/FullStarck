import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProductosTable from './components/ProductosTable';
import Carrito from './components/Carrito';
import './css/styles.css';

const Navbar = () => {
    const location = useLocation(); // Hook para obtener la ruta actual

    // Mostrar el navbar en todas las páginas excepto en login y registro
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
        return null; // No mostrar navbar
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
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
    return (
        <Router>
            <div className="App">
                {/* Navbar renderizado condicionalmente */}
                <Navbar />
                {/* Rutas de la aplicación */}
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/productos" element={<ProductosTable />} />
                    <Route path="/carrito" element={<Carrito />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
