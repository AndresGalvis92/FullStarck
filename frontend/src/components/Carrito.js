import React from 'react';

const Carrito = ({ cartItems, removeFromCart, clearCart }) => {
  // Calcular cantidad total de productos en el carrito
  const totalProductos = cartItems.reduce((acc, prod) => acc + prod.cantidad, 0);

  // Calcular el subtotal, impuesto (IVA 19%) y total del carrito
  const subtotal = cartItems.reduce((acc, prod) => acc + (prod.valor * prod.cantidad), 0);
  const impuesto = subtotal * 0.19; // Suponiendo que el impuesto es del 19%
  const total = subtotal + impuesto;

  // Función para formatear los valores a pesos colombianos (COP)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  return (
    <div className="container mt-5">
      <h1>Carrito de Compras</h1>

      {/* Sección que muestra la cantidad total de productos y el botón para vaciar el carrito */}
      <div className="d-flex justify-content-between mb-4">
        <h3>Cantidad total de productos: {totalProductos}</h3>
        <button className="btn btn-danger" onClick={clearCart}>
          Vaciar carrito {/* Botón para vaciar el carrito */}
        </button>
      </div>

      {/* Mostrar mensaje si no hay productos en el carrito */}
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          {/* Tabla que muestra los productos en el carrito */}
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
              {/* Recorre los productos en el carrito y los muestra en filas */}
              {cartItems.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.codigo}</td>
                  <td>{prod.marca}</td>
                  <td>{formatCurrency(prod.valor)}</td> {/* Formatea el valor del producto */}
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
                      onClick={() => removeFromCart(prod.id)} // Eliminar el producto del carrito
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Apartado para mostrar el subtotal, impuesto (IVA) y total del carrito */}
          <div className="d-flex justify-content-end mt-4">
            <div>
              <p><strong>Subtotal:</strong> {formatCurrency(subtotal)}</p> {/* Mostrar subtotal */}
              <p><strong>Impuesto (IVA 19%):</strong> {formatCurrency(impuesto)}</p> {/* Mostrar impuesto */}
              <p><strong>Total:</strong> {formatCurrency(total)}</p> {/* Mostrar total con impuesto incluido */}
            </div>
          </div>

          {/* Botón "Ir a Pagar" en verde, con espacio añadido arriba */}
          <div className="d-flex justify-content-end mt-5"> {/* Mayor margen arriba del botón */}
            <button className="btn btn-success" onClick={() => alert('Ir a Pagar')}>
              Ir a Pagar {/* Botón para proceder al pago */}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
