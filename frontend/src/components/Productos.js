import React, { useState } from "react";
import axios from "axios";

const Productos = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    codigo: "",
    inventario: 0,
    marca: "",
    valor: 0,
    estado: 1,
    imagen: null,
  });

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
      imagen: e.target.files[0], // Capturar la imagen seleccionada
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in producto) {
      if (producto[key] !== null) { // Solo agregar campos con valores
        formData.append(key, producto[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Indicar que se están enviando archivos
        },
      });
      console.log("Producto guardado:", response.data);
      alert("Producto agregado con éxito");
      // Limpiar el formulario
      setProducto({
        nombre: "",
        codigo: "",
        inventario: 0,
        marca: "",
        valor: 0,
        estado: 1,
        imagen: null,
      });
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Ocurrió un error al guardar el producto. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
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
          <label htmlFor="codigo" className="form-label">Código:</label>
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
          <label htmlFor="inventario" className="form-label">Inventario:</label>
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
          <label htmlFor="marca" className="form-label">Marca:</label>
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
          <label htmlFor="valor" className="form-label">Valor:</label>
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
          <label htmlFor="estado" className="form-label">Estado:</label>
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
        <div className="col-md-6">
          <label htmlFor="imagen" className="form-label">Imagen:</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </div>
      </form>
    </div>
  );
};

export default Productos;
