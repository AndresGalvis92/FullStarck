import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [form, setForm] = useState({ nombre: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/register', form);
            setMessage(res.data.message);

            // Redirige al login después de un registro exitoso
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Espera 2 segundos antes de redirigir
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error al registrar');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    />
                </div>
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
                <button className="btn btn-primary" type="submit">Registrarse</button>
                {message && <p className="mt-3">{message}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
