const Carrito = ({ cartItems, removeFromCart, clearCart }) => {
    return (
      <div className="container mt-5">
        <h1>Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Inventario</th>
                <th>Marca</th>
                <th>Valor</th>
                <th>Foto</th> {/* Columna para la foto */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.codigo}</td>
                  <td>{prod.inventario}</td>
                  <td>{prod.marca}</td>
                  <td>{prod.valor}</td>
                  <td>
                    {/* Mostrar la foto del producto */}
                    <img src={prod.foto} alt={prod.nombre} style={{ width: '50px', height: '50px' }} />
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
  