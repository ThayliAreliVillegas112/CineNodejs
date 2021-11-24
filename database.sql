-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2021 a las 17:23:03
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cine`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'terror'),
(2, 'Suspenso'),
(3, 'comedia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

CREATE TABLE `pelicula` (
  `id` bigint(5) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `sinopsis` text NOT NULL,
  `rating` int(3) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  `fechaActualizacion` datetime DEFAULT NULL,
  `estado` tinyint(2) NOT NULL,
  `categoria` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`id`, `titulo`, `descripcion`, `sinopsis`, `rating`, `fechaRegistro`, `fechaActualizacion`, `estado`, `categoria`) VALUES
(1, 'Titanes del pacifico', 'Es una buena pelicula', 'Tienes que ver la peli para saber de que se trata!!!!!', 8, '2021-11-24 17:05:53', '0000-00-00 00:00:00', 1, 2),
(2, 'Ted2', 'Sale el mismo oso', 'Tambien la tienes que ver para saber que pasa', 8, '2021-11-24 16:11:34', '2021-11-24 16:12:14', 0, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `id` bigint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD CONSTRAINT `pelicula_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
