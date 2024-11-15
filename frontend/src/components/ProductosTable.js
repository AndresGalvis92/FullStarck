import React, { useEffect, useState } from 'react';
import { getProductos, addProducto, updateProducto, deleteProducto } from '../services/productosService';

const ProductosTable = () => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({ nombre: '', codigo: '', inventario: '', marca: '', valor: '' });
    const [productoIdParaEditar, setProductoIdParaEditar] = useState(null); // Estado para saber si estamos editando

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const { data } = await getProductos();
        setProductos(data);
    };

    const handleSave = async () => {
        if (productoIdParaEditar) {
            // Actualizar producto
            await updateProducto(productoIdParaEditar, producto);
            setProductoIdParaEditar(null); // Resetear estado de edición
        } else {
            // Agregar producto
            await addProducto(producto);
        }
        fetchProductos();
        setProducto({ nombre: '', codigo: '', inventario: '', marca: '', valor: '' }); // Limpia el formulario
    };

    const handleDelete = async (id) => {
        await deleteProducto(id);
        fetchProductos();
    };

    const cargarProductoParaEditar = (prod) => {
        setProductoIdParaEditar(prod.id); // Configura el producto a editar
        setProducto({
            nombre: prod.nombre,
            codigo: prod.codigo,
            inventario: prod.inventario,
            marca: prod.marca,
            valor: prod.valor,
        });
    };

    return (
        <div className="container mt-5">
            <h1>Productos</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Inventario</th>
                        <th>Marca</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.nombre}</td>
                            <td>{prod.codigo}</td>
                            <td>{prod.inventario}</td>
                            <td>{prod.marca}</td>
                            <td>{prod.valor}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => cargarProductoParaEditar(prod)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(prod.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para añadir o editar producto */}
            <div className="card p-4">
                <h5 className="card-title">
                    {productoIdParaEditar ? 'Actualizar Producto' : 'Añadir Producto'}
                </h5>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={producto.nombre}
                        onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Código"
                        value={producto.codigo}
                        onChange={(e) => setProducto({ ...producto, codigo: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Inventario"
                        value={producto.inventario}
                        onChange={(e) => setProducto({ ...producto, inventario: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Marca"
                        value={producto.marca}
                        onChange={(e) => setProducto({ ...producto, marca: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Valor"
                        value={producto.valor}
                        onChange={(e) => setProducto({ ...producto, valor: e.target.value })}
                    />
                </div>
                <button className="btn btn-success" onClick={handleSave}>
                    {productoIdParaEditar ? 'Actualizar Producto' : 'Añadir Producto'}
                </button>
            </div>
        </div>
    );
};

export default ProductosTable;
