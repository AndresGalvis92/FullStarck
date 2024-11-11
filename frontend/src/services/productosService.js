import axios from 'axios';

const apiUrl = 'http://localhost:5000/productos';

export const getProductos = () => axios.get(apiUrl);
export const addProducto = (producto) => axios.post(apiUrl, producto);
export const updateProducto = (id, producto) => axios.put(`${apiUrl}/${id}`, producto);
export const deleteProducto = (id) => axios.delete(`${apiUrl}/${id}`);
