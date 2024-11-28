import React, { useState } from 'react';

const Carrito = ({ cartItems, removeFromCart, clearCart }) => {
  // Función para actualizar la cantidad
  const updateQuantity = (id, newQuantity) => {
    // Verifica que la nueva cantidad no sea menor que 1
    if (newQuantity < 1) return;

    // Actualiza el carrito con la nueva cantidad
    const updatedCart = cartItems.map((prod) =>
      prod.id === id ? { ...prod, cantidad: newQuantity } : prod
    );

    // Actualiza el estado del carrito con el nuevo carrito actualizado
    // Aquí necesitas una función o un estado para actualizar el carrito en el padre (si usas hooks)
    // En este caso asumo que se pasa un setter para actualizar el carrito.
    // setCartItems(updatedCart);
  };

  // Asegurarse de que cada producto tenga la propiedad "cantidad" con un valor inicial de 1
  const totalProductos = cartItems.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);

  return (
    <div className="container mt-5">
      <h1>Carrito de Compras</h1>

      {/* Mostrar la cantidad total de productos en el carrito */}
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
              <th>Foto</th> {/* Columna para la foto */}
              <th>Cantidad</th> {/* Columna para la cantidad */}
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
                  {/* Mostrar la foto del producto */}
                  <img 
                    src={prod.foto || 'https://via.placeholder.com/50'} 
                    alt={prod.nombre} 
                    style={{ width: '50px', height: '50px' }} 
                  />
                </td>
                <td>
                  {/* Controles de cantidad */}
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => updateQuantity(prod.id, prod.cantidad - 1)} 
                    disabled={prod.cantidad <= 1}
                  >
                    -
                  </button>
                  {/* Mostrar la cantidad en el medio de los botones */}
                  <span className="mx-3">{prod.cantidad}</span>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => updateQuantity(prod.id, prod.cantidad + 1)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(prod.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-danger" onClick={clearCart}>
        Vaciar carrito
      </button>
    </div>
  );
};

export default Carrito;
