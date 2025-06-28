-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+deb12u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2025 at 02:53 PM
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
(1, 'Hugo Rolando Noé Pino', 1, 0),
(2, 'Gustavo Enrique González Maldonado', 1, 0),
(3, 'Carlos Eduardo Reina García', 1, 0),
(4, 'Clara Marisabel López Pérez', 1, 0),
(5, 'Kritza Jerlin Pérez Gallegos', 1, 0),
(6, 'Carmen Haydee López Flores', 1, 0),
(7, 'Mohsen Yamir Melghem Ramos', 1, 0),
(8, 'Marco Eliud Girón Portillo', 1, 0),
(9, 'Juan Alberto Barahona Mejía', 1, 0),
(10, 'Jari Dixon Herrera Hernández', 1, 0),
(11, 'Lucy Michell Guerrero Paz', 1, 0),
(12, 'Suyapa Alejandrina Andino Flores', 1, 0),
(13, 'Mario Orlando Suazo Lara', 1, 0),
(14, 'Andrés Alfredo Castro Turcios', 1, 0),
(15, 'Rocío Walkiria Santos Reyes', 1, 0),
(16, 'José Manuel Rodríguez Rosales', 1, 0),
(17, 'Germán René Villalobo Barahona', 1, 0),
(18, 'Diego Javier Sánchez Cueva', 1, 0),
(19, 'Germán Omar Ortiz Carrasco', 1, 0),
(20, 'Miriam Janeth Osorto Osorto', 1, 0),
(21, 'Beverly Hazel Alegría Molina', 1, 0),
(22, 'Reyna Samanta Casildo Álvarez', 1, 0),
(23, 'Maritza Yamileth Gonzales Joya', 1, 0),
(24, 'Iroska Lindaly Elvir Flores', 2, 0),
(25, 'Sarai Pamela Espinal López', 2, 0),
(26, 'Edgardo Rashid Mejía Giannini', 2, 0),
(27, 'José Salomón Nazar Ordoñez', 2, 0),
(28, 'Jhosy Saddam Toscano Ramírez', 2, 0),
(29, 'Alia Niño Kafaty', 2, 0),
(30, 'Rafael Antonio Canales Girbal', 2, 0),
(31, 'Milagros de Jesús González Zelaya', 2, 0),
(32, 'Karla Lizeth Romero Dávila', 2, 0),
(33, 'Sandra Maribel Flores Elvir', 2, 0),
(34, 'Besayda Sarahi Vásquez Rodríguez', 2, 0),
(35, 'Luz Ernestina Mejía Portillo', 2, 0),
(36, 'Maximino Germán Lobo Munguía', 2, 0),
(37, 'Katherine Alejandra Hernández Palencia', 2, 0),
(38, 'Manuel Enrique Andino Cálix', 2, 0),
(39, 'Lesly Yaquelin López Cortés', 2, 0),
(40, 'Bernardo Benjamín Anariba Tobar', 2, 0),
(41, 'Luis Fernando Reyes Ponce', 2, 0),
(42, 'Yadira Waleska Cálix Guerrero', 2, 0),
(43, 'Martha Patricia Hernández Izaguirre', 2, 0),
(44, 'Salvador Videsmundo Cabrera Reyes', 2, 0),
(45, 'Wilfredo García Godoy', 2, 0),
(46, 'Raúl Alexis Chacón Medina', 2, 0),
(47, 'Kilvett Zabdiel Jossua Bertrand Barrientos', 3, 0),
(48, 'Lissi Marcela Matute Cano', 3, 0),
(49, 'Arnold Daniel Burgos Borjas', 3, 0),
(50, 'Sara Elizabeth Estrada Zavala', 3, 0),
(51, 'Antonio César Rivera Callejas', 3, 0),
(52, 'Johana Guicel Bermúdez Lacayo', 3, 0),
(53, 'Suyapa Seham Morales Valeriano', 3, 0),
(54, 'María José Sosa Rosales', 3, 0),
(55, 'Kimberly Sarai Guevara Miralda', 3, 0),
(56, 'Oswaldo José Ramos Aguilar', 3, 0),
(57, 'Edwin Javier Cruz Perdomo', 3, 0),
(58, 'Adolfo Raquel Pineda', 3, 0),
(59, 'Fabiola Lucila Rosa Vigil', 3, 0),
(60, 'Yasser Abdalah Handal Cárcamo', 3, 0),
(61, 'Miriam Elisabeth Torres Mejía', 3, 0),
(62, 'Kevyn David Sandoval Padilla', 3, 0),
(63, 'Waleska Jackeline Zelaya Sánchez', 3, 0),
(64, 'José Luis Argeñal Valladares', 3, 0),
(65, 'Oskar Salomón Faraj Henríquez', 3, 0),
(66, 'Lourdes Janeth Medina', 3, 0),
(67, 'Katerin Jazmín Salgado Quiroz', 3, 0),
(68, 'Grace Mariela Sierra Cruz', 3, 0),
(69, 'Alberto Antonio Avilez Flores', 3, 0);

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
  `DNI` varchar(13) NOT NULL,
  `Rol` tinyint(1) DEFAULT NULL,
  `YaVoto` tinyint(1) DEFAULT 0,
  `Telefono` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Votaciones`
--

CREATE TABLE `Votaciones` (
  `Id` int(11) NOT NULL,
  `PresidenteGanador` int(11) DEFAULT NULL,
  `AlcaldeGanador` int(11) DEFAULT NULL,
  `DiputadosGanadores` text DEFAULT NULL,
  `Inicio` datetime DEFAULT NULL,
  `Cierre` datetime DEFAULT NULL,
  `Abierto` tinyint(1) DEFAULT 1
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
  ADD PRIMARY KEY (`DNI`);

--
-- Indexes for table `Votaciones`
--
ALTER TABLE `Votaciones`
  ADD PRIMARY KEY (`Id`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `Presidente`
--
ALTER TABLE `Presidente`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Votaciones`
--
ALTER TABLE `Votaciones`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

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
