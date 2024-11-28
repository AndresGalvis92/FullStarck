import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import Tienda from './components/Tienda';
import Header from './components/Header';
import Footer from './components/Footer';


import './css/styles.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/carrito" element={<Carrito />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
