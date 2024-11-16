-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS fullstack;
USE fullstack;

-- Crear la tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    inventario INT NOT NULL,
    marca VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    estado TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo en usuarios
INSERT IGNORE INTO usuarios (nombre, email, password)
VALUES 
('Admin', 'admin@example.com', '$2b$10$hashedpassword'), -- Cambia esto por una contraseña encriptada con bcrypt
('User1', 'user1@example.com', '$2b$10$hashedpassword');

-- Insertar datos de ejemplo en productos
INSERT IGNORE INTO productos (nombre, codigo, inventario, marca, valor, estado)
VALUES
('Producto 1', '001', 10, 'Marca 1', 1000.00, 1),
('Producto 2', '002', 5, 'Marca 2', 2000.00, 1),
('Producto 3', '003', 20, 'Marca 3', 1500.00, 1);

-- Actualizaciones futuras (comentadas para referencia)
-- ALTER TABLE productos ADD COLUMN nueva_columna VARCHAR(100) DEFAULT NULL;
-- ALTER TABLE usuarios ADD COLUMN rol VARCHAR(50) DEFAULT 'usuario';
