import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    const [cartItems, setCartItems] = useState([]); // Estado del carrito

    // Función para añadir productos al carrito
    const addToCart = (product) => {
        setCartItems((prevCartItems) => [...prevCartItems, product]);
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== productId)
        );
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route
                        path="/login"
                        element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route
                        path="/productos"
                        element={<Productos addToCart={addToCart} />}
                    />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route
                        path="/tienda"
                        element={<Tienda addToCart={addToCart} />} // Pasar addToCart como prop
                    />
                    <Route
                        path="/carrito"
                        element={
                            <Carrito
                                cartItems={cartItems}
                                removeFromCart={removeFromCart}
                                clearCart={clearCart}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
