const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = '12345'; // Cambia esto por una clave más segura en producción

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta GET para obtener solo productos con estado = 1
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos WHERE estado = 1';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta POST para agregar un nuevo producto con estado = 1 por defecto
app.post('/productos', (req, res) => {
    const { nombre, codigo, inventario, marca, valor } = req.body;
    const estado = 1; // Estado por defecto al crear un nuevo producto
    const sql = 'INSERT INTO productos (nombre, codigo, inventario, marca, valor, estado) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, codigo, inventario, marca, valor, estado], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'Producto agregado', id: result.insertId });
    });
});

// Ruta PUT para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, inventario, marca, valor, estado } = req.body;

    const sql = 'UPDATE productos SET nombre = ?, codigo = ?, inventario = ?, marca = ?, valor = ?, estado = ? WHERE id = ?';
    db.query(sql, [nombre, codigo, inventario, marca, valor, estado, id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al actualizar el producto");
        } else {
            res.send("Producto actualizado con éxito");
        }
    });
});

// Ruta DELETE para cambiar el estado a 0 en lugar de eliminar el producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE productos SET estado = 0 WHERE id = ?';
    db.query(sql, id, (err) => {
        if (err) throw err;
        res.json({ message: 'Producto eliminado' });
    });
});

// Ruta POST para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

// Ruta POST para login de usuario
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const user = results[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Crear token
        const token = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ message: 'Inicio de sesión exitoso', token });
    });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
