// Carrito.js
import React from 'react';

const Carrito = ({ cartItems, removeFromCart, clearCart }) => {
  const totalProductos = cartItems.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <div className="container mt-5">
      <h1>Carrito de Compras</h1>
      <h3>Cantidad total de productos: {totalProductos}</h3>

      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Marca</th>
              <th>Valor</th>
              <th>Foto</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.codigo}</td>
                <td>{prod.marca}</td>
                <td>{prod.valor}</td>
                <td>
                  <img
                    src={prod.foto || 'https://via.placeholder.com/50'}
                    alt={prod.nombre}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{prod.cantidad}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(prod.id)} // Eliminar el producto seleccionado
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botón para vaciar el carrito */}
      <button className="btn btn-danger" onClick={clearCart}>
        Vaciar carrito
      </button>
    </div>
  );
};

export default Carrito;
