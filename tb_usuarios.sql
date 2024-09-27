-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2024 a las 18:32:35
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_loan_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contraseña` varchar(300) NOT NULL,
  `codigo_verificacion` int(11) DEFAULT NULL,
  `intentos_fallidos` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `bloqueo_hasta` datetime DEFAULT NULL,
  `fecha_registro` date DEFAULT current_timestamp(),
  `fecha_ultimo_cambio_clave` datetime DEFAULT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_institucion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `correo_electronico`, `contraseña`, `codigo_verificacion`, `intentos_fallidos`, `bloqueo_hasta`, `fecha_registro`, `fecha_ultimo_cambio_clave`, `id_cargo`, `id_institucion`) VALUES
(1, 'brandon5@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', NULL, 1, NULL, '2024-09-26', NULL, 1, 1),
(2, 'Josue@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', NULL, 0, NULL, '2024-09-26', NULL, 2, 1),
(3, 'Dylan@gmail.com', '$2y$10$1PGNCOYcgfyH.74ZwrDuKulmmD/zDJw.dJdU7A91iauHkboQfsIBS', NULL, 0, NULL, '2024-09-26', NULL, 1, 2),
(4, 'brndonsantamaria@gmail.com', '$2y$10$Vn3xP/a2g0fLsCqjn2bD8eR1BL.Mj4upsYCa63UOyeeLgtJFa3JrW', NULL, 0, NULL, '2024-09-26', NULL, 1, 1),
(5, 'AdminCFP@gmail.com', '$2y$10$puamTjJQ8PnWP8h5cJBxJO0u0ExVkK0CD1oZGvrNN3GeUeQGqBth6', NULL, 0, NULL, '2024-09-26', NULL, 1, 2),
(6, 'ProfeITR@gmail.com', '$2y$10$puamTjJQ8PnWP8h5cJBxJO0u0ExVkK0CD1oZGvrNN3GeUeQGqBth6', NULL, 0, NULL, '2024-09-26', NULL, 3, 1),
(7, 'ProfeCFP@gmail.com', '$2y$10$puamTjJQ8PnWP8h5cJBxJO0u0ExVkK0CD1oZGvrNN3GeUeQGqBth6', NULL, 0, NULL, '2024-09-26', NULL, 3, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD KEY `fk_usuario_cargo` (`id_cargo`),
  ADD KEY `fk_usuario_institucion` (`id_institucion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD CONSTRAINT `fk_usuario_cargo` FOREIGN KEY (`id_cargo`) REFERENCES `tb_cargos` (`id_cargo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_institucion` FOREIGN KEY (`id_institucion`) REFERENCES `tb_instituciones` (`id_institucion`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
