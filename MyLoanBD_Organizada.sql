-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-08-2024 a las 16:05:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

-- Base de datos: `my_loan_bd`

DROP DATABASE IF EXISTS `my_loan_bd`;

CREATE DATABASE IF NOT EXISTS `my_loan_bd`;
USE `my_loan_bd`;

-- --------------------------------------------------------
-- Procedimientos y Funciones
-- --------------------------------------------------------

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuariosActivos` ()  
BEGIN
    SELECT * FROM tb_usuarios WHERE estado_empleado = 'Activo';
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `contar_prestamos_usuario` (`id_usuario` INT) RETURNS INT(11)  
BEGIN
    DECLARE total_prestamos INT;
    SELECT COUNT(*) INTO total_prestamos FROM tb_prestamos WHERE id_usuario = id_usuario;
    RETURN total_prestamos;
END$$

DELIMITER ;

-- --------------------------------------------------------
-- Estructuras de Tablas
-- --------------------------------------------------------

CREATE TABLE `tb_cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(120) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_curso` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `cantidad_personas` int(11) NOT NULL,
  `grupo` varchar(100) DEFAULT NULL,
  `programa_formacion` enum('HTP','EC','FCAT') DEFAULT NULL,
  `codigo_curso` varchar(100) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `estado` enum('pendiente','denegado','en curso','finalizado') NOT NULL DEFAULT 'pendiente',
  `id_especialidad` int(11) DEFAULT NULL, -- Alterado
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_datos_empleados` (
  `id_datos_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_empleado` varchar(255) NOT NULL,
  `apellido_empleado` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estado_empleado` enum('Activo','Inactivo') NOT NULL,
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_datos_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_detalles_cursos` (
  `id_detalle_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_espacio` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_detalle_prestamo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_detalle_prestamos` (
  `id_detalle_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `unidad` enum('unidad','unidades') NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `id_espacio` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL,
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_espacios` (
  `id_espacio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_espacio` varchar(255) NOT NULL,
  `capacidad_personas` int(11) DEFAULT NULL,
  `tipo_espacio` enum('Taller','Laboratorio') NOT NULL,
  `inventario_doc` varchar(255) DEFAULT NULL,
  `foto_espacio` varchar(255) DEFAULT NULL,
  `id_especialidad` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_espacio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_especialidades` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(120) NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_instituciones` (
  `id_institucion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_institucion` varchar(120) NOT NULL,
  PRIMARY KEY (`id_institucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_instructores` (
  `id_instructor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_instructor` varchar(255) NOT NULL,
  `apellido_instructor` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `estado_empleado` enum('Activo','Inactivo') DEFAULT 'Activo',
  `foto_empleado` varchar(100) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  PRIMARY KEY (`id_instructor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_inventario_herramienta` (
  `codigo_herramienta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_herramienta` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `en_uso` int(11) DEFAULT 0,
  `id_institucion` int(11) NOT NULL,
  PRIMARY KEY (`codigo_herramienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_materiales` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_observaciones` (
  `id_obsevacion` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_observacion` date NOT NULL,
  `observacion` varchar(40) NOT NULL,
  `foto_observacion` varchar(255) DEFAULT NULL,
  `tipo_observacion` enum('Previa','Durante','Despues','Fuera') NOT NULL,
  `tipo_prestamo` enum('Taller','Laboratorio','Equipo','Material','Herramienta') NOT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_prestamo` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_obsevacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_periodo_prestamos` (
  `id_periodo_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date NOT NULL,
  `persona_entrega` varchar(100) NOT NULL,
  `persona_recibe` varchar(100) NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `entrega_persona` varchar(100) DEFAULT NULL,
  `recibe_persona` varchar(100) DEFAULT NULL,
  `id_prestamo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_periodo_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_prestamos` (
  `id_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `programa_formacion` enum('HTP','EC','FCAT') NOT NULL,
  `tipo_prestamo` enum('Taller','Laboratorio','Equipo','Material','Herramienta') NOT NULL,
  `estado_prestamo` enum('Aceptado','Denegado','En Espera') DEFAULT 'En Espera',
  `fecha_prestamo` date NOT NULL,
  `fecha_final_prestamo` date DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `id_espacio` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_detalle_prestamo` int(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_prestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,          
  `correo_electronico` varchar(255) NOT NULL,             
  `contraseña` varchar(300) NOT NULL,                   
  `id_cargo` int(11) NOT NULL,                           
  `id_institucion` int(11) NOT NULL,                     
  PRIMARY KEY (`id_usuario`),                           
  UNIQUE KEY `correo_electronico` (`correo_electronico`), 
  KEY `fk_usuario_cargo` (`id_cargo`),                    -- Índice para la relación con la tabla `tb_cargos`
  KEY `fk_usuario_institucion` (`id_institucion`)         -- Índice para la relación con la tabla `tb_instituciones`
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;


-- Tabla tb_cargos
INSERT INTO `tb_cargos` (`nombre_cargo`) VALUES 
('Administrador'), 
('Instructor'), 
('Coordinador'), 
('Asistente'), 
('Director');

-- Tabla tb_cursos
INSERT INTO `tb_cursos` (`nombre_curso`, `fecha_inicio`, `fecha_fin`, `cantidad_personas`, `grupo`, `programa_formacion`, `codigo_curso`, `id_empleado`, `estado`, `id_especialidad`) VALUES 
('Curso de Python', '2024-09-01', '2024-12-01', 25, 'A', 'HTP', 'PY2024', 1, 'en curso', 1),
('Curso de Java', '2024-09-15', '2024-12-15', 20, 'B', 'EC', 'JV2024', 2, 'pendiente', 2),
('Curso de C++', '2024-10-01', '2024-12-31', 30, 'C', 'FCAT', 'CP2024', 3, 'finalizado', 3),
('Curso de SQL', '2024-09-05', '2024-11-30', 15, 'D', 'HTP', 'SQL2024', 4, 'denegado', 1),
('Curso de HTML/CSS', '2024-09-20', '2024-11-20', 18, 'E', 'EC', 'HTMLCSS2024', 5, 'en curso', 2);

-- Tabla tb_datos_empleados
INSERT INTO `tb_datos_empleados` (`nombre_empleado`, `apellido_empleado`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES 
('Carlos', 'Quintanilla', '555-1234', 'Activo', 'carlos.jpg', 1, 1),
('Ana', 'Martínez', '555-5678', 'Activo', 'ana.jpg', 2, 2),
('Luis', 'González', '555-9876', 'Inactivo', 'luis.jpg', 3, 3),
('María', 'Pérez', '555-4321', 'Activo', 'maria.jpg', 4, 1),
('José', 'Ramírez', '555-8765', 'Inactivo', 'jose.jpg', 5, 2);

-- Tabla tb_detalles_cursos
INSERT INTO `tb_detalles_cursos` (`id_espacio`, `id_curso`, `id_detalle_prestamo`) VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- Tabla tb_detalle_prestamos
INSERT INTO `tb_detalle_prestamos` (`unidad`, `descripcion`, `id_espacio`) VALUES 
('unidad', 'Laptop para el curso de Python', 1),
('unidades', 'Proyectores para el curso de Java', 2),
('unidad', 'Libros para el curso de C++', 3),
('unidades', 'Equipos de red para el curso de SQL', 4),
('unidad', 'Tableros electrónicos para el curso de HTML/CSS', 5);

-- Tabla tb_equipos
INSERT INTO `tb_equipos` (`nombre`, `descripcion`, `cantidad`, `id_espacio`, `id_institucion`) VALUES 
('Laptop', 'Laptop Dell Inspiron', 10, 1, 1),
('Proyector', 'Proyector Epson', 5, 2, 2),
('Libro', 'Libro de C++', 20, 3, 1),
('Equipo de red', 'Router Cisco', 8, 4, 2),
('Tablero electrónico', 'Tablero Arduino', 12, 5, 1);

-- Tabla tb_espacios
INSERT INTO `tb_espacios` (`nombre_espacio`, `capacidad_personas`, `tipo_espacio`, `inventario_doc`, `foto_espacio`, `id_especialidad`, `id_institucion`, `id_empleado`) VALUES 
('Laboratorio A', 30, 'Laboratorio', 'Inventario Lab A.pdf', 'lab_a.jpg', 1, 1, 1),
('Taller B', 25, 'Taller', 'Inventario Taller B.pdf', 'taller_b.jpg', 2, 2, 2),
('Laboratorio C', 20, 'Laboratorio', 'Inventario Lab C.pdf', 'lab_c.jpg', 3, 1, 3),
('Taller D', 15, 'Taller', 'Inventario Taller D.pdf', 'taller_d.jpg', 1, 2, 4),
('Laboratorio E', 40, 'Laboratorio', 'Inventario Lab E.pdf', 'lab_e.jpg', 2, 1, 5);

-- Tabla tb_especialidades
INSERT INTO `tb_especialidades` (`nombre_especialidad`) VALUES 
('Programación'), 
('Redes'), 
('Electrónica'), 
('Administración'), 
('Diseño Gráfico');

-- Tabla tb_instituciones
INSERT INTO `tb_instituciones` (`nombre_institucion`) VALUES 
('Instituto Tecnológico ABC'), 
('Centro de Capacitación XYZ'), 
('Academia de Programación 123'), 
('Escuela Técnica DEF'), 
('Colegio GHI');

-- Tabla tb_instructores
INSERT INTO `tb_instructores` (`nombre_instructor`, `apellido_instructor`, `telefono`, `estado_empleado`, `foto_empleado`, `id_usuario`, `id_especialidad`) VALUES 
('Pedro', 'Lopez', '555-0011', 'Activo', 'pedro.jpg', 1, 1),
('Marta', 'García', '555-0022', 'Activo', 'marta.jpg', 2, 2),
('Juan', 'Rodríguez', '555-0033', 'Inactivo', 'juan.jpg', 3, 3),
('Laura', 'Hernández', '555-0044', 'Activo', 'laura.jpg', 4, 1),
('Jorge', 'Ramirez', '555-0055', 'Inactivo', 'jorge.jpg', 5, 2);

-- Tabla tb_inventario_herramienta
INSERT INTO `tb_inventario_herramienta` (`nombre_herramienta`, `descripcion`, `stock`, `en_uso`, `id_institucion`) VALUES 
('Taladro', 'Taladro Bosch', 15, 3, 1),
('Multímetro', 'Multímetro Fluke', 10, 2, 2),
('Cautín', 'Cautín Weller', 20, 5, 1),
('Osciloscopio', 'Osciloscopio Tektronix', 8, 1, 2),
('Pinzas', 'Pinzas de corte', 25, 10, 1);

-- Tabla tb_materiales
INSERT INTO `tb_materiales` (`nombre`, `descripcion`, `cantidad`) VALUES 
('Cables UTP', 'Cables de red UTP', 100),
('Conectores RJ45', 'Conectores para cables de red', 200),
('Placas Arduino', 'Placas de desarrollo Arduino', 50),
('Resistencias', 'Resistencias de diferentes valores', 500),
('Condensadores', 'Condensadores de diferentes valores', 300);

-- Tabla tb_observaciones
INSERT INTO `tb_observaciones` (`fecha_observacion`, `observacion`, `foto_observacion`, `tipo_observacion`, `tipo_prestamo`, `id_espacio`, `id_usuario`, `id_prestamo`, `id_curso`) VALUES 
('2024-08-10', 'Revisión antes del curso', 'observacion1.jpg', 'Previa', 'Taller', 1, 1, 1, 1),
('2024-08-15', 'Revisión durante el curso', 'observacion2.jpg', 'Durante', 'Laboratorio', 2, 2, 2, 2),
('2024-08-20', 'Revisión después del curso', 'observacion3.jpg', 'Despues', 'Equipo', 3, 3, 3, 3),
('2024-08-25', 'Revisión fuera de horario', 'observacion4.jpg', 'Fuera', 'Material', 4, 4, 4, 4),
('2024-08-30', 'Revisión antes del préstamo', 'observacion5.jpg', 'Previa', 'Herramienta', 5, 5, 5, 5);

-- Tabla tb_periodo_prestamos
INSERT INTO `tb_periodo_prestamos` (`fecha_inicio`, `persona_entrega`, `persona_recibe`, `fecha_entrega`, `entrega_persona`, `recibe_persona`, `id_prestamo`) VALUES 
('2024-08-01', 'Carlos Q.', 'Ana M.', '2024-08-05', 'Carlos Q.', 'Ana M.', 1),
('2024-08-02', 'Luis G.', 'María P.', '2024-08-06', 'Luis G.', 'María P.', 2),
('2024-08-03', 'José R.', 'Pedro L.', '2024-08-07', 'José R.', 'Pedro L.', 3),
('2024-08-04', 'Laura H.', 'Jorge R.', '2024-08-08', 'Laura H.', 'Jorge R.', 4),
('2024-08-05', 'Marta G.', 'Juan R.', '2024-08-09', 'Marta G.', 'Juan R.', 5);

-- Tabla tb_prestamos
INSERT INTO `tb_prestamos` (`tipo_prestamo`, `estado_prestamo`, `fecha_prestamo`, `fecha_final_prestamo`, `cantidad`, `fecha_entrega`, `id_espacio`, `id_curso`, `id_detalle_prestamo`, `id_usuario`) VALUES 
('Taller', 'En Espera', '2024-08-01', '2024-08-10', 10, '2024-08-05', 1, 1, 1, 1),
('Laboratorio', 'Aceptado', '2024-08-02', '2024-08-11', 5, '2024-08-06', 2, 2, 2, 2),
('Equipo', 'Denegado', '2024-08-03', '2024-08-12', 8, '2024-08-07', 3, 3, 3, 3),
('Material', 'En Espera', '2024-08-04', '2024-08-13', 20, '2024-08-08', 4, 4, 4, 4),
('Herramienta', 'Aceptado', '2024-08-05', '2024-08-14', 15, '2024-08-09', 5, 5, 5, 5);

-- Tabla tb_usuarios
INSERT INTO `tb_usuarios` (`correo_electronico`, `contraseña`, `id_cargo`, `id_institucion`) VALUES 
('carlos@ejemplo.com', 'password123', 1, 1),
('ana@ejemplo.com', 'password456', 2, 2),
('luis@ejemplo.com', 'password789', 3, 1),
('maria@ejemplo.com', 'password101112', 4, 2),
('jose@ejemplo.com', 'password131415', 5, 1);
