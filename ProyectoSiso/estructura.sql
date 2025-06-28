-- Crear tabla Usuarios
CREATE TABLE Usuarios (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Identidad VARCHAR(15) UNIQUE,
    NombreUsuario VARCHAR(100),
    Telefono VARCHAR(20),
    Rol BOOLEAN,              -- 1: Administrador, 0: Votante
    YaVoto BOOLEAN DEFAULT 0,
    Correo VARCHAR(100) UNIQUE,
    Password VARCHAR(255)
);

-- Crear tabla Partidos
CREATE TABLE Partidos (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(50)
);

-- Insertar partidos base
INSERT INTO Partidos (Id, Nombre) VALUES
(1, 'LIBRE'),
(2, 'Partido Liberal'),
(3, 'Partido Nacional');

-- Crear tabla Presidente
CREATE TABLE Presidente (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Partido INT,
    Votos INT DEFAULT 0,
    FOREIGN KEY (Partido) REFERENCES Partidos(Id)
);

-- Crear tabla Diputados
CREATE TABLE Diputados (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Partido INT,
    Votos INT DEFAULT 0,
    FOREIGN KEY (Partido) REFERENCES Partidos(Id)
);

-- Crear tabla Alcalde
CREATE TABLE Alcalde (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Partido INT,
    Votos INT DEFAULT 0,
    FOREIGN KEY (Partido) REFERENCES Partidos(Id)
);
