import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import '../css/Tienda.css'; // Ruta correcta para los estilos
import bannerImage from '../assets/images/banner.png'; // Importar la imagen del banner

const Tienda = ({ addToCart }) => {
    const { productos } = useProductos();

    // Estado local para manejar las cantidades seleccionadas para cada producto
    const [cantidades, setCantidades] = useState({});

    // Función para manejar el cambio de cantidad
    const actualizarCantidad = (id, cambio) => {
        setCantidades((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + cambio, 1), // Asegura que la cantidad no sea menor a 1
        }));
    };

    return (
        <div>
            {/* Banner Principal */}
            <div
                className="banner d-flex align-items-center justify-content-center text-center text-light"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div>
                    <h1>¡Bienvenido a Mi Tienda Virtual!</h1>
                    <p>Descubre nuestros productos al mejor precio.</p>
                    <Link to="/productos" className="btn btn-primary btn-lg">
                        Explorar Productos
                    </Link>
                </div>
            </div>

            {/* Sección de Productos Destacados */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Productos</h2>
                <div className="row">
                    {productos.map((prod) => (
                        <div className="col-md-4" key={prod.id}>
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/300"
                                    className="card-img-top"
                                    alt={prod.nombre}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{prod.nombre}</h5>
                                    <p className="card-text">Precio: ${prod.valor}</p>

                                    {/* Controles de cantidad */}
                                    <div className="d-flex align-items-center mb-3">
                                        <button
                                            className="btn btn-outline-secondary btn-sm me-2"
                                            onClick={() => actualizarCantidad(prod.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{cantidades[prod.id] || 1}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm ms-2"
                                            onClick={() => actualizarCantidad(prod.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Botón Añadir al carrito */}
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            const cantidadSeleccionada = cantidades[prod.id] || 1;
                                            addToCart(prod, cantidadSeleccionada); // Llamada a la función con producto y cantidad
                                        }}
                                    >
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tienda;
