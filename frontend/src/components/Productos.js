import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Productos.css"; // Asegúrate de tener un archivo CSS para estilos específicos

const Productos = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [producto, setProducto] = useState({
    nombre: "",
    codigo: "",
    inventario: "",
    marca: "",
    valor: "",
    estado: 1,
    imagen: null,
  });
  const [editId, setEditId] = useState(null); // ID del producto que se está editando

  useEffect(() => {
    fetchProductos(); // Cargar los productos al iniciar
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProducto({
      ...producto,
      imagen: e.target.files[0],
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in producto) {
      formData.append(key, producto[key]);
    }

    try {
      if (editId) {
        // Actualizar producto
        await axios.put(`http://localhost:5000/productos/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setEditId(null); // Resetear el ID de edición
      } else {
        // Crear nuevo producto
        await axios.post("http://localhost:5000/productos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchProductos();
      setProducto({
        nombre: "",
        codigo: "",
        inventario: "",
        marca: "",
        valor: "",
        estado: 1,
        imagen: null,
      });
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod.id);
    setProducto({
      nombre: prod.nombre,
      codigo: prod.codigo,
      inventario: prod.inventario,
      marca: prod.marca,
      valor: prod.valor,
      estado: prod.estado,
      imagen: null, // La imagen no se incluye al cargar para editar
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{editId ? "Editar Producto" : "Agregar Producto"}</h2>

      {/* Formulario para añadir o editar producto */}
      <form onSubmit={handleSave} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="codigo" className="form-label">
            Código:
          </label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            value={producto.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inventario" className="form-label">
            Inventario:
          </label>
          <input
            type="number"
            className="form-control"
            id="inventario"
            name="inventario"
            value={producto.inventario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="marca" className="form-label">
            Marca:
          </label>
          <input
            type="text"
            className="form-control"
            id="marca"
            name="marca"
            value={producto.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="valor" className="form-label">
            Valor:
          </label>
          <input
            type="number"
            className="form-control"
            id="valor"
            name="valor"
            value={producto.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="imagen" className="form-label">
            Imagen:
          </label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
          <select
            id="estado"
            className="form-select"
            name="estado"
            value={producto.estado}
            onChange={handleChange}
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {editId ? "Actualizar Producto" : "Guardar Producto"}
          </button>
        </div>
      </form>

      {/* Tabla de productos */}
      <div className="mt-5">
        <h2 className="mb-4">Inventario de Productos</h2>
        <div className="row">
          {productos.map((prod) => (
            <div className="col-md-4 mb-3" key={prod.id}>
              <div className="card">
                <img
                  src={prod.imagen || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={prod.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="card-text">Código: {prod.codigo}</p>
                  <p className="card-text">Inventario: {prod.inventario}</p>
                  <p className="card-text">Marca: {prod.marca}</p>
                  <p className="card-text">Valor: ${prod.valor}</p>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(prod)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Eliminar
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

export default Productos;
