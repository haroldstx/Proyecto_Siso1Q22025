-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+deb12u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 22, 2025 at 05:57 PM
-- Server version: 10.11.13-MariaDB-0+deb12u1
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `votaciones`
--

-- --------------------------------------------------------

--
-- Table structure for table `Alcalde`
--

CREATE TABLE `Alcalde` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Partido` int(11) DEFAULT NULL,
  `Votos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Alcalde`
--

INSERT INTO `Alcalde` (`Id`, `Nombre`, `Partido`, `Votos`) VALUES
(1, 'Jorge Alejandro Aldana Bardales', 1, 0),
(2, 'Juan Diego Zelaya Aguilar', 3, 0),
(3, 'Santos Eliseo Castro Pavón', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Diputados`
--

CREATE TABLE `Diputados` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Partido` int(11) DEFAULT NULL,
  `Votos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Diputados`
--

INSERT INTO `Diputados` (`Id`, `Nombre`, `Partido`, `Votos`) VALUES
(1, 'Óscar Arturo Álvarez Guerrero', 3, 0),
(2, 'Wilmer Raynel Neal Velásquez', 3, 0),
(3, 'Esdras Amado López Rodríguez', 3, 0),
(4, 'Lena Karyn Gutiérrez Arévalo', 3, 0),
(5, 'Delia Beatriz Valle Marichal', 1, 0),
(6, 'Antonio César Rivera Callejas', 3, 0),
(7, 'Rasel Antonio Tomé Flores', 1, 0),
(8, 'Gabriela Núñez Ennabe', 2, 0),
(9, 'David Guillermo Chávez Madison', 3, 0),
(10, 'Ana Joselina Fortín Pineda', 4, 0),
(11, 'Pedro Rafael Alegría Moncada', 1, 0),
(12, 'Yadira Esperanza Bendaña Flores', 2, 0),
(13, 'Juan Diego Zelaya Aguilar', 3, 0),
(14, 'Rafael Virgilio Padilla Paz', 4, 0),
(15, 'José Luis Galdámez Álvarez', 1, 0),
(16, 'Jariet Waldina Paz', 2, 0),
(17, 'Rossel Renán Inestroza Hernández', 3, 0),
(18, 'Marlene Elizabeth Alvarenga Castellanos', 4, 0),
(19, 'Jari Dixon Herrera Hernández', 1, 0),
(20, 'Doris Alejandrina Gutiérrez', 5, 0),
(21, 'Marco Antonio Andino Flores', 2, 0),
(22, 'José Oswaldo Ramos Soto', 3, 0),
(23, 'Augusto Domingo Cruz Asensio', 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Partidos`
--

CREATE TABLE `Partidos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Partidos`
--

INSERT INTO `Partidos` (`Id`, `Nombre`) VALUES
(1, 'LIBRE'),
(2, 'Partido Liberal'),
(3, 'Partido Nacional'),
(4, 'Partido Anticorrupción'),
(5, 'Partido Innovación y Unidad SD'),
(6, 'Partido Demócrata Cristiano ');

-- --------------------------------------------------------

--
-- Table structure for table `Presidente`
--

CREATE TABLE `Presidente` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Partido` int(11) DEFAULT NULL,
  `Votos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Presidente`
--

INSERT INTO `Presidente` (`Id`, `Nombre`, `Partido`, `Votos`) VALUES
(1, 'Rixi Ramona Moncada Godoy', 1, 0),
(2, 'Nasry “Tito” Asfura Zablah', 3, 0),
(3, 'Salvador Alejandro César Nasralla Salum', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios` (
  `IdUsuario` int(11) NOT NULL,
  `Identidad` varchar(15) DEFAULT NULL,
  `NombreUsuario` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Rol` tinyint(1) DEFAULT NULL,
  `YaVoto` tinyint(1) DEFAULT 0,
  `Correo` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Alcalde`
--
ALTER TABLE `Alcalde`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Partido` (`Partido`);

--
-- Indexes for table `Diputados`
--
ALTER TABLE `Diputados`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Partido` (`Partido`);

--
-- Indexes for table `Partidos`
--
ALTER TABLE `Partidos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `Presidente`
--
ALTER TABLE `Presidente`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Partido` (`Partido`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD UNIQUE KEY `Identidad` (`Identidad`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Alcalde`
--
ALTER TABLE `Alcalde`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Diputados`
--
ALTER TABLE `Diputados`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Presidente`
--
ALTER TABLE `Presidente`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Alcalde`
--
ALTER TABLE `Alcalde`
  ADD CONSTRAINT `Alcalde_ibfk_1` FOREIGN KEY (`Partido`) REFERENCES `Partidos` (`Id`);

--
-- Constraints for table `Diputados`
--
ALTER TABLE `Diputados`
  ADD CONSTRAINT `Diputados_ibfk_1` FOREIGN KEY (`Partido`) REFERENCES `Partidos` (`Id`);

--
-- Constraints for table `Presidente`
--
ALTER TABLE `Presidente`
  ADD CONSTRAINT `Presidente_ibfk_1` FOREIGN KEY (`Partido`) REFERENCES `Partidos` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
