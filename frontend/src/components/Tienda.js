import React from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import '../css/Tienda.css'; // Ruta correcta para los estilos
import bannerImage from '../assets/images/banner.png'; // Importar la imagen del banner

const Tienda = ({ addToCart }) => {
    const { productos } = useProductos();

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
                                    <p className="card-text">{prod.valor}</p>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addToCart(prod)} // Usar addToCart correctamente
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
