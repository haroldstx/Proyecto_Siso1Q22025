<?php
$host = "localhost";
$usuario = "vote";
$contrasena = "admin2025";
$basedatos = "votaciones";

$conn = new mysqli($host, $usuario, $contrasena, $basedatos);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>