// src/components/ProductosTable.jsx
import React from 'react';
import useProductos from '../hooks/useProductos';

const Productos = () => {
  const {
    productos,
    producto,
    setProducto,
    guardar,
    eliminar,
    cargarProductoParaEditar,
    productoIdParaEditar,
  } = useProductos();

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
                <button className="btn btn-primary btn-sm me-2" onClick={() => cargarProductoParaEditar(prod)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(prod.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario */}
      <div className="card p-4">
        <h5 className="card-title">{productoIdParaEditar ? 'Actualizar Producto' : 'Añadir Producto'}</h5>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Codigo"
          value={producto.codigo}
          onChange={(e) => setProducto({ ...producto, codigo: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Inventario"
          value={producto.inventario}
          onChange={(e) => setProducto({ ...producto, inventario: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Marca"
          value={producto.marca}
          onChange={(e) => setProducto({ ...producto, marca: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Valor"
          value={producto.valor}
          onChange={(e) => setProducto({ ...producto, valor: e.target.value })}
        />
       
        <button className="btn btn-success" onClick={guardar}>
          {productoIdParaEditar ? 'Actualizar Producto' : 'Añadir Producto'}
        </button>
      </div>
    </div>
  );
};

export default Productos;
