import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', form);
            localStorage.setItem('token', res.data.token); // Guarda el token
            navigate('/Tienda'); // Redirige a la página de tienda después del login
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo Electrónico"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Iniciar Sesión</button>
                <p className="mt-3">
                    ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
                </p>
                {message && <p className="mt-3 text-danger">{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
