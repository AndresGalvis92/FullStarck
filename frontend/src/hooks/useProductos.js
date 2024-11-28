import { useState, useEffect } from 'react';
import { getProductos, addProducto, updateProducto, deleteProducto } from '../services/productosService';

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ nombre: '', codigo: '', inventario: '', marca: '', valor: '', imagen: null });
  const [productoIdParaEditar, setProductoIdParaEditar] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos();
  }, []);

  // Obtener productos
  const fetchProductos = async () => {
    try {
      const { data } = await getProductos();
      setProductos(data); // Asegura que los productos incluyen la ruta de la imagen
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Guardar producto (crear o actualizar)
  const guardar = async () => {
    if (productoIdParaEditar) {
      await updateProducto(productoIdParaEditar, producto);
      setProductoIdParaEditar(null);
    } else {
      await addProducto(producto);
    }
    fetchProductos();
    resetProducto();
  };

  // Eliminar producto
  const eliminar = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  // Cargar producto para editar
  const cargarProductoParaEditar = (prod) => {
    setProductoIdParaEditar(prod.id);
    setProducto(prod);
  };

  // Resetear formulario
  const resetProducto = () => {
    setProducto({ nombre: '', codigo: '', inventario: '', marca: '', valor: '', imagen: null });
  };

  return {
    productos,
    producto,
    setProducto,
    guardar,
    eliminar,
    cargarProductoParaEditar,
    productoIdParaEditar,
  };
};

export default useProductos;
